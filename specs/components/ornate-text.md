# OrnateText Component

**Component Type:** Typography Enhancement / Display Text Component  
**Usage:** Hero banners, section headers, display typography throughout the site

---

## Overview

A React component that applies decorative font styling to specified letters within a text string. The component accepts plain text content and two configurable sets of letters: one set rendered using the **regular glyphs** of the ornate font (Carl Brown), and another set rendered using the **alternate glyphs** of the same font. All remaining letters use the base font (Helvetica Neue).

The component **always renders text in uppercase**, regardless of the casing provided in the content string.

This creates a distinctive visual effect where organic, hand-drawn letterforms punctuate otherwise clean, geometric typography — serving as a visual signature throughout the brand.

---

## Component Interface

The `OrnateText` component accepts the following props:

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `content` | `string` | Yes | The text string to render (will be converted to uppercase) |
| `ornateLetters` | `string` | No | Letters to render using the **regular glyphs** of Carl Brown (case-insensitive) |
| `alternateLetters` | `string` | No | Letters to render using the **alternate glyphs** of Carl Brown (case-insensitive) |
| `className` | `string` | No | Additional Tailwind/CSS classes to apply to the root element |
| `as` | `ElementType` | No | The HTML element to render (defaults to `span`) |

### Prop Behavior Notes

- If a letter appears in **both** `ornateLetters` and `alternateLetters`, the `alternateLetters` prop takes precedence
- Letters not present in either prop are rendered in the base font (Helvetica Neue)
- Both letter props perform **case-insensitive matching** — specifying `"o"` or `"O"` produces the same result
- The `content` prop accepts any casing but output is **always uppercase**

---

## Two Ornate Glyph Styles

The Carl Brown typeface provides two distinct glyph styles that can be applied independently to different letters:

### Regular Glyphs (`ornateLetters` prop)

| Characteristic | Description |
|----------------|-------------|
| **Glyph Style** | Standard letterforms from the Carl Brown typeface |
| **Visual Character** | Organic, brush-like strokes with consistent weight |
| **Best For** | Letters where subtle ornamentation is desired |

### Alternate Glyphs (`alternateLetters` prop)

| Characteristic | Description |
|----------------|-------------|
| **Glyph Style** | Stylistic alternates from the Carl Brown typeface (OpenType `salt` or `ss01` feature) |
| **Visual Character** | More decorative, playful variations with distinctive flourishes |
| **Best For** | Focal letters where maximum visual impact is desired |

### Combined Usage Example

For the text "ARTISTIC PROJECT" with `ornateLetters="c"` and `alternateLetters="o"`:

| Letter | Font Applied | Glyph Style |
|--------|--------------|-------------|
| A | Helvetica Neue | — |
| R | Helvetica Neue | — |
| T | Helvetica Neue | — |
| I | Helvetica Neue | — |
| S | Helvetica Neue | — |
| T | Helvetica Neue | — |
| I | Helvetica Neue | — |
| **C** | **Carl Brown** | **Regular** |
| (space) | — | — |
| P | Helvetica Neue | — |
| R | Helvetica Neue | — |
| **O** | **Carl Brown** | **Alternate** |
| J | Helvetica Neue | — |
| E | Helvetica Neue | — |
| **C** | **Carl Brown** | **Regular** |
| T | Helvetica Neue | — |

---

## Uppercase Rendering

The component **always converts content to uppercase** before rendering:

| Input Content | Rendered Output |
|---------------|-----------------|
| `"the artistic project"` | `THE ARTISTIC PROJECT` |
| `"The Artistic Project"` | `THE ARTISTIC PROJECT` |
| `"THE ARTISTIC PROJECT"` | `THE ARTISTIC PROJECT` |
| `"tHe ArTiStIc PrOjEcT"` | `THE ARTISTIC PROJECT` |

This ensures consistent visual presentation regardless of how content authors provide the text.

---

## Design Intent

The ornate letter pattern achieves several aesthetic goals:

