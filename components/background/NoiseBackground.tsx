"use client";

import React from "react";

/**
 * NoiseOverlay Component
 *
 * Creates an animated noise texture overlay that sits ABOVE all page content.
 * Inspired by the Naya Studio Dubai website.
 *
 * Features:
 * - Fixed position overlay covering the entire viewport
 * - Sits above all content with high z-index
 * - Animated noise gif texture with subtle opacity
 * - Pointer-events disabled so it doesn't block interactions
 *
 * The noise overlay creates a subtle film grain effect that adds
 * depth and texture to the entire page, affecting all elements.
 *
 * Note: The base page background color should be set separately (warm black).
 * Gradient glows should be added to individual sections/components, not here.
 */
export const NoiseOverlay: React.FC = () => {
  return (
    <div className="noise-overlay" aria-hidden="true">
      {/* Animated noise texture */}
      <div className="noise-overlay__texture" />
    </div>
  );
};

// Keep backwards-compatible export
export const NoiseBackground = NoiseOverlay;

export default NoiseOverlay;
