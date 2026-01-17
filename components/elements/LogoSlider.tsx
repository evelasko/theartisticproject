'use client';

import { useEffect, useRef } from 'react';

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

type LogoRowProps = {
  row: LogoRow;
  gap: number;
  logoHeight: number;
  defaultSpeed: number;
};

function LogoRow({ row, gap, logoHeight, defaultSpeed }: LogoRowProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const direction = row.direction || 'left';
  const speed = row.speed || defaultSpeed;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationFrameId: number;
    let position = 0;
    const trackWidth = track.scrollWidth / 2; // Half because we duplicate the logos

    const animate = () => {
      if (direction === 'left') {
        position -= speed / 60; // Convert speed per second to per frame (60fps)
        if (position <= -trackWidth) {
          position = 0;
        }
      } else {
        position += speed / 60;
        if (position >= 0) {
          position = -trackWidth;
        }
      }

      track.style.transform = `translateX(${position}px)`;
      animationFrameId = requestAnimationFrame(animate);
    };

    // Start from the correct position for right direction
    if (direction === 'right') {
      position = -trackWidth;
    }

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [direction, speed]);

  // Calculate scaled widths based on aspect ratio preservation
  const scaledLogos = row.logos.map((logo) => {
    const aspectRatio = logo.width / logo.height;
    const scaledWidth = logoHeight * aspectRatio;
    return {
      ...logo,
      scaledWidth,
    };
  });

  return (
    <div className="relative w-full py-4">
      <div
        ref={trackRef}
        className="flex items-center will-change-transform"
        style={{ gap: `${gap}px` }}
      >
        {/* First set of logos */}
        {scaledLogos.map((logo, index) => (
          <div
            key={`original-${index}`}
            className="shrink-0"
            style={{
              width: `${logo.scaledWidth}px`,
              height: `${logoHeight}px`,
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              {logo.element}
            </div>
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {scaledLogos.map((logo, index) => (
          <div
            key={`duplicate-${index}`}
            className="shrink-0"
            style={{
              width: `${logo.scaledWidth}px`,
              height: `${logoHeight}px`,
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              {logo.element}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}