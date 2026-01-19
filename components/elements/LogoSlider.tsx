'use client';

import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

// Import required modules
import { Autoplay, FreeMode } from 'swiper/modules';

/* ==========================================================================
   LOGO SLIDER TYPES
   ========================================================================== */

type Logo = {
  element: React.ReactElement;
  width: number;
  height: number;
};

type LogoRow = {
  logos: Logo[];
  direction?: 'left' | 'right';
  speed?: number;
};

type LogoSliderProps = {
  rows: LogoRow[];
  gap?: number; // Gap between logos in pixels
  logoHeight?: number; // Consistent height for all logos in pixels
  speed?: number; // Default speed in pixels per second
};

/* ==========================================================================
   LOGO SLIDER COMPONENT
   
   A continuous marquee carousel for displaying logo images.
   Features:
   - Multiple rows with independent direction control
   - True infinite loop using SwiperJS
   - Smooth, flicker-free animation
   - Configurable speed per row
   - Aspect ratio preservation for logos
   - No user interaction (pure marquee effect)
   ========================================================================== */

export default function LogoSlider({
  rows,
  gap = 40,
  logoHeight = 60,
  speed = 50,
}: LogoSliderProps) {
  return (
    <div className="w-full overflow-hidden">
      {rows.map((row, rowIndex) => (
        <LogoRow
          key={rowIndex}
          row={row}
          gap={gap}
          logoHeight={logoHeight}
          defaultSpeed={speed}
        />
      ))}
    </div>
  );
}

/* ==========================================================================
   LOGO ROW SUB-COMPONENT
   ========================================================================== */

type LogoRowProps = {
  row: LogoRow;
  gap: number;
  logoHeight: number;
  defaultSpeed: number;
};

function LogoRow({ row, gap, logoHeight, defaultSpeed }: LogoRowProps) {
  const direction = row.direction || 'left';
  const speed = row.speed || defaultSpeed;

  // Calculate scaled widths based on aspect ratio preservation
  const scaledLogos = row.logos.map((logo) => {
    const aspectRatio = logo.width / logo.height;
    const scaledWidth = logoHeight * aspectRatio;
    return {
      ...logo,
      scaledWidth,
    };
  });

  // Duplicate slides to ensure total width exceeds viewport for proper loop behavior
  // This prevents Swiper from locking when all slides fit within the container
  const duplicatedLogos = [...scaledLogos, ...scaledLogos];

  // Convert speed (pixels per second) to appropriate transition speed (milliseconds)
  // For a continuous marquee: higher speed value = slower movement
  // Formula: time to move one slide = (slideWidth / pixelsPerSecond) * 1000
  const averageWidth = scaledLogos.reduce((sum, logo) => sum + logo.scaledWidth + gap, 0) / scaledLogos.length;
  const transitionSpeed = Math.round((averageWidth / speed) * 1000);

  return (
    <div className="relative w-full max-w-full overflow-hidden py-4">
      <Swiper
        modules={[Autoplay, FreeMode]}
        slidesPerView="auto"
        loop={true}
        loopAdditionalSlides={scaledLogos.length}
        speed={transitionSpeed}
        freeMode={{
          enabled: true,
          momentum: false, // Disable momentum for linear movement
        }}
        autoplay={{
          delay: 1, // Minimal delay for continuous movement (0 causes timer issues)
          disableOnInteraction: false,
          reverseDirection: direction === 'right',
          pauseOnMouseEnter: false,
        }}
        allowTouchMove={false}
        grabCursor={false}
        className="logo-slider-swiper"
        spaceBetween={gap}
        onBeforeInit={(swiper) => {
          // Force linear timing function for smooth continuous scrolling
          if (swiper.wrapperEl) {
            swiper.wrapperEl.style.transitionTimingFunction = 'linear';
          }
        }}
        onInit={(swiper) => {
          // Ensure linear timing persists after initialization
          if (swiper.wrapperEl) {
            swiper.wrapperEl.style.transitionTimingFunction = 'linear';
          }
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <SwiperSlide
            key={`logo-${index}`}
            style={{ width: 'auto' }}
            className="flex! items-center justify-center"
          >
            <div
              className="flex items-center justify-center"
              style={{
                width: `${logo.scaledWidth}px`,
                height: `${logoHeight}px`,
              }}
            >
              {logo.element}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Styling */}
      <style jsx global>{`
        /* Logo Slider Swiper Container - Force viewport constraint */
        .logo-slider-swiper {
          width: 100%;
          max-width: 100vw;
          overflow: hidden;
        }

        /* Allow wrapper to expand to full content width */
        .logo-slider-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
          display: flex;
          align-items: center;
          width: max-content !important; /* Allow natural content width */
        }

        /* Ensure slides maintain their size */
        .logo-slider-swiper .swiper-slide {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}