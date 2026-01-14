# Animated Underline Component

**Component Type:** Reusable Link Decoration  
**Usage:** CTA links, secondary navigation links, footer links

---

## Overview

A sophisticated animated underline that reveals from left to right on hover. This component is used throughout the site for links that require subtle, elegant hover feedback. It is achieved through a multi-layered element structure rather than a simple CSS pseudo-element, enabling complex animation orchestration.

---

## HTML Structure

Each link using this component contains the following nested structure:

```html
<a class="link-block w-inline-block">
  <p class="text-large">Link Text</p>
  <div class="link-line_wrapper is--lower">
    <div class="input-line_block">
      <div class="input-line_inner is--white"></div>
      <div class="input-decor"></div>
    </div>
  </div>
</a>
```

---

## Element Breakdown

| Element | Class | Purpose |
|---------|-------|---------|
| **Wrapper** | `link-line_wrapper is--lower` | Positions the underline below the text. The `is--lower` modifier ensures proper vertical spacing beneath the link text. |
| **Line Block** | `input-line_block` | The expanding container that animates its `width` property. Default state: `width: 0%`. |
| **Inner Line** | `input-line_inner is--white` | The actual visible line element. White color (`is--white` modifier). Default state: `opacity: 0`. |
| **Decorative Element** | `input-decor` | A decorative accent element (likely a small dot or diamond) that appears at the leading edge of the expanding line. Has a Webflow animation ID for orchestrated timing. Default state: `opacity: 0`. |

---

## Class Modifiers

### Wrapper Modifiers

| Modifier | Effect |
|----------|--------|
| `is--lower` | Positions the line with additional spacing below the text |

### Inner Line Modifiers

| Modifier | Effect |
|----------|--------|
| `is--white` | Sets the line color to white (for dark backgrounds) |

*Note: Additional color modifiers may exist for different background contexts.*

---

## Animation States

### Default State (No Hover)

| Element | Property | Value |
|---------|----------|-------|
| `input-line_block` | `width` | `0%` |
| `input-line_block` | `height` | `~0.7px` (sub-pixel) |
| `input-line_inner` | `opacity` | `0` |
| `input-decor` | `opacity` | `0` |

### Hover State Animation Sequence

The animation occurs in a coordinated sequence:

1. **Line Block Expansion**: The `input-line_block` width animates from `0%` → `100%`, creating the left-to-right reveal effect

2. **Line Visibility**: The `input-line_inner` opacity animates from `0` → `1`, making the white line visible as the container expands

3. **Decorative Accent**: The `input-decor` element fades in and follows the leading edge of the expanding line, acting as a visual "cursor" or accent mark

### Hover-Out Animation (Reverse)

When the cursor leaves the link:

1. The line width animates from `100%` → `0%` (shrinks right to left)
2. The inner line opacity fades from `1` → `0`
3. The decorative element fades out

---

## Animation Properties

| Property | Value |
|----------|-------|
| **Direction** | Left to right (expand), Right to left (collapse) |
| **Primary Property** | `width` (0% ↔ 100%) |
| **Secondary Property** | `opacity` (0 ↔ 1) |
| **Line Height** | Sub-pixel (~0.7px) for smooth rendering |
| **Line Color** | White (controlled by `is--white` class) |
| **Timing Function** | Ease-out for natural deceleration |
| **Duration** | Approximately 200-400ms |
| **Orchestration** | Webflow Interactions (via `data-w-id` attributes) |

---

## Implementation Notes

### Why Multi-Element Instead of `::after` Pseudo-Element?

The multi-element approach allows for more complex orchestration:

- Separate control of line expansion vs. visibility
- Independent decorative element animation
- Webflow Interactions integration for timeline-based control
- Easier JavaScript manipulation if needed

### The Decorative Element

The `input-decor` likely renders as a small visual accent (dot, diamond, or cursor-like shape) that "leads" the line as it expands, adding sophistication to the animation.

### Sub-Pixel Height

The `~0.7px` height creates a delicate, elegant line that appears crisp on high-DPI displays while avoiding the harshness of a full 1px line.

### Opacity Layering

Using opacity on the inner line (not the container) allows the container to expand to its full width before the line becomes visible, enabling smoother animation choreography if needed.

---

## Usage Locations

This component is used in the following locations:

| Location | Context |
|----------|---------|
| **Full-Screen Navigation Overlay** | Secondary links (Our Services, Cases, Testimonials) |
| **Full-Screen Navigation Overlay** | CTA link (Discuss the project) |
| **Footer** | Various footer links |
| **Content Sections** | Inline CTA links throughout the page |

---

## Visual Reference

```
Default State:
┌──────────────────────┐
│  Link Text           │
│                      │  ← No visible underline
└──────────────────────┘

Hover State (animation in progress):
┌──────────────────────┐
│  Link Text           │
│  ━━━━━━━━━━●         │  ← Line expanding left-to-right with decorative dot
└──────────────────────┘

Hover State (complete):
┌──────────────────────┐
│  Link Text           │
│  ━━━━━━━━━━━━━━━━━━● │  ← Full underline with decorative element at end
└──────────────────────┘
```

---

*Last Updated: January 2026*
*Source: Analysis of <https://naya-studio-dubai.webflow.io>*
