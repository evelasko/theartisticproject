import { BannerMedium } from "@/components";
import Image from "next/image";

interface PosterHeroProps {
  imageSrc?: string;
  imageAlt?: string;
}

export default function PosterHero({
  imageSrc = "/assets/images/poster-hero.jpg",
  imageAlt = "Hero image",
}: PosterHeroProps = {}) {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: "calc(100vh + 200px)" }}>
      {/* Background Image with gradient mask */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          maskImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) calc(100% - 200px), rgba(0, 0, 0, 0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) calc(100% - 200px), rgba(0, 0, 0, 0) 100%)",
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Logo - positioned absolutely on mobile/tablet, centered on desktop */}
      <div className="poster-hero__logo-wrapper">
        <div className="poster-hero__logo">
          {/* Mobile/Tablet: 3 rows, left-aligned */}
          <div className="poster-hero__logo-mobile">
            <div className="flex justify-start h-[16vw]">
              <BannerMedium content="The" ornateLetters="c" className="poster-hero__logo-text-mobile" />
            </div>
            <div className="flex justify-start h-[16vw]">
              <BannerMedium content="Artistic" ornateLetters="c" className="poster-hero__logo-text-mobile" />
            </div>
            <div className="flex justify-start h-[16vw]">
              <BannerMedium content="Project" alternateLetters="o" className="poster-hero__logo-text-mobile" />
            </div>
          </div>
          
          {/* Desktop: 2 rows, centered */}
          <div className="poster-hero__logo-desktop">
            <div className="flex justify-end">
              <BannerMedium content="The" ornateLetters="c" />
            </div>
            <div className="flex justify-start w-full">
              <BannerMedium content="Artistic" ornateLetters="c" />
            </div>
            <div /> {/* Empty space for 2nd row, 1st column */}
            <div className="flex justify-start w-full">
              <BannerMedium content="Project" alternateLetters="o" />
            </div>
          </div>
        </div>
      </div>

      {/* Content overlay - positioned at top center */}
      <div className="relative z-10 w-full flex flex-col items-center justify-start pt-[80px]" style={{ height: "100vh" }}>
        {/* Content can go here if needed */}
      </div>
    </div>
  );
}