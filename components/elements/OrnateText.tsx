"use client";

import { useMemo } from "react";
import clsx from "clsx";
import { motion, Variants, Transition, useReducedMotion } from "framer-motion";

type SupportedElement = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";

/**
 * Animatable CSS properties supported by the stagger animation.
 * These properties can be animated from an initial state to a target state.
 */
export interface AnimatableProperties {
  /** Opacity value (0-1) */
  opacity?: number;
  /** Y-axis translation in pixels or percentage string (e.g., "100%") */
  y?: number | string;
  /** X-axis translation in pixels or percentage string */
  x?: number | string;
  /** Scale factor (1 = normal size) */
  scale?: number;
  /** Rotation in degrees */
  rotate?: number;
  /** Blur amount in pixels */
  filter?: string;
  /** Text color (CSS color value) */
  color?: string;
}

/**
 * Configuration for staggered text animations.
 * Can be used for both reveal (viewport entry) and hover animations.
 */
export interface StaggerAnimationConfig {
  /**
   * Initial state of each character before animation.
   * @default { opacity: 0 }
   */
  from?: AnimatableProperties;
  /**
   * Target state of each character after animation.
   * @default { opacity: 1 }
   */
  to?: AnimatableProperties;
  /**
   * Duration of animation for each character in seconds.
   * @default 0.3
   */
  duration?: number;
  /**
   * Delay between each character's animation start in seconds.
   * @default 0.03
   */
  stagger?: number;
  /**
   * Easing function for the animation.
   * Can be a string (e.g., "easeInOut") or an array of bezier values.
   * @default "easeOut"
   */
  ease?: string | number[];
  /**
   * Initial delay before the first character starts animating in seconds.
   * @default 0
   */
  delay?: number;
  /**
   * Whether to animate characters in reverse order (last to first).
   * @default false
   */
  reverse?: boolean;
  /**
   * For reveal animations: amount of element that must be visible to trigger.
   * Value between 0 and 1 (e.g., 0.5 = 50% visible).
   * @default 0.2
   */
  viewportAmount?: number;
  /**
   * For reveal animations: whether to only animate once.
   * @default true
   */
  once?: boolean;
}

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
  /**
   * Configuration for reveal animation (triggers when element enters viewport).
   * When provided, the text will animate character by character as it scrolls into view.
   */
  revealAnimation?: StaggerAnimationConfig;
  /**
   * Configuration for hover animation (triggers on mouse hover).
   * When provided, the text will animate character by character on hover.
   */
  hoverAnimation?: StaggerAnimationConfig;
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

// Default animation configurations
const DEFAULT_REVEAL_CONFIG: Required<Omit<StaggerAnimationConfig, 'from' | 'to'>> & Pick<StaggerAnimationConfig, 'from' | 'to'> = {
  from: { opacity: 0, y: 20 },
  to: { opacity: 1, y: 0 },
  duration: 0.4,
  stagger: 0.03,
  ease: "easeOut",
  delay: 0,
  reverse: false,
  viewportAmount: 0.2,
  once: true,
};

const DEFAULT_HOVER_CONFIG: Required<Omit<StaggerAnimationConfig, 'from' | 'to'>> & Pick<StaggerAnimationConfig, 'from' | 'to'> = {
  from: { y: 0 },
  to: { y: -8 },
  duration: 0.25,
  stagger: 0.025,
  ease: "easeInOut",
  delay: 0,
  reverse: false,
  viewportAmount: 0.2,
  once: true,
};

/**
 * Creates Framer Motion variants for a character at a specific index.
 */
