# Orbital Border Component

**Component Type:** Interactive Hover Effect / Visual Accent  
**Usage:** Close button decoration, icon button enhancement

---

## Overview

A large circular border element that creates a dramatic orbital rotation effect around an icon button. The component consists of an oversized circular ring positioned off-center from its container, which rotates on hover to create the visual impression of a planet's ring or orbit sweeping around the central icon. This effect adds depth and sophistication to close buttons and similar icon-based interactions.

---

## Visual Design

### Element Composition

The orbital border is a two-layer structure:

| Layer | Description |
|-------|-------------|
| **Wrapper** | A container that controls the rotation transform and clips overflow |
| **Border Circle** | A large circular element with a semi-transparent border, positioned to extend beyond the wrapper bounds |

### Border Appearance

| Property | Value |
|----------|-------|
| **Border Style** | Solid |
| **Border Width** | `0.1vw` (desktop) / `0.26vw` (mobile) |
| **Border Color** | `rgba(255, 255, 255, 0.16)` — semi-transparent white |
| **Border Radius** | `50%` — perfect circle |
| **Fill** | None (transparent) |

### Color Rationale

The very low opacity (`16%`) creates a subtle, ethereal ring that doesn't compete with the central icon but adds visual richness on interaction.

---

## Size Specifications

### Desktop (≥992px)

| Element | Width | Height |
|---------|-------|--------|
| **Border Circle** | `25vw` | `25vw` |
| **Parent Container** | `24vw` | `24vw` |

### Mobile (<992px)

| Element | Width | Height |
|---------|-------|--------|
| **Border Circle** | `54vw` | `54vw` |
| **Parent Container** | `36vw` | `36vw` |

### Scale Relationship

The border circle is intentionally **larger than its container**, extending beyond the bounds to create the orbital effect. The container clips the overflow, revealing only a portion of the ring at any given time.

---

## Positioning

### Off-Center Placement

The border circle is positioned to extend primarily into the **top-right corner** of the container:

| Property | Desktop Value | Mobile Value |
|----------|---------------|--------------|
| **Top** | `-5vw` | `-23vw` |
| **Right** | `-5vw` | `1vw` |
| **Bottom** | `auto` | `auto` |
| **Left** | `auto` | `auto` |

This positioning means the visible arc of the ring appears in the outer corner of the button area, framing the icon from one side.

---

## The Rotation Animation

### Transform Origin

A critical aspect of this effect is the **off-center transform origin**:

| Property | Value |
|----------|-------|
| **transform-origin** | `69% 31%` |

This places the rotation pivot point in the **upper-right quadrant** of the wrapper, causing the orbital ring to sweep around this eccentric point rather than rotating around its own center.

### Rotation States

| State | Rotation | Description |
|-------|----------|-------------|
| **Default (Resting)** | `-180deg` | Ring is rotated away, partially hidden |
| **Active (Hovered)** | `0deg` | Ring rotates into full view |

The animation sweeps the visible portion of the ring **180 degrees** around the eccentric pivot point.

### Transition Properties

| Property | Value |
|----------|-------|
| **Transition Property** | `transform` |
| **Duration** | `2s` |
| **Timing Function** | Default (ease) |

The long 2-second duration creates a slow, elegant sweep that feels deliberate and graceful.

---

## Container Properties

### The Wrapper Element

| Property | Value | Purpose |
|----------|-------|---------|
| **position** | `absolute` | Positioned within the button |
| **inset** | `0% 0% auto auto` | Anchored to top-right corner |
| **width** | `100%` | Fills button area |
| **height** | `100%` | Fills button area |
| **overflow** | `hidden` | Clips the oversized border circle |

### Parent Button (Close Button Context)

| Property | Value |
|----------|-------|
| **width** | `24vw` (desktop) / `36vw` (mobile) |
| **height** | Same as width |
| **position** | `absolute` |
| **overflow** | `hidden` |
| **mix-blend-mode** | `screen` |

The `mix-blend-mode: screen` allows the border to interact with background elements, creating subtle luminosity effects.

---

## Visual Effect Breakdown

### Default State (Menu Closed / No Hover)

- The wrapper is rotated `-180deg`
- Due to the eccentric transform origin, the visible arc of the ring appears in a "starting" position
- The overall effect is subtle, with the ring partially hidden

### Animated State (Hover / Menu Open)

- The wrapper rotates from `-180deg` to `0deg`
- The ring sweeps around the eccentric pivot point
- This creates the illusion of an orbital ring circling around the central icon
- The 2-second duration gives the animation a slow, hypnotic quality

---

## Context: Close Button

The orbital border is primarily used on the close button within the full-screen navigation overlay:

### Close Button Structure

| Element | Role |
|---------|------|
| **Close Button Container** | Houses all close button elements |
| **Close Icon (X)** | SVG icon at the center |
| **Hover Block** | Background fill effect area |
| **Orbital Border Wrapper** | Contains the rotating ring |
| **Border Circle** | The actual rotating ring element |

### Z-Index Layering

| Element | Z-Index |
|---------|---------|
| **Close Button Container** | `10` |
| **Hover Block** | `4` |
| **Orbital Border** | Default (below hover block) |

---

## States and Triggers

