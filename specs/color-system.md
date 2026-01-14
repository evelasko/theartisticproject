# Color System Specification

**Document Type:** Design System / Color Reference  
**Usage:** Foundation for all color styling across the website  
**Design Philosophy:** Luxurious & Glamorous

---

## Overview

This specification defines the comprehensive color system for The Artistic Project website. The system establishes a dark-mode-first aesthetic with a predominantly monochromatic palette punctuated by **rich golden yellow accent tones**. The design philosophy emphasizes luxury and glamour through restraint, using subtle opacity variations, glassmorphism effects, and warm golden accents to create depth and visual hierarchy that evokes sophistication and elegance.

---

## Core Color Palette

### Primary Colors

| Token | Hex Value | RGB | Usage |
|-------|-----------|-----|-------|
| **Black** | `#000000` | `rgb(0, 0, 0)` | Primary background, base layer |
| **White** | `#FFFFFF` | `rgb(255, 255, 255)` | Primary text, high-contrast elements |

### Background Variations

| Token | Hex Value | Description | Usage |
|-------|-----------|-------------|-------|
| **Black Pure** | `#000000` | Absolute black | Page background, section backgrounds |
| **Black Soft** | `#101010` | Slightly elevated black | Card backgrounds, overlay bases |
| **Black Elevated** | `#111111` | Subtle elevation | Card gradients, layered elements |
| **Dark Gray** | `#202123` | Muted dark surface | Gradient endpoints, subtle dividers |
| **Dark Gray Alt** | `#252728` | Alternative dark surface | Border accents, focus states |
| **Charcoal** | `#313235` | Mid-dark tone | Subtle highlights, inactive states |

### Accent Colors (Golden Yellow - Luxurious & Glamorous)

| Token | Hex Value | RGB | Usage |
|-------|-----------|-----|-------|
| **Deep Gold** | `#8B6914` | `rgb(139, 105, 20)` | Primary gradient accent |
| **Gold** | `#A67C00` | `rgb(166, 124, 0)` | Secondary gradient accent |
| **Dark Gold** | `#6B5B00` | `rgb(107, 91, 0)` | Overlay backgrounds |
| **Bright Gold** | `#D4AF37` | `rgb(212, 175, 55)` | Highlight accents, focus states |
| **Interactive Gold** | `#C9A227` | `rgb(201, 162, 39)` | Interactive states (buttons, links) |

---

## Text Colors

### Primary Text Scale

| Token | Value | Opacity | Usage |
|-------|-------|---------|-------|
| **Text Primary** | `#FFFFFF` | 100% | Headlines, primary content |
| **Text Secondary** | `#FFFFFF` at 54% | 54% | Supporting text, metadata |
| **Text Muted** | `#FFFFFF` at 33% | 33% | De-emphasized content, captions |
| **Text Subtle** | `#FFFFFF` at 21% | 21% | Dividers, inactive labels |

### Hex Equivalents with Alpha

| Token | Hex with Alpha | Solid Approximation |
|-------|----------------|---------------------|
| **Text Primary** | `#FFFFFF` | `#FFFFFF` |
| **Text Secondary** | `#ffffff54` | `#8a8a8a` on black |
| **Text Muted** | `#ffffff54` | `#545454` on black |
| **Text Subtle** | `#ffffff36` | `#363636` on black |

### Implementation Notes

- Use alpha transparency over solid colors to maintain consistency across different background contexts
- Text color opacity is preferred over the CSS `opacity` property to preserve child element visibility
- The `#ffffff54` value equals approximately 33% white, commonly used for muted text

---

## Border Colors

### Border Scale

| Token | Value | Usage |
|-------|-------|-------|
| **Border Default** | `#ffffff1f` | Standard borders (12% opacity) |
| **Border Light** | `#ffffff26` | Subtle borders (15% opacity) |
| **Border Medium** | `#ffffff40` | Visible borders (25% opacity) |
| **Border Strong** | `#ffffff54` | Prominent borders (33% opacity) |
| **Border Emphasis** | `#ffffff80` | High-contrast borders (50% opacity) |
| **Border Invisible** | `#fff0` / `#0000` | Transparent / hidden borders |

### Solid Border Colors

| Token | Hex Value | Usage |
|-------|-----------|-------|
| **Border Dark** | `#000000` | Dark mode card outlines |
| **Border Accent** | `#252728` | Focus states, active elements |

---

## Surface Colors

### Card & Container Backgrounds

