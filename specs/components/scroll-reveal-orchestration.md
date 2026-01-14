# Scroll-Reveal Orchestration Component

**Component Type:** Animation Controller / Choreographed Reveal System  
**Usage:** Hero sections, section entrances, feature reveals, staggered content animation

---

## Overview

A sophisticated scroll-triggered animation system that orchestrates multiple elements to reveal in a carefully choreographed sequence when they enter the viewport. Rather than simple fade-ins, this component coordinates complex multi-element animations with staggered timing, varied directions, and layered reveals to create a cinematic entrance effect.

This component is inspired by the hero section of [Naya Studio Dubai](https://naya-studio-dubai.webflow.io/), which features an elaborate scroll-triggered choreography where:

- Background video elements fade and scale
- Typography elements reveal with character-level staggering
- Decorative elements (orbiting elements, floating ornaments) animate from various directions
- A central 3D rock/orchid composition floats into position
- UI elements (scroll indicator, navigation cues) appear with delayed timing

---

## Animation Choreography Pattern

### Typical Hero Reveal Sequence

The animation unfolds in **5 phases**, each with overlapping timing:

| Phase | Timing | Elements | Animation |
|-------|--------|----------|-----------|
| **1. Ambient** | 0ms | Background video/gradient | Fade in, subtle scale from 1.05→1.0 |
| **2. Foundation** | 200ms | Primary decorative elements | Float up from below, fade in |
| **3. Hero Content** | 400ms | Main headline/title | Character-level stagger reveal |
| **4. Supporting** | 700ms | Subheadline, body text | Line-by-line or word-by-word reveal |
| **5. Interactive** | 1000ms | CTAs, scroll indicator, UI | Fade in with subtle bounce |

### Timeline Visualization

```
TIME (ms)    0    200   400   600   800   1000  1200  1400
             │     │     │     │     │     │     │     │
Background   ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
Decoration   ░░░░░███████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
Headline     ░░░░░░░░░░░█████████░░░░░░░░░░░░░░░░░░░░░░░
Subheadline  ░░░░░░░░░░░░░░░░░░░░██████████░░░░░░░░░░░░░
CTA/UI       ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░███████████░░

Legend: █ = Active animation  ░ = Waiting
```

---

## Component Interface

### OrchestrationProvider

The main container that manages animation state:

```typescript
interface OrchestrationProviderProps {
  children: React.ReactNode;
  trigger?: 'viewport' | 'immediate' | 'manual';
  threshold?: number;           // Intersection threshold (0-1), default: 0.2
  rootMargin?: string;          // Intersection root margin
  once?: boolean;               // Only animate once, default: true
  disabled?: boolean;           // Disable animations (reduced motion)
  onStart?: () => void;         // Callback when animation starts
  onComplete?: () => void;      // Callback when all phases complete
  className?: string;
}
```

### AnimateIn

Individual animated elements:

```typescript
interface AnimateInProps {
  children: React.ReactNode;
  phase?: number;               // Which phase (1-5), determines base delay
  index?: number;               // Index within phase for stagger calculation
  delay?: number;               // Additional manual delay (ms)
  duration?: number;            // Animation duration (ms), default: 600
  animation?: AnimationType;    // Animation preset
  easing?: string;              // CSS/GSAP easing function
  from?: AnimationState;        // Starting state
  to?: AnimationState;          // Ending state
  stagger?: number;             // Stagger delay between children (ms)
  splitBy?: 'chars' | 'words' | 'lines' | 'none';  // Text splitting
  className?: string;
  as?: React.ElementType;       // HTML element to render
}

type AnimationType = 
  | 'fadeUp'
  | 'fadeDown'
  | 'fadeLeft'
  | 'fadeRight'
  | 'scaleUp'
  | 'scaleDown'
  | 'blur'
  | 'clipReveal'
  | 'charReveal'
  | 'lineReveal'
  | 'custom';

interface AnimationState {
  opacity?: number;
  x?: number;
  y?: number;
  scale?: number;
  rotate?: number;
  blur?: number;
  clipPath?: string;
}
```

---

## Animation Presets

### Built-in Animation Types

| Preset | From State | To State | Use Case |
|--------|------------|----------|----------|
| `fadeUp` | `{ opacity: 0, y: 40 }` | `{ opacity: 1, y: 0 }` | Body text, cards |
| `fadeDown` | `{ opacity: 0, y: -40 }` | `{ opacity: 1, y: 0 }` | Dropdown elements |
| `fadeLeft` | `{ opacity: 0, x: 40 }` | `{ opacity: 1, x: 0 }` | Side panels |
| `fadeRight` | `{ opacity: 0, x: -40 }` | `{ opacity: 1, x: 0 }` | Navigation items |
| `scaleUp` | `{ opacity: 0, scale: 0.8 }` | `{ opacity: 1, scale: 1 }` | Cards, modals |
| `scaleDown` | `{ opacity: 0, scale: 1.2 }` | `{ opacity: 1, scale: 1 }` | Hero backgrounds |
| `blur` | `{ opacity: 0, blur: 20 }` | `{ opacity: 1, blur: 0 }` | Decorative elements |
| `clipReveal` | `{ clipPath: 'inset(0 50% 0 50%)' }` | `{ clipPath: 'inset(0 0% 0 0%)' }` | Headlines |
| `charReveal` | Per-character stagger | — | Display typography |
| `lineReveal` | Per-line stagger with clip | — | Paragraphs |

### Easing Functions

| Easing | CSS Value | Use Case |
|--------|-----------|----------|
| `smooth` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default, most elements |
| `smoothOut` | `cubic-bezier(0, 0, 0.2, 1)` | Exit animations |
| `smoothIn` | `cubic-bezier(0.4, 0, 1, 1)` | Enter animations |
| `bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful CTAs |
| `elastic` | `cubic-bezier(0.68, -0.55, 0.27, 1.55)` | Decorative accents |
| `sharp` | `cubic-bezier(0.4, 0, 0.6, 1)` | Quick reveals |

---

## Technical Architecture

### Recommended Tech Stack

| Technology | Purpose | Rationale |
|------------|---------|-----------|
| **Framer Motion** | Primary animation library | Excellent React integration, declarative API |
| **Intersection Observer API** | Viewport detection | Native, performant, widely supported |
| **GSAP** (optional) | Complex choreography | Superior timeline control, ScrollTrigger |
| **CSS Custom Properties** | Animation timing | Easy theming, reduced-motion support |

### Alternative: GSAP Implementation

For more complex choreography with precise timeline control:

| GSAP Feature | Purpose |
|--------------|---------|
| `gsap.timeline()` | Sequential animation orchestration |
| `ScrollTrigger` | Scroll-based triggering |
| `SplitText` | Character/word/line splitting |
| `stagger` | Built-in stagger calculations |

---

## HTML Structure

### React/Framer Motion Approach

```tsx
<OrchestrationProvider threshold={0.3} once>
  {/* Phase 1: Background */}
  <AnimateIn phase={1} animation="scaleDown" duration={1200}>
    <video className="hero-bg" autoPlay muted loop playsInline>
      <source src="/videos/hero-blur.mp4" type="video/mp4" />
    </video>
  </AnimateIn>

  {/* Phase 2: Decorative elements */}
  <AnimateIn phase={2} animation="fadeUp" delay={100}>
    <div className="floating-ornament floating-ornament--left" />
  </AnimateIn>
  <AnimateIn phase={2} animation="fadeUp" delay={200}>
    <div className="floating-ornament floating-ornament--right" />
  </AnimateIn>
  <AnimateIn phase={2} animation="blur" delay={300}>
    <video className="hero-3d-element" autoPlay muted loop playsInline>
      <source src="/videos/orchid-rock.webm" type="video/webm" />
    </video>
  </AnimateIn>

  {/* Phase 3: Main headline */}
  <AnimateIn 
    phase={3} 
    animation="charReveal" 
    splitBy="chars"
    stagger={30}
    as="h1"
    className="hero-title"
  >
    design that blooms into emotion
  </AnimateIn>

  {/* Phase 4: Supporting text */}
  <AnimateIn 
    phase={4} 
    animation="fadeUp"
    splitBy="lines"
    stagger={100}
    className="hero-description"
  >
    We create immersive floral design for weddings, brand events, 
    and personal moments.
  </AnimateIn>

  {/* Phase 5: Interactive elements */}
  <AnimateIn phase={5} animation="fadeUp" easing="bounce">
    <a href="#services" className="hero-cta">
      Our Services
    </a>
  </AnimateIn>
  <AnimateIn phase={5} animation="fadeUp" delay={200}>
    <ScrollIndicator />
  </AnimateIn>
</OrchestrationProvider>
```

### GSAP Timeline Approach

```tsx
function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        once: true,
      },
    });

    // Phase 1: Background
    tl.from('.hero-bg', {
      opacity: 0,
      scale: 1.1,
      duration: 1.2,
      ease: 'power2.out',
    });

    // Phase 2: Decorative (overlapping with Phase 1)
    tl.from('.floating-ornament', {
      opacity: 0,
      y: 60,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.8');

    tl.from('.hero-3d-element', {
      opacity: 0,
      filter: 'blur(20px)',
      duration: 1,
      ease: 'power2.out',
    }, '-=0.6');

    // Phase 3: Headline with SplitText
    const splitTitle = new SplitText('.hero-title', { type: 'chars' });
    tl.from(splitTitle.chars, {
      opacity: 0,
      y: 40,
      rotateX: -90,
      stagger: 0.03,
      duration: 0.6,
      ease: 'back.out(1.7)',
    }, '-=0.4');

    // Phase 4: Description
    tl.from('.hero-description', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.3');

    // Phase 5: CTA and UI
    tl.from('.hero-cta', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'back.out(2)',
    }, '-=0.2');

    tl.from('.scroll-indicator', {
      opacity: 0,
      y: 10,
      duration: 0.4,
      ease: 'power2.out',
    }, '-=0.3');

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="hero-section">
      {/* ... content ... */}
    </section>
  );
}
```

---

## Phase Configuration

### Default Phase Timing

| Phase | Base Delay | Description |
|-------|------------|-------------|
| 1 | 0ms | Ambient/Background elements |
| 2 | 200ms | Foundation/Decorative elements |
| 3 | 400ms | Primary content (headline) |
| 4 | 700ms | Secondary content (body text) |
| 5 | 1000ms | Interactive elements (CTAs) |

### Stagger Calculation

Within each phase, elements are staggered based on their index:

```
element_delay = phase_base_delay + (index * stagger_increment)