| Goal | Description |
|------|-------------|
| **Visual Signature** | Creates a recognizable brand element across all display text |
| **Organic Contrast** | Introduces hand-drawn letterforms into geometric typography |
| **Layered Ornamentation** | Two glyph styles allow for nuanced decorative control |
| **Focal Points** | Draws attention to specific letters with varying intensity |
| **Editorial Sophistication** | Evokes high-end editorial and fashion typography treatments |

---

## Typography System

### Base Font

| Property | Value |
|----------|-------|
| **Family** | Helvetica Neue |
| **Style** | Regular or Light weight for display sizes |
| **Case** | Always uppercase (enforced by component) |
| **Role** | Primary text — all letters NOT specified in ornate props |

### Ornate Font

| Property | Value |
|----------|-------|
| **Family** | Carl Brown |
| **Style** | Regular weight |
| **Glyph Sets** | Regular glyphs and Alternate glyphs (accessed via OpenType features) |
| **Case** | Always uppercase (enforced by component) |
| **Role** | Decorative replacement for letters specified in either ornate prop |

---

## CSS Architecture

### Font Files and OpenType Features

The Carl Brown font must be loaded with support for alternate glyphs:

| Font Resource | Purpose |
|---------------|---------|
| **Carl Brown Regular** | Provides regular glyph set |
| **Alternate Access** | Via OpenType feature `font-feature-settings: "salt"` or `"ss01"` (stylistic set) |

### Custom Properties

| Variable | Purpose |
|----------|---------|
| `--font-base` | Helvetica Neue font stack |
| `--font-ornate` | Carl Brown font stack |

### Utility Classes

| Class | Purpose |
|-------|---------|
| `.has--font-ornate` | Applies Carl Brown with regular glyphs |
| `.has--font-ornate-alt` | Applies Carl Brown with alternate glyphs (via OpenType feature) |

### Alternate Glyph Activation

The alternate glyphs are activated through CSS OpenType features:

| Property | Value for Alternate Glyphs |
|----------|---------------------------|
| `font-feature-settings` | `"salt" 1` (stylistic alternates) or `"ss01" 1` (stylistic set 01) |

The exact feature code depends on how the Carl Brown font file exposes its alternates. Common approaches:

| Feature | Description |
|---------|-------------|
| `salt` | Stylistic Alternates — replaces default forms with alternates |
| `ss01` through `ss20` | Stylistic Sets — grouped alternative designs |
| `calt` | Contextual Alternates — automatic substitution based on context |

Consult the Carl Brown font documentation or use a font inspection tool to determine the correct feature code.

---

## Structural Output

The component generates a segmented structure where:

1. **Non-matching letters** render as text nodes or minimal wrappers (base font inherited)
2. **Regular ornate letters** are wrapped with the `.has--font-ornate` class
3. **Alternate ornate letters** are wrapped with the `.has--font-ornate-alt` class

### Element Hierarchy

| Level | Element | Purpose |
|-------|---------|---------|
| Root | Configurable via `as` prop | Container receiving `className` prop, applies uppercase |
| Segments | Text nodes or `span` elements | Regular text and decorated letters |
| Ornate Wrappers | `span` with appropriate ornate class | Individual decorated letters |

### Segmentation Example

For content `"EMOTION"` with `ornateLetters="m"` and `alternateLetters="o"`:

| Index | Type | Content | Class Applied |
|-------|------|---------|---------------|
| 0 | Regular text | "E" | (base font) |
| 1 | Alternate ornate | "O" | `.has--font-ornate-alt` |
| 2 | Regular ornate | "M" | `.has--font-ornate` |
| 3 | Alternate ornate | "O" | `.has--font-ornate-alt` |
| 4 | Regular text | "TI" | (base font) |
| 5 | Alternate ornate | "O" | `.has--font-ornate-alt` |
| 6 | Regular text | "N" | (base font) |

---

## Styling Requirements

### Root Element

| Property | Requirement |
|----------|-------------|
| **Display** | Inline or block depending on `as` prop |
| **Font Family** | Helvetica Neue (base font) |
| **Text Transform** | `uppercase` — enforced at root level |
| **Additional Classes** | Via `className` prop |