| Token | Value | Description |
|-------|-------|-------------|
| **Surface Transparent** | `#0000` / `transparent` | Fully transparent surfaces |
| **Surface Glass Light** | `#ffffff0f` | Light glass effect (6% white) |
| **Surface Glass** | `#ffffff05` | Subtle glass effect (2% white) |
| **Surface Dark** | `#101010` | Solid dark surface |
| **Surface Elevated** | `#111111` at 50% | Semi-transparent elevated surface |

### Glassmorphism Specifications

| Effect Level | Background | Backdrop Filter | Border |
|--------------|------------|-----------------|--------|
| **Light Glass** | `linear-gradient(#ffffff0f, #ffffff05)` | `blur(3.6vw)` | `#ffffff1f` |
| **Medium Glass** | `linear-gradient(#ffffff0f, #ffffff05)` | `blur(3vw)` | `#ffffff26` |
| **Subtle Glass** | `#0000` | `blur(0.3vw)` | `#ffffff1a` |
| **Heavy Glass** | `linear-gradient(#101010, #11111180)` | — | `#000000` |

---

## Gradient System

### Primary Gradients

#### Radial Gold Glow

The signature atmospheric effect used in hero and section backgrounds, creating a luxurious golden ambiance.

| Property | Value |
|----------|-------|
| **Type** | Radial gradient |
| **Position** | `circle at 55% 75%` |
| **Colors** | `#8B6914` → `#000000` at 81% |
| **Usage** | Hero sections, major section backgrounds |

#### Alternative Radial Gold

| Property | Value |
|----------|-------|
| **Type** | Radial gradient |
| **Position** | `circle at 57% 100%` |
| **Colors** | `#A67C00` → `rgba(37, 28, 0, 0.2)` at 69% |
| **Usage** | 404 pages, alternative sections |

#### Gold Shimmer

A subtle golden shimmer effect for elegant surfaces.

| Property | Value |
|----------|-------|
| **Type** | Radial gradient |
| **Position** | `ellipse at 50% 80%` |
| **Colors** | `rgba(212, 175, 55, 0.15)` → `transparent` at 60% |
| **Usage** | Subtle gold accents, premium surfaces |

### Fade Gradients

#### Top Fade (Dark to Transparent)

| Property | Value |
|----------|-------|
| **Type** | Linear gradient |
| **Direction** | `0deg` (bottom to top) or `180deg` (top to bottom) |
| **Colors** | `#000000` → `transparent` |
| **Usage** | Section tops, content reveals |

#### Bottom Fade

| Property | Value |
|----------|-------|
| **Type** | Linear gradient |
| **Direction** | `176deg` |
| **Colors** | `transparent` at 15% → `#000000` at 50% |
| **Usage** | Section bottoms, footer transitions |

#### Content Overlay

| Property | Value |
|----------|-------|
| **Type** | Linear gradient |
| **Direction** | `0deg` |
| **Colors** | `transparent` at 59% → `#000000` at 80% |
| **Usage** | Image overlays, text protection |

### Glass Gradients

#### Card Glass Effect

| Property | Value |
|----------|-------|
| **Type** | Linear gradient |
| **Direction** | `180deg` (top to bottom) |
| **Colors** | `#ffffff0f` → `#ffffff05` |
| **Usage** | Card backgrounds, capability blocks |

#### Card Dark Glass

| Property | Value |
|----------|-------|
| **Type** | Linear gradient |
| **Direction** | `180deg` |
| **Colors** | `#101010` → `#11111180` |
| **Usage** | Review cards, testimonial blocks |

### Divider Gradients

#### Horizontal Divider

| Property | Value |
|----------|-------|
| **Type** | Linear gradient |
| **Direction** | `90deg` (left to right) |
| **Colors** | `#ffffff80` → `#ffffff70` |
| **Opacity** | 21% applied to container |
| **Usage** | Section dividers, content separators |

#### Centered Fade Divider

| Property | Value |
|----------|-------|
| **Type** | Linear gradient |
| **Direction** | `90deg` |
| **Colors** | `transparent` → `#ffffff54` at 50% → `transparent` |
| **Usage** | Subtle horizontal rules, mobile dividers |

---

## Shadow System

### Box Shadows

| Token | Value | Usage |
|-------|-------|-------|
| **Shadow None** | `none` | Reset/remove shadows |
| **Shadow Subtle** | `0 0 0 1px #0000001a, 0 1px 3px #0000001a` | Webflow badge, minimal elevation |
| **Shadow Glow Gold** | `0 0 0.25rem 0 #D4AF37` | Focus states, interactive highlights |
| **Shadow Glow Soft** | `0 0 3px #3336` | Subtle glow effects |
| **Shadow Border White** | `0 0 0 2px #fff` | Focus ring, active states |

### Implementation Notes

