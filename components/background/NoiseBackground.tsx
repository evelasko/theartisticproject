"use client";

/**
 * NoiseOverlay Component
 *
 * Creates an animated noise texture overlay that sits ABOVE all page content.
 * Exact implementation matching Naya Studio Dubai website.
 *
 * Key properties (extracted from original):
 * - position: fixed with inset: 0
 * - z-index: 9999 (above all content)
 * - background-size: 144px (small tiles for fine grain)
 * - opacity: 0.14 (14% - very subtle)
 * - mix-blend-mode: lighten (only brightens darker areas)
 * - filter: brightness(0.9) (slightly darkens noise before blending)
 * - pointer-events: none (doesn't block interactions)
 *
 * The animated GIF provides the texture movement - no CSS animation needed.
 * The lighten blend mode creates a subtle film grain effect that adds
 * organic texture without overwhelming the content.
 *
 * Note: The base page background color should be set separately (warm black).
 * Gradient glows should be added to individual sections/components, not here.
 */
export default function NoiseOverlay() {
  return <div className="noise-overlay" aria-hidden="true" />;
}
