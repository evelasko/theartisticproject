"use client";

import { useRef, useCallback, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import clsx from "clsx";

/* ==========================================================================
   TYPES
   ========================================================================== */

export interface NayaCarouselItem {
  id: string;
  image: string;
  title: string;
  year?: string;
  href?: string;
}

export interface NayaCarouselProps {
  /** Array of items to display */
  items: NayaCarouselItem[];
  /** Enable automatic rotation (default: true) */
  autoRotate?: boolean;
  /** Auto rotation speed - matches original at 0.001 (default: 0.001) */
  autoRotateSpeed?: number;
  /** Allow drag/swipe to rotate (default: true) */
  enableDrag?: boolean;
  /** Callback when active slide changes */
  onSlideChange?: (index: number) => void;
  /** Additional CSS classes */
  className?: string;
}

/* ==========================================================================
   CONSTANTS
   ========================================================================== */

/** Actual image dimensions: 1022x1277 → aspect ratio ~0.8:1 (portrait) */
const IMAGE_ASPECT_RATIO = 1022 / 1277; // ≈ 0.8
const SLIDE_WIDTH = 2.0;
const SLIDE_HEIGHT = SLIDE_WIDTH / IMAGE_ASPECT_RATIO; // ≈ 2.5
const LABEL_HEIGHT = SLIDE_WIDTH * 0.15;
const CURVATURE_FACTOR = 0.15;
const LABEL_CURVATURE_FACTOR = SLIDE_WIDTH * 0.05;
const GEOMETRY_SEGMENTS = 15;
const LABEL_SEGMENTS_X = 8;
const LABEL_SEGMENTS_Y = 3;

/** Canvas aspect ratio - taller to accommodate portrait cards */
const FIXED_ASPECT = 16 / 11;
const CAMERA_FOV = 45;

/** Gap between cards (as fraction of slide width) */
const GAP_FACTOR = 0.04;
/** Minimum number of cards for smooth carousel */
const MIN_CARDS = 14;
/** Target: cards should be at this distance from camera for comfortable viewing */
const TARGET_CARD_DISTANCE = 4.5;

/* ==========================================================================
   UTILITY FUNCTIONS
   ========================================================================== */

/**
 * Apply curvature to a plane geometry - matches original implementation
 * Bends the plane so the center is pushed back (negative Z)
 */
function applyCurvatureToGeometry(geometry: THREE.PlaneGeometry, width: number, factor: number): void {
  const positions = geometry.attributes.position;
  
  // Store original positions for wave effect restoration
  if (!geometry.userData.originalPositions) {
    geometry.userData.originalPositions = new Float32Array(positions.array.length);
    geometry.userData.originalPositions.set(positions.array);
  }
  
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const u = x / (width / 2);
    const offset = -factor * (1 - u * u);
    positions.setZ(i, offset);
  }
  
  positions.needsUpdate = true;
  geometry.computeVertexNormals();
}

/**
 * Create a rounded rectangle alpha map texture
 */
function createRoundedRectTexture(width: number, height: number, radius: number): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(width - radius, 0);
  ctx.quadraticCurveTo(width, 0, width, radius);
  ctx.lineTo(width, height - radius);
  ctx.quadraticCurveTo(width, height, width - radius, height);
  ctx.lineTo(radius, height);
  ctx.quadraticCurveTo(0, height, 0, height - radius);
  ctx.lineTo(0, radius);
  ctx.quadraticCurveTo(0, 0, radius, 0);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Create a text label texture - matches original styling
 */