### Ornate Letter Wrappers

| Property | Requirement |
|----------|-------------|
| **Display** | `inline-block` for proper positioning |
| **Position** | `relative` for optional decorative effects |
| **Font Family** | Carl Brown |
| **Font Feature Settings** | Normal for regular, alternate feature for alternate glyphs |
| **Line Height** | Inherited from parent |
| **Letter Spacing** | Inherited from parent |

---

## Tailwind Integration

The `className` prop accepts any Tailwind utility classes:

| Category | Example Classes |
|----------|-----------------|
| Typography sizing | `text-4xl`, `text-6xl`, `text-8xl` |
| Letter spacing | `tracking-wide`, `tracking-widest` |
| Text color | `text-white`, `text-neutral-900` |
| Text alignment | `text-center`, `text-right` |
| Responsive variants | `md:text-5xl`, `lg:text-7xl` |

---

## Font Loading

### Requirements

Both fonts must be loaded before rendering to avoid layout shifts:

| Font | Loading Strategy |
|------|------------------|
| **Helvetica Neue** | `next/font/local` or system font stack |
| **Carl Brown** | `next/font/local` with OpenType feature support |

### OpenType Feature Support

Ensure the font loading configuration exposes alternate glyphs:

| Consideration | Requirement |
|---------------|-------------|
| **Font Format** | Use formats that preserve OpenType features (WOFF2, OTF) |
| **Feature Availability** | Verify the font file contains the alternate glyphs |
| **CSS Access** | Ensure `font-feature-settings` is not blocked or overridden |

---

## Content Authoring Guidelines

### Recommended Letter Combinations

| `ornateLetters` | `alternateLetters` | Effect |
|-----------------|-------------------|--------|
| — | `"o"` | Only O letters with alternate glyphs (minimal, high-impact) |
| `"c"` | `"o"` | C with regular ornate, O with alternate (recommended default) |
| `"cq"` | `"o"` | C and Q regular, O alternate (for text with Q) |
| `"ocq"` | — | All curved letters with regular ornate glyphs |
| — | `"ocq"` | All curved letters with alternate glyphs (maximum decoration) |

### Usage Contexts

| Context | Recommended |
|---------|-------------|
| Hero banners | Yes — primary use case |
| Section headers | Yes |
| Display typography | Yes |
| Taglines and slogans | Yes |
| Navigation elements | No |
| Body text | No |
| Form labels | No |
| Small text sizes | No |

### Glyph Style Selection Guidelines

| Situation | Recommendation |
|-----------|----------------|
| Single decorated letter as focal point | Use `alternateLetters` for maximum impact |
| Multiple decorated letters in one word | Mix both styles for visual rhythm |
| Subtle brand integration | Use `ornateLetters` only |
| Bold, expressive headlines | Use `alternateLetters` for key letters |
| Balanced aesthetic | Use `ornateLetters` for supporting letters, `alternateLetters` for focal letters |

---

## Letter Matching Behavior

### Case Insensitivity

Both props perform case-insensitive matching (since output is always uppercase anyway):

| Prop Value | Matches in Content |
|------------|-------------------|
| `"o"` | "O", "o" |
| `"OCQ"` | "O", "o", "C", "c", "Q", "q" |

### Precedence Rules

| Scenario | Result |
|----------|--------|
| Letter in `alternateLetters` only | Alternate glyphs applied |
| Letter in `ornateLetters` only | Regular ornate glyphs applied |
| Letter in both props | `alternateLetters` takes precedence |
| Letter in neither prop | Base font (Helvetica Neue) |

### Character Types

| Character Type | Behavior |
|----------------|----------|
| Letters (A-Z) | Eligible for ornate styling |
| Numbers (0-9) | Never matched — remain in base font |
| Punctuation | Never matched — remain in base font |
| Spaces | Preserved, no styling applied |

---

## Accessibility Considerations

### Screen Reader Compatibility

