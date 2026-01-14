# 3D Circular Carousel Component

**Component Type:** Interactive Gallery / Portfolio Showcase  
**Usage:** Portfolio sections, project galleries, featured work displays

---

## Overview

A visually striking 3D carousel that positions project cards in a circular arrangement within 3D space. Cards rotate around a central axis, creating depth and perspective as users navigate through the portfolio. The carousel combines Three.js for 3D rendering with smooth animation transitions, creating an immersive browsing experience for showcasing work.

This component draws direct inspiration from the portfolio section of the [Naya Studio Dubai](https://naya-studio-dubai.webflow.io/) website, which uses a custom Three.js implementation with dynamic radius calculation based on slide count.

---

## Visual Behavior

### 3D Space Arrangement

| Aspect | Description |
|--------|-------------|
| **Card Positioning** | Cards are arranged in a circular pattern around a central Y-axis |
| **Depth Perception** | Cards closer to the viewer appear larger; distant cards appear smaller and slightly faded |
| **Active Card** | The front-facing card is fully visible and centered |
| **Perspective** | Uses perspective projection to create realistic depth |
| **Rotation Axis** | Y-axis (vertical) — cards rotate horizontally around the center |

### Card Behavior by Position

| Position | Scale | Opacity | Z-Index | Blur |
|----------|-------|---------|---------|------|
| **Front (Active)** | 100% | 100% | Highest | None |
| **Adjacent (±1)** | ~85% | ~90% | Medium | Subtle |
| **Side (±2)** | ~70% | ~70% | Lower | Light |
| **Back** | ~60% | ~50% | Lowest | Medium |

---

## Component Interface

The `Carousel3D` component accepts the following props:

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `items` | `CarouselItem[]` | Yes | — | Array of items to display in the carousel |
| `autoRotate` | `boolean` | No | `false` | Enable automatic rotation |
| `autoRotateSpeed` | `number` | No | `0.005` | Speed of automatic rotation (radians per frame) |
| `radius` | `number \| 'auto'` | No | `'auto'` | Carousel radius; 'auto' calculates based on item count |
| `perspective` | `number` | No | `1000` | CSS perspective value in pixels |
| `enableDrag` | `boolean` | No | `true` | Allow drag/swipe to rotate carousel |
| `enableWheel` | `boolean` | No | `true` | Allow mouse wheel to rotate carousel |
| `friction` | `number` | No | `0.9` | Velocity decay for momentum (0-1) |
| `onSlideChange` | `(index: number) => void` | No | — | Callback when active slide changes |
| `className` | `string` | No | — | Additional classes for the container |

### CarouselItem Type

```typescript
interface CarouselItem {
  id: string;
  image: string;
  title: string;
  year?: string;
  category?: string;
  href?: string;
}
```

---

## Technical Architecture

### Recommended Tech Stack

| Technology | Purpose | Rationale |
|------------|---------|-----------|
| **Three.js** | 3D rendering engine | Industry standard for WebGL, excellent React integration via @react-three/fiber |
| **@react-three/fiber** | React renderer for Three.js | Declarative 3D scenes, hooks-based API, excellent DX |
| **@react-three/drei** | Three.js helpers | Pre-built components (Image, useScroll, etc.) |
| **Framer Motion** | 2D UI animations | Navigation controls, overlays, transitions |
| **maath** | Math utilities | Easing functions for smooth interpolation |

### Alternative Approaches

| Approach | Pros | Cons | Recommendation |
|----------|------|------|----------------|
| **Three.js + R3F** | True 3D, best performance, rich effects | Learning curve, bundle size | ✅ Recommended |
| **CSS 3D Transforms** | No dependencies, simple setup | Limited effects, browser quirks | Good for simpler cases |
| **GSAP + CSS** | Excellent timeline control | Not true 3D, complex math | Alternative option |
| **Swiper.js 3D** | Easy setup, touch support | Limited customization | Quick prototype only |

---

## Three.js Implementation Strategy

### Scene Setup

| Element | Configuration |
|---------|---------------|
| **Camera** | `PerspectiveCamera` with FOV ~50°, positioned at z: 5-8 |
| **Lighting** | Ambient light + subtle directional for card highlights |
| **Background** | Transparent (let page background show through) |
| **Controls** | Custom drag/wheel handlers (not OrbitControls) |

### Geometry Calculation

The carousel uses trigonometry to position cards in a circle:

```
For n items, each card at index i:
  angle = (i / n) * 2π + currentRotation
  x = radius * sin(angle)
  z = radius * cos(angle)
  y = 0 (cards on horizontal plane)
```

### Dynamic Radius Formula

Based on the reference implementation's console output (`8 slides, radius = 2.941`):

```
radius = baseRadius * (1 + (itemCount - 6) * scaleFactor)

Where:
  baseRadius ≈ 2.5
  scaleFactor ≈ 0.1
```

| Item Count | Calculated Radius |
|------------|-------------------|
| 4 | ~2.3 |
| 6 | ~2.5 |
| 8 | ~2.9 |
| 10 | ~3.3 |
| 12 | ~3.7 |

---

## Animation System

### Rotation Mechanics

| Interaction | Behavior |
|-------------|----------|
| **Drag** | Direct rotation mapping with sensitivity multiplier |
| **Release** | Momentum continues with friction decay |
| **Wheel** | Discrete rotation with smooth interpolation |
| **Auto-Rotate** | Continuous slow rotation when idle |
| **Snap** | Optional snap-to-card on interaction end |

### Animation Properties

| Property | Value | Purpose |
|----------|-------|---------|
| **Friction** | `0.9` | Velocity decay per frame (lower = more friction) |
| **Wheel Sensitivity** | `0.6` | Rotation per wheel delta |
| **Drag Sensitivity** | `1.0` | Rotation per pixel dragged |
| **Interpolation** | `damp` or `lerp` | Smooth value transitions |
| **Frame Rate** | Independent | Use delta time for consistency |

### Card Transitions

Each card animates these properties based on its angle from front:

| Property | Animation Method |
|----------|------------------|
| **Scale** | `lerp` toward target scale based on z-position |
| **Opacity** | `damp` toward target opacity |
| **Blur** | CSS filter blur based on distance |
| **Position** | Recalculated each frame from angle |

---

## CSS 3D Transform Alternative

For simpler implementations without Three.js:

### Transform Strategy

```css
.carousel-container {
  perspective: 1000px;
  perspective-origin: center center;
}

.carousel-track {
  transform-style: preserve-3d;
  transition: transform 0.5s ease-out;
}

.carousel-card {
  position: absolute;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}

/* Card positioning (calculated via JS) */
.carousel-card:nth-child(1) {
  transform: rotateY(0deg) translateZ(300px);
}
.carousel-card:nth-child(2) {
  transform: rotateY(45deg) translateZ(300px);
}
/* ... etc for each card */
```

### CSS Variables for Dynamic Values

| Variable | Purpose |
|----------|---------|
| `--carousel-radius` | translateZ distance |
| `--carousel-rotation` | Current rotation angle |
| `--card-angle` | Individual card's angle offset |

---

## HTML Structure

### Three.js / R3F Approach

```tsx
<div className="carousel-3d-container">
  <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
    <ambientLight intensity={0.8} />
    <CarouselGroup items={items} rotation={rotation}>
      {items.map((item, i) => (
        <CarouselCard
          key={item.id}
          item={item}
          index={i}
          total={items.length}
          radius={radius}
        />
      ))}
    </CarouselGroup>
  </Canvas>
  
  {/* Navigation UI (outside Canvas, in 2D) */}
  <div className="carousel-controls">
    <button className="carousel-prev" aria-label="Previous slide">
      <ArrowIcon direction="left" />
    </button>
    <button className="carousel-next" aria-label="Next slide">
      <ArrowIcon direction="right" />
    </button>
  </div>
  
  {/* Optional: Slide indicators */}
  <div className="carousel-indicators">
    {items.map((_, i) => (
      <button
        key={i}
        className={`indicator ${i === activeIndex ? 'active' : ''}`}
        aria-label={`Go to slide ${i + 1}`}
      />
    ))}
  </div>
</div>
```

### CSS 3D Transform Approach

```html
<div class="carousel-3d-container">
  <div class="carousel-viewport">
    <div class="carousel-track" style="--rotation: 0deg">
      <div class="carousel-card" data-index="0">
        <img src="..." alt="..." />
        <div class="card-overlay">
          <span class="card-title">Project Name</span>
          <span class="card-year">2024</span>
        </div>
      </div>
      <!-- More cards... -->
    </div>
  </div>
  
  <div class="carousel-controls">
    <button class="carousel-prev" aria-label="Previous slide">←</button>
    <button class="carousel-next" aria-label="Next slide">→</button>
  </div>
</div>
```

---

## Card Design

### Card Structure

| Element | Purpose |
|---------|---------|
| **Image Container** | Holds the project image with aspect ratio |
| **Image** | Project thumbnail/cover image |
| **Overlay** | Semi-transparent gradient for text legibility |
| **Title** | Project name |
| **Metadata** | Year, category, or other details |

### Card Styling

| Property | Value |
|----------|-------|
| **Aspect Ratio** | 3:4 or 4:5 (portrait orientation) |
| **Border Radius** | `8px` - `12px` |
| **Shadow** | Subtle drop shadow for depth |
| **Hover Effect** | Slight scale increase on front card |

### Card Dimensions (Reference)

| Viewport | Card Width | Card Height |
|----------|------------|-------------|
| Mobile | ~200px | ~280px |
| Tablet | ~280px | ~390px |
| Desktop | ~350px | ~490px |

---

## Interaction Patterns

### Mouse/Touch Interactions

| Interaction | Action |
|-------------|--------|
| **Drag Left** | Rotate carousel clockwise (next items) |
| **Drag Right** | Rotate carousel counter-clockwise (previous items) |
| **Click Card** | Navigate to project (if front) or rotate to front |
| **Wheel Up** | Rotate to next item |
| **Wheel Down** | Rotate to previous item |

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `ArrowLeft` | Previous slide |
| `ArrowRight` | Next slide |
| `Home` | First slide |
| `End` | Last slide |
| `Enter` | Activate/navigate to current slide |

### Touch Gestures

| Gesture | Action |
|---------|--------|
| **Swipe Left** | Next items |
| **Swipe Right** | Previous items |
| **Tap** | Select card (if not front) or navigate (if front) |

---

## Performance Optimization

### Rendering Optimization

| Technique | Implementation |
|-----------|----------------|
| **Texture Compression** | Use compressed textures for card images |
| **LOD (Level of Detail)** | Lower resolution for distant cards |
| **Frustum Culling** | Don't render cards behind camera |
| **Instance Rendering** | Share geometry for identical card shapes |

### Image Optimization

| Aspect | Strategy |
|--------|----------|
| **Format** | WebP with JPEG fallback |
| **Loading** | Lazy load off-screen cards |
| **Sizes** | Responsive srcset for different viewports |
| **Placeholder** | Low-quality blur-up or solid color |

### Animation Performance

| Consideration | Solution |
|---------------|----------|
| **Frame Rate** | Use `requestAnimationFrame` or R3F's `useFrame` |
| **Delta Time** | Frame-rate independent animations |
| **GPU Acceleration** | `will-change: transform` for CSS approach |
| **Reduced Motion** | Respect `prefers-reduced-motion` |

---

## Responsive Behavior

### Breakpoint Adjustments

| Breakpoint | Radius | Card Scale | Visible Cards |
|------------|--------|------------|---------------|
| Mobile (<640px) | Smaller | 80% | ~3 visible |
| Tablet (640-1024px) | Medium | 90% | ~5 visible |
| Desktop (>1024px) | Full | 100% | ~7 visible |

### Mobile Considerations

| Aspect | Adaptation |
|--------|------------|
| **Touch Area** | Larger hit targets for controls |
| **Swipe** | Primary navigation method |
| **Card Size** | Proportionally smaller |
| **Depth Effect** | Reduced for clarity |

---

## Accessibility

### ARIA Implementation

```html
<div 
  role="region" 
  aria-roledescription="carousel"
  aria-label="Project gallery"
>
  <div 
    role="group" 
    aria-roledescription="slide"
    aria-label="1 of 8"
    aria-hidden="false" <!-- Only for active slide -->
  >
    <!-- Card content -->
  </div>
</div>
```

### Focus Management

| Requirement | Implementation |
|-------------|----------------|
| **Focus Visible** | Clear focus indicator on controls |
| **Tab Order** | Controls → Active card → Next control |
| **Skip Link** | Option to skip carousel |
| **Live Region** | Announce slide changes |

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .carousel-track {
    transition: none;
  }
  
  .carousel-card {
    transition: opacity 0.2s ease;
    /* Disable 3D transforms, show as flat grid */
  }
}
```

---

## Dependencies

### Required Packages (Three.js Approach)

```json
{
  "dependencies": {
    "three": "^0.160.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.92.0",
    "maath": "^0.10.0"
  }
}
```

### Optional Packages

```json
{
  "dependencies": {
    "framer-motion": "^10.16.0",  // For 2D UI animations
    "@use-gesture/react": "^10.3.0"  // Enhanced gesture handling
  }
}
```

### Bundle Size Considerations

| Package | Size (gzipped) | Notes |
|---------|----------------|-------|
| three | ~150KB | Core 3D engine |
| @react-three/fiber | ~40KB | React reconciler |
| @react-three/drei | Tree-shakeable | Import only what's needed |
| maath | ~5KB | Math utilities |

---

## Implementation Phases

### Phase 1: Basic Structure

| Task | Description |
|------|-------------|
| Set up Canvas and camera | Basic Three.js scene |
| Position cards in circle | Static arrangement |
| Basic card component | Image + overlay |
| Calculate dynamic radius | Based on item count |

### Phase 2: Rotation & Animation

| Task | Description |
|------|-------------|
| Implement rotation state | Track current angle |
| Add drag interaction | Mouse/touch to rotate |
| Add momentum physics | Friction-based decay |
| Smooth interpolation | Lerp/damp transitions |

### Phase 3: Visual Polish

| Task | Description |
|------|-------------|
| Scale based on position | Depth-based sizing |
| Opacity gradient | Fade distant cards |
| Blur effect | CSS filter for depth |
| Card hover states | Interactive feedback |

### Phase 4: Controls & UX

| Task | Description |
|------|-------------|
| Navigation buttons | Prev/Next controls |
| Keyboard navigation | Arrow key support |
| Touch gestures | Swipe handling |
| Auto-rotate option | Idle rotation |

### Phase 5: Optimization & A11y

| Task | Description |
|------|-------------|
| Performance tuning | Optimize render loop |
| Responsive behavior | Breakpoint adjustments |
| ARIA implementation | Screen reader support |
| Reduced motion | Alternative display |

---

## Testing Checklist

| Test Case | Expected Behavior |
|-----------|-------------------|
| Drag rotation | Smooth rotation following pointer |
| Momentum | Continues rotating after release with decay |
| Wheel navigation | Smooth rotation on scroll |
| Button navigation | Rotate to next/previous card |
| Keyboard navigation | Arrow keys rotate carousel |
| Card click (front) | Navigate to project |
| Card click (side) | Rotate card to front |
| Responsive resize | Carousel adapts to viewport |
| Reduced motion | Flat grid or minimal animation |
| Screen reader | Announces slide changes |
| Touch devices | Swipe works smoothly |
| Performance | 60fps during animations |

---

## Code Examples

### Basic useFrame Hook (R3F)

```tsx
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';

