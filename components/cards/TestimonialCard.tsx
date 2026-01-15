"use client";

import Image from "next/image";
import clsx from "clsx";

/* ==========================================================================
   TESTIMONIAL CARD TYPES
   ========================================================================== */

export interface TestimonialCardProps {
  /** Name of the testimonial author */
  name: string;
  /** Role/title of the author (e.g., "Hospitality Brand Manager") */
  role: string;
  /** Short highlight quote */
  quote: string;
  /** Full testimonial text */
  testimonial: string;
  /** Index number for display (e.g., 1 displays as "01") */
  index: number;
  /** Author avatar image URL */
  avatarSrc?: string;
  /** Additional class names */
  className?: string;
}

/* ==========================================================================
   BORDER IMAGE PATHS
   ========================================================================== */

/**
 * Border image paths
 * 
 * Note: The original Naya Studio website has confusingly named files where
 * the mobile card border uses a file named "author-border_mob" and vice versa.
 * We use the correct mapping based on actual image dimensions and purpose:
 * - Card desktop (2000x1849): review-border-p-2000.webp
 * - Card mobile (1188x1480): author-border_mob.webp (tall rectangle for card)
 * - Avatar desktop (928x948): author-border.webp
 * - Avatar mobile (280x288): review-border_mob.webp (small square for avatar)
 */
const BORDER_IMAGES = {
  card: {
    desktop: "/assets/decorations/review-border-p-2000.webp",
    mobile: "/assets/decorations/author-border_mob.webp",
  },
  avatar: {
    desktop: "/assets/decorations/author-border.webp",
    mobile: "/assets/decorations/review-border_mob.webp",
  },
} as const;

/* ==========================================================================
   TESTIMONIAL CARD COMPONENT
   
   A testimonial card following the design from the Naya Studio website.
   
   Layout Modes:
   - Mobile/Tablet: Stacked layout with divider
   - Desktop (lg+): Two-column layout
     - Column 1: Avatar (top) + Index (bottom)
     - Column 2: Name/Role (top) + Quote/Testimonial (bottom)
   ========================================================================== */

