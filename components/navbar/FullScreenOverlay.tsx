"use client";

import { useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import { BannerMedium, HeadingSmall, TextSmallMuted } from "@/components";
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

  if (!isOpen) return null;

  return (
    <div
      className={clsx("navbar-overlay", { "navbar-overlay--open": isOpen })}
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
            <TextSmallMuted>(01)</TextSmallMuted>
            <BannerMedium content="HOME" />
          </Link>

          <Link
            href="/trabajos"
            className="navbar-overlay__primary-item navbar-overlay__item--2"
            onClick={onClose}
          >
            <TextSmallMuted>(02)</TextSmallMuted>
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

        {/* Row 2: CTA Link (column 1) */}
        <div className="navbar-overlay__cta navbar-overlay__item--3">
          <AnimatedUnderline>
            <a
              href="#contact"
              className="navbar-overlay__cta-link"
              onClick={(e) => handleAnchorClick(e, "#contact", onClose)}
            >
              <HeadingSmall content="HÁBLANOS DE TU PROYECTO" />
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
