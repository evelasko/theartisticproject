"use client";

import { useRef, useState, useCallback, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Image, useTexture } from "@react-three/drei";
import { easing } from "maath";
import * as THREE from "three";
import clsx from "clsx";

/* ==========================================================================
   TYPES
   ========================================================================== */

export interface CarouselItem {
  id: string;
  image: string;
  title: string;
  year?: string;
  category?: string;
  href?: string;
}

export interface Carousel3DProps {
  /** Array of items to display */
  items: CarouselItem[];
  /** Enable automatic rotation */
  autoRotate?: boolean;
  /** Auto rotation speed (radians per frame) */
  autoRotateSpeed?: number;
  /** Carousel radius ('auto' calculates based on item count) */
  radius?: number | "auto";
  /** Allow drag/swipe to rotate */
  enableDrag?: boolean;
  /** Allow mouse wheel to rotate */
  enableWheel?: boolean;
  /** Velocity decay for momentum (0-1) */
  friction?: number;
  /** Callback when active slide changes */
  onSlideChange?: (index: number) => void;
  /** Additional CSS classes */
  className?: string;
}

interface CarouselCardProps {
  item: CarouselItem;
  index: number;
  total: number;
  radius: number;
  rotation: number;
  activeIndex: number;
  onSelect: (index: number) => void;
}

interface CarouselGroupProps {
  items: CarouselItem[];
  radius: number;
  rotation: number;
  targetRotation: number;
  activeIndex: number;
  onSelect: (index: number) => void;
}

/* ==========================================================================
   UTILITIES
   ========================================================================== */

/**
 * Calculate radius based on item count
 * Formula derived from reference implementation
 */
function calculateRadius(itemCount: number): number {
  const baseRadius = 2.5;
  const scaleFactor = 0.1;
  return baseRadius * (1 + (itemCount - 6) * scaleFactor);
}

/**
 * Get card transform based on angle
 */
function getCardTransform(index: number, total: number, radius: number, rotation: number) {
  const angle = (index / total) * Math.PI * 2 + rotation;
  return {
    position: [
      Math.sin(angle) * radius,
      0,
      Math.cos(angle) * radius,
    ] as [number, number, number],
    rotationY: -angle,
  };
}

/**
 * Calculate which index is currently at the front
 */
