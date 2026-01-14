# Typography System Specification

**Document Type:** Design System / Typography Reference  
**Usage:** Foundation for all text styling across the website  
**Inspiration Source:** [Naya Studio Dubai](https://naya-studio-dubai.webflow.io/)

---

## Overview

This specification defines the comprehensive typography system for The Artistic Project website. The system establishes a hierarchy of text styles that create visual distinction between primary display text (using ornate letterforms) and supporting content (using geometric sans-serif typography).

The typography system is built on two font families that work in contrast: an organic, hand-drawn display typeface for impact and brand recognition, and a refined sans-serif for readability and elegance.

---

## Font System

### Primary Display Font

| Property | Value |
|----------|-------|
| **Family** | Carl Brown |
| **Classification** | Display / Decorative Script |
| **Character** | Organic, brush-like strokes with hand-drawn quality |
| **Formats** | WOFF2 (primary) |
| **Weights Available** | 400 (Regular) |
| **OpenType Features** | Stylistic alternates (`salt`), Stylistic sets (`ss01`) |
| **Usage** | Hero text, large display headings, brand signatures |

### Primary Body Font

| Property | Value |
|----------|-------|
| **Family** | Helvetica Neue |
| **Classification** | Neo-grotesque Sans-serif |
| **Character** | Clean, geometric, refined |
| **Formats** | WOFF2 (primary) |
| **Weights Available** | 100 (Thin), 400 (Regular), 500 (Medium) |
| **Usage** | All body text, subheadings, navigation, UI elements |

### Font Stack Fallbacks

| Font Family | Fallback Stack |
|-------------|----------------|
| Carl Brown | `Carl Brown, Arial, sans-serif` |
| Helvetica Neue | `Helvetica Neue, Arial, sans-serif` |

---

## Global Typography Settings

### Base Body Styles

| Property | Value | Notes |
|----------|-------|-------|
| **Font Family** | Helvetica Neue | Primary body typeface |
| **Font Size** | `0.73vw` | Viewport-relative sizing |
| **Font Weight** | 400 | Regular weight |
| **Line Height** | 110.6% | Tight line height for uppercase |
| **Text Color** | `#FFFFFF` | White on dark backgrounds |
| **Text Transform** | `uppercase` | Site-wide default |
| **Background** | `#000000` | Black background |

### Base Typography CSS Custom Properties

| Variable | Purpose | Suggested Value |
|----------|---------|-----------------|
| `--font-display` | Display/ornate typeface | `Carl Brown, Arial, sans-serif` |
| `--font-body` | Body text typeface | `Helvetica Neue, Arial, sans-serif` |
| `--color-text-primary` | Primary text color | `#FFFFFF` |
| `--color-text-muted` | Reduced opacity text | `rgba(255, 255, 255, 0.33)` |
| `--color-background` | Background color | `#000000` |

---

## Display Typography Classes

These classes use the `OrnateText` component for selective letter ornamentation (see `ornate-text.md` specification).

### h1

The primary hero display style for the largest text elements on the page.

| Property | Desktop Value | Tablet (≤991px) | Mobile (≤767px) |
|----------|---------------|-----------------|-----------------|
| **Font Family** | Carl Brown | Carl Brown | Carl Brown |
| **Font Size** | `20vw` | `144vw` | `144vw` |
| **Font Weight** | 400 | 400 | 400 |
| **Line Height** | 110.6% | 110.6% | 110.6% |
| **Letter Spacing** | `-0.02em` | `-0.02em` | `-0.02em` |
| **Text Transform** | none | none | none |
| **Text Color** | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |

#### Visual Characteristics

- Full-width hero text that dominates the viewport
- Uses Carl Brown exclusively for all letters
- Negative letter-spacing creates tight, impactful appearance
- May include masked/overlay effects for visual depth

#### Usage Context

- Hero sections
- Full-screen landing statements
- Brand name treatments

---

### banner-large (H2)

Large display headings for section openers and major content dividers.

| Property | Desktop Value | Tablet (≤991px) | Mobile (≤767px) |
|----------|---------------|-----------------|-----------------|
| **Font Family** | Helvetica Neue | Helvetica Neue | Helvetica Neue |
| **Font Size** | `13.54vw` | `14.93vw` | `14.93vw` |
| **Font Weight** | 100 (Thin) | 100 (Thin) | 100 (Thin) |
| **Line Height** | 76% | 76% | 76% |
| **Letter Spacing** | `-0.02em` | `-0.02em` | `-0.02em` |
| **Text Transform** | uppercase (inherited) | uppercase | uppercase |
| **Padding Top** | `1.35vw` | — | — |

#### Visual Characteristics

- Ultra-thin weight creates elegant, refined appearance
- Very tight line-height for stacked multi-line treatments
- Negative letter-spacing increases density
- Uses `OrnateText` component for selective Carl Brown letters

#### Ornate Letter Configuration

| Property | Recommended Value |
|----------|-------------------|
| `ornateLetters` | — |
| `alternateLetters` | `"o"` |

---

### banner-medium (H2)

Medium-scale display headings for secondary section titles.

| Property | Desktop Value | Tablet (≤991px) | Mobile (≤767px) |
|----------|---------------|-----------------|-----------------|
| **Font Family** | Helvetica Neue | Helvetica Neue | Helvetica Neue |
| **Font Size** | `7.3vw` | `10.66vw` | `10.66vw` |
| **Font Weight** | 100 (Thin) | 100 (Thin) | 100 (Thin) |
| **Line Height** | 80% | 80% | 80% |
| **Letter Spacing** | `-0.02em` | `-0.02em` | `-0.02em` |
| **Text Transform** | uppercase (inherited) | uppercase | uppercase |
| **Padding Top** | `0.9vw` | — | — |
| **Margin Bottom** | `-0.9vw` | — | — |

#### Visual Characteristics

- Balanced scale between large display and standard headings
- Maintains thin weight aesthetic
- Vertical adjustments (padding/margin) for optical alignment
- Uses `OrnateText` component for selective Carl Brown letters

#### Ornate Letter Configuration

| Property | Recommended Value |
|----------|-------------------|
| `ornateLetters` | — |
| `alternateLetters` | `"o"` |

#### Modifier Classes

| Class | Effect |
|-------|--------|
| `.has--align-right` | Right-aligned text |
| `.has--margin-bottom` | Margin bottom `-1vw` |
| `.has--margin-right` | Margin right `18.85vw` (desktop), `27.6vw` (tablet) |
| `.has--font-helvetica` | Forces Helvetica Neue, width 90%, line-height 84% |
| `.is--larger_mobile` | Font size `15vw` on tablet/mobile |

---

## Heading Typography Classes

Standard heading styles for content sections.

### h3 (with ornaments)

Display-style H3 headings that use the `OrnateText` component.

| Property | Desktop Value | Tablet (≤991px) | Mobile (≤767px) |
|----------|---------------|-----------------|-----------------|
| **Font Family** | Helvetica Neue | Helvetica Neue | Helvetica Neue |
| **Font Size** | `2.9vw` | `6.4vw` | `6.4vw` |
| **Font Weight** | 100 (Thin) | 100 (Thin) | 100 (Thin) |
| **Line Height** | 86% | 86% | 86% |
| **Letter Spacing** | normal | normal | normal |
| **Text Transform** | uppercase (inherited) | uppercase | uppercase |

#### Visual Characteristics

- Maintains thin weight for consistency with larger headings
- Tight line-height for multi-line treatments
- Uses `OrnateText` component for selective Carl Brown letters

#### Ornate Letter Configuration

| Property | Recommended Value |
|----------|-------------------|
| `ornateLetters` | — |
| `alternateLetters` | `"o"` |

#### Modifier Classes

| Class | Effect |
|-------|--------|
| `.has--top-padding` | Padding top `0.3vw` |
| `.is--mob-larger` | Letter spacing `-0.04em`, font size `8.8vw` on tablet/mobile |

---

### h3 (plain)

Standard H3 headings without ornate letter treatment.

| Property | Desktop Value | Tablet (≤991px) | Mobile (≤767px) |
|----------|---------------|-----------------|-----------------|
| **Font Family** | Helvetica Neue | Helvetica Neue | Helvetica Neue |
| **Font Size** | `1.7rem` | `1.7rem` | `1.25rem` |
| **Font Weight** | 400 | 400 | 400 |
| **Line Height** | 115% | 115% | 115% |
| **Letter Spacing** | normal | normal | normal |
| **Text Transform** | uppercase (inherited) | uppercase | uppercase |

#### Visual Characteristics

- Regular weight provides stronger presence
- Used in contexts where ornate styling is not appropriate
- More generous line-height than display styles

#### Usage Context

- Testimonial author names
- Card titles
- List item headings
- Any H3 where ornate letters would be inappropriate

---

## Text Typography Classes

Body text styles for content paragraphs and descriptive text.

### subheading

Introductory text that appears below major headings.

| Property | Desktop Value | Tablet (≤991px) | Mobile (≤767px) |
|----------|---------------|-----------------|-----------------|
| **Font Family** | Helvetica Neue | Helvetica Neue | Helvetica Neue |
| **Font Size** | `0.73vw` | `3.2vw` | `3.2vw` |
| **Font Weight** | 400 | 400 | 400 |
| **Line Height** | 110.6% | 110.6% | 110.6% |
| **Letter Spacing** | normal | normal | normal |
| **Text Transform** | uppercase (inherited) | uppercase | uppercase |
| **Text Color** | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |

#### Visual Characteristics

- Matches base body text sizing
- Full opacity for prominence
- Positioned as supporting text for display headings

---

### heading (text paragraph style)

Independent paragraph style for prominent descriptive text.

| Property | Desktop Value | Tablet (≤991px) | Mobile (≤767px) |
|----------|---------------|-----------------|-----------------|
| **Font Family** | Helvetica Neue | Helvetica Neue | Helvetica Neue |
| **Font Size** | `0.73vw` | `3.2vw` | `3.2vw` |
| **Font Weight** | 400 | 400 | 400 |
| **Line Height** | 110.6% | 110.6% | 110.6% |
| **Letter Spacing** | normal | normal | normal |
| **Text Transform** | uppercase (inherited) | uppercase | uppercase |
| **Text Color** | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |

#### Visual Characteristics

- Identical to subheading but semantically independent
- Can be used without an associated heading
- Provides flexibility in content hierarchy

---

### text-small

Standard small text for body content, descriptions, and UI elements.

| Property | Desktop Value | Tablet (≤991px) | Mobile (≤767px) |
|----------|---------------|-----------------|-----------------|
| **Font Family** | Helvetica Neue | Helvetica Neue | Helvetica Neue |
| **Font Size** | `0.73vw` | `3.2vw` | `3.2vw` |
| **Font Weight** | 400 | 400 | 400 |
| **Line Height** | 110.6% | 110.6% | 110.6% |
| **Letter Spacing** | normal | normal | normal |
| **Text Transform** | uppercase (inherited) | uppercase | uppercase |
| **Text Color** | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |

#### Visual Characteristics

- Primary body text style
- Compact but readable
- Works well with uppercase transformation

#### Modifier Classes

| Class | Effect |
|-------|--------|
| `.has--align-center` | Centered text alignment |
| `.has--max-width-medium` | Max width `41.6vw` (desktop), `69vw` (tablet) |
| `.has--max-width-small` | Max width `11.8vw` (desktop), none (tablet) |
| `.is--separated` | Text centered, margin bottom `-5.3vw` (desktop), `13vw` (tablet) |
| `.has--larger-height` | Line height `140%` |
| `.is--filter` | Margin top `0.2vw`, font size `3.75vw` (tablet) |
| `.is--blog` | Width `27vw`, margin top `7.3vw` |

---

### text-small-muted

Reduced-emphasis small text for secondary information.

| Property | Desktop Value | Tablet (≤991px) | Mobile (≤767px) |
|----------|---------------|-----------------|-----------------|
| **Font Family** | Helvetica Neue | Helvetica Neue | Helvetica Neue |
| **Font Size** | `0.73vw` | `3.2vw` | `3.2vw` |
| **Font Weight** | 400 | 400 | 400 |
| **Line Height** | 110.6% | 110.6% | 110.6% |
| **Letter Spacing** | normal | normal | normal |
| **Text Transform** | uppercase (inherited) | uppercase | uppercase |
| **Text Color** | `rgba(255, 255, 255, 0.33)` | `rgba(255, 255, 255, 0.33)` | `rgba(255, 255, 255, 0.33)` |
| **Opacity** | 1 (color handles opacity) | 1 | 1 |

#### Visual Characteristics

- Same dimensions as text-small
- Reduced color opacity (`#ffffff54` ≈ 33% opacity)
- For supporting details, metadata, secondary labels

#### CSS Implementation Note

The muted appearance uses color opacity rather than the CSS opacity property, preserving any child element visibility.

---

### text-medium

Medium-sized body text for enhanced readability in longer content.

| Property | Desktop Value | Tablet (≤991px) | Mobile (≤767px) |
|----------|---------------|-----------------|-----------------|
| **Font Family** | Helvetica Neue | Helvetica Neue | Helvetica Neue |
| **Font Size** | `1.25vw` | `4.53vw` | `4.53vw` |
| **Font Weight** | 400 | 400 | 400 |
| **Line Height** | 115% | 115% | 115% |
| **Letter Spacing** | normal | normal | normal |
| **Text Transform** | uppercase (inherited) | uppercase | uppercase |
| **Text Color** | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |

#### Visual Characteristics

- Larger than text-small for improved readability
- Slightly more generous line-height
- Suitable for testimonial quotes, extended descriptions

---

### text-large

Large body text for prominent descriptive content.

| Property | Desktop Value | Tablet (≤991px) | Mobile (≤767px) |
|----------|---------------|-----------------|-----------------|
| **Font Family** | Helvetica Neue | Helvetica Neue | Helvetica Neue |
| **Font Size** | `1.71vw` | `5.33vw` | `5.33vw` |
| **Font Weight** | 400 | 400 | 400 |
| **Line Height** | 115% | 115% | 115% |
| **Letter Spacing** | normal | normal | normal |
| **Text Transform** | uppercase (inherited) | uppercase | uppercase |
| **Text Color** | `#FFFFFF` | `#FFFFFF` | `#FFFFFF` |

#### Visual Characteristics

- Largest body text style
- Draws attention without competing with headings
- Ideal for call-to-action text, prominent links

#### Modifier Classes

| Class | Effect |
|-------|--------|
| `.has--max-width-small` | Max width `14vw` (desktop), `62vw` (tablet) |
| `.is--larger_mob` | Font size `6.4vw` on tablet |

---

## Utility Typography Classes

### Font Weight Utilities

| Class | Property | Value |
|-------|----------|-------|
| `.has--weight-light` | font-weight | 300 |

### Font Family Utilities

| Class | Property | Value |
|-------|----------|-------|
| `.has--font-carl` | font-family | `Carl Brown, Arial, sans-serif` |
| `.has--font-carl.has--no-caps` | text-transform | none |

### Color Utilities

| Class | Property | Value |
|-------|----------|-------|
| `.has--color-white` | color | `#FFFFFF` |
| `.has--color-grey` | color | `gray` |
| `.has--low-opacity` | color | `rgba(255, 255, 255, 0.33)` |

### Alignment Utilities

| Class | Property | Value |
|-------|----------|-------|
| `.has--align-center` | text-align | center |
| `.has--align-right` | text-align | right |

---

## Responsive Breakpoints

The typography system uses three responsive breakpoints aligned with Webflow's default breakpoints:

| Breakpoint Name | Max Width | Description |
|-----------------|-----------|-------------|
| Desktop | > 991px | Default styles, largest viewport |
| Tablet | ≤ 991px | Medium screens, touch-friendly |
| Mobile | ≤ 767px | Small screens, mobile-first priority |
| Mobile Portrait | ≤ 479px | Smallest screens (if additional adjustments needed) |

### Responsive Typography Scaling

| Style | Desktop | Tablet | Mobile |
|-------|---------|--------|--------|
| body | `0.73vw` | `3.73vw` | `3.73vw` |
| h1 | `20vw` | `144vw` | `144vw` |
| banner-large | `13.54vw` | `14.93vw` | `14.93vw` |
| banner-medium | `7.3vw` | `10.66vw` | `10.66vw` |
| h3 ornate | `2.9vw` | `6.4vw` | `6.4vw` |
| h3 plain | `1.7rem` | `1.7rem` | `1.25rem` |
| text-small | `0.73vw` | `3.2vw` | `3.2vw` |
| text-medium | `1.25vw` | `4.53vw` | `4.53vw` |
| text-large | `1.71vw` | `5.33vw` | `5.33vw` |

---

## Typography Hierarchy Summary

| Level | Class | Size (Desktop) | Weight | Use Case |
|-------|-------|----------------|--------|----------|
| 1 | `h1` | 20vw | 400 | Hero/brand statements |
| 2 | `banner-large` | 13.54vw | 100 | Major section titles |
| 3 | `banner-medium` | 7.3vw | 100 | Secondary section titles |
| 4 | `h3` (ornate) | 2.9vw | 100 | Subsection titles with brand flair |
| 5 | `h3` (plain) | 1.7rem | 400 | Standard subsection titles |
| 6 | `text-large` | 1.71vw | 400 | Prominent body text, CTAs |
| 7 | `text-medium` | 1.25vw | 400 | Extended descriptions |
| 8 | `text-small` | 0.73vw | 400 | Standard body text |
| 9 | `text-small-muted` | 0.73vw | 400 | Secondary/meta information |

---

## OrnateText Component Integration

The following typography classes are designed to be rendered using the `OrnateText` component (see `ornate-text.md` specification):

| Class | Component Usage | Recommended `alternateLetters` |
|-------|-----------------|-------------------------------|
| `h1` | Required | `"o"` (varies by content) |
| `banner-large` | Required | `"o"` |
| `banner-medium` | Required | `"o"` |
| `h3` (ornate variant) | Required | `"o"` |

### OrnateText Typography Properties

When using `OrnateText`, the component handles:

1. **Uppercase transformation** — applied automatically to all content
2. **Font family switching** — between Helvetica Neue and Carl Brown per letter
3. **OpenType feature activation** — for alternate glyphs when specified

The parent container should provide:

- Font size
- Font weight
- Line height
- Letter spacing
- Color
- Any responsive adjustments

---

## Implementation Notes

### Font Loading Strategy

| Priority | Font | Weight | Reason |
|----------|------|--------|--------|
| Critical | Helvetica Neue | 100 | Hero display text |
| Critical | Carl Brown | 400 | Ornate letter accents |
| High | Helvetica Neue | 400 | Primary body text |
| Normal | Helvetica Neue | 500 | Interactive elements |

### Preload Recommendations

Preload the following fonts for above-the-fold content:

1. Helvetica Neue Thin (weight 100) — for display headings
2. Carl Brown Regular (weight 400) — for ornate letters
3. Helvetica Neue Regular (weight 400) — for body text

### Performance Considerations

| Consideration | Recommendation |
|---------------|----------------|
| **Font subsetting** | Consider subsetting if licensing permits |
| **Font-display** | Use `swap` to prevent invisible text |
| **Viewport units** | Use `clamp()` for min/max bounds on vw values |
| **CSS containment** | Apply to typography wrappers for layout optimization |

---

## Accessibility Guidelines

### Minimum Font Sizes

Despite viewport-relative sizing, ensure minimum readable sizes:

| Style | Minimum Size | Notes |
|-------|--------------|-------|
| text-small | 12px | Check on smallest supported viewport |
| text-medium | 14px | Body text minimum |
| text-large | 16px | Prominent text minimum |

### Color Contrast

| Text Style | Background | Contrast Ratio | WCAG Level |
|------------|------------|----------------|------------|
| Primary (#FFFFFF) | #000000 | 21:1 | AAA |
| Muted (#ffffff54) | #000000 | ~7:1 | AA |

### Reading Considerations

| Guideline | Implementation |
|-----------|----------------|
| **Line length** | Use max-width utilities to limit characters per line |
| **Letter spacing** | Negative spacing should not impair character recognition |
| **Text transform** | Uppercase may reduce readability; use sparingly for long text |

---

## Related Specifications

| Document | Relationship |
|----------|--------------|
| `ornate-text.md` | Component for rendering selective ornate letters |
| `animated-underline.md` | Link decoration that works with text styles |
| `navbar.md` | Navigation typography (uses text-small) |

---

*Last Updated: January 2026*  
*Source: Analysis of [Naya Studio Dubai](https://naya-studio-dubai.webflow.io/)*