export default function TestimonialCard({
  name,
  role,
  quote,
  testimonial,
  index,
  avatarSrc,
  className,
}: TestimonialCardProps) {
  // Format index to always show two digits
  const formattedIndex = index.toString().padStart(2, "0");

  return (
    <article
      className={clsx(
        "testimonial-card",
        "relative overflow-hidden",
        "w-full",
        "p-[6.5%]",
        "rounded-[40px] md:rounded-[30px]",
        className
      )}
    >
      {/* Background gradient overlay */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(180deg, #101010, rgba(17, 17, 17, 0.5))",
        }}
      />

      {/* Decorative Card Border Images */}
      {/* Desktop border - shown at lg+ breakpoint */}
      <Image
        src={BORDER_IMAGES.card.desktop}
        alt=""
        fill
        className="hidden lg:block object-fill pointer-events-none"
        sizes="(min-width: 1024px) 600px, 0px"
        priority={false}
        aria-hidden="true"
      />
      {/* Mobile/Tablet border - shown below lg breakpoint */}
      <Image
        src={BORDER_IMAGES.card.mobile}
        alt=""
        fill
        className="lg:hidden object-fill pointer-events-none"
        sizes="(max-width: 1023px) 100vw, 0px"
        priority={false}
        aria-hidden="true"
      />

      {/* ================================================================
          MOBILE/TABLET LAYOUT (< lg)
          Stacked layout with divider
          ================================================================ */}
      <div className="flex flex-col justify-between h-full lg:hidden">
        {/* Top Section: Author Info */}
        <div className="flex flex-col gap-6 md:gap-8">
          {/* Author Grid: Avatar + Name/Role */}
          <div className="flex gap-4 items-start">
            {/* Author Avatar Block */}
            <div className="relative shrink-0 w-24 h-24 md:w-32 md:h-32">
              {/* Decorative Avatar Border - Mobile variant */}
              <Image
                src={BORDER_IMAGES.avatar.mobile}
                alt=""
                fill
                className="object-fill pointer-events-none"
                sizes="160px"
                priority={false}
                aria-hidden="true"
              />
              {/* Avatar Image */}
              <div className="absolute inset-[6%] rounded-full overflow-hidden bg-bg-elevated">
                {avatarSrc ? (
                  <Image
                    src={avatarSrc}
                    alt={`${name} avatar`}
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                ) : (
                  <div className="w-full h-full bg-bg-muted flex items-center justify-center">
                    <span className="text-2xl md:text-3xl text-muted font-thin">
                      {name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Author Info: Name + Role */}
            <div className="flex flex-col justify-center gap-4 md:gap-5 min-h-24 md:min-h-32">
              <h3 className="testimonial-author-name font-thin uppercase tracking-normal leading-none">
                {name}
              </h3>
              <p className="text-small text-muted uppercase">
                {role}
              </p>
            </div>
          </div>

          {/* Divider - Mobile/Tablet only */}
          <div
            className="w-full h-px"
            style={{
              background: "linear-gradient(90deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.44))",
              opacity: 0.21,
            }}
          />
        </div>

        {/* Bottom Section: Quote/Testimonial */}
        <div className="flex gap-4 items-start mt-6 md:mt-8">
          <p className="text-small hidden md:block whitespace-nowrap shrink-0 pt-1">
            ( <span className="tabular-nums">{formattedIndex}</span> )
          </p>
          <div className="flex flex-col gap-6 md:gap-10">
            <p className="text-medium uppercase leading-snug">
              {quote}
            </p>
            <p className="text-small text-muted uppercase">
              {testimonial}
            </p>
          </div>
        </div>
      </div>

      {/* ================================================================
          DESKTOP LAYOUT (lg+)
          Two-column layout:
          - Column 1: Avatar (top) + Index (bottom)
          - Column 2: Name/Role (top) + Quote/Testimonial (bottom)
          ================================================================ */}
      <div className="hidden lg:grid lg:grid-cols-[auto_1fr] lg:gap-6 h-full">
        {/* Column 1: Avatar + Index */}
        <div className="flex flex-col justify-between items-start">
          {/* Avatar */}
          <div className="relative shrink-0 w-36 h-36 xl:w-40 xl:h-40">
            {/* Decorative Avatar Border - Desktop variant */}
            <Image
              src={BORDER_IMAGES.avatar.desktop}
              alt=""
              fill
              className="object-fill pointer-events-none"
              sizes="160px"
              priority={false}
              aria-hidden="true"
            />
            {/* Avatar Image */}
            <div className="absolute inset-[6%] rounded-full overflow-hidden bg-bg-elevated">
              {avatarSrc ? (
                <Image
                  src={avatarSrc}
                  alt={`${name} avatar`}
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              ) : (
                <div className="w-full h-full bg-bg-muted flex items-center justify-center">
                  <span className="text-3xl text-muted font-thin">
                    {name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Index */}
          <p className="text-small whitespace-nowrap">
            ( <span className="tabular-nums">{formattedIndex}</span> )
          </p>
        </div>

        {/* Column 2: Name/Role + Quote/Testimonial */}
        <div className="flex flex-col justify-between">
          {/* Group 1: Name + Role */}
          <div className="flex flex-col gap-5">
            <h3 className="testimonial-author-name font-thin uppercase tracking-normal leading-none">
              {name}
            </h3>
            <p className="text-small text-muted uppercase">
              {role}
            </p>
          </div>

          {/* Group 2: Quote + Testimonial */}
          <div className="flex flex-col gap-10">
            <p className="text-medium uppercase leading-snug">
              {quote}
            </p>
            <p className="text-small text-muted uppercase">
              {testimonial}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