function createTextTexture(
  text: string,
  align: "left" | "right",
  texWidth = 1440,
  texHeight = 200
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = texWidth;
  canvas.height = texHeight;
  const ctx = canvas.getContext("2d")!;

  const fontSize = 35;
  const fontFamily = "Helvetica Neue, Helvetica, Arial, sans-serif";
  const fontWeight = "normal";
  const color = "white";

  ctx.fillStyle = "rgba(0, 0, 0, 0)";
  ctx.fillRect(0, 0, texWidth, texHeight);
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  ctx.fillStyle = color;
  ctx.textBaseline = "middle";
  ctx.textAlign = align;

  const x = align === "right" ? texWidth : 0;
  ctx.fillText(text.toUpperCase(), x, texHeight / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Calculate cylinder radius based on number of slides
 * Formula: circumference = slideWidth * totalSlides, radius = circumference / (2π)
 */
function calculateRadius(slideCount: number): number {
  // Each card takes up (width + gap) of arc length on the cylinder
  const cardSpacing = SLIDE_WIDTH * (1 + GAP_FACTOR);
  const circumference = cardSpacing * slideCount;
  const calculatedRadius = circumference / (2 * Math.PI);
  // Ensure minimum distance for comfortable viewing
  return Math.max(calculatedRadius, TARGET_CARD_DISTANCE);
}

/* ==========================================================================
   SHARED TEXTURES - Lazy initialization for SSR compatibility
   ========================================================================== */

let sharedRoundedRectTexture: THREE.CanvasTexture | null = null;

function getSharedRoundedRectTexture(): THREE.CanvasTexture {
  if (!sharedRoundedRectTexture && typeof document !== "undefined") {
    sharedRoundedRectTexture = createRoundedRectTexture(512, 512, 20);
  }
  return sharedRoundedRectTexture!;
}

/* ==========================================================================
   SLIDE CARD COMPONENT
   ========================================================================== */

interface SlideCardProps {
  item: NayaCarouselItem;
  index: number;
  totalSlides: number;
  radius: number;
}

function SlideCard({ item, index, totalSlides, radius }: SlideCardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const imageGeometryRef = useRef<THREE.PlaneGeometry>(null);
  const titleGeometryRef = useRef<THREE.PlaneGeometry>(null);
  const yearGeometryRef = useRef<THREE.PlaneGeometry>(null);
  
  // Get the shared alpha map texture (lazy initialized)
  const alphaMapTexture = useMemo(() => getSharedRoundedRectTexture(), []);
  
  // Load the image texture and configure colorSpace via callback
  const imageTexture = useTexture(item.image, (texture) => {
    // Configure texture when loaded (this is the proper way to set colorSpace)
    texture.colorSpace = THREE.SRGBColorSpace;
  });
  
  // Create text textures
  const titleTexture = useMemo(
    () => createTextTexture(item.title, "left"),
    [item.title]
  );
  
  const yearTexture = useMemo(
    () => createTextTexture(item.year || "", "right"),
    [item.year]
  );

  // Calculate position on cylinder
  const angle = (index / totalSlides) * Math.PI * 2;
  const x = radius * Math.sin(angle);
  const z = radius * Math.cos(angle);
  
  // Calculate rotation to face INWARD toward the camera at the cylinder center.
  // Adding Math.PI flips the card so its front face (+Z) points toward the origin,
  // allowing the camera inside the cylinder to see the card faces.
  const rotationY = angle + Math.PI;

  // Apply curvature to geometries on mount
  useEffect(() => {
    if (imageGeometryRef.current) {
      applyCurvatureToGeometry(imageGeometryRef.current, SLIDE_WIDTH, CURVATURE_FACTOR);
    }
    if (titleGeometryRef.current) {
      applyCurvatureToGeometry(titleGeometryRef.current, SLIDE_WIDTH, LABEL_CURVATURE_FACTOR);
    }
    if (yearGeometryRef.current) {
      applyCurvatureToGeometry(yearGeometryRef.current, SLIDE_WIDTH, LABEL_CURVATURE_FACTOR);
    }
  }, []);

  return (
    <group
      ref={groupRef}
      position={[x, 0, z]}
      rotation={[0, rotationY, 0]}
    >
      {/* Main image card */}
      <mesh>
        <planeGeometry 
          ref={imageGeometryRef} 
          args={[SLIDE_WIDTH, SLIDE_HEIGHT, GEOMETRY_SEGMENTS, GEOMETRY_SEGMENTS]} 
        />
        <meshBasicMaterial
          map={imageTexture}
          alphaMap={alphaMapTexture}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Title label (left-aligned, positioned below card) */}
      <mesh position={[0.01, -SLIDE_HEIGHT / 2 - LABEL_HEIGHT / 4, -0.05]}>
        <planeGeometry 
          ref={titleGeometryRef}
          args={[SLIDE_WIDTH, LABEL_HEIGHT, LABEL_SEGMENTS_X, LABEL_SEGMENTS_Y]} 
        />
        <meshBasicMaterial map={titleTexture} transparent />
      </mesh>

      {/* Year label (right-aligned, positioned below card) */}
      <mesh position={[-0.01, -SLIDE_HEIGHT / 2 - LABEL_HEIGHT / 4, -0.05]}>
        <planeGeometry 
          ref={yearGeometryRef}
          args={[SLIDE_WIDTH, LABEL_HEIGHT, LABEL_SEGMENTS_X, LABEL_SEGMENTS_Y]} 
        />
        <meshBasicMaterial map={yearTexture} transparent />
      </mesh>
    </group>
  );
}

/* ==========================================================================
   CAROUSEL GROUP - Contains all slides and handles rotation
   ========================================================================== */

interface CarouselGroupProps {
  items: NayaCarouselItem[];
  radius: number;
  groupZOffset: number;
  targetRotationYRef: React.MutableRefObject<number>;
  isDraggingRef: React.MutableRefObject<boolean>;
  autoRotate: boolean;
  autoRotateSpeed: number;
  dragVelocityRef: React.MutableRefObject<number>;
}

function CarouselGroup({
  items,
  radius,
  groupZOffset,
  targetRotationYRef,
  isDraggingRef,
  autoRotate,
  autoRotateSpeed,
  dragVelocityRef,
}: CarouselGroupProps) {
  const groupRef = useRef<THREE.Group>(null);
  const waveTimeRef = useRef(0);
  const currentWaveAmplitudeRef = useRef(0);
  const waveEasingFactor = 0.2;

  useFrame(() => {
    if (!groupRef.current) return;

    // Auto-rotate when not dragging
    if (!isDraggingRef.current && autoRotate) {
      targetRotationYRef.current += autoRotateSpeed;
      dragVelocityRef.current *= 0.95; // Decay velocity
    }

    // Apply wave distortion effect based on drag velocity
    const waveAmplitude = Math.abs(dragVelocityRef.current) * 0.1;
    applyWaveEffect(waveAmplitude, groupRef.current, radius, waveTimeRef, currentWaveAmplitudeRef, waveEasingFactor);

    // Smooth lerp rotation
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotationYRef.current,
      0.1
    );
  });

  return (
    <group ref={groupRef} position={[0, 0, groupZOffset]}>
      {items.map((item, index) => (
        <Suspense key={item.id} fallback={null}>
          <SlideCard
            item={item}
            index={index}
            totalSlides={items.length}
            radius={radius}
          />
        </Suspense>
      ))}
    </group>
  );
}

