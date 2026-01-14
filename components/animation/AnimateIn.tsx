"use client";

import { ElementType, ReactNode, useEffect, useMemo } from "react";
import { motion, Transition, useReducedMotion as useFramerReducedMotion, type TargetAndTransition } from "framer-motion";
import clsx from "clsx";
import { useOrchestration } from "./OrchestrationContext";

/* ==========================================================================
   TYPES
   ========================================================================== */

export type AnimationType =
  | "fadeUp"
  | "fadeDown"
  | "fadeLeft"
  | "fadeRight"
  | "scaleUp"
  | "scaleDown"
  | "blur"
  | "clipRevealX"
  | "clipRevealY"
  | "custom";

export type EasingType =
  | "smooth"
  | "smoothOut"
  | "smoothIn"
  | "bounce"
  | "elastic"
  | "sharp";

export interface AnimationState {
  opacity?: number;
  x?: number;
  y?: number;
  scale?: number;
  rotate?: number;
  filter?: string;
  clipPath?: string;
}

export interface AnimateInProps {
  children: ReactNode;
  /** Animation phase (1-5), determines base delay */
  phase?: number;
  /** Index within phase for stagger calculation */
  index?: number;
  /** Additional manual delay in ms */
  delay?: number;
  /** Animation duration in ms */
  duration?: number;
  /** Animation preset type */
  animation?: AnimationType;
  /** Easing function */
  easing?: EasingType;
  /** Custom starting state (for animation="custom") */
  from?: AnimationState;
  /** Custom ending state (for animation="custom") */
  to?: AnimationState;
  /** Stagger delay between children in ms */
  stagger?: number;
  /** Additional CSS classes */
  className?: string;
  /** HTML element to render */
  as?: ElementType;
}

/* ==========================================================================
   EASING FUNCTIONS
   ========================================================================== */

const EASINGS: Record<EasingType, [number, number, number, number]> = {
  smooth: [0.4, 0, 0.2, 1],
  smoothOut: [0, 0, 0.2, 1],
  smoothIn: [0.4, 0, 1, 1],
  bounce: [0.34, 1.56, 0.64, 1],
  elastic: [0.68, -0.55, 0.27, 1.55],
  sharp: [0.4, 0, 0.6, 1],
};

/* ==========================================================================
   ANIMATION PRESETS
   ========================================================================== */

const ANIMATION_PRESETS: Record<AnimationType, { from: AnimationState; to: AnimationState }> = {
  fadeUp: {
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0 },
  },
  fadeDown: {
    from: { opacity: 0, y: -40 },
    to: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    from: { opacity: 0, x: 40 },
    to: { opacity: 1, x: 0 },
  },
  fadeRight: {
    from: { opacity: 0, x: -40 },
    to: { opacity: 1, x: 0 },
  },
  scaleUp: {
    from: { opacity: 0, scale: 0.85 },
    to: { opacity: 1, scale: 1 },
  },
  scaleDown: {
    from: { opacity: 0, scale: 1.1 },
    to: { opacity: 1, scale: 1 },
  },
  blur: {
    from: { opacity: 0, filter: "blur(20px)" },
    to: { opacity: 1, filter: "blur(0px)" },
  },
  clipRevealX: {
    from: { clipPath: "inset(0 50% 0 50%)" },
    to: { clipPath: "inset(0 0% 0 0%)" },
  },
  clipRevealY: {
    from: { clipPath: "inset(50% 0 50% 0)" },
    to: { clipPath: "inset(0% 0 0% 0)" },
  },
  custom: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
};

/* ==========================================================================
   COMPONENT
   ========================================================================== */

/**
 * AnimateIn Component
 *
 * Individual animated element within an OrchestrationProvider.
 * Supports preset animations and custom animation states.
 *
 * @example
 * ```tsx
 * <AnimateIn phase={3} animation="fadeUp" duration={600}>
 *   <h1>Headline</h1>
 * </AnimateIn>
 *
 * <AnimateIn
 *   phase={2}
 *   animation="custom"
 *   from={{ opacity: 0, y: 60, filter: "blur(10px)" }}
 *   to={{ opacity: 1, y: 0, filter: "blur(0px)" }}
 * >
 *   <div className="decoration" />
 * </AnimateIn>
 * ```
 */
export function AnimateIn({
  children,
  phase = 3,
  index = 0,
  delay = 0,
  duration = 600,
  animation = "fadeUp",
  easing = "smooth",
  from,
  to,
  stagger = 50,
  className,
  as = "div",
}: AnimateInProps) {
  const { isTriggered, reducedMotion, getPhaseDelay, registerElement, markElementComplete } =
    useOrchestration();
  
  // Also check Framer Motion's reduced motion detection
  const framerReducedMotion = useFramerReducedMotion();
  const shouldReduceMotion = reducedMotion || framerReducedMotion;

  // Register this element on mount
  useEffect(() => {
    registerElement();
  }, [registerElement]);

  // Get animation states
  const preset = ANIMATION_PRESETS[animation];
  const fromState = animation === "custom" && from ? from : preset.from;
  const toState = animation === "custom" && to ? to : preset.to;

  // Calculate total delay
  const totalDelay = useMemo(() => {
    if (shouldReduceMotion) return 0;
    const phaseDelay = getPhaseDelay(phase, index, stagger);
    return phaseDelay + delay;
  }, [shouldReduceMotion, getPhaseDelay, phase, index, stagger, delay]);

  // Build variants - using flexible type for Framer Motion compatibility
  const variants = useMemo(() => ({
    hidden: fromState as TargetAndTransition,
    visible: toState as TargetAndTransition,
  }), [fromState, toState]);

  // Build transition
  const transition: Transition = useMemo(() => ({
    duration: shouldReduceMotion ? 0 : duration / 1000,
    delay: totalDelay / 1000,
    ease: EASINGS[easing],
  }), [shouldReduceMotion, duration, totalDelay, easing]);

  // If reduced motion, render without animation
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  // Use motion.div as the base, with semantic wrapper if needed
  return (
    <motion.div
      className={clsx("will-change-transform", className)}
      variants={variants}
      initial="hidden"
      animate={isTriggered ? "visible" : "hidden"}
      transition={transition}
      onAnimationComplete={() => {
        if (isTriggered) {
          markElementComplete();
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export default AnimateIn;