Example (Phase 3, stagger 30ms):
  - Element 0: 400 + (0 * 30) = 400ms
  - Element 1: 400 + (1 * 30) = 430ms
  - Element 2: 400 + (2 * 30) = 460ms
```

### Character-Level Stagger

For text with `splitBy="chars"`:

```
char_delay = base_delay + (char_index * char_stagger)

Example ("HELLO", base 400ms, stagger 30ms):
  H: 400ms
  E: 430ms
  L: 460ms
  L: 490ms
  O: 520ms
```

---

## Animation Properties

### Transform Properties

| Property | CSS | Range | Description |
|----------|-----|-------|-------------|
| `x` | `translateX` | -100px to 100px | Horizontal offset |
| `y` | `translateY` | -100px to 100px | Vertical offset |
| `scale` | `scale` | 0.5 to 1.5 | Size multiplier |
| `rotate` | `rotate` | -180deg to 180deg | Rotation angle |
| `rotateX` | `rotateX` | -90deg to 90deg | 3D X-axis rotation |
| `rotateY` | `rotateY` | -90deg to 90deg | 3D Y-axis rotation |

### Visual Properties

| Property | CSS | Range | Description |
|----------|-----|-------|-------------|
| `opacity` | `opacity` | 0 to 1 | Transparency |
| `blur` | `filter: blur()` | 0px to 30px | Blur amount |
| `clipPath` | `clip-path` | Various | Masking/clipping |
| `brightness` | `filter: brightness()` | 0 to 2 | Brightness |

### Common Starting States

| Element Type | Recommended From State |
|--------------|----------------------|
| Background video | `{ opacity: 0, scale: 1.1 }` |
| Floating decorations | `{ opacity: 0, y: 60, blur: 10 }` |
| Headlines | `{ opacity: 0, y: 40, rotateX: -20 }` |
| Body text | `{ opacity: 0, y: 30 }` |
| CTAs | `{ opacity: 0, y: 20, scale: 0.95 }` |
| Scroll indicator | `{ opacity: 0, y: 10 }` |

---

## Responsive Considerations

### Breakpoint Adjustments

| Aspect | Mobile | Tablet | Desktop |
|--------|--------|--------|---------|
| Y offset distance | 30px | 40px | 60px |
| Stagger delay | 20ms | 30ms | 40ms |
| Total duration | Shorter | Medium | Full |
| Character stagger | Skip or faster | Medium | Full |

### Mobile Optimization

```typescript
const getAnimationConfig = (isMobile: boolean) => ({
  yOffset: isMobile ? 30 : 60,
  stagger: isMobile ? 20 : 40,
  skipCharStagger: isMobile,
  reducedDuration: isMobile ? 0.7 : 1,
});
```

---

## Accessibility

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  .animate-in {
    animation: none !important;
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
    filter: none !important;
  }
}
```

