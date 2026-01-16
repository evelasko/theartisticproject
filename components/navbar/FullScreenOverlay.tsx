"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { BannerMedium, HeadingSmall } from "@/components";
import { AnimatedUnderline } from "../elements/AnimatedUnderline";
import { handleAnchorClick } from "./smoothScroll";

interface FullScreenOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Full-Screen Navigation Overlay
 * 
 * Dark overlay menu with primary navigation, secondary anchor links, and CTA
 * Features staggered entry animations and elegant typography
 */
export function FullScreenOverlay({ isOpen, onClose }: FullScreenOverlayProps) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const closingTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Handle mounting/unmounting with fade animation
  useEffect(() => {
    // Clear any existing timeout
    if (closingTimeoutRef.current) {
      clearTimeout(closingTimeoutRef.current);
      closingTimeoutRef.current = null;
    }

    if (isOpen) {
      // Mount immediately when opening
      if (!shouldRender) {
        setShouldRender(true);
      }
    } else if (shouldRender) {
      // When closing, wait for fade out animation to complete before unmounting
      closingTimeoutRef.current = setTimeout(() => {
        setShouldRender(false);
        closingTimeoutRef.current = null;
      }, 2000); // Match the transition duration (2s)
    }

    return () => {
      if (closingTimeoutRef.current) {
        clearTimeout(closingTimeoutRef.current);
        closingTimeoutRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  return (
    <div
      className={clsx("navbar-overlay", { 
        "navbar-overlay--open": isOpen 
      })}
      role="dialog"
      aria-modal="true"
      aria-label="Menú de navegación"
    >
      {/* Grid Container */}
      <div className="navbar-overlay__grid">
        {/* Row 1: Primary Navigation (spans 2 columns) */}
        <nav className="navbar-overlay__primary" aria-label="Navegación principal">
          <Link
            href="/"
            className="navbar-overlay__primary-item navbar-overlay__item--1"
            onClick={onClose}
          >
            <span className="navbar-overlay__number">(01)</span>
            <BannerMedium content="HOME" />
          </Link>

          <Link
            href="/trabajos"
            className="navbar-overlay__primary-item navbar-overlay__item--2"
            onClick={onClose}
          >
            <span className="navbar-overlay__number">(02)</span>
            <BannerMedium content="TRABAJOS" />
          </Link>
        </nav>
        {/* Row 1: Close Button (column 3) */}
        <button
          onClick={onClose}
          className="navbar-overlay__close"
          aria-label="Cerrar menú"
        >
          <span className="navbar-overlay__close-text">CERRAR</span>
        </button>

        {/* Divider between rows - spans all 3 columns */}
        <div className="navbar-overlay__divider"></div>

        {/* Row 2: CTA Link (column 1) */}
        <div className="navbar-overlay__cta navbar-overlay__item--3">
          <AnimatedUnderline>
            <a
              href="#contact"
              className="navbar-overlay__cta-link"
              onClick={(e) => handleAnchorClick(e, "#contact", onClose)}
            >
              <HeadingSmall content="HÁBLANOS DE TU" />
              <HeadingSmall content="PROYECTO" />
            </a>
          </AnimatedUnderline>
        </div>

        {/* Row 2: Secondary Navigation (column 2, right-aligned) */}
        <nav className="navbar-overlay__secondary navbar-overlay__item--4" aria-label="Navegación de secciones">
          <AnimatedUnderline>
            <a
              href="#services"
              className="navbar-overlay__secondary-link"
              onClick={(e) => handleAnchorClick(e, "#services", onClose)}
            >
              <span className="text-small">SERVICIOS</span>
            </a>
          </AnimatedUnderline>

          <AnimatedUnderline>
            <a
              href="#portfolio"
              className="navbar-overlay__secondary-link"
              onClick={(e) => handleAnchorClick(e, "#portfolio", onClose)}
            >
              <span className="text-small">PORTAFOLIO</span>
            </a>
          </AnimatedUnderline>

          <AnimatedUnderline>
            <a
              href="#testimonials"
              className="navbar-overlay__secondary-link"
              onClick={(e) => handleAnchorClick(e, "#testimonials", onClose)}
            >
              <span className="text-small">TESTIMONIOS</span>
            </a>
          </AnimatedUnderline>
        </nav>

        {/* Row 2: Spacer (column 3) */}
        <div className="navbar-overlay__spacer"></div>
      </div>
    </div>
  );
}
