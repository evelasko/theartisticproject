# Animated Wave Indicator Component

**Component Type:** Interactive Status Indicator / Toggle Feedback  
**Usage:** Sound toggle button, audio state visualization

---

## Overview

An animated sine wave indicator that provides visual feedback for audio/sound toggle states. The component consists of a seamlessly looping SVG wave that slides horizontally, creating the illusion of continuous motion. This elegant animation communicates audio state (playing/active) without relying on traditional speaker icons, aligning with the site's sophisticated visual language.

---

## Visual Design

### Element Composition

The wave indicator uses a clipping container technique with duplicated SVG elements:

| Layer | Description |
|-------|-------------|
| **Container (Outer)** | A clipping viewport that reveals only a portion of the wave |
| **Wrapper (Inner)** | A flex container holding two identical wave SVGs side-by-side |
| **Wave SVGs** | Identical sine wave paths that together form a seamless loop |

### Wave Shape

The wave is drawn using an SVG `path` element with quadratic Bézier curves:

| Property | Value |
|----------|-------|
| **Path Definition** | `M 0 50 Q 50 0, 100 50 T 200 50` |
| **Viewbox** | `0 0 200 100` |
| **Stroke Color** | `#ffffff` (white) |
| **Stroke Width** | `10` (units within viewbox) |
| **Fill** | `transparent` |

### Path Breakdown

The path creates a smooth sine wave:

1. `M 0 50` — Move to start point (left edge, vertical center)
2. `Q 50 0, 100 50` — Quadratic curve: control point at top, endpoint at center
3. `T 200 50` — Smooth continuation (mirror of previous curve, creating the "down" portion)

This results in one complete wave cycle that spans the full viewbox width.

---

## Animation Mechanics

### The Seamless Loop Technique

The animation achieves seamless looping through a clever duplication strategy:

1. **Two identical SVGs** are placed side-by-side within the wrapper
2. **The container** clips the view to show only one wave's width
3. **The wrapper slides left** by exactly 50% of its total width
4. When the animation completes, **it resets instantly** — but because both waves are identical, the reset is invisible

### Animation Keyframes

| Keyframe | Transform | Description |
|----------|-----------|-------------|
| **From (0%)** | `translateX(0)` | Start position |
| **To (100%)** | `translateX(-50%)` | Shifted left by half the wrapper width |

### Animation Properties

| Property | Value | Description |
|----------|-------|-------------|
| **Duration** | `2s` | Time for one complete loop |
| **Timing Function** | `linear` | Constant speed for smooth, mechanical motion |
| **Iteration Count** | `infinite` | Loops forever while active |
| **Direction** | `normal` | Always moves left-to-right |

---

## Size Specifications

The component uses viewport-relative units for proportional scaling:

### Container Dimensions (Clipping Viewport)

| Breakpoint | Width |
|------------|-------|
| **Desktop (≥992px)** | `1.4vw` |
| **Mobile (<992px)** | `7.2vw` |

### Wrapper Dimensions (Holds Both SVGs)

| Breakpoint | Width |
|------------|-------|
| **Desktop (≥992px)** | `2.8vw` |
| **Mobile (<992px)** | `14.4vw` |

The wrapper is exactly **2x the container width** to accommodate both wave SVGs while showing only one at a time.

### Visual Proportions

The visible wave height is determined by the SVG viewbox and stroke width, creating a wave that appears approximately as tall as the accompanying text label.

---

## Layout Context

### Sound Block Structure

The wave indicator appears within a "Sound" toggle block:

| Element | Role |
|---------|------|
| **Parent Link** | Interactive toggle (`sound-block` class) |
| **Wave Container** | The animated wave indicator |
| **Text Label** | "Sound" text with hover effect |

### Positioning

| Property | Desktop Value | Mobile Value |
|----------|---------------|--------------|
| **Container Position** | Absolute, top-right of navbar | Fixed position on screen |
| **Gap to Label** | `0.78vw` | `4vw` |

---

## States and Behavior

### Active State (Sound On)

When audio is enabled:
- The wrapper has the `animate-wave` class
- Animation runs continuously
- Wave moves smoothly from right to left

### Inactive State (Sound Off)

When audio is disabled:
- The `animate-wave` class is removed
- Animation stops
- Wave remains static
- An "OFF" label may be shown instead (hidden by default)

### Toggle Behavior

The component participates in the site's link-wrapper hover system:
- Parent link has `link-wrapper` attribute
- Text label has `link-hover` attribute
- On hover, text may receive subtle effects (coordinated with site-wide hover system)

---

## Technical Implementation Details

### Container Overflow

| Property | Value | Purpose |
|----------|-------|---------|
| **overflow** | `hidden` | Clips the wave to create the viewport effect |

### Wrapper Display

