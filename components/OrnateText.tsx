"use client";

import { useMemo } from "react";
import clsx from "clsx";

type SupportedElement = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";

interface OrnateTextProps {
  /**
   * The text string to render (will be converted to uppercase)
   */
  content: string;
  /**
   * Letters to render using the regular glyphs of Carl Brown (case-insensitive).
   * Supports diacritics: specifying "o" will also match "ó", "ò", "ô", etc.
   */
  ornateLetters?: string;
  /**
   * Letters to render using the alternate glyphs of Carl Brown (case-insensitive).
   * Supports diacritics: specifying "o" will also match "ó", "ò", "ô", etc.
   */
  alternateLetters?: string;
  /**
   * Additional Tailwind/CSS classes to apply to the root element
   */
  className?: string;
  /**
   * The HTML element to render (defaults to span)
   */
  as?: SupportedElement;
}

/**
 * Extracts the base letter from a character, stripping any diacritical marks.
 * Uses Unicode NFD normalization to decompose accented characters.
 * 
 * @example
 * getBaseLetter("ó") // returns "o"
 * getBaseLetter("Ñ") // returns "n"
 * getBaseLetter("é") // returns "e"
 * getBaseLetter("5") // returns "" (not a letter)
 */
function getBaseLetter(char: string): string {
  // NFD normalization decomposes characters: "ó" → "o" + combining acute accent
  const normalized = char.normalize("NFD");
  // The first code point is the base character
  const base = normalized[0];
  // Return lowercase base if it's a letter, empty string otherwise
  return /[a-z]/i.test(base) ? base.toLowerCase() : "";
}

interface Segment {
  text: string;
  type: "regular" | "ornate" | "alternate";
}

/**
 * OrnateText Component
 *
 * Applies decorative font styling to specified letters within a text string.
 * Regular glyphs use the standard Carl Brown letterforms, while alternate
 * glyphs use the stylistic alternates (accessed via OpenType features).
 *
 * The component always renders text in uppercase.
 *
 * @example
 * ```tsx
 * <OrnateText
 *   content="artistic project"
 *   ornateLetters="c"
 *   alternateLetters="o"
 *   className="text-banner-large"
 * />
 * ```
 */
export function OrnateText({
  content,
  ornateLetters = "",
  alternateLetters = "",
  className,
  as: Component = "span",
}: OrnateTextProps) {
  // Normalize letters to lowercase for case-insensitive matching
  const ornateSet = useMemo(
    () => new Set(ornateLetters.toLowerCase().split("")),
    [ornateLetters]
  );
  const alternateSet = useMemo(
    () => new Set(alternateLetters.toLowerCase().split("")),
    [alternateLetters]
  );

  // Convert content to uppercase
  const uppercaseContent = content.toUpperCase();

  // Segment the text into regular, ornate, and alternate parts
  const segments = useMemo(() => {
    const result: Segment[] = [];
    let currentSegment: Segment | null = null;

    for (const char of uppercaseContent) {
      // Extract base letter (handles diacritics: "Ó" → "o", "Ñ" → "n")
      const baseLetter = getBaseLetter(char);
      const isLetter = baseLetter !== "";

      let type: Segment["type"] = "regular";

      if (isLetter) {
        // alternateLetters takes precedence over ornateLetters
        // Match using base letter so "o" in ornateLetters matches "ó", "ò", etc.
        if (alternateSet.has(baseLetter)) {
          type = "alternate";
        } else if (ornateSet.has(baseLetter)) {
          type = "ornate";
        }
      }

      // If same type as current segment, append to it
      if (currentSegment && currentSegment.type === type) {
        currentSegment.text += char;
      } else {
        // Start a new segment
        if (currentSegment) {
          result.push(currentSegment);
        }
        currentSegment = { text: char, type };
      }
    }

    // Push the last segment
    if (currentSegment) {
      result.push(currentSegment);
    }

    return result;
  }, [uppercaseContent, ornateSet, alternateSet]);

  // Render segments
  const renderedContent = useMemo(() => {
    return segments.map((segment, index) => {
      if (segment.type === "regular") {
        // Regular text - no wrapper needed for consecutive characters
        return <span key={index}>{segment.text}</span>;
      }

      if (segment.type === "ornate") {
        // Ornate letters - wrap each character individually for proper styling
        return segment.text.split("").map((char, charIndex) => (
          <span
            key={`${index}-${charIndex}`}
            className="has-font-ornate"
          >
            {char}
          </span>
        ));
      }

      if (segment.type === "alternate") {
        // Alternate letters - render as lowercase to access alternate glyphs in Carl Brown font
        return segment.text.toLowerCase().split("").map((char, charIndex) => (
          <span
            key={`${index}-${charIndex}`}
            className="has-font-ornate-alt"
          >
            {char}
          </span>
        ));
      }

      return null;
    });
  }, [segments]);

  // For span (default), render directly
  if (Component === "span") {
    return (
      <span className={clsx("uppercase", className)}>
        {renderedContent}
      </span>
    );
  }

  // For h1-h6, handle common heading tags
  if (Component === "h1") {
    return <h1 className={clsx("uppercase", className)}>{renderedContent}</h1>;
  }
  if (Component === "h2") {
    return <h2 className={clsx("uppercase", className)}>{renderedContent}</h2>;
  }
  if (Component === "h3") {
    return <h3 className={clsx("uppercase", className)}>{renderedContent}</h3>;
  }
  if (Component === "h4") {
    return <h4 className={clsx("uppercase", className)}>{renderedContent}</h4>;
  }
  if (Component === "p") {
    return <p className={clsx("uppercase", className)}>{renderedContent}</p>;
  }
  if (Component === "div") {
    return <div className={clsx("uppercase", className)}>{renderedContent}</div>;
  }

  // Fallback to span for any other element type
  return (
    <span className={clsx("uppercase", className)}>
      {renderedContent}
    </span>
  );
}

export default OrnateText;
