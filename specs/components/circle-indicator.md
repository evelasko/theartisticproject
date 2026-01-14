# Circle Indicator Component

**Component Type:** Interactive Visual Indicator  
**Usage:** Navigation buttons, section headers, labels, custom cursor

---

## Overview

A small circular indicator element that provides visual feedback and hierarchy throughout the interface. The component consists of two concentric circles: a semi-transparent outer circle with a solid inner dot. The outer circle has a subtle blur effect that creates a soft, ethereal appearance consistent with the site's elegant aesthetic. When used in interactive contexts, the circle responds to hover states through scale transformations.

---

## Visual Design

### Element Composition

The circle indicator is a two-layer nested structure:

| Layer | Description |
|-------|-------------|
| **Outer Circle** | A semi-transparent white circle with a soft blur filter. Acts as a "glow" or "halo" around the inner element. |
| **Inner Dot** | A solid white circle centered within the outer circle. Provides the focal point of the indicator. |

### Color Values

| Element | Color | Description |
|---------|-------|-------------|
| **Outer Circle** | `rgba(255, 255, 255, 0.6)` | White at 60% opacity, creating a frosted glass effect |
| **Inner Dot** | `#ffffff` | Solid white for maximum contrast and visibility |

### Size Specifications

The component uses viewport-relative units (`vw`) to maintain proportional sizing across screen sizes.

#### Desktop (≥992px)

| Element | Width | Height |
|---------|-------|--------|
| **Outer Circle** | `0.58vw` | `0.58vw` |
| **Inner Dot** | `0.22vw` | `0.22vw` |

#### Mobile (<992px)

| Element | Width | Height |
|---------|-------|--------|
| **Outer Circle** | `2.66vw` | `2.66vw` |
| **Inner Dot** | `1.14vw` | `1.14vw` |

### Proportional Relationship

The inner dot is approximately **38% of the outer circle's diameter**, creating a balanced visual weight where the outer glow frames the central point without overpowering it.

---

## Blur Effect

A defining characteristic of this component is its layered blur treatment:

| Element | Blur Radius (Desktop) | Blur Radius (Mobile) |
|---------|-----------------------|---------------------|
| **Outer Circle** | `0.05vw` | `0.2vw` |
| **Inner Dot** | `0.02vw` | (scales proportionally) |

### Purpose of the Blur

- **Softens edges**: Prevents the circles from appearing harsh or overly crisp
- **Creates depth**: The differential blur between layers produces a subtle 3D effect
- **Maintains elegance**: Aligns with the site's overall soft, dreamlike visual language
- **Enhances glow**: The outer circle's blur makes it appear as if the inner dot is emitting light

---

## Layout and Positioning

### Flexbox Centering

The outer circle uses flexbox to center the inner dot:

| Property | Value |
|----------|-------|
| **Display** | `flex` |
| **Justify Content** | `center` |
| **Align Items** | `center` |

### Inline Placement

When used alongside text labels (such as in section headers), the circle appears at the start of the label with a small gap between the circle and the text. The vertical alignment should match the optical center of the accompanying text.

---

## Animation and Interaction

### Hover State (Scale Transform)

When the circle indicator is part of an interactive element (such as a button or link), it responds to hover by scaling:

| State | Transform |
|-------|-----------|
| **Default** | `scale(1)` |
| **Hover** | `scale(1.1)` to `scale(1.2)` — subtle enlargement |

The scale animation uses a CSS transition for smooth interpolation:

| Property | Value |
|----------|-------|
| **Transition Property** | `transform` |
| **Duration** | `200ms` |
| **Timing Function** | Default (ease) |

### Non-Active State

A modifier state exists for hiding the circle while maintaining layout space:

| Modifier | Effect |
|----------|--------|
| **Non-Active** | `transform: scale(0)` — collapses the circle to invisible |

This is useful for toggle states where the circle should smoothly appear/disappear without affecting surrounding layout.

---

## Context Variations

### In Navigation Buttons

When used in the navigation (e.g., the "Menu" button), the circle indicator appears before the button label. The parent container (the button) receives the hover trigger, and both the circle and the text respond to the hover state.

Structure:
- Parent: Interactive link/button with hover listener
- Child 1: Circle indicator
- Child 2: Text label

### In Section Headers

When used in section headers (e.g., "capabilities", "discover Why cube Studio"), the circle acts as a decorative bullet or marker preceding the section label. In this context, the circle is typically static and does not animate on hover.