function CarouselGroup({ children, targetRotation }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth rotation interpolation
      easing.damp(
        groupRef.current.rotation,
        'y',
        targetRotation,
        0.25,
        delta
      );
    }
  });
  
  return <group ref={groupRef}>{children}</group>;
}
```

### Card Position Calculation

```tsx
function getCardTransform(index: number, total: number, radius: number) {
  const angle = (index / total) * Math.PI * 2;
  
  return {
    position: [
      Math.sin(angle) * radius,  // x
      0,                          // y
      Math.cos(angle) * radius   // z
    ] as [number, number, number],
    rotation: [0, -angle, 0] as [number, number, number]
  };
}
```

### Drag Handler

```tsx
import { useDrag } from '@use-gesture/react';

function useCarouselDrag(onRotate: (delta: number) => void) {
  return useDrag(
    ({ movement: [mx], velocity: [vx], down }) => {
      const sensitivity = 0.005;
      onRotate(mx * sensitivity);
      
      if (!down && Math.abs(vx) > 0.1) {
        // Apply momentum
        applyMomentum(vx * 0.1);
      }
    },
    { axis: 'x' }
  );
}
```

---

## Visual Reference

```
Top-Down View (Bird's Eye):

                    ┌─────┐
                    │  5  │  (back, smallest)
                    └─────┘
              ╱               ╲
         ┌──────┐         ┌──────┐
         │  4   │         │  6   │  (sides)
         └──────┘         └──────┘
        ╱                         ╲
   ┌───────┐                   ┌───────┐
   │   3   │                   │   7   │  (adjacent)
   └───────┘                   └───────┘
        ╲                         ╱
         ┌─────────────────────────┐
         │                         │
         │           1             │  (FRONT - Active)
         │                         │
         └─────────────────────────┘
                    ▲
                    │
               [VIEWER]


Side View (Perspective):

    ══════════════════════════════════════
         ┌───┐   ┌───┐   ┌─────┐   ┌───┐   ┌───┐
         │ 3 │   │ 2 │   │  1  │   │ 8 │   │ 7 │
         └───┘   └───┘   │     │   └───┘   └───┘
           ↑       ↑     │     │     ↑       ↑
         small   med     │FRONT│   med    small
                         └─────┘
                           ↑
                         LARGE
    ══════════════════════════════════════
              ← DRAG TO ROTATE →
```

---

## Related Components

| Component | Relationship |
|-----------|--------------|
| **Project Card** | Individual card design within carousel |
| **Image Loader** | Handles progressive image loading |
| **Navigation Arrows** | Reusable arrow button component |
| **Section Header** | Pairs with carousel for section title |

---

## External Resources

| Resource | URL | Purpose |
|----------|-----|---------|
| Three.js Docs | https://threejs.org/docs/ | Core 3D concepts |
| R3F Documentation | https://docs.pmnd.rs/react-three-fiber | React integration |
| Drei Components | https://github.com/pmndrs/drei | Pre-built helpers |
| Codrops Tutorial | https://tympanus.net/codrops/2025/12/14/the-mechanics-behind-a-scroll-driven-circular-3d-carousel-with-three-js-and-post-processing/ | Implementation guide |

---

*Last Updated: January 2026*  
*Source: Analysis of <https://naya-studio-dubai.webflow.io>*