### Activation Methods

The rotation can be triggered by:

1. **Hover on close button** — direct user interaction
2. **Menu open state** — when the navigation overlay opens
3. **Webflow Interactions** — coordinated with other menu animations via `data-w-id` attributes

### Modifier Classes

| Class | Effect |
|-------|--------|
| **`.rotate`** | Applied to wrapper, changes transform from `-180deg` to `0deg` |

The presence or absence of the `rotate` class controls the animation state.

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| **Desktop (≥992px)** | Full orbital effect with proportional sizing |
| **Mobile (<992px)** | Larger relative size, repositioned for touch targets |

On mobile, the close button and its orbital border are scaled up significantly to ensure adequate touch target size.

---

## Related Components

### Hover Block

A companion element (`.hover-block.is--menu`) that provides additional hover effects:

| Property | Value |
|----------|-------|
| **Shape** | Circular (50% border-radius) |
| **Size** | Slightly larger than container (104.5% × 104%) |
| **Position** | Offset to align with orbital effect |

### Close Icon

The central X icon that the orbital border frames:

| Property | Value |
|----------|-------|
| **Width** | `1.4vw` (desktop) / `3vw` (mobile) |
| **Color** | White |
| **Position** | Absolute, near top-right of container |

---

## Visual Reference

```
Anatomy:
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Container (clips overflow):                            │
│  ┌────────────────────────┐                             │
│  │                    ╭───┼──────╮                      │
│  │               ╭────┘   │      │                      │
│  │          ╭────┘    ✕   │      │ ← Border circle     │
│  │         │              │      │   extends beyond    │
│  │         │              │      │   container         │
│  │         ╰──────────────┼──────╯                      │
│  │                        │                             │
│  └────────────────────────┘                             │
│         ↑                                               │
│    visible portion                                      │
│                                                         │
└─────────────────────────────────────────────────────────┘

Transform Origin (eccentric pivot):
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Container:                                             │
│  ┌────────────────────────┐                             │
│  │                   •    │ ← Pivot point at 69%, 31%  │
│  │                        │                             │
│  │              ✕         │                             │
│  │                        │                             │
│  │                        │                             │
│  └────────────────────────┘                             │
│                                                         │
└─────────────────────────────────────────────────────────┘

Rotation Animation:
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Default State (-180deg):                               │
│  ┌────────────────────────┐                             │
│  │                        │╲                            │
│  │              ✕         │ ╲  ← Ring swept away       │
│  │                        │  ╲                          │
│  └────────────────────────┘   ╲                         │
│                                                         │
│  Hovered State (0deg):                                  │
│  ┌────────────────────────┐                             │
│  │                   ╭────┼╮                            │
│  │              ✕  ╭─┘    ││ ← Ring sweeps into view   │
│  │                ╰───────┼╯                            │
│  └────────────────────────┘                             │
│                                                         │
│  Animation Path (2 seconds):                            │
│                                                         │
│       ╭─→─→─→─→─╮                                       │
│      ╱           ╲                                      │
│     ↑      •      ↓  ← Sweeps around eccentric pivot   │
│      ╲           ╱                                      │
│       ╰─←─←─←─←─╯                                       │
│                                                         │
└─────────────────────────────────────────────────────────┘

In Context (Close Button):
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ┌────────────────────────┐                             │
│  │                   ╭────┼╮                            │
│  │                 ╭─┘    ││                            │
│  │              ✕ │       ││                            │
│  │                ╰───────┼╯                            │
│  │                        │                             │
│  └────────────────────────┘                             │
│                                                         │
│  Close button with orbital border hovering              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Implementation Notes

### Why an Eccentric Transform Origin?

The off-center pivot point (`69% 31%`) is crucial to the orbital effect:
- A centered pivot would simply spin the ring in place
- The eccentric pivot causes the visible arc to **sweep around** the icon
- This creates a sense of depth and three-dimensionality

### Overflow Clipping

The container's `overflow: hidden` is essential:
- Allows the border circle to be much larger than the container
- Only reveals the portion of the ring that intersects the container bounds
- Creates the partial-arc appearance

### Long Transition Duration

The 2-second duration is intentional:
- Creates a slow, elegant sweep rather than a quick spin
- Gives the animation a "planetary orbit" quality
- Allows users to appreciate the effect fully

### Mix Blend Mode

The `screen` blend mode on the parent button creates subtle luminosity when the border overlaps with background elements, enhancing the ethereal quality.

---

## Accessibility Considerations

| Consideration | Approach |
|---------------|----------|
| **Decorative Element** | The orbital border is purely decorative; the close button's function should be communicated through semantic markup |
| **Reduced Motion** | Consider disabling the rotation for users who prefer reduced motion |
| **Focus States** | Ensure the close button has clear focus indicators independent of the orbital effect |

---

## Variations

### Rotation Modifiers

The hover block can have rotation variants for visual variety:

| Modifier | Rotation |
|----------|----------|
| **Default** | `0deg` |
| **`.is--2`** | `105deg` |
| **`.is--3`** | `205deg` |

These create offset starting positions for multiple orbital elements.

---

*Last Updated: January 2026*  
*Source: Analysis of <https://naya-studio-dubai.webflow.io>*
