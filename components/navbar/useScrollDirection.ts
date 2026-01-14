"use client";

import { useState, useEffect } from "react";

interface ScrollState {
  isAtTop: boolean;
  isScrollingDown: boolean;
  isScrolled: boolean;
}

/**
 * Hook to detect scroll direction and position
 * Used for navbar hide/show behavior and glassmorphism effect
 */
export function useScrollDirection(): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    isAtTop: true,
    isScrollingDown: false,
    isScrolled: false,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollState = () => {
      const currentScrollY = window.scrollY;

      setScrollState({
        // At top if scrolled less than 10px
        isAtTop: currentScrollY < 10,
        
        // Scrolling down if current position is greater than last position
        // AND we're past 100px total scroll
        isScrollingDown: currentScrollY > lastScrollY && currentScrollY > 100,
        
        // Apply glassmorphism if scrolled more than 50px
        isScrolled: currentScrollY > 50,
      });

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReducedMotion) {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    // Initial state
    updateScrollState();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return scrollState;
}