### React Implementation

```typescript
function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  return prefersReduced;
}

// In OrchestrationProvider
const reducedMotion = useReducedMotion();
if (reducedMotion) {
  // Render children immediately without animation
  return <>{children}</>;
}
```

### Screen Reader Considerations

| Requirement | Implementation |
|-------------|----------------|
| Content available immediately | Server-render all content |
| No content hidden by animation | Use `opacity` not `visibility: hidden` |
| Focus management | Don't trap focus during animation |
| Announce completion | Optional `aria-live` for key reveals |

---

## Performance Optimization

### Best Practices

| Optimization | Implementation |
|--------------|----------------|
| **GPU Acceleration** | Use `transform` and `opacity` only |
| **Will-Change** | Apply to animating elements |
| **Composite Layers** | Avoid layout-triggering properties |
| **Lazy Observer** | Disconnect after animation completes |
| **Batch Updates** | Use `requestAnimationFrame` |

### Avoid These Properties

| Property | Issue | Alternative |
|----------|-------|-------------|
| `width`/`height` | Layout thrashing | `transform: scale()` |
| `top`/`left` | Layout thrashing | `transform: translate()` |
| `margin`/`padding` | Layout thrashing | `transform: translate()` |
| `box-shadow` (animated) | Paint expensive | Pseudo-element with opacity |