| Requirement | Implementation |
|-------------|----------------|
| **Text Preservation** | Letter content remains as text nodes |
| **No ARIA Overrides** | Wrappers don't alter screen reader interpretation |
| **Semantic Structure** | Heading hierarchy preserved when using `as` prop |

### Visual Accessibility

| Consideration | Approach |
|---------------|----------|
| **Contrast Ratios** | Both fonts must meet WCAG requirements |
| **Font Sizing** | Apply only at legible display sizes |
| **Reduced Motion** | Respect `prefers-reduced-motion` for any animations |

---

## Animation Integration

The segmented structure supports the letter-by-letter animation system:

| Integration Point | Description |
|-------------------|-------------|
| **Staggered Reveal** | Each segment can animate independently |
| **Blur-In Effects** | Parent container supports animation attributes |
| **Word Animation** | Segments can receive `.word` class for targeting |

---

## Edge Cases

### Empty or Missing Props

| Scenario | Behavior |
|----------|----------|
| Empty `content` | Render empty element |
| Both ornate props empty/missing | Render as plain uppercase text |
| Only `ornateLetters` provided | Regular ornate glyphs only |
| Only `alternateLetters` provided | Alternate glyphs only |

### Special Content

| Scenario | Behavior |
|----------|----------|
| No matching letters | Plain uppercase text |
| All letters match | All letters ornamented |
| Line breaks in content | Preserved |
| Multiple spaces | Preserved |
| Numbers in content | Rendered in base font, never matched |

---

## Performance Considerations

### DOM Complexity

| Concern | Mitigation |
|---------|------------|
| **Node Count** | Acceptable for display text |
| **Hydration** | Server-render where possible |
| **Re-renders** | Memoize if props are stable |

### Font Optimization

| Optimization | Purpose |
|--------------|---------|
| **Subsetting** | Include only needed glyphs if licensing permits |
| **Critical CSS** | Include font-face in critical CSS |
| **Preloading** | Preload for above-the-fold content |

---

## Testing Checklist

| Test Case | Expected Behavior |
|-----------|-------------------|
| Only `ornateLetters` specified | Regular ornate glyphs applied |
| Only `alternateLetters` specified | Alternate glyphs applied |
| Both props specified | Each set styled correctly |
| Same letter in both props | `alternateLetters` takes precedence |
| Lowercase input content | Rendered as uppercase |
| Mixed case input content | Rendered as uppercase |
| No matching letters | Plain uppercase text |
| Numbers in content | Remain in base font |
| Custom `className` | Applied to root element |
| Custom `as` prop | Correct element rendered |
| Screen reader testing | Text reads naturally |
| Alternate glyph rendering | OpenType feature activates correctly |
| Font loading | No layout shift |

---

## Visual Reference

```
Input:
  content="artistic project"
  ornateLetters="c"
  alternateLetters="o"

Output (rendered uppercase):
┌──────────────────────────────────────────┐
│     ARTISTI●  PR◆JE●T                    │
└──────────────────────────────────────────┘
            ↑    ↑  ↑
            C    O  C
         (reg) (alt) (reg)

Legend:
  Regular text = Helvetica Neue
  ● = Carl Brown regular glyph
  ◆ = Carl Brown alternate glyph
```

### Glyph Style Comparison

```
Helvetica Neue:     Carl Brown Regular:     Carl Brown Alternate:

      O                    O                       O
    ┌───┐                ╭───╮                   ╭~~~╮
    │   │                │   │                   │   │
    └───┘                ╰───╯                   ╰~~~╯
  (geometric)         (organic)            (decorative flourish)

      C                    C                       C
    ┌──                  ╭──                     ╭~~
    │                    │                       │
    └──                  ╰──                     ╰~~
  (geometric)         (organic)            (decorative flourish)
```

---

## Related Components

| Component | Relationship |
|-----------|--------------|
| **Animated Underline** | Can wrap links containing `OrnateText` |
| **Letter Animation System** | Output structure supports staggered animations |

---

*Last Updated: January 2026*  
*Source: Analysis of <https://naya-studio-dubai.webflow.io>*
