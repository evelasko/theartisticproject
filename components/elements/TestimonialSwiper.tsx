"use client";

import React, { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";

// Import required modules
import { EffectCards, Pagination, Autoplay, Keyboard } from "swiper/modules";

// Import components
import TestimonialCard, {
  type TestimonialCardProps,
} from "@/components/cards/TestimonialCard";
import IconButton from "@/components/elements/IconButton";
import { Icon } from "@/components/elements/Icon";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

/* ==========================================================================
   TESTIMONIAL SWIPER TYPES
   ========================================================================== */

export interface TestimonialSwiperProps {
  /** Array of testimonial data */
  testimonials: Omit<TestimonialCardProps, "className">[];
  /** Enable autoplay (default: false) */
  autoplay?: boolean;
  /** Autoplay delay in milliseconds (default: 5000) */
  autoplayDelay?: number;
  /** Enable navigation arrows (default: true) */
  showNavigation?: boolean;
  /** Enable pagination dots (default: true) */
  showPagination?: boolean;
  /** Additional class names for the swiper container */
  className?: string;
}

/* ==========================================================================
   TESTIMONIAL SWIPER COMPONENT
   
   A card-effect swiper carousel for displaying testimonial cards.
   Features:
   - Card stacking effect with smooth transitions
   - Custom IconButton navigation controls
   - Optional autoplay
   - Pagination dots
   - Keyboard navigation support
   - Improved bi-directional swipe interaction
   - Responsive behavior
   - Integrates with TestimonialCard component
   ========================================================================== */

export default function TestimonialSwiper({
  testimonials,
  autoplay = false,
  autoplayDelay = 5000,
  showNavigation = true,
  showPagination = true,
  className = "",
}: TestimonialSwiperProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Swiper modules to use
  const modules = [EffectCards, Keyboard];
  if (showPagination) modules.push(Pagination);
  if (autoplay) modules.push(Autoplay);

  // Navigation handlers
  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div className={`testimonial-swiper-container relative w-full ${className}`}>
      <Swiper
        effect="cards"
        grabCursor={true}
        modules={modules}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        pagination={
          showPagination
            ? {
                clickable: true,
                dynamicBullets: true,
              }
            : false
        }
        autoplay={
          autoplay
            ? {
                delay: autoplayDelay,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        loop={false}
        speed={400}
        allowTouchMove={true}
        touchRatio={1}
        threshold={10}
        longSwipesRatio={0.3}
        className="testimonial-swiper pb-20!"
        cardsEffect={{
          slideShadows: false,
          perSlideOffset: 8,
          perSlideRotate: 2,
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={`testimonial-${index}`} className="h-auto!">
            <TestimonialCard {...testimonial} className="h-full" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation with IconButton - Below pagination */}
      {showNavigation && (
        <div className="flex items-center justify-center gap-4 mt-4">
          <IconButton
            size="lg"
            ariaLabel="Previous testimonial"
            onClick={handlePrev}
            className={`transition-opacity ${
              isBeginning ? "opacity-40 cursor-not-allowed" : "opacity-100"
            }`}
          >
            <Icon icon={ArrowLeft01Icon} size={20} />
          </IconButton>
          <IconButton
            size="lg"
            ariaLabel="Next testimonial"
            onClick={handleNext}
            className={`transition-opacity ${
              isEnd ? "opacity-40 cursor-not-allowed" : "opacity-100"
            }`}
          >
            <Icon icon={ArrowRight01Icon} size={20} />
          </IconButton>
        </div>
      )}

      {/* Custom Styling for Pagination */}
      <style jsx global>{`
        /* Pagination Dots */
        .testimonial-swiper .swiper-pagination {
          bottom: 0 !important;
          position: relative !important;
          margin-top: 1.5rem;
        }

        .testimonial-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.3);
          opacity: 1;
          transition: all 300ms ease;
          margin: 0 4px !important;
        }

        .testimonial-swiper .swiper-pagination-bullet-active {
          background: rgba(255, 255, 255, 0.9);
          width: 24px;
          border-radius: 4px;
        }

        .testimonial-swiper .swiper-pagination-bullet:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        /* Card Effect Adjustments */
        .testimonial-swiper .swiper-slide {
          display: flex;
          align-items: stretch;
        }

        /* Ensure proper sizing for cards effect */
        .testimonial-swiper.swiper {
          max-width: 600px;
          margin: 0 auto;
          padding-bottom: 0 !important;
        }

        @media (max-width: 991px) {
          .testimonial-swiper.swiper {
            max-width: 480px;
          }
        }

        @media (max-width: 640px) {
          .testimonial-swiper.swiper {
            max-width: 100%;
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }

        /* Improve touch interaction for cards effect */
        .testimonial-swiper .swiper-wrapper {
          cursor: grab;
        }

        .testimonial-swiper .swiper-wrapper:active {
          cursor: grabbing;
        }
      `}</style>
    </div>
  );
}