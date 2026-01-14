"use client";

import Link from "next/link";
import clsx from "clsx";

interface TopBarProps {
  isAtTop: boolean;
  isScrolled: boolean;
  isHidden: boolean;
  onMenuClick: () => void;
}

/**
 * TopBar Component
 * 
 * Fixed header bar with brand name and menu trigger
 * Implements glassmorphism effect when scrolled
 */
export function TopBar({ isAtTop, isScrolled, isHidden, onMenuClick }: TopBarProps) {
  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-9990",
        "transition-transform duration-500 ease-[cubic-bezier(0.25,0,0.3,1)]",
        {
          "bg-[rgba(10,9,6,0.2)] backdrop-blur-sm": isScrolled && !isAtTop,
          "-translate-y-full": isHidden,
        }
      )}
      role="banner"
    >
      <div className="flex items-center justify-between px-[3.125vw] py-[1.5vw] max-w-full">
        {/* Left: Brand */}
        <div className="flex items-center">
          <Link 
            href="/" 
            className="text-(length:--text-small) font-normal tracking-[0.2em] uppercase text-text-primary transition-opacity duration-200 hover:opacity-70"
            aria-label="The Artistic Project - Ir a inicio"
          >
            <span className="inline-block">
              The Artistic Project
            </span>
          </Link>
        </div>

        {/* Right: Menu Button */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="bg-transparent border-none p-0 cursor-pointer text-(length:--text-small) font-normal tracking-[0.25em] uppercase text-text-primary transition-opacity duration-200 hover:opacity-70"
            aria-label="Abrir menú de navegación"
            aria-expanded="false"
          >
            <span className="inline-block">MENÚ</span>
          </button>
        </div>
      </div>
    </header>
  );
}