- Shadows are used sparingly in the dark theme to maintain the flat, editorial aesthetic
- Glow effects (using gold) are reserved for interactive states, adding a luxurious touch
- Most depth is achieved through gradient overlays rather than traditional shadows

---

## Opacity Scale

### Standard Opacity Values

| Token | Value | Usage |
|-------|-------|-------|
| **Opacity Full** | `1` | Default, fully visible |
| **Opacity High** | `0.9` | Slight reduction for depth |
| **Opacity Medium** | `0.8` | Notable reduction |
| **Opacity Reduced** | `0.7` | Background elements |
| **Opacity Half** | `0.6` | Secondary elements |
| **Opacity Low** | `0.5` | De-emphasized content |
| **Opacity Hover** | `0.4` | Hover state reductions |
| **Opacity Subtle** | `0.21` | Dividers, subtle lines |
| **Opacity Faint** | `0.14` | Noise textures, grain |
| **Opacity Minimal** | `0.05` | Background textures |
| **Opacity Hidden** | `0` | Completely hidden |

### Hover State Opacity

| Interaction | Opacity Change |
|-------------|----------------|
| **Link Hover** | Reduce to `0.4` |
| **Button Hover** | Maintain or increase |
| **Card Hover** | Varies by context |

---

## Blur & Glassmorphism

### Backdrop Blur Scale

| Token | Value | Usage |
|-------|-------|-------|
| **Blur None** | `0` | No blur effect |
| **Blur Subtle** | `0.02vw` | Minimal text softening |
| **Blur Light** | `0.05vw` | Slight background blur |
| **Blur Soft** | `0.3vw` | Light glassmorphism |
| **Blur Medium** | `0.5vw` | Standard glass effect |
| **Blur Strong** | `1vw` | Prominent blur |
| **Blur Heavy** | `3vw` | Strong glass effect |
| **Blur Max** | `3.6vw` | Maximum blur for cards |
| **Blur Extreme** | `5vw` | Special transitions |

### Filter Effects

| Effect | Value | Usage |
|--------|-------|-------|
| **Grayscale** | `grayscale()` | Image treatments |
| **Brightness Dark** | `brightness(40%)` | Darkened overlays |
| **Brightness Reduced** | `brightness(70%)` - `brightness(80%)` | Subtle darkening |
| **Contrast Boost** | `contrast(114%)` - `contrast(170%)` | Enhanced definition |
| **Invert** | `invert()` | Light mode elements (menu) |

---

## Blend Modes

### Mix Blend Modes Used

| Mode | Usage |
|------|-------|
| **`normal`** | Default blending |
| **`overlay`** | Hero text depth effects |
| **`lighten`** | Blue glow atmospheric effects |
| **`difference`** | Dark navbar mode |

---

## Color Application Guidelines

### Background Hierarchy

| Level | Color | Description |
|-------|-------|-------------|
| **Level 0** | `#000000` | Base page background |
| **Level 1** | `#101010` | Elevated sections |
| **Level 2** | `#111111` / glass gradient | Cards, modals |
| **Level 3** | `#202123` | Highlighted surfaces |

### Text on Backgrounds

| Background | Text Color | Notes |
|------------|------------|-------|
| Pure Black (`#000`) | `#FFFFFF` | Maximum contrast (21:1) |
| Dark Gray (`#101010`) | `#FFFFFF` | High contrast |
| Glass surfaces | `#FFFFFF` | Ensure readable contrast |
| Blue gradients | `#FFFFFF` | May need opacity boost |

### Interactive State Colors

| State | Color Treatment |
|-------|-----------------|
| **Default** | Standard colors |
| **Hover** | Opacity reduction to 0.4, or border color change |
| **Focus** | Border `#ffffff54`, or glow `#3898ec` |
| **Active** | Border `#252728`, or background change |
| **Disabled** | Opacity 0.33, or `#ffffff54` text |

---

## CSS Custom Properties

### Recommended Custom Property Structure

| Variable | Value | Purpose |
|----------|-------|---------|
| `--color-background` | `#000000` | Page background |
| `--color-background-elevated` | `#101010` | Raised surfaces |
| `--color-background-card` | `#111111` | Card backgrounds |
| `--color-text-primary` | `#FFFFFF` | Primary text |
| `--color-text-secondary` | `#ffffff54` | Secondary text |
| `--color-text-muted` | `#ffffff36` | Muted text |
| `--color-border-default` | `#ffffff1f` | Default borders |
| `--color-border-strong` | `#ffffff54` | Prominent borders |
| `--color-accent-deep-gold` | `#8B6914` | Deep gold accent |
| `--color-accent-gold` | `#A67C00` | Gold accent |
| `--color-accent-bright-gold` | `#D4AF37` | Bright gold accent |
| `--color-interactive` | `#C9A227` | Interactive elements |

