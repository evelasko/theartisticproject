"use client";

import { createContext, useContext, useState, useEffect, useRef, ReactNode, useCallback } from "react";
import { useReducedMotion } from "./useReducedMotion";

/* ==========================================================================
   TYPES
   ========================================================================== */

interface OrchestrationContextValue {
  isTriggered: boolean;
  isComplete: boolean;
  reducedMotion: boolean;
  getPhaseDelay: (phase: number, index?: number, stagger?: number) => number;
  registerElement: () => void;
  markElementComplete: () => void;
}

interface OrchestrationProviderProps {
  children: ReactNode;
  /** How to trigger the animation */
  trigger?: "viewport" | "immediate" | "manual";
  /** Intersection threshold (0-1) for viewport trigger */
  threshold?: number;
  /** Root margin for intersection observer */
  rootMargin?: string;
  /** Only animate once */
  once?: boolean;
  /** Disable animations entirely */
  disabled?: boolean;
  /** Callback when animation sequence starts */
  onStart?: () => void;
  /** Callback when all animations complete */
  onComplete?: () => void;
  /** Additional CSS classes */
  className?: string;
}

/* ==========================================================================
   DEFAULT PHASE TIMING
   ========================================================================== */

const PHASE_BASE_DELAYS: Record<number, number> = {
  1: 0,      // Ambient/Background
  2: 200,    // Foundation/Decorative
  3: 400,    // Primary content (headline)
  4: 700,    // Secondary content (body text)
  5: 1000,   // Interactive elements (CTAs)
};

const DEFAULT_STAGGER = 50; // ms between elements in same phase

/* ==========================================================================
   CONTEXT
   ========================================================================== */

const OrchestrationContext = createContext<OrchestrationContextValue | null>(null);

/**
 * Hook to access orchestration context
 */
export function useOrchestration() {
  const context = useContext(OrchestrationContext);
  if (!context) {
    throw new Error("useOrchestration must be used within an OrchestrationProvider");
  }
  return context;
}

/* ==========================================================================
   PROVIDER COMPONENT
   ========================================================================== */

/**
 * OrchestrationProvider
 *
 * Manages scroll-triggered animation orchestration for child elements.
 * Coordinates timing across multiple phases for cinematic reveal effects.
 *
 * @example
 * ```tsx
 * <OrchestrationProvider threshold={0.3} once>
 *   <AnimateIn phase={1} animation="scaleDown">
 *     <video className="hero-bg" ... />
 *   </AnimateIn>
 *   <AnimateIn phase={3} animation="fadeUp" stagger={30}>
 *     <h1>Headline</h1>
 *   </AnimateIn>
 * </OrchestrationProvider>
 * ```
 */
export function OrchestrationProvider({
  children,
  trigger = "viewport",
  threshold = 0.2,
  rootMargin = "0px",
  once = true,
  disabled = false,
  onStart,
  onComplete,
  className,
}: OrchestrationProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTriggered, setIsTriggered] = useState(trigger === "immediate");
  const [isComplete, setIsComplete] = useState(false);
  const reducedMotion = useReducedMotion();
  
  // Track registered elements for completion callback
  const elementCountRef = useRef(0);
  const completedCountRef = useRef(0);

  // Calculate delay for an element based on phase and index
  const getPhaseDelay = useCallback((phase: number, index = 0, stagger = DEFAULT_STAGGER): number => {
    if (reducedMotion || disabled) return 0;
    const baseDelay = PHASE_BASE_DELAYS[phase] ?? PHASE_BASE_DELAYS[5];
    return baseDelay + index * stagger;
  }, [reducedMotion, disabled]);

  // Register an animated element
  const registerElement = useCallback(() => {
    elementCountRef.current += 1;
  }, []);

  // Mark an element as complete
  const markElementComplete = useCallback(() => {
    completedCountRef.current += 1;
    if (completedCountRef.current >= elementCountRef.current && elementCountRef.current > 0) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [onComplete]);

  // Set up intersection observer for viewport trigger
  useEffect(() => {
    if (trigger !== "viewport" || disabled) return;
    if (reducedMotion) {
      // Immediately show content for reduced motion
      setIsTriggered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTriggered(true);
          onStart?.();
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsTriggered(false);
          completedCountRef.current = 0;
          setIsComplete(false);
        }
      },
      { threshold, rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [trigger, threshold, rootMargin, once, disabled, reducedMotion, onStart]);

  // Handle immediate trigger
  useEffect(() => {
    if (trigger === "immediate" && !isTriggered) {
      setIsTriggered(true);
      onStart?.();
    }
  }, [trigger, isTriggered, onStart]);

  const contextValue: OrchestrationContextValue = {
    isTriggered,
    isComplete,
    reducedMotion: reducedMotion || disabled,
    getPhaseDelay,
    registerElement,
    markElementComplete,
  };

  return (
    <OrchestrationContext.Provider value={contextValue}>
      <div ref={containerRef} className={className}>
        {children}
      </div>
    </OrchestrationContext.Provider>
  );
}

export default OrchestrationProvider;