### CSS for GPU Acceleration

```css
.animate-in {
  will-change: transform, opacity, filter;
  backface-visibility: hidden;
  transform: translateZ(0); /* Force composite layer */
}

/* Remove will-change after animation */
.animate-in.animated {
  will-change: auto;
}
```

---

## Dependencies

### Framer Motion Approach

```json
{
  "dependencies": {
    "framer-motion": "^11.0.0"
  }
}
```

### GSAP Approach

```json
{
  "dependencies": {
    "gsap": "^3.12.0"
  }
}
```

**Note:** GSAP's `SplitText` and `ScrollTrigger` require a GSAP membership for commercial use.

### Lightweight Alternative (CSS-only)

No dependencies required—use CSS animations with Intersection Observer:

```typescript
// Minimal 30-line implementation
const useIntersectionObserver = (
  callback: (isVisible: boolean) => void,
  options?: IntersectionObserverInit
) => {
  const ref = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => callback(entry.isIntersecting),
      { threshold: 0.2, ...options }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [callback, options]);
  
  return ref;
};
```

---

## Implementation Phases

### Phase 1: Core Infrastructure

| Task | Description |
|------|-------------|
| Create OrchestrationProvider | Context for animation state |
| Implement Intersection Observer | Viewport detection |
| Build phase timing system | Delay calculations |
| Add reduced motion support | Accessibility |

### Phase 2: Animation Components

| Task | Description |
|------|-------------|
| Create AnimateIn component | Individual animated wrapper |
| Implement animation presets | fadeUp, scaleUp, etc. |
| Add easing options | CSS/spring easings |
| Build stagger calculations | Index-based delays |

### Phase 3: Text Animations

| Task | Description |
|------|-------------|
| Implement text splitting | chars, words, lines |
| Create charReveal preset | Per-character animation |
| Create lineReveal preset | Per-line clip reveal |
| Handle responsive splitting | Mobile optimization |