function createCharacterVariants(
  index: number,
  totalChars: number,
  config: StaggerAnimationConfig,
  type: "reveal" | "hover",
  defaults: typeof DEFAULT_REVEAL_CONFIG
): { variants: Variants; transition: Transition } {
  const mergedConfig = { ...defaults, ...config };
  const { from, to, duration, stagger, ease, delay, reverse } = mergedConfig;

  const charIndex = reverse ? totalChars - 1 - index : index;
  const charDelay = delay + stagger * charIndex;

  // Include transition INSIDE each variant for proper parent-child propagation
  const transition: Transition = {
    duration,
    ease: ease as Transition["ease"],
    delay: charDelay,
  };

  const variants: Variants = {
    initial: (from || {}) as Variants["initial"],
    [type === "reveal" ? "visible" : "hovered"]: {
      ...(to || {}),
      transition, // Transition must be inside the variant for propagation to work
    } as Variants["visible"],
  };

  // For hover animations, we need to return to initial state when not hovering
  if (type === "hover") {
    variants.initial = (from || {}) as Variants["initial"];
  }

  return { variants, transition };
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
 * Supports optional staggered animations for:
 * - Reveal: Animates when entering the viewport
 * - Hover: Animates on mouse hover
 *
 * @example
 * ```tsx
 * // Basic usage with ornate letters
 * <OrnateText
 *   content="artistic project"
 *   ornateLetters="c"
 *   alternateLetters="o"
 *   className="text-banner-large"
 * />
 * 
 * // With reveal animation
 * <OrnateText
 *   content="hello world"
 *   revealAnimation={{
 *     from: { opacity: 0, y: 20 },
 *     to: { opacity: 1, y: 0 },
 *     duration: 0.4,
 *     stagger: 0.03,
 *   }}
 * />
 * 
 * // With hover animation
 * <OrnateText
 *   content="hover me"
 *   hoverAnimation={{
 *     from: { color: "#ffffff" },
 *     to: { color: "#D4AF37" },
 *     duration: 0.25,
 *     stagger: 0.02,
 *   }}
 * />
 * ```
 */
export function OrnateText({
  content,
  ornateLetters = "",
  alternateLetters = "",
  className,
  as: Component = "span",
  revealAnimation,
  hoverAnimation,
}: OrnateTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const hasAnimation = !prefersReducedMotion && (revealAnimation || hoverAnimation);

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

  // Create array of characters with their types for animation
  const characters = useMemo(() => {
    return [...uppercaseContent].map((char, index) => {
      const baseLetter = getBaseLetter(char);
      const isLetter = baseLetter !== "";

      let type: Segment["type"] = "regular";

      if (isLetter) {
        if (alternateSet.has(baseLetter)) {
          type = "alternate";
        } else if (ornateSet.has(baseLetter)) {
          type = "ornate";
        }
      }

      return {
        char,
        type,
        index,
        // For alternate letters, render as lowercase to access alternate glyphs
        displayChar: type === "alternate" ? char.toLowerCase() : char,
      };
    });
  }, [uppercaseContent, ornateSet, alternateSet]);

  // Get animation configuration
  const totalChars = characters.length;

  // Merge reveal animation with defaults
  const revealConfig = useMemo(() => {
    if (!revealAnimation) return null;
    return { ...DEFAULT_REVEAL_CONFIG, ...revealAnimation };
  }, [revealAnimation]);

  // Merge hover animation with defaults
  const hoverConfig = useMemo(() => {
    if (!hoverAnimation) return null;
    return { ...DEFAULT_HOVER_CONFIG, ...hoverAnimation };
  }, [hoverAnimation]);

  // Render animated content
  const renderedContent = useMemo(() => {
    if (!hasAnimation) {
      // Non-animated rendering (original behavior)
      const segments: Segment[] = [];
      let currentSegment: Segment | null = null;

      for (const { char, type } of characters) {
        if (currentSegment && currentSegment.type === type) {
          currentSegment.text += char;
        } else {
          if (currentSegment) {
            segments.push(currentSegment);
          }
          currentSegment = { text: char, type };
        }
      }
      if (currentSegment) {
        segments.push(currentSegment);
      }

      return segments.map((segment, index) => {
        if (segment.type === "regular") {
          return <span key={index}>{segment.text}</span>;
        }

        if (segment.type === "ornate") {
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
    }

    // Animated rendering - each character is wrapped in motion.span
    return characters.map(({ char, type, index, displayChar }) => {
      const charClassName = 
        type === "ornate" ? "has-font-ornate" :
        type === "alternate" ? "has-font-ornate-alt" :
        undefined;

      // Build variants for this character
      const revealVariants = revealConfig
        ? createCharacterVariants(index, totalChars, revealConfig, "reveal", DEFAULT_REVEAL_CONFIG)
        : null;

      const hoverVariants = hoverConfig
        ? createCharacterVariants(index, totalChars, hoverConfig, "hover", DEFAULT_HOVER_CONFIG)
        : null;

      // Combine variants
      const combinedVariants: Variants = {
        initial: {
          ...(revealVariants?.variants.initial || {}),
        },
        visible: revealVariants?.variants.visible || {},
        hovered: hoverVariants?.variants.hovered || {},
      };


      // If hover animation but no reveal, start from hover's initial state
      if (hoverConfig && !revealConfig) {
        combinedVariants.initial = hoverVariants?.variants.initial || {};
        combinedVariants.visible = combinedVariants.initial;
      }

      return (
        <motion.span
          key={index}
          className={clsx("inline-block", charClassName)}
          variants={combinedVariants}
          style={{ 
            // Preserve whitespace for spaces
            whiteSpace: char === " " ? "pre" : undefined,
          }}
        >
          {/* Use non-breaking space for actual spaces to prevent collapse */}
          {char === " " ? "\u00A0" : displayChar}
        </motion.span>
      );
    });
  }, [hasAnimation, characters, revealConfig, hoverConfig, totalChars]);

  // Common props for the wrapper element
  const wrapperProps = useMemo(() => {
    const baseProps: Record<string, unknown> = {
      className: clsx("uppercase", className),
    };

    if (hasAnimation && (revealConfig || hoverConfig)) {
      // Wrap in motion component with appropriate handlers
      return {
        ...baseProps,
        initial: "initial",
        // For reveal animations, use whileInView to trigger "visible" state
        ...(revealConfig && {
          whileInView: "visible",
          viewport: {
            once: revealConfig.once,
            amount: revealConfig.viewportAmount,
          },
        }),
        // For hover-only (no reveal), immediately animate to "visible" base state
        ...(!revealConfig && hoverConfig && {
          animate: "visible",
        }),
        ...(hoverConfig && {
          whileHover: "hovered",
        }),
      };
    }

    return baseProps;
  }, [className, hasAnimation, revealConfig, hoverConfig]);

  // Create the appropriate wrapper element based on animation state
  if (hasAnimation) {
    // Use motion components for animated rendering
    const MotionComponent = motion[Component] || motion.span;
    
    return (
      <MotionComponent {...wrapperProps}>
        {renderedContent}
      </MotionComponent>
    );
  }

  // Non-animated rendering (original behavior)
  if (Component === "span") {
    return (
      <span className={clsx("uppercase", className)}>
        {renderedContent}
      </span>
    );
  }
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

  return (
    <span className={clsx("uppercase", className)}>
      {renderedContent}
    </span>
  );
}

export default OrnateText;
