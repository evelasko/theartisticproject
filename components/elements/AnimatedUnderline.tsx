"use client";

import { ReactNode } from "react";
import clsx from "clsx";

interface AnimatedUnderlineProps {
  children: ReactNode;
  className?: string;
}

/**
 * Animated Underline Component
 * 
 * A sophisticated animated underline that reveals from left to right on hover.
 * Based on the Naya Studio design with multi-layered element structure.
 * 
 * @example
 * ```tsx
 * <AnimatedUnderline>
 *   <p className="text-small">Link Text</p>
 * </AnimatedUnderline>
 * ```
 */
export function AnimatedUnderline({ children, className }: AnimatedUnderlineProps) {
  return (
    <div className={clsx("animated-underline-wrapper", className)}>
      {children}
      <div className="link-line-wrapper">
        <div className="link-line-block">
          <div className="link-line-inner" />
          <div className="link-line-decor" />
        </div>
      </div>
    </div>
  );
}
