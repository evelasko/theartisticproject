'use client';

import { ReactNode } from 'react';

/**
 * Available size variants for IconButton.
 * 
 * Size reference (at 1920px viewport):
 * - xs: ~48px  (2.5vw)   - Small inline icons
 * - sm: ~72px  (3.75vw)  - Compact buttons
 * - md: ~96px  (5vw)     - Default size
 * - lg: ~120px (6.25vw)  - Prominent buttons
 * - xl: ~147px (7.66vw)  - Hero/featured buttons
 */
export type IconButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface IconButtonProps {
  /** The icon to display (SVG element or icon component) */
  children: ReactNode;
  /** URL to link to */
  href?: string;
  /** Click handler (when not using href) */
  onClick?: () => void;
  /** Accessible label for the button */
  ariaLabel: string;
  /** Size variant - xs, sm, md (default), lg, xl */
  size?: IconButtonSize;
  /** Optional className for additional styling */
  className?: string;
  /** Whether to open link in new tab */
  openInNewTab?: boolean;
}
// TODO: Review the background of this component and make it transparent while masking the underlying border animation
// TODO: Review the border to make it slightly thicker in small and medium screens

/**
 * IconButton component - A circular button with animated border effect on hover.
 * 
 * Extracted from Naya Studio Dubai website:
 * - Circular shape with subtle border
 * - Animated conic gradient border on hover
 * - Overlapping layout when used in groups (negative margins)
 * 
 * @example
 * // Default medium size
 * <IconButton ariaLabel="Share">
 *   <ShareIcon />
 * </IconButton>
 * 
 * @example
 * // Small size with link
 * <IconButton size="sm" href="/contact" ariaLabel="Contact">
 *   <PhoneIcon />
 * </IconButton>
 */
export default function IconButton({
  children,
  href,
  onClick,
  ariaLabel,
  size = 'md',
  className = '',
  openInNewTab = true,
}: IconButtonProps) {
  const Component = href ? 'a' : 'button';
  
  const linkProps = href ? {
    href,
    target: openInNewTab ? '_blank' : undefined,
    rel: openInNewTab ? 'noopener noreferrer' : undefined,
  } : {};

  const sizeClass = `icon-button--${size}`;

  return (
    <Component
      className={`icon-button ${sizeClass} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      {...linkProps}
    >
      {/* The icon */}
      <span className="icon-button__icon">
        {children}
      </span>
      
      {/* Animated border overlay (hover effect) */}
      <span className="icon-button__hover-ring" aria-hidden="true" />
    </Component>
  );
}