### Gradient Custom Properties

| Variable | Value | Purpose |
|----------|-------|---------|
| `--gradient-gold-glow` | `radial-gradient(circle at 55% 75%, #8B6914, #000 81%)` | Hero atmosphere |
| `--gradient-gold-glow-alt` | `radial-gradient(circle at 57% 100%, #A67C00, rgba(37, 28, 0, 0.2) 69%)` | Alternative hero |
| `--gradient-gold-shimmer` | `radial-gradient(ellipse at 50% 80%, rgba(212, 175, 55, 0.15), transparent 60%)` | Subtle gold shimmer |
| `--gradient-glass` | `linear-gradient(#ffffff0f, #ffffff05)` | Glass surfaces |
| `--gradient-glass-gold` | `linear-gradient(rgba(212, 175, 55, 0.08), rgba(139, 105, 20, 0.02))` | Gold-tinted glass |
| `--gradient-card` | `linear-gradient(#101010, #11111180)` | Card backgrounds |
| `--gradient-fade-top` | `linear-gradient(#000, transparent)` | Top fades |
| `--gradient-fade-bottom` | `linear-gradient(transparent, #000)` | Bottom fades |

### Blur Custom Properties

| Variable | Value | Purpose |
|----------|-------|---------|
| `--blur-subtle` | `blur(0.3vw)` | Light blur |
| `--blur-medium` | `blur(1vw)` | Standard blur |
| `--blur-heavy` | `blur(3.6vw)` | Strong blur |

---

## Responsive Considerations

### Tablet Adjustments (≤991px)

| Property | Change |
|----------|--------|
| Blue blur opacity | Reduced to `0.7` |
| Blur values | May be reduced for performance |
| Gradient positions | May shift for mobile layouts |

### Mobile Adjustments (≤767px)

| Property | Change |
|----------|--------|
| Backdrop filters | Some disabled for performance |
| Horizontal dividers | Centered fade gradient |
| Background effects | Simplified for performance |

---

## Accessibility Compliance

### Contrast Ratios

| Combination | Contrast Ratio | WCAG Level |
|-------------|----------------|------------|
| White on Black | 21:1 | AAA |
| `#ffffff54` on Black | ~7:1 | AA |
| `#ffffff36` on Black | ~4.5:1 | AA (large text) |
| White on `#8B6914` (Deep Gold) | ~8:1 | AAA |
| White on `#A67C00` (Gold) | ~6:1 | AA |
| White on `#101010` | ~18:1 | AAA |

### Color Accessibility Guidelines

| Guideline | Implementation |
|-----------|----------------|
| **Never rely on color alone** | Use icons, patterns, or text labels |
| **Maintain minimum contrast** | 4.5:1 for normal text, 3:1 for large text |
| **Test with color blindness simulators** | Ensure gold accents are distinguishable |
| **Provide focus indicators** | Use borders or outlines with gold glow effects |

---

## Color Tokens Summary

### Quick Reference Table

| Category | Token | Value |
|----------|-------|-------|
| **Background** | Primary | `#000000` |
| **Background** | Elevated | `#101010` |
| **Background** | Card | `#111111` |
| **Text** | Primary | `#FFFFFF` |
| **Text** | Secondary | `#ffffff54` |
| **Text** | Muted | `#ffffff36` |
| **Border** | Default | `#ffffff1f` |
| **Border** | Strong | `#ffffff54` |
| **Accent** | Deep Gold | `#8B6914` |
| **Accent** | Gold | `#A67C00` |
| **Accent** | Bright Gold | `#D4AF37` |
| **Interactive** | Focus | `#C9A227` |

---

## Implementation Checklist

| Item | Status | Notes |
|------|--------|-------|
| Define CSS custom properties | Pending | Use recommended structure |
| Set up color tokens in Tailwind config | Pending | Extend theme colors |
| Implement gradient utilities | Pending | Create reusable gradient classes |
| Configure blur utilities | Pending | May need custom Tailwind plugins |
| Test contrast ratios | Pending | Use accessibility tools |
| Verify glassmorphism on all browsers | Pending | Safari/Firefox backdrop-filter support |
| Create dark mode as default | Pending | Ensure proper color scheme meta tag |

---

## Related Specifications

| Document | Relationship |
|----------|--------------|
| `typography-system.md` | Uses text colors defined here |
| `ornate-text.md` | Inherits color from parent |
| `animated-underline.md` | Uses border/text colors |
| `navbar.md` | Uses background/text colors |

---

*Last Updated: January 2026*  
*Design Direction: Luxurious Golden Yellow Palette for Glamorous Aesthetic*