/**
 * Apply wave distortion effect to slides during drag
 * Matches the original implementation's vertex displacement
 */
function applyWaveEffect(
  amplitude: number,
  group: THREE.Group,
  radius: number,
  waveTimeRef: React.MutableRefObject<number>,
  currentWaveAmplitudeRef: React.MutableRefObject<number>,
  waveEasingFactor: number
): void {
  // Ease the wave amplitude
  const targetWaveAmplitude = amplitude;
  currentWaveAmplitudeRef.current = THREE.MathUtils.lerp(
    currentWaveAmplitudeRef.current,
    targetWaveAmplitude,
    waveEasingFactor
  );

  // Skip if amplitude is too small
  if (currentWaveAmplitudeRef.current < 0.0005) return;

  waveTimeRef.current += 0.004;
  const distortionCenterX = -radius;
  const distortionWidth = 5;

  group.children.forEach((slide) => {
    if (!(slide instanceof THREE.Group)) return;
    
    const slidePos = new THREE.Vector3();
    slide.getWorldPosition(slidePos);

    // Only affect slides near the distortion center
    if (Math.abs(slidePos.x - distortionCenterX) > distortionWidth * 2) {
      return;
    }

    const meshesToDistort = [slide, ...slide.children];

    meshesToDistort.forEach((mesh) => {
      if (!(mesh instanceof THREE.Mesh)) return;
      
      const positions = mesh.geometry?.attributes?.position;
      if (!positions) return;

      // Store original positions if not already stored
      if (!mesh.geometry.userData.originalPositions) {
        mesh.geometry.userData.originalPositions = new Float32Array(positions.array.length);
        mesh.geometry.userData.originalPositions.set(positions.array);
      }

      const originalPositions = mesh.geometry.userData.originalPositions as Float32Array;

      const frequency1 = 2.0;
      const frequency2 = 1.3;
      const frequency3 = 0.8;
      const timeMultiplier1 = 1.0;
      const timeMultiplier2 = 1.2;

      for (let i = 0; i < positions.count; i++) {
        const idx = i * 3;
        const x = originalPositions[idx];
        const y = originalPositions[idx + 1];

        const vertex = new THREE.Vector3(x, y, 0).applyMatrix4(slide.matrixWorld);
        const distance = vertex.x - distortionCenterX;
        const falloff = Math.max(0, 1 - Math.pow(distance / distortionWidth, 2));

        const wave =
          currentWaveAmplitudeRef.current *
          4.0 *
          (Math.sin(vertex.x * frequency1 + waveTimeRef.current * timeMultiplier1) +
            Math.sin(
              vertex.x * frequency2 +
                vertex.y * frequency3 +
                waveTimeRef.current * timeMultiplier2
            )) *
          0.5;

        positions.setY(i, y + wave * falloff);
      }

      positions.needsUpdate = true;
    });
  });
}

/* ==========================================================================
   CAROUSEL SCENE - Sets up camera, lighting, and interaction
   ========================================================================== */

interface CarouselSceneProps {
  items: NayaCarouselItem[];
  radius: number;
  groupZOffset: number;
  autoRotate: boolean;
  autoRotateSpeed: number;
  enableDrag: boolean;
  targetRotationYRef: React.MutableRefObject<number>;
  isDraggingRef: React.MutableRefObject<boolean>;
  dragVelocityRef: React.MutableRefObject<number>;
  previousXRef: React.MutableRefObject<number>;
  onDragStart: () => void;
  onDragEnd: () => void;
}

