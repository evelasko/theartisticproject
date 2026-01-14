"use client";

import React from "react";
import clsx from "clsx";

export type GlowPosition = 
  | "bottom-center"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "top-left"
  | "top-right"
  | "center";

export type GlowSize = "sm" | "md" | "lg" | "xl";
export type GlowIntensity = "subtle" | "medium" | "strong";

interface SectionGlowProps {
  /**
   * Position of the glow within the section
   * @default "bottom-center"
   */
  position?: GlowPosition;
  
  /**
   * Size of the glow effect
   * @default "lg"
   */
  size?: GlowSize;
  
  /**
   * Intensity of the glow
   * @default "medium"
   */
  intensity?: GlowIntensity;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * SectionGlow Component
 *
 * A reusable golden glow effect to be placed within page sections.
 * The glow creates an ambient lighting effect that adds depth and
 * visual interest to specific areas of the page.
 *
 * @example
 * ```tsx
 * <section className="relative">
 *   <SectionGlow position="bottom-center" size="lg" intensity="medium" />
 *   <div className="relative z-10">
 *     {/* Section content *\/}
 *   </div>
 * </section>
 * ```
 */
export const SectionGlow: React.FC<SectionGlowProps> = ({
  position = "bottom-center",
  size = "lg",
  intensity = "medium",
  className,
}) => {
  return (
    <div
      className={clsx(
        "section-glow",
        `section-glow--${position}`,
        `section-glow--${size}`,
        `section-glow--${intensity}`,
        className
      )}
      aria-hidden="true"
    />
  );
};

export default SectionGlow;