### Phase 4: Integration

| Task | Description |
|------|-------------|
| Hero section implementation | Full choreography |
| Section reveal patterns | Reusable section animations |
| Performance optimization | Will-change, cleanup |
| Testing & refinement | Cross-browser, devices |

---

## Testing Checklist

| Test Case | Expected Behavior |
|-----------|-------------------|
| Initial page load | Elements hidden until scroll trigger |
| Scroll to trigger point | Animation sequence begins |
| Phase timing | Phases execute in order with delays |
| Stagger within phase | Elements animate sequentially |
| Character stagger | Letters reveal individually |
| Reduced motion | Elements visible without animation |
| Fast scroll past | Animation still plays smoothly |
| Scroll back up (once: true) | No re-animation |
| Mobile viewport | Shorter distances, faster timing |
| Multiple sections | Each triggers independently |
| Performance (60fps) | No dropped frames during animation |

---

## Visual Reference

```
HERO SECTION ANIMATION CHOREOGRAPHY

TIME →                                                    
                                                          
Phase 1 (0ms) ─────────────────────────────────────────  
┌─────────────────────────────────────────────────────┐  
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │  
│  ░░░░░░░░░ BACKGROUND VIDEO FADES IN ░░░░░░░░░░░░░  │  
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │  
└─────────────────────────────────────────────────────┘  
                                                          
Phase 2 (200ms) ───────────────────────────────────────  
┌─────────────────────────────────────────────────────┐  
│       ↑               ↑                             │  
│       │               │    ← Decorative elements    │  
│    ╭─────╮         ╭─────╮    float up              │  
│    │ ✿ ○ │         │ ○ ✿ │                          │  
│    ╰─────╯         ╰─────╯                          │  
│                                                     │  
│              ┌───────────┐                          │  
│              │   🪨🌸    │  ← 3D element blurs in   │  
│              └───────────┘                          │  
└─────────────────────────────────────────────────────┘  
                                                          
Phase 3 (400ms) ───────────────────────────────────────  
┌─────────────────────────────────────────────────────┐  
│                                                     │  
│         D→E→S→I→G→N→ →T→H→A→T→ →B→L→O→O→M→S        │  
│                 ↑                                   │  
│         Characters reveal with stagger             │  
│                                                     │  
└─────────────────────────────────────────────────────┘  
                                                          
Phase 4 (700ms) ───────────────────────────────────────  
┌─────────────────────────────────────────────────────┐  
│                                                     │  
│    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    │  
│    We create immersive floral design...            │ ← Line 1
│    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    │  
│    for weddings, brand events...                   │ ← Line 2
│    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    │  
│                                                     │  
└─────────────────────────────────────────────────────┘  
                                                          
Phase 5 (1000ms) ──────────────────────────────────────  
┌─────────────────────────────────────────────────────┐  
│                                                     │  
│            ╭─────────────────────╮                  │  
│            │   Our Services  →   │  ← CTA bounces   │  
│            ╰─────────────────────╯                  │  
│                                                     │  
│                      ↓                              │  
│                   Scroll                            │ ← Indicator  
│                      ↓                              │    fades in
│                                                     │  
└─────────────────────────────────────────────────────┘  
```

---

## Related Components

| Component | Relationship |
|-----------|--------------|
| **OrnateText** | Headline text within reveal animation |
| **AnimatedUnderline** | CTA link styling |
| **ScrollIndicator** | Animated scroll prompt |
| **Video Background** | Background media handling |
| **3D Carousel** | May use same orchestration pattern |

---

## External Resources

| Resource | URL | Purpose |
|----------|-----|---------|
| Framer Motion | https://www.framer.com/motion/ | React animation library |
| GSAP ScrollTrigger | https://gsap.com/docs/v3/Plugins/ScrollTrigger/ | Scroll animation |
| Intersection Observer | https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API | Native viewport detection |
| Codrops Tutorials | https://tympanus.net/codrops/ | Advanced animation techniques |

---

*Last Updated: January 2026*  
*Source: Analysis of <https://naya-studio-dubai.webflow.io>*