function getActiveIndex(rotation: number, total: number): number {
  // Normalize rotation to 0-2π range
  const normalizedRotation = ((rotation % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  // Calculate which item is at front (rotation 0 means index 0 is at front)
  const anglePerItem = (Math.PI * 2) / total;
  const activeIndex = Math.round(normalizedRotation / anglePerItem) % total;
  return (total - activeIndex) % total;
}

/* ==========================================================================
   CAROUSEL CARD COMPONENT (3D)
   ========================================================================== */

function CarouselCard({
  item,
  index,
  total,
  radius,
  rotation,
  activeIndex,
  onSelect,
}: CarouselCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { position, rotationY } = getCardTransform(index, total, radius, rotation);
  
  // Calculate distance from front for scaling/opacity
  const isActive = index === activeIndex;
  const distanceFromActive = Math.min(
    Math.abs(index - activeIndex),
    Math.abs(index - activeIndex + total),
    Math.abs(index - activeIndex - total)
  );
  
  // Scale and opacity based on position
  const targetScale = isActive ? 1 : Math.max(0.6, 1 - distanceFromActive * 0.15);
  const targetOpacity = isActive ? 1 : Math.max(0.4, 1 - distanceFromActive * 0.2);

  useFrame((_, delta) => {
    if (meshRef.current) {
      // Smooth scale interpolation
      easing.damp3(
        meshRef.current.scale,
        [targetScale, targetScale, 1],
        0.15,
        delta
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={[0, rotationY, 0]}
      onClick={() => onSelect(index)}
    >
      <planeGeometry args={[1.6, 2.2]} />
      <Suspense fallback={<meshBasicMaterial color="#1a1a1a" />}>
        <ImageMaterial url={item.image} opacity={targetOpacity} />
      </Suspense>
    </mesh>
  );
}

/**
 * Separate component for image material to handle loading
 */
function ImageMaterial({ url, opacity }: { url: string; opacity: number }) {
  const texture = useTexture(url);
  
  return (
    <meshBasicMaterial
      map={texture}
      transparent
      opacity={opacity}
      side={THREE.DoubleSide}
    />
  );
}

/* ==========================================================================
   CAROUSEL GROUP COMPONENT (3D)
   ========================================================================== */

function CarouselGroup({
  items,
  radius,
  rotation,
  targetRotation,
  activeIndex,
  onSelect,
}: CarouselGroupProps) {
  const groupRef = useRef<THREE.Group>(null);
  const currentRotation = useRef(rotation);

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Smooth rotation interpolation
      easing.damp(currentRotation, "current", targetRotation, 0.25, delta);
    }
  });

  return (
    <group ref={groupRef}>
      {items.map((item, index) => (
        <CarouselCard
          key={item.id}
          item={item}
          index={index}
          total={items.length}
          radius={radius}
          rotation={currentRotation.current}
          activeIndex={activeIndex}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
}

/* ==========================================================================
   CAROUSEL SCENE (3D)
   ========================================================================== */

interface CarouselSceneProps {
  items: CarouselItem[];
  radius: number;
  rotation: number;
  targetRotation: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  onDrag: (deltaX: number) => void;
  enableDrag: boolean;
}

function CarouselScene({
  items,
  radius,
  rotation,
  targetRotation,
  activeIndex,
  onSelect,
  onDrag,
  enableDrag,
}: CarouselSceneProps) {
  const { viewport } = useThree();
  const isDragging = useRef(false);
  const lastX = useRef(0);

  const handlePointerDown = useCallback((e: THREE.Event) => {
    if (!enableDrag) return;
    isDragging.current = true;
    lastX.current = (e as unknown as PointerEvent).clientX;
  }, [enableDrag]);

  const handlePointerMove = useCallback((e: THREE.Event) => {
    if (!isDragging.current || !enableDrag) return;
    const clientX = (e as unknown as PointerEvent).clientX;
    const deltaX = clientX - lastX.current;
    lastX.current = clientX;
    onDrag(deltaX * 0.005);
  }, [enableDrag, onDrag]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} />
      
      {/* Invisible plane for drag detection */}
      <mesh
        position={[0, 0, 0]}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Carousel group */}
      <CarouselGroup
        items={items}
        radius={radius}
        rotation={rotation}
        targetRotation={targetRotation}
        activeIndex={activeIndex}
        onSelect={onSelect}
      />
    </>
  );
}

/* ==========================================================================
   NAVIGATION CONTROLS (2D)
   ========================================================================== */

interface NavigationControlsProps {
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}

function NavigationControls({ onPrev, onNext, className }: NavigationControlsProps) {
  return (
    <div className={clsx("flex items-center gap-4", className)}>
      <button
        onClick={onPrev}
        className="group flex h-12 w-12 items-center justify-center rounded-full border border-border-default bg-transparent transition-colors hover:border-border-strong"
        aria-label="Previous slide"
      >
        <svg
          className="h-5 w-5 text-text-secondary transition-colors group-hover:text-text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        onClick={onNext}
        className="group flex h-12 w-12 items-center justify-center rounded-full border border-border-default bg-transparent transition-colors hover:border-border-strong"
        aria-label="Next slide"
      >
        <svg
          className="h-5 w-5 text-text-secondary transition-colors group-hover:text-text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}

/* ==========================================================================
   MAIN CAROUSEL COMPONENT
   ========================================================================== */

/**
 * Carousel3D Component
 *
 * A 3D circular carousel for showcasing portfolio items.
 * Cards are arranged in a circle and rotate around a central axis.
 *
 * @example
 * ```tsx
 * <Carousel3D
 *   items={projects}
 *   autoRotate
 *   onSlideChange={(index) => console.log('Active:', index)}
 * />
 * ```
 */
export function Carousel3D({
  items,
  autoRotate = false,
  autoRotateSpeed = 0.002,
  radius: radiusProp = "auto",
  enableDrag = true,
  enableWheel = true,
  friction = 0.9,
  onSlideChange,
  className,
}: Carousel3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [targetRotation, setTargetRotation] = useState(0);
  const velocityRef = useRef(0);
  const lastActiveIndexRef = useRef(0);

  // Calculate radius
  const radius = useMemo(() => {
    return radiusProp === "auto" ? calculateRadius(items.length) : radiusProp;
  }, [radiusProp, items.length]);

  // Calculate active index
  const activeIndex = useMemo(() => {
    return getActiveIndex(targetRotation, items.length);
  }, [targetRotation, items.length]);

  // Notify on slide change
  useMemo(() => {
    if (activeIndex !== lastActiveIndexRef.current) {
      lastActiveIndexRef.current = activeIndex;
      onSlideChange?.(activeIndex);
    }
  }, [activeIndex, onSlideChange]);

  // Handle drag
  const handleDrag = useCallback((deltaX: number) => {
    velocityRef.current = deltaX;
    setTargetRotation((prev) => prev + deltaX);
  }, []);

  // Handle card selection
  const handleSelect = useCallback((index: number) => {
    const anglePerItem = (Math.PI * 2) / items.length;
    const currentActive = getActiveIndex(targetRotation, items.length);
    
    if (index === currentActive) {
      // Already selected - could navigate to detail
      return;
    }

    // Calculate shortest rotation path
    let diff = index - currentActive;
    if (Math.abs(diff) > items.length / 2) {
      diff = diff > 0 ? diff - items.length : diff + items.length;
    }
    
    setTargetRotation((prev) => prev - diff * anglePerItem);
  }, [items.length, targetRotation]);

  // Navigate to prev/next
  const handlePrev = useCallback(() => {
    const anglePerItem = (Math.PI * 2) / items.length;
    setTargetRotation((prev) => prev + anglePerItem);
  }, [items.length]);

  const handleNext = useCallback(() => {
    const anglePerItem = (Math.PI * 2) / items.length;
    setTargetRotation((prev) => prev - anglePerItem);
  }, [items.length]);

  // Handle wheel
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!enableWheel) return;
    e.preventDefault();
    const delta = e.deltaY * 0.001;
    setTargetRotation((prev) => prev + delta);
  }, [enableWheel]);

  // Auto rotation
  useMemo(() => {
    if (!autoRotate) return;
    
    const interval = setInterval(() => {
      setTargetRotation((prev) => prev - autoRotateSpeed);
    }, 16);
    
    return () => clearInterval(interval);
  }, [autoRotate, autoRotateSpeed]);

  return (
    <div
      ref={containerRef}
      className={clsx("relative", className)}
      onWheel={handleWheel}
    >
      {/* 3D Canvas */}
      <div className="aspect-[16/10] w-full">
        <Canvas
          camera={{
            position: [0, 0, 6],
            fov: 50,
            near: 0.1,
            far: 100,
          }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <CarouselScene
              items={items}
              radius={radius}
              rotation={rotation}
              targetRotation={targetRotation}
              activeIndex={activeIndex}
              onSelect={handleSelect}
              onDrag={handleDrag}
              enableDrag={enableDrag}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Navigation Controls */}
      <NavigationControls
        onPrev={handlePrev}
        onNext={handleNext}
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
      />

      {/* Active Item Info */}
      {items[activeIndex] && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center">
          <p className="text-large text-text-primary">{items[activeIndex].title}</p>
          {items[activeIndex].year && (
            <p className="text-small text-text-muted mt-1">{items[activeIndex].year}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Carousel3D;
