"use client";

import { ElementType, useMemo } from "react";
import { motion, Transition, useReducedMotion, type TargetAndTransition } from "framer-motion";
import clsx from "clsx";
import { useOrchestration } from "./OrchestrationContext";

/* ==========================================================================
   TYPES
   ========================================================================== */

export type SplitType = "chars" | "words" | "lines";

export interface AnimateTextProps {
  /** Text content to animate */
  children: string;
  /** How to split the text for animation */
  splitBy?: SplitType;
  /** Animation phase (1-5) */
  phase?: number;
  /** Base index for stagger calculation */
  index?: number;
  /** Additional delay in ms */
  delay?: number;
  /** Duration per element in ms */
  duration?: number;
  /** Stagger delay between elements in ms */
  stagger?: number;
  /** Y offset for animation start */
  yOffset?: number;
  /** Include blur effect */
  blur?: boolean;
  /** Include rotation effect */
  rotate?: boolean;
  /** Easing function */
  easing?: [number, number, number, number];
  /** Additional CSS classes */
  className?: string;
  /** HTML element to render */
  as?: ElementType;
}

/* ==========================================================================
   COMPONENT
   ========================================================================== */

/**
 * AnimateText Component
 *
 * Animated text with character, word, or line-level splitting.
 * Creates staggered reveal effects for typography.
 *
 * @example
 * ```tsx
 * <AnimateText
 *   splitBy="chars"
 *   phase={3}
 *   stagger={30}
 *   className="text-banner-large"
 * >
 *   design that blooms into emotion
 * </AnimateText>
 * ```
 */
export function AnimateText({
  children,
  splitBy = "words",
  phase = 3,
  index = 0,
  delay = 0,
  duration = 500,
  stagger = 30,
  yOffset = 30,
  blur = false,
  rotate = false,
  easing = [0.4, 0, 0.2, 1],
  className,
  as = "span",
}: AnimateTextProps) {
  const { isTriggered, reducedMotion, getPhaseDelay } = useOrchestration();
  const framerReducedMotion = useReducedMotion();
  const shouldReduceMotion = reducedMotion || framerReducedMotion;

  // Split text into elements
  const elements = useMemo(() => {
    const text = children.toString();
    
    switch (splitBy) {
      case "chars":
        return text.split("").map((char, i) => ({
          key: `char-${i}`,
          content: char === " " ? "\u00A0" : char, // Non-breaking space
          isSpace: char === " ",
        }));
      case "words":
        return text.split(" ").map((word, i) => ({
          key: `word-${i}`,
          content: word,
          isSpace: false,
        }));
      case "lines":
        return text.split("\n").map((line, i) => ({
          key: `line-${i}`,
          content: line,
          isSpace: false,
        }));
      default:
        return [{ key: "text-0", content: text, isSpace: false }];
    }
  }, [children, splitBy]);

  // Calculate base delay from phase
  const phaseDelay = useMemo(() => {
    if (shouldReduceMotion) return 0;
    return getPhaseDelay(phase, index, 0) + delay;
  }, [shouldReduceMotion, getPhaseDelay, phase, index, delay]);

  // Build variants - using flexible types for Framer Motion compatibility
  const containerVariants = {
    hidden: {} as TargetAndTransition,
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : stagger / 1000,
        delayChildren: phaseDelay / 1000,
      },
    } as TargetAndTransition,
  };

  const itemVariants = useMemo(() => ({
    hidden: {
      opacity: 0,
      y: yOffset,
      filter: blur ? "blur(8px)" : undefined,
      rotateX: rotate ? -20 : undefined,
    } as TargetAndTransition,
    visible: {
      opacity: 1,
      y: 0,
      filter: blur ? "blur(0px)" : undefined,
      rotateX: rotate ? 0 : undefined,
    } as TargetAndTransition,
  }), [yOffset, blur, rotate]);

  const itemTransition: Transition = useMemo(() => ({
    duration: shouldReduceMotion ? 0 : duration / 1000,
    ease: easing,
  }), [shouldReduceMotion, duration, easing]);

  // If reduced motion, render plain text
  if (shouldReduceMotion) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      className={clsx("inline-block", className)}
      variants={containerVariants}
      initial="hidden"
      animate={isTriggered ? "visible" : "hidden"}
    >
      {elements.map((element, i) => (
        <motion.span
          key={element.key}
          className={clsx(
            "inline-block will-change-transform",
            rotate && "origin-bottom"
          )}
          variants={itemVariants}
          transition={itemTransition}
          style={{ 
            display: "inline-block",
            whiteSpace: element.isSpace ? "pre" : undefined,
          }}
        >
          {element.content}
          {splitBy === "words" && i < elements.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default AnimateText;
