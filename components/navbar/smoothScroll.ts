/**
 * Smooth scroll utility for anchor links
 * Integrates with Lenis smooth scrolling library
 */

/**
 * Smoothly scrolls to a target element
 * 
 * @param targetId - The ID of the element to scroll to (without #)
 * @param callback - Optional callback to execute after scroll starts
 */
export function smoothScrollTo(targetId: string, callback?: () => void) {
  const target = document.getElementById(targetId);
  
  if (!target) {
    console.warn(`Target element with id "${targetId}" not found`);
    return;
  }

  // Execute callback immediately (e.g., close menu)
  if (callback) {
    callback();
  }

  // Lenis is attached to the window by ReactLenis
  const lenis = (window as any).lenis;

  if (lenis) {
    // Use Lenis for smooth scrolling
    lenis.scrollTo(target, {
      offset: 0,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    // Fallback to native smooth scroll
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

/**
 * Handles click on anchor links
 * 
 * @param event - The click event
 * @param href - The href attribute (e.g., "#services")
 * @param onNavigate - Optional callback to execute when navigation starts
 */
export function handleAnchorClick(
  event: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  onNavigate?: () => void
) {
  // Only handle hash links
  if (!href.startsWith("#")) {
    return;
  }

  event.preventDefault();
  const targetId = href.slice(1); // Remove the # symbol
  
  smoothScrollTo(targetId, onNavigate);
}