| Property | Value | Purpose |
|----------|-------|---------|
| **display** | `flex` | Aligns the two SVGs horizontally without gaps |

### SVG Rendering

| Property | Value | Purpose |
|----------|-------|---------|
| **preserveAspectRatio** | `none` | Allows the wave to stretch to fill container width |
| **width** | `100%` | Each SVG fills half the wrapper width |

### SVG Alignment Fix

A small negative margin may be applied to eliminate sub-pixel gaps between the two SVGs:

| Property | Value |
|----------|-------|
| **margin-right** | `-0.4px` |

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| **Desktop (≥992px)** | Visible in header, small scale |
| **Mobile (<992px)** | Hidden in header, shown in mobile menu |

The component has a mobile-specific variant (`is--mobile` modifier) that displays in a different location on smaller screens.

---

## Usage Locations

| Location | Context |
|----------|---------|
| **Header Navigation** | Sound toggle in top-right area (desktop) |
| **Mobile Menu Overlay** | Sound toggle within full-screen menu (mobile) |

---

## Relationship to Other Components

| Component | Relationship |
|-----------|--------------|
| **Link Hover System** | Parent element participates in coordinated hover effects |
| **Circle Indicator** | May appear alongside the wave in related toggle elements |

---

## Visual Reference

```
Anatomy:
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Container (visible viewport):                          │
│  ┌───────┐                                              │
│  │ ∿∿∿∿∿ │  ← Only this portion is visible             │
│  └───────┘                                              │
│                                                         │
│  Wrapper (slides left):                                 │
│  ┌───────────────┐                                      │
│  │ ∿∿∿∿∿ ∿∿∿∿∿   │  ← Two identical waves side-by-side │
│  └───────────────┘                                      │
│      ←←←                                                │
│    (slides)                                             │
│                                                         │
└─────────────────────────────────────────────────────────┘

Animation Sequence:
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  Frame 1 (0%):                                           │
│  Viewport: [Wave A visible]                              │
│  ┌───────┐                                               │
│  │ ∿∿∿∿∿ │ ∿∿∿∿∿                                         │
│  └───────┘                                               │
│    Wave A   Wave B                                       │
│                                                          │
│  Frame 2 (50%):                                          │
│  Viewport: [Transition]                                  │
│       ┌───────┐                                          │
│  ∿∿∿∿ │ ∿ ∿∿∿ │ ∿∿                                       │
│       └───────┘                                          │
│         A+B                                              │
│                                                          │
│  Frame 3 (100%):                                         │
│  Viewport: [Wave B visible, identical to Wave A]         │
│            ┌───────┐                                     │
│  ∿∿∿∿∿∿∿∿∿ │ ∿∿∿∿∿ │                                     │
│            └───────┘                                     │
│              Wave B                                      │
│                                                          │
│  → Instant reset to Frame 1 (seamless because A = B)     │
│                                                          │
└──────────────────────────────────────────────────────────┘

In Context (Sound Block):
┌─────────────────────────────────────────────────────────┐
│                                                         │
│        ∿∿∿  Sound                                       │
│         ↑                                               │
│    wave indicator                                       │
│                                                         │
└─────────────────────────────────────────────────────────┘

Wave Path Shape:
┌─────────────────────────────────────────────────────────┐
│                                                         │
│        ╭──────╮                                         │
│       ╱        ╲                                        │
│  ────╯          ╰────                                   │
│                                                         │
│  One complete sine wave cycle                           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Implementation Notes

### Why Two SVGs Instead of One Long SVG?

Using two identical SVGs that translate together creates a simpler, more maintainable animation than alternatives:
- A single long SVG would require complex path calculations for seamless looping
- Using CSS `background-repeat` wouldn't allow for stroke-based rendering
- The duplication approach works reliably across all browsers

### Linear Timing Function

The `linear` timing function is essential for this effect. Any easing would cause visible "hitches" at the loop point where the animation resets.

### Performance Considerations

- The animation uses `transform` (GPU-accelerated) rather than position properties
- SVG rendering is lightweight for this simple path
- `will-change: transform` may be applied for additional optimization

### Preserving Aspect Ratio

Setting `preserveAspectRatio="none"` on the SVGs allows them to stretch horizontally to fill their container while maintaining the stroke width. This ensures the wave height remains consistent regardless of container width.

---

## Accessibility Considerations

| Consideration | Approach |
|---------------|----------|
| **Decorative Element** | The wave is purely decorative; actual state should be communicated through accessible means (aria-pressed, text labels) |
| **Reduced Motion** | Consider pausing the animation for users who prefer reduced motion |
| **Color Contrast** | White wave on dark background provides sufficient contrast |

---

*Last Updated: January 2026*  
*Source: Analysis of <https://naya-studio-dubai.webflow.io>*
