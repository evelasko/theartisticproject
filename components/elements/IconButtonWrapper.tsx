import { ReactNode } from 'react';
import type { IconButtonSize } from './IconButton';

export interface IconButtonWrapperProps {
  /** IconButton components to display */
  children: ReactNode;
  /** Size variant to match contained buttons (adjusts wrapper padding) */
  size?: IconButtonSize;
  /** Optional className for additional styling */
  className?: string;
}

/**
 * IconButtonWrapper - Container for IconButton components.
 * 
 * Extracted from Naya Studio Dubai website:
 * - Displays icon buttons in a row
 * - Buttons overlap slightly via negative margins
 * - Used for social media links or action groups
 * 
 * @example
 * <IconButtonWrapper size="sm">
 *   <IconButton size="sm" ariaLabel="Share"><ShareIcon /></IconButton>
 *   <IconButton size="sm" ariaLabel="Like"><HeartIcon /></IconButton>
 * </IconButtonWrapper>
 */
export default function IconButtonWrapper({ 
  children, 
  size = 'md',
  className = '' 
}: IconButtonWrapperProps) {
  const sizeClass = `icon-button-wrapper--${size}`;
  
  return (
    <div className={`icon-button-wrapper ${sizeClass} ${className}`}>
      {children}
    </div>
  );
}
