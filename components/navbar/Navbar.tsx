"use client";

import { useState } from "react";
import { TopBar } from "./TopBar";
import { FullScreenOverlay } from "./FullScreenOverlay";
import { useScrollDirection } from "./useScrollDirection";

/**
 * Main Navbar Component
 * 
 * Manages the top bar and full-screen overlay navigation
 * Implements scroll-based hide/show behavior and glassmorphism effects
 */
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAtTop, isScrollingDown, isScrolled } = useScrollDirection();

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  // Hide navbar when scrolling down, but not when menu is open
  const isHidden = isScrollingDown && !isAtTop && !isMenuOpen;

  return (
    <>
      <TopBar
        isAtTop={isAtTop}
        isScrolled={isScrolled}
        isHidden={isHidden}
        onMenuClick={handleMenuOpen}
      />
      
      <FullScreenOverlay
        isOpen={isMenuOpen}
        onClose={handleMenuClose}
      />
    </>
  );
}