function CarouselScene({
  items,
  radius,
  groupZOffset,
  autoRotate,
  autoRotateSpeed,
  enableDrag,
  targetRotationYRef,
  isDraggingRef,
  dragVelocityRef,
  previousXRef,
  onDragStart,
  onDragEnd,
}: CarouselSceneProps) {
  const { gl } = useThree();

  // Handle pointer events on the canvas
  useEffect(() => {
    if (!enableDrag) return;

    const canvas = gl.domElement;

    const handlePointerDown = (event: PointerEvent) => {
      isDraggingRef.current = true;
      previousXRef.current = event.clientX;
      onDragStart();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = event.clientX - previousXRef.current;
      dragVelocityRef.current = deltaX * 0.01;
      previousXRef.current = event.clientX;
      targetRotationYRef.current -= deltaX * 0.002;
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
      onDragEnd();
    };

    const handlePointerLeave = () => {
      isDraggingRef.current = false;
      onDragEnd();
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [gl, enableDrag, isDraggingRef, previousXRef, dragVelocityRef, targetRotationYRef, onDragStart, onDragEnd]);

  return (
    <CarouselGroup
      items={items}
      radius={radius}
      groupZOffset={groupZOffset}
      targetRotationYRef={targetRotationYRef}
      isDraggingRef={isDraggingRef}
      autoRotate={autoRotate}
      autoRotateSpeed={autoRotateSpeed}
      dragVelocityRef={dragVelocityRef}
    />
  );
}

/* ==========================================================================
   MAIN NAYA CAROUSEL COMPONENT
   ========================================================================== */

/**
 * NayaCarousel Component
 *
 * A 3D cylindrical carousel matching the Naya Studio Dubai implementation.
 * Features curved cards, smooth rotation, drag interaction, and wave distortion effects.
 *
 * @example
 * ```tsx
 * <NayaCarousel
 *   items={projects}
 *   autoRotate
 *   autoRotateSpeed={0.001}
 * />
 * ```
 */
export function NayaCarousel({
  items,
  autoRotate = true,
  autoRotateSpeed = 0.001,
  enableDrag = true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSlideChange,
  className,
}: NayaCarouselProps) {
  // Ensure minimum cards for smooth carousel by duplicating if needed
  const normalizedItems = useMemo(() => {
    let slideItems = [...items];
    // Keep duplicating until we have at least MIN_CARDS
    while (slideItems.length < MIN_CARDS) {
      slideItems = [...slideItems, ...items];
    }
    // Ensure unique IDs
    return slideItems.map((item, index) => ({
      ...item,
      id: `${item.id}-${index}`,
    }));
  }, [items]);

  // Calculate radius based on slide count
  const radius = useMemo(() => calculateRadius(normalizedItems.length), [normalizedItems.length]);

  // Place the camera at the center of the cylinder (groupZOffset = 0)
  // This way, cards wrap around the camera and only those in front are visible.
  // Cards "behind" the camera are naturally outside the view frustum.
  const groupZOffset = 0;

  // Refs for animation state (using refs to avoid re-renders)
  const targetRotationYRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragVelocityRef = useRef(0);
  const previousXRef = useRef(0);
  const currentAutoRotateSpeedRef = useRef(autoRotateSpeed);

  // Track dragging state for auto-rotation pause
  const handleDragStart = useCallback(() => {
    currentAutoRotateSpeedRef.current = 0;
  }, []);

  const handleDragEnd = useCallback(() => {
    currentAutoRotateSpeedRef.current = autoRotateSpeed * 2; // Slightly faster after drag (matches original)
  }, [autoRotateSpeed]);

  // Store the autoRotateSpeed in a ref to pass to the scene
  const autoRotateSpeedForScene = useMemo(() => autoRotateSpeed, [autoRotateSpeed]);

  return (
    <div
      className={clsx(
        "relative w-full carousel-3d-container",
        className
      )}
      style={{ aspectRatio: `${FIXED_ASPECT}` }}
    >
      <Canvas
        camera={{
          position: [0, 0, 0],
          fov: CAMERA_FOV,
          near: 0.1,
          far: 1000,
          aspect: FIXED_ASPECT,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <Suspense fallback={null}>
          <CarouselScene
            items={normalizedItems}
            radius={radius}
            groupZOffset={groupZOffset}
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeedForScene}
            enableDrag={enableDrag}
            targetRotationYRef={targetRotationYRef}
            isDraggingRef={isDraggingRef}
            dragVelocityRef={dragVelocityRef}
            previousXRef={previousXRef}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default NayaCarousel;