### In Custom Cursor

A variation of this component is used as the default custom cursor icon. In this context:
- The circle follows the mouse position
- The sizing may differ slightly for cursor visibility
- Additional cursor states (drag, hover targets) use variations of this base design

---

## Theme Adaptation

### Dark Background Mode

A modifier exists for use on dark backgrounds where the default white appearance would clash:

| Modifier | Effect |
|----------|--------|
| **Navbar Dark** | Applies `filter: invert()` combined with the blur, inverting colors for dark mode contexts |

This ensures the circle remains visible and harmonious across different background treatments.

---

## Responsive Behavior

| Breakpoint | Size Multiplier | Blur Adjustment |
|------------|-----------------|-----------------|
| Desktop (≥992px) | 1x | Standard blur values |
| Mobile (<992px) | ~4.6x larger | ~4x increased blur |

The significant size increase on mobile ensures the indicator remains visible and tapable on touch devices while maintaining its delicate appearance through proportionally scaled blur.

---

## Usage Locations

| Location | Context | Interactive |
|----------|---------|-------------|
| **Header Menu Button** | Appears before "Menu" text | Yes — scales on hover |
| **Capabilities Section** | Label marker for "capabilities" | No |
| **Benefits Section** | Label marker for "discover Why cube Studio" | No |
| **Custom Cursor** | Default cursor state | Yes — follows mouse |

---

## Relationship to Other Components

| Component | Relationship |
|-----------|--------------|
| **Link Hover System** | Circle indicators within `link-wrapper` elements participate in the coordinated hover animation system |
| **Custom Cursor** | Shares visual language with the cursor default state |
| **Animated Underline** | Often appears in elements that also use the animated underline component |

---

## Visual Reference

```
Anatomy:
┌─────────────────────────────────────┐
│                                     │
│      ╭───────────────────╮          │
│      │  ┌─────────────┐  │          │
│      │  │  ┌───────┐  │  │          │
│      │  │  │ ● dot │  │  │          │
│      │  │  └───────┘  │  │          │
│      │  │    inner    │  │          │
│      │  └─────────────┘  │          │
│      │      outer glow   │          │
│      ╰───────────────────╯          │
│                                     │
└─────────────────────────────────────┘

In Context (Header Menu Button):
┌─────────────────────────────────────┐
│                                     │
│         ○  Menu                     │
│         ↑                           │
│    circle indicator                 │
│                                     │
└─────────────────────────────────────┘

In Context (Section Header):
┌─────────────────────────────────────┐
│                                     │
│         ○  capabilities             │
│         ↑                           │
│    circle indicator                 │
│                                     │
└─────────────────────────────────────┘

Hover State Animation:
┌─────────────────────────────────────┐
│                                     │
│   Default:    ○        (scale 1)    │
│                                     │
│   Hovered:    ◉        (scale 1.1)  │
│                                     │
└─────────────────────────────────────┘

Non-Active Transition:
┌─────────────────────────────────────┐
│                                     │
│   Active:      ○       (visible)    │
│        ↓                            │
│   Non-Active:  ·       (scale 0)    │
│                                     │
└─────────────────────────────────────┘
```

---

## Implementation Notes

### Viewport Units for Scaling

The use of `vw` units ensures the component scales proportionally with the viewport width, maintaining visual harmony at all screen sizes. This approach eliminates the need for multiple explicit breakpoint adjustments.

### Blur Filter Performance

The `filter: blur()` property should be applied judiciously as it can impact rendering performance. For this small component, the performance impact is negligible, but developers should be aware of potential issues if the component is duplicated many times on a single page.

### Transform Origin

When animating the scale transform, the default transform origin (`center center`) is appropriate for this component, ensuring the circle expands/contracts uniformly from its center point.

### 3D Transform Optimization

The component uses `transform-style: preserve-3d` to ensure proper rendering and to enable hardware acceleration for smoother animations.

---

## Accessibility Considerations

| Consideration | Approach |
|---------------|----------|
| **Decorative Element** | The circle is purely decorative and should not convey essential information |
| **Touch Targets** | When part of interactive elements, ensure the entire parent element (not just the circle) is the touch target |
| **Color Contrast** | The white color provides sufficient contrast against the dark backgrounds used on the site |
| **Reduced Motion** | Consider hiding or reducing the scale animation for users who prefer reduced motion |

---

*Last Updated: January 2026*  
*Source: Analysis of <https://naya-studio-dubai.webflow.io>*
