'use client';

import React from 'react';

interface CircleIndicatorProps {
  /** Whether the circle is part of an interactive element (enables hover scaling) */
  interactive?: boolean;
  /** Whether the circle is currently active (visible). When false, scales to 0 */
  active?: boolean;
  /** Whether to apply the blink/pulse animation (2s ease-in-out infinite) */
  animated?: boolean;
  /** Dark mode variant - inverts colors for use on light backgrounds */
  darkMode?: boolean;
  /** Additional CSS classes for the outer container */
  className?: string;
}

/**
 * A small circular indicator element with two concentric circles:
 * - Semi-transparent outer circle with blur (glow effect)
 * - Solid inner dot
 * 
 * Used throughout the interface for:
 * - Navigation button indicators
 * - Section header markers
 * - Custom cursor variations
 * 
 * The animated variant adds a subtle blink/pulse effect that fades
 * the opacity from 1 → 0 → 1 over 2 seconds, running infinitely.
 */
export default function CircleIndicator({
  interactive = false,
  active = true,
  animated = false,
  darkMode = false,
  className = '',
}: CircleIndicatorProps) {
  return (
    <div
      className={`
        circle-indicator
        ${interactive ? 'circle-indicator--interactive' : ''}
        ${!active ? 'circle-indicator--inactive' : ''}
        ${animated ? 'circle-indicator--animated' : ''}
        ${darkMode ? 'circle-indicator--dark' : ''}
        ${className}
      `}
      aria-hidden="true"
    >
      {/* Inner solid dot */}
      <div className="circle-indicator__dot" />
    </div>
  );
}
