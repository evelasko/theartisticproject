"use client";

import { ReactNode } from "react";
import clsx from "clsx";
import { OrnateText } from "./elements/OrnateText";

/* ==========================================================================
   SHARED TYPES
   ========================================================================== */

interface BaseTypographyProps {
  children: ReactNode;
  className?: string;
}

interface OrnateTypographyProps {
  content: string;
  ornateLetters?: string;
  alternateLetters?: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

/* ==========================================================================
   H1 - HERO DISPLAY
   Uses Carl Brown font for the entire text
   ========================================================================== */

/**
 * H1 Component - Hero display text
 *
 * Uses the Carl Brown display font. For selective ornate letters,
 * use the OrnateText component directly.
 *
 * @example
 * ```tsx
 * <H1>cube studio</H1>
 * ```
 */
export function H1({ children, className }: BaseTypographyProps) {
  return (
    <h1 className={clsx("text-h1", className)}>
      {children}
    </h1>
  );
}

/* ==========================================================================
   BANNER LARGE (H2) - WITH ORNATE SUPPORT
   ========================================================================== */

/**
 * BannerLarge Component - Large display heading
 *
 * Uses Helvetica Neue Thin with support for ornate letters.
 *
 * @example
 * ```tsx
 * <BannerLarge
 *   content="design that blooms into emotion"
 *   alternateLetters="o"
 * />
 * ```
 */
export function BannerLarge({
  content,
  ornateLetters,
  alternateLetters = "o",
  className,
  as = "h2",
}: OrnateTypographyProps) {
  return (
    <OrnateText
      content={content}
      ornateLetters={ornateLetters}
      alternateLetters={alternateLetters}
      className={clsx("text-banner-large", className)}
      as={as}
    />
  );
}

/* ==========================================================================
   BANNER MEDIUM (H2) - WITH ORNATE SUPPORT
   ========================================================================== */

/**
 * BannerMedium Component - Medium display heading
 *
 * Uses Helvetica Neue Thin with support for ornate letters.
 *
 * @example
 * ```tsx
 * <BannerMedium
 *   content="let's make the moment blossom"
 *   alternateLetters="o"
 * />
 * ```
 */
export function BannerMedium({
  content,
  ornateLetters = "o",
  alternateLetters,
  className,
  as = "h2",
}: OrnateTypographyProps) {
  return (
    <OrnateText
      content={content}
      ornateLetters={ornateLetters}
      alternateLetters={alternateLetters}
      className={clsx("text-banner-medium", className)}
      as={as}
    />
  );
}

/* ==========================================================================
   HEADING SMALL (H3) - WITH ORNATE SUPPORT
   ========================================================================== */

/**
 * HeadingSmall Component - Small heading with ornate letters
 *
 * Uses Helvetica Neue Thin with support for ornate letters.
 *
 * @example
 * ```tsx
 * <HeadingSmall
 *   content="Quality, that lasts"
 *   alternateLetters="o"
 * />
 * ```
 */
export function HeadingSmall({
  content,
  ornateLetters,
  alternateLetters = "o",
  className,
  as = "h3",
}: OrnateTypographyProps) {
  return (
    <OrnateText
      content={content}
      ornateLetters={ornateLetters}
      alternateLetters={alternateLetters}
      className={clsx("text-heading-small", className)}
      as={as}
    />
  );
}

/* ==========================================================================
   H3 PLAIN - STANDARD HEADING
   ========================================================================== */

/**
 * H3 Component - Standard heading without ornate styling
 *
 * Uses Helvetica Neue Regular weight.
 *
 * @example
 * ```tsx
 * <H3>Omar</H3>
 * ```
 */
export function H3({ children, className }: BaseTypographyProps) {
  return (
    <h3 className={clsx("text-h3-plain", className)}>
      {children}
    </h3>
  );
}

/* ==========================================================================
   TEXT LARGE
   ========================================================================== */

/**
 * TextLarge Component - Large body text
 *
 * Prominent body text for CTAs and important content.
 *
 * @example
 * ```tsx
 * <TextLarge>Plan Your Event</TextLarge>
 * ```
 */
export function TextLarge({ children, className }: BaseTypographyProps) {
  return (
    <p className={clsx("text-large", className)}>
      {children}
    </p>
  );
}

/* ==========================================================================
   TEXT MEDIUM
   ========================================================================== */

/**
 * TextMedium Component - Medium body text
 *
 * Enhanced body text for descriptions and quotes.
 *
 * @example
 * ```tsx
 * <TextMedium>Everything was delivered on time and with zero stress.</TextMedium>
 * ```
 */
export function TextMedium({ children, className }: BaseTypographyProps) {
  return (
    <p className={clsx("text-medium", className)}>
      {children}
    </p>
  );
}

/* ==========================================================================
   TEXT SMALL
   ========================================================================== */

/**
 * TextSmall Component - Standard body text
 *
 * Primary body text style.
 *
 * @example
 * ```tsx
 * <TextSmall>Low-maintenance, high-quality artificial plants</TextSmall>
 * ```
 */
export function TextSmall({ children, className }: BaseTypographyProps) {
  return (
    <p className={clsx("text-small", className)}>
      {children}
    </p>
  );
}

/* ==========================================================================
   TEXT SMALL MUTED
   ========================================================================== */

/**
 * TextSmallMuted Component - Secondary body text
 *
 * De-emphasized text for metadata and supporting content.
 *
 * @example
 * ```tsx
 * <TextSmallMuted>(01)</TextSmallMuted>
 * ```
 */
export function TextSmallMuted({ children, className }: BaseTypographyProps) {
  return (
    <p className={clsx("text-small-muted", className)}>
      {children}
    </p>
  );
}

/* ==========================================================================
   SUBHEADING
   ========================================================================== */

/**
 * Subheading Component - Supporting text for headings
 *
 * Positioned below display headings.
 *
 * @example
 * ```tsx
 * <Subheading>capabilities</Subheading>
 * ```
 */
export function Subheading({ children, className }: BaseTypographyProps) {
  return (
    <p className={clsx("text-subheading", className)}>
      {children}
    </p>
  );
}

/* ==========================================================================
   HEADING PARAGRAPH
   ========================================================================== */

/**
 * HeadingParagraph Component - Independent paragraph heading style
 *
 * Same styling as subheading but semantically independent.
 *
 * @example
 * ```tsx
 * <HeadingParagraph>
 *   What fades in form can still remain in feeling.
 * </HeadingParagraph>
 * ```
 */
export function HeadingParagraph({ children, className }: BaseTypographyProps) {
  return (
    <p className={clsx("text-heading-paragraph", className)}>
      {children}
    </p>
  );
}
