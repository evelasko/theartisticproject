"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

interface AnimatedSectionHeaderProps {
  /** The text to display inside the capsule tag. When omitted, the capsule and bottom line are hidden. */
  title?: string;
  /** Height from the top to the star center (in CSS units, e.g., "8vw", "120px") */
  topHeight?: string;
  /** Height from the star center to the capsule top edge (in CSS units). Only used when title is provided. */
  bottomHeight?: string;
  /** Additional CSS classes */
  className?: string;
  /** Animation duration in ms for each phase */
  animationDuration?: number;
  /** Delay before starting the animation */
  delay?: number;
  /** Intersection threshold to trigger animation */
  threshold?: number;
  /** Only animate once */
  once?: boolean;
}

// TODO: Make lines closer to the star to avoid having the empty in between, making the star more integrated to the lines

/**
 * AnimatedSectionHeader Component
 * 
 * A sophisticated section divider with a cross shape and centered four-point star.
 * When a title is provided, the vertical line terminates in a capsule containing the section title.
 * When no title is provided, it renders as a simple decorative cross with star.
 * 
 * Animation sequence:
 * 1. Vertical line draws from top to star location
 * 2. Star scales up from 0 to full size
 * 3. Simultaneously:
 *    - Horizontal line draws from center outward
 *    - (If title provided) Vertical line continues from star to capsule
 *    - (If title provided) Capsule fades in
 * 
 * @example
 * ```tsx
 * // As a section header with title
 * <AnimatedSectionHeader 
 *   title="Benefits" 
 *   topHeight="8vw" 
 *   bottomHeight="6vw" 
 * />
 * 
 * // As a simple decorative element (no capsule)
 * <AnimatedSectionHeader topHeight="5vw" />
 * ```
 */
export default function AnimatedSectionHeader({
  title,
  topHeight = "8vw",
  bottomHeight = "6vw",
  className,
  animationDuration = 600,
  delay = 0,
  threshold = 0.2,
  once = true,
}: AnimatedSectionHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTriggered, setIsTriggered] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<0 | 1 | 2 | 3>(0);

  // Intersection Observer to trigger animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsTriggered(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsTriggered(false);
          setAnimationPhase(0);
        }
      },
      { threshold }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, once]);

  // Animation sequence controller
  useEffect(() => {
    if (!isTriggered) return;

    // Initial delay before starting
    const delayTimer = setTimeout(() => {
      // Phase 1: Draw top vertical line
      setAnimationPhase(1);

      // Phase 2: Star scales up
      const phase2Timer = setTimeout(() => {
        setAnimationPhase(2);

        // Phase 3: Horizontal line + bottom vertical line + capsule
        const phase3Timer = setTimeout(() => {
          setAnimationPhase(3);
        }, animationDuration * 0.5); // Star scale duration

        return () => clearTimeout(phase3Timer);
      }, animationDuration);

      return () => clearTimeout(phase2Timer);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [isTriggered, animationDuration, delay]);

  // Check for reduced motion preference
  const prefersReducedMotion = 
    typeof window !== "undefined" && 
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  // If reduced motion, show everything immediately
  const showAll = prefersReducedMotion || animationPhase >= 3;

  return (
    <div
      ref={containerRef}
      className={clsx("section-header", className)}
      style={{
        "--section-header-top-height": topHeight,
        "--section-header-bottom-height": bottomHeight,
        "--section-header-duration": `${animationDuration}ms`,
      } as React.CSSProperties}
    >
      {/* Main container - full width, centers content */}
      <div className="section-header__container">
        {/* Top vertical line segment */}
        <div className="section-header__line-top">
          <div 
            className={clsx(
              "section-header__line-top-inner",
              animationPhase >= 1 && "is-animating"
            )}
          />
        </div>

        {/* Star element at the center of the cross */}
        <div 
          className={clsx(
            "section-header__star",
            animationPhase >= 2 && "is-visible"
          )}
        >
          {/* Four-point star SVG */}
          <svg 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="section-header__star-svg"
          >
            <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" />
          </svg>
        </div>

        {/* Horizontal line - draws from center outward */}
        <div className="section-header__line-horizontal">
          <div 
            className={clsx(
              "section-header__line-horizontal-inner",
              animationPhase >= 3 && "is-animating"
            )}
          />
        </div>

        {/* Bottom vertical line segment - only shown when title is provided */}
        {title && (
          <div className="section-header__line-bottom">
            <div 
              className={clsx(
                "section-header__line-bottom-inner",
                animationPhase >= 3 && "is-animating"
              )}
            />
          </div>
        )}

        {/* Capsule tag with title - only shown when title is provided */}
        {title && (
          <div 
            className={clsx(
              "section-header__capsule",
              (showAll || animationPhase >= 3) && "is-visible"
            )}
          >
            <span className="tag">{title}</span>
          </div>
        )}
      </div>
    </div>
  );
}
