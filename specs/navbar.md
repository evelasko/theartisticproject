# Comprehensive Navbar Specification

**Reference:** [Naya Studio Dubai (Cube Studio)](https://naya-studio-dubai.webflow.io)

---

## 1. Overall Structure & Architecture

### Semantic Foundation

The navbar is built using a semantic `<header>` element that contains a complex nested structure. It employs a **dual-component architecture**:

1. **Top Bar (Persistent Navbar)** - Always visible initially, minimal elements
2. **Full-Screen Navigation Overlay** - Hidden by default, triggered by menu button

### Positioning System

- **Fixed positioning**: The navbar is affixed to the top of the viewport
- **Full viewport width**: Spans the entire screen width
- **Z-index layering**: Positioned above all content to maintain visibility
- **Scroll-triggered visibility**: Hides on scroll down, reveals on scroll up (see Section 8)

---

## 2. Top Bar Elements (Left to Right)

### Left Section (Information Group)

Contains utility links and controls arranged horizontally:

| Element | Description |
|---------|-------------|
| **Gallery Link** | Text link labeled "gallery" with distinctive letter-spacing |
| **Phone Number** | Clickable telephone link (+971 504757773) with same spacing treatment |

### Right Section (Actions Group)

| Element | Description |
|---------|-------------|
| **Sound Toggle** | Text link labeled "Sound" preceded by "OFF" state indicator |
| **Menu Button** | Dual-element trigger (button + link) labeled "Menu" |

---

## 3. Typography & Visual Treatment

### Letter-Spacing Signature Effect

The most distinctive typographic feature is **extreme letter-spacing** applied to all text elements:

- Each character is separated by visible whitespace
- Creates an elegant, editorial, haute-couture aesthetic
- Examples: `g a l l e r y`, `S o u n d`, `M e n u`
- This spacing is consistent across both the top bar and full-screen menu

### Font Characteristics

- **Weight**: Light to regular weight for elegant appearance
- **Case**: Uppercase
- **Size**: Small, refined sizing in the top bar; larger display sizes in full-screen menu

---

## 4. Sound Toggle Component

### Dual Representation

The sound toggle appears **twice**:

1. In the top bar (primary position)
2. Inside the full-screen navigation overlay (secondary position)

### State Indication

- Text label "OFF" precedes the "Sound" text when audio is disabled
- Acts as a toggle switch for ambient/background audio on the site
- Visual state change expected when activated (text likely changes to "ON")

### Interaction Model

- Click-to-toggle functionality
- Persists state across page navigation

---

## 6. Menu Trigger System

### Dual-Element Structure

The menu trigger consists of **two overlapping elements**:

1. **Button Element**: Labeled "menu" (lowercase)
2. **Link Element**: Labeled "MENU" (uppercase)

This dual-element approach suggests:

- One element handles the visual presentation
- One element handles the click interaction and animation trigger

### Purpose

Clicking the menu trigger opens the **full-screen navigation overlay**.

---

## 7. Full-Screen Navigation Overlay

### Container Properties

- **Full viewport coverage**: 100vw × 100vh
- **Dark/themed background**: Likely semi-transparent or solid dark color
- **Overlay z-index**: Positioned above all other content including the navbar

### Layout Structure (Three-Column Grid)

#### First row - Primary Navigation

- Left Column (spans two columns): Contains the main page links with numbered indicators
  - **Home (01)**: Primary navigation link with index number
  - **Our Blog (02)**: Secondary navigation link with index number
- Right Column (spans one column): Contains only the button to close the full-screen navigation overlay

The numbering system `(01)`, `(02)` serves as visual hierarchy indicators and adds editorial sophistication.

#### Second Row - Secondary Navigation & Contact

- Left Column (spans 1 column)
  - Email address link: <info@nayastudiodubai.com>
  - CTA link: "Discuss the project"
- Center Column (spans 1 column)
  - Anchor Links Section (secondary links):
    - Our Services
    - Cases  
    - Testimonials

### Text Treatment Within Menu

- Same letter-spacing treatment as top bar
- Larger typography scale for primary navigation
- Hierarchical sizing (primary links > CTA Link > secondary links > contact info)

---

## 8. Scroll-Triggered Hide/Show Behavior

### Overview

The navbar implements a **"smart navbar"** pattern that responds to scroll direction:

| Scroll Direction | Navbar Behavior |
|------------------|-----------------|
| **Scroll Down** | Navbar slides up and hides off-screen |
| **Scroll Up** | Navbar slides down and becomes visible again |

### Animation Characteristics

#### Slide Animation

- **Type**: CSS transform translateY (vertical slide)
- **Direction**: Slides upward to hide (negative Y translation), slides downward to show (Y = 0)
- **Smoothness**: Uses CSS transition for smooth, fluid movement
- **Duration**: Approximately 300-400ms for natural feel
- **Easing**: Ease-out or similar curve for deceleration effect

#### Technical Implementation Approach

1. **Scroll Direction Detection**: JavaScript monitors scroll position to determine direction
2. **Threshold**: Likely a small scroll threshold (e.g., 50-100px) before triggering hide/show
3. **CSS Class Toggle**: Add/remove a class that applies the transform
4. **Transform Property**: `transform: translateY(-100%)` to hide, `transform: translateY(0)` to show
5. **Transition**: `transition: transform 0.3s ease-out` for smooth animation

#### States

- **Visible State**: `transform: translateY(0)` - navbar at natural position
- **Hidden State**: `transform: translateY(-100%)` - navbar completely above viewport

### Behavior Details

- **Initial Load**: Navbar is visible (not hidden)
- **At Top of Page**: Navbar always visible regardless of scroll behavior
- **Scroll Down Trigger**: After scrolling down past threshold, navbar hides
- **Scroll Up Trigger**: Any upward scroll reveals the navbar
- **Velocity Independence**: Animation triggers on direction change, not scroll speed

### Edge Cases

- Navbar remains visible when at the very top of the page (scroll position 0)
- Full-screen menu overlay should prevent scroll-triggered hiding while open
- Quick direction changes should be handled smoothly without jitter

---

## 8.5. Backdrop Overlay Effect (Glassmorphism)

### Overview

When the navbar **reappears after scrolling up** (not when at the top of the page), it displays a sophisticated **glassmorphism effect** that creates a subtle blur and glow appearance over the content beneath it.

**Important:** This effect is **NOT present** when the page is at the top (scroll position 0). It only activates when the navbar slides back into view after being hidden.

### Core CSS Properties

The glassmorphism effect is achieved through a combination of CSS properties:

#### Backdrop Filter

```css
backdrop-filter: blur(10px) saturate(200%);
-webkit-backdrop-filter: blur(10px) saturate(200%);
```

**Key Values:**

- **Blur Amount**: `10px` to `16px` is the typical range
  - `10px` provides a subtle, refined blur that maintains content visibility
  - `16px` creates a more pronounced frosted glass effect
  - The Naya Studio implementation appears to use approximately **`10px-13px`**

- **Saturation**: `saturate(200%)` or similar
  - Enhances color vibrancy of content behind the navbar
  - Optional but adds to the "glow" quality of the effect

#### Semi-Transparent Background

```css
background: rgba(255, 255, 255, 0.1);
/* or for dark navbars */
background: rgba(0, 0, 0, 0.5);
```

**Key Considerations:**

- **Low opacity is essential** for the backdrop-filter to be visible
- The Naya Studio navbar likely uses: **`rgba(0, 0, 0, 0.3)`** to **`rgba(0, 0, 0, 0.5)`**
  - Dark background with 30-50% opacity
  - Creates the "floating" appearance over content
- The semi-transparent background **must be present** for the blur effect to work

#### Browser Compatibility

```css
/* Feature detection pattern */
@supports (backdrop-filter: blur(10px)) or (-webkit-backdrop-filter: blur(10px)) {
  .navbar--scrolled {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
}

/* Fallback for browsers without backdrop-filter support */
.navbar--scrolled {
  background: rgba(0, 0, 0, 0.8);
}
```

### Implementation Strategy

#### State-Based Application

The glassmorphism effect should be **conditionally applied** based on scroll state:

1. **At Top (scroll ≤ 0)**:
   - No backdrop-filter
   - Solid or fully transparent background
   - Clean appearance

2. **Scrolled & Reappeared**:
   - Apply backdrop-filter: blur()
   - Apply semi-transparent background
   - Glassmorphism effect active

#### CSS Class Structure

```css
/* Base navbar styles */
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  transition: transform 0.3s ease-out, background 0.3s ease-out, backdrop-filter 0.3s ease-out;
  z-index: 1000;
}

/* When scrolled down and visible again (not at top) */
.navbar--scrolled {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px) saturate(200%);
  -webkit-backdrop-filter: blur(10px) saturate(200%);
}

/* Hidden state (scrolled down) */
.navbar--hidden {
  transform: translateY(-100%);
}
```

### Interaction with Noise Overlay

**Important Consideration:** The page has a **noise texture overlay** applied to all content, which affects the visual perception of the blur effect.

- The backdrop-filter blurs **both the page content AND the noise texture**
- This creates a "softer" glow appearance rather than a sharp glass effect
- The noise adds organic texture to the blurred backdrop
- Ensure your page's noise overlay is applied **below** the navbar's z-index

### Visual Characteristics

When properly implemented, the effect should exhibit:

1. **Subtle Blur**: Content beneath is recognizable but softened
2. **Glow Quality**: Semi-transparent background creates luminous appearance
3. **Depth**: Clear visual separation between navbar and content
4. **Smoothness**: Transition into/out of effect is seamless (300ms)
5. **Performance**: Hardware-accelerated, no jank during scroll

### Performance Optimization

Backdrop-filter can be computationally expensive:

```css
/* Promote to own layer for GPU acceleration */
.navbar {
  will-change: transform, backdrop-filter;
}

/* Remove will-change after transition */
.navbar:not(.transitioning) {
  will-change: auto;
}
```

**Best Practices:**

- Use `will-change` judiciously (only during transitions)
- Test on lower-end devices
- Consider reducing blur amount on mobile (8px instead of 10px)
- Provide fallback for browsers without backdrop-filter support

### Edge Values Summary

Based on analysis of modern glassmorphism implementations:

| Property | Recommended Value | Naya Studio (Estimated) |
|----------|------------------|------------------------|
| **backdrop-filter blur** | `10px` - `16px` | `10px` - `13px` |
| **Background opacity** | `0.1` - `0.5` (on scale of 0-1) | `0.3` - `0.5` |
| **Saturation boost** | `saturate(180%)` - `saturate(200%)` | `saturate(200%)` (optional) |
| **Transition duration** | `300ms` | `300ms` |
| **Transition easing** | `ease-out` | `ease-out` |

### Reduced Motion Considerations

```css
@media (prefers-reduced-motion: reduce) {
  .navbar {
    transition-duration: 0.01ms;
  }
  
  /* Optional: disable blur animation for performance */
  .navbar--scrolled {
    backdrop-filter: none;
    background: rgba(0, 0, 0, 0.9);
  }
}
```

---

## 9. Additional Animations & Transitions

### Expected Menu Open/Close Animation

Based on the sophisticated design language:

- **Entry Animation**: fades in with staggered element reveals and applies a blur transition from slight blur to clear
- **Exit Animation**: Reverse of entry (fade out and slight blur)
- **Duration**: Smooth, deliberate timing (300-500ms typical)
- **Easing**: Ease-out for natural deceleration

### Link Hover Effects

#### Primary Links

- **Typography Animation**: Letters animate individually (stagger effect)
- **Color/Opacity Transition**: Subtle color shift on hover

#### CTA and Secondary Links - Animated Underline Effect

The secondary links (Our Services, Cases, Testimonials) and CTA links use the **Animated Underline Component** — a sophisticated multi-layered underline that reveals from left to right on hover.

> **📄 See full specification:** [Animated Underline Component](./components/animated-underline.md)

**Quick Summary:**

- Line expands from left to right on hover (width: 0% → 100%)
- Includes decorative accent element at leading edge
- Sub-pixel line height (~0.7px) for elegance
- Reverses on hover-out (shrinks right to left)

### Letter-by-Letter Stagger

The letter-spacing design strongly suggests **staggered reveal animations** where:

- Characters animate in sequence on page load
- Hover states trigger per-character animations
- Menu items reveal with staggered timing

---

## 10. Responsive Behavior

### Desktop (1440px+)

- Full horizontal layout with all elements visible
- Two-column full-screen menu layout
- Generous spacing between elements

### Tablet (768px - 1439px)

- Maintains same structural elements
- Slight spacing adjustments
- Full-screen menu may shift to single-column or adjusted grid

### Mobile (< 768px)

- Top bar likely simplifies to essentials (menu trigger, possibly sound toggle)
- Gallery and phone links may be hidden or moved to menu
- Full-screen menu becomes primary navigation method
- Single-column menu layout
- Larger touch targets

### Breakpoint Behavior

- **No visible/hidden toggle** of menu button (it's always present)
- Elements resize and reflow based on viewport
- Letter-spacing may adjust slightly at smaller sizes
- Scroll hide/show behavior remains consistent across all breakpoints

---

## 11. Interactive States Summary

| Element | Default | Hover | Active/Open | Scrolled State |
|---------|---------|-------|-------------|----------------|
| Gallery Link | Letter-spaced text | Color/opacity change, possible underline | N/A | N/A |
| Phone Link | Letter-spaced text | Color/opacity change | N/A | N/A |
| Language Selector | "EN" with arrow | Dropdown reveals | Dropdown open state | N/A |
| Sound Toggle | "OFF Sound" | Color change | "ON Sound" (state change) | N/A |
| Menu Trigger | "Menu" text | Color change | Overlay open, possible text change to "Close" | N/A |
| Nav Links (Menu) | Letter-spaced text | Color/animation | Active page indicator | N/A |
| **Navbar (scroll)** | Visible at top | N/A | Hidden on scroll down, visible on scroll up | **Glassmorphism effect** (backdrop-filter blur) |

---

## 12. Key Replication Requirements

### Must-Have Features

1. **Fixed positioning** with proper z-index stacking
2. **Scroll-triggered hide/show** with smooth slide animation
3. **Glassmorphism overlay effect** (backdrop-filter blur) when navbar reappears after scrolling
4. **Letter-spacing typography** (CSS `letter-spacing` property at significant values)
5. **Dual-state sound toggle** with persistent state management
6. **Full-screen overlay navigation** with smooth open/close transitions
7. **Language selector dropdown** with hover/click activation
8. **Numbered navigation indicators** for primary links
9. **Responsive layout** that maintains functionality across all breakpoints

### Animation Requirements

1. **Navbar scroll animation**: Smooth vertical slide (transform translateY)
2. **Backdrop-filter transition**: Smooth fade-in of glassmorphism effect when navbar reappears
3. Smooth overlay transition (slide/fade)
4. Staggered element reveals in menu
5. Per-character hover animations (optional but enhances effect)
6. State transitions for toggles

### Accessibility Considerations

- Proper ARIA labels for interactive elements
- Keyboard navigation support for menu
- Focus management when overlay opens/closes
- Screen reader compatibility for letter-spaced text
- Respect `prefers-reduced-motion` for scroll animations

---

## 13. Visual Reference Summary

```
┌────────────────────────────────────────────────────────────────────┐
│  [g a l l e r y]  [+971 504757773]  [EN ▼]    OFF [S o u n d]  [M e n u]  │
└────────────────────────────────────────────────────────────────────┘
        ↑ Slides UP to hide on scroll down
        ↓ Slides DOWN to show on scroll up

FULL-SCREEN MENU (when open):
┌────────────────────────────────────────────────────────────────────┐
│                                                                    │
│   H o m e                    info@nayastudiodubai.com             │
│   (01)                       Discuss the project                   │
│                                                                    │
│   O u r  B l o g             Our Services                         │
│   (02)                       Cases                                 │
│                              Testimonials                          │
│                                                                    │
│                              OFF Sound                             │
│                                                                    │
│                              [Decorative Floral Image]             │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

## 14. Scroll Behavior Pseudocode Reference

```
Variables:
  - lastScrollY: number (tracks previous scroll position)
  - isNavbarVisible: boolean (current visibility state)
  - scrollThreshold: number (minimum scroll before triggering, ~50px)

On Scroll:
  1. Get currentScrollY
  2. Calculate scrollDelta = currentScrollY - lastScrollY
  
  3. If at top of page (currentScrollY <= 0):
       → Show navbar (always visible at top)
  
  4. Else if scrollDelta > scrollThreshold (scrolling DOWN):
       → Hide navbar (slide up with transform)
  
  5. Else if scrollDelta < -scrollThreshold (scrolling UP):
       → Show navbar (slide down with transform)
  
  6. Update lastScrollY = currentScrollY

CSS Classes:
  .navbar { 
    transform: translateY(0);
    transition: transform 0.3s ease-out;
  }
  
  .navbar--hidden {
    transform: translateY(-100%);
  }
```

---

*Last Updated: January 14, 2026*
*Source: Analysis of <https://naya-studio-dubai.webflow.io>*
