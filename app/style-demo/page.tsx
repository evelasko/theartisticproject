import {
  OrnateText,
  H1,
  BannerLarge,
  BannerMedium,
  HeadingSmall,
  H3,
  TextLarge,
  TextMedium,
  TextSmall,
  TextSmallMuted,
  Subheading,
  HeadingParagraph,
  CircleIndicator,
} from "@/components";

export default function StyleDemoPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Golden Glow */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Golden glow background */}
        <div className="absolute inset-0 gradient-gold-glow" />

        {/* Content */}
        <div className="relative z-10 container-site text-center">
          <Subheading className="mb-8 mt-8 pt-8 text-secondary">style system demo</Subheading>

          <H1 className="mb-8">
            <OrnateText
              content="the artistic"
              alternateLetters="o"
              className="text-h1"
            />
          </H1>

          <BannerLarge
            content="project"
            ornateLetters="o"
            className="mb-16"
          />

          <HeadingParagraph className="w-full pt-12 mx-auto text-center">
            A comprehensive typography and color system
            inspired by editorial design excellence
          </HeadingParagraph>
        </div>

        {/* Gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[30vh] gradient-fade-bottom" />
      </section>

      {/* Typography Section */}
      <section className="py-[10vw] container-site">
        <div className="mb-[5vw]">
          <TextSmallMuted className="mb-4 pb-8">(01)</TextSmallMuted>
          <BannerMedium content="typography" ornateLetters="o" />
        </div>

        {/* Typography Scale */}
        <div className="space-y-[4vw] mt-[6vw]">
          {/* H1 */}
          <div className="border-t border-default pt-[2vw]">
            <TextSmallMuted className="mb-4">h1 / hero display</TextSmallMuted>
            <OrnateText
              content="cube studio"
              className="text-h1"
              as="h1"
            />
          </div>

          {/* Banner Large */}
          <div className="border-t border-default pt-[2vw]">
            <TextSmallMuted className="mb-4 pb-12">banner-large (h2)</TextSmallMuted>
            <BannerLarge content="design that blooms into emotion" className="text-shadow-[1px_1px_25px_rgb(255_255_255/0.55)]" />
            <p
              className="py-12 my-custom-text-shadow"
              // style={{
              //   textShadow: "1px 1px 10px rgba(255,255,255,0.95)",
              // }}
            >
              GLOW SAMPLE TEXT
            </p>
            <p className="py-12 text-shadow-[1px_1px_15px_rgb(255_255_255/0.95)]">
              GLOW SAMPLE TEXT WITH TAILWIND
            </p>
          </div>

          {/* Banner Medium */}
          <div className="border-t border-default pt-[2vw]">
            <TextSmallMuted className="mb-4 pb-12">banner-medium (h2)</TextSmallMuted>
            <BannerMedium content="let's make the moment blossom" />
          </div>

          {/* Heading Small with Ornaments */}
          <div className="border-t border-default pt-[2vw]">
            <TextSmallMuted className="mb-4 pb-4">h3 with ornaments</TextSmallMuted>
            <HeadingSmall content="quality, that lasts" alternateLetters="q" />
          </div>

          {/* H3 Plain */}
          <div className="border-t border-default pt-[2vw]">
            <TextSmallMuted className="mb-4 pb-4">h3 plain</TextSmallMuted>
            <H3>Omar</H3>
          </div>

          {/* Text Large */}
          <div className="border-t border-default pt-[2vw]">
            <TextSmallMuted className="mb-4 pb-4">text-large</TextSmallMuted>
            <TextLarge>Plan Your Event</TextLarge>
          </div>

          {/* Text Medium */}
          <div className="border-t border-default pt-[2vw]">
            <TextSmallMuted className="mb-4 pb-4">text-medium</TextSmallMuted>
            <TextMedium>
              Everything was delivered on time and with zero stress.
            </TextMedium>
          </div>

          {/* Text Small */}
          <div className="border-t border-default pt-[2vw]">
            <TextSmallMuted className="mb-4 pb-4">text-small</TextSmallMuted>
            <TextSmall>
              Low-maintenance, high-quality artificial plants for lasting
              indoor & outdoor aesthetics
            </TextSmall>
          </div>

          {/* Text Small Muted */}
          <div className="border-t border-default pt-[2vw]">
            <TextSmallMuted className="mb-4 pb-4">text-small-muted</TextSmallMuted>
            <TextSmallMuted>Hospitality Brand Manager</TextSmallMuted>
          </div>

          {/* Subheading */}
          <div className="border-t border-default pt-[2vw]">
            <TextSmallMuted className="mb-4 pb-4">subheading</TextSmallMuted>
            <Subheading>capabilities</Subheading>
          </div>
        </div>
      </section>

      {/* Color System Section */}
      <section className="py-[10vw] container-site">
        <div className="mb-[5vw]">
          <TextSmallMuted className="mb-4">(02)</TextSmallMuted>
          <BannerMedium content="color system" alternateLetters="o" />
        </div>

        {/* Background Colors */}
        <div className="mt-[6vw]">
          <TextSmall className="mb-[2vw]">Background Scale</TextSmall>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="aspect-square bg-pure border border-default flex items-end p-4">
              <TextSmallMuted>pure<br />#000000</TextSmallMuted>
            </div>
            <div className="aspect-square bg-soft border border-default flex items-end p-4">
              <TextSmallMuted>soft<br />#101010</TextSmallMuted>
            </div>
            <div className="aspect-square bg-elevated border border-default flex items-end p-4">
              <TextSmallMuted>elevated<br />#111111</TextSmallMuted>
            </div>
            <div className="aspect-square bg-muted border border-default flex items-end p-4">
              <TextSmallMuted>muted<br />#202123</TextSmallMuted>
            </div>
            <div className="aspect-square bg-bg-accent border border-default flex items-end p-4">
              <TextSmallMuted>accent<br />#252728</TextSmallMuted>
            </div>
            <div className="aspect-square bg-charcoal border border-default flex items-end p-4">
              <TextSmallMuted>charcoal<br />#313235</TextSmallMuted>
            </div>
          </div>
        </div>

        {/* Accent Colors */}
        <div className="mt-[4vw]">
          <TextSmall className="mb-[2vw]">Accent Golds</TextSmall>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="aspect-square bg-accent-deep-gold border border-default flex items-end p-4">
              <TextSmallMuted>deep gold<br />#8B6914</TextSmallMuted>
            </div>
            <div className="aspect-square bg-accent-gold border border-default flex items-end p-4">
              <TextSmallMuted>gold<br />#A67C00</TextSmallMuted>
            </div>
            <div className="aspect-square bg-accent-dark-gold border border-default flex items-end p-4">
              <TextSmallMuted>dark gold<br />#6B5B00</TextSmallMuted>
            </div>
            <div className="aspect-square bg-accent-bright-gold border border-default flex items-end p-4">
              <TextSmallMuted>bright gold<br />#D4AF37</TextSmallMuted>
            </div>
            <div className="aspect-square bg-accent-interactive border border-default flex items-end p-4">
              <TextSmallMuted>interactive<br />#C9A227</TextSmallMuted>
            </div>
          </div>
        </div>

        {/* Text Colors */}
        <div className="mt-[4vw]">
          <TextSmall className="mb-[2vw]">Text Colors</TextSmall>
          <div className="space-y-4">
            <div className="flex items-center gap-8">
              <span className="text-primary text-large">Text Primary</span>
              <TextSmallMuted>#FFFFFF (100%)</TextSmallMuted>
            </div>
            <div className="flex items-center gap-8">
              <span className="text-secondary text-large">Text Secondary</span>
              <TextSmallMuted>#FFFFFF (54%)</TextSmallMuted>
            </div>
            <div className="flex items-center gap-8">
              <span className="text-muted text-large">Text Muted</span>
              <TextSmallMuted>#FFFFFF (33%)</TextSmallMuted>
            </div>
            <div className="flex items-center gap-8">
              <span className="text-subtle text-large">Text Subtle</span>
              <TextSmallMuted>#FFFFFF (21%)</TextSmallMuted>
            </div>
          </div>
        </div>
      </section>

      {/* Gradients Section */}
      <section className="py-[10vw] container-site">
        <div className="mb-[5vw]">
          <TextSmallMuted className="mb-4">(03)</TextSmallMuted>
          <BannerMedium content="gradients" alternateLetters="o" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-[6vw]">
          {/* Gold Glow */}
          <div className="aspect-video gradient-gold-glow rounded-[2vw] flex items-end p-8">
            <TextSmall>gradient-gold-glow</TextSmall>
          </div>

          {/* Gold Glow Alt */}
          <div className="aspect-video gradient-gold-glow-alt rounded-[2vw] flex items-end p-8">
            <TextSmall>gradient-gold-glow-alt</TextSmall>
          </div>

          {/* Gold Shimmer */}
          <div className="aspect-video gradient-gold-shimmer bg-pure rounded-[2vw] flex items-end p-8 border border-default">
            <TextSmall>gradient-gold-shimmer</TextSmall>
          </div>

          {/* Glass Gold */}
          <div className="aspect-video gradient-glass-gold border border-default rounded-[2vw] flex items-end p-8">
            <TextSmall>gradient-glass-gold</TextSmall>
          </div>

          {/* Glass */}
          <div className="aspect-video gradient-glass border border-default rounded-[2vw] flex items-end p-8">
            <TextSmall>gradient-glass</TextSmall>
          </div>

          {/* Card Dark */}
          <div className="aspect-video gradient-card-dark border border-default rounded-[2vw] flex items-end p-8">
            <TextSmall>gradient-card-dark</TextSmall>
          </div>
        </div>
      </section>

      {/* Glassmorphism Section */}
      <section className="py-[10vw] relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 gradient-gold-glow opacity-50" />

        <div className="relative z-10 container-site">
          <div className="mb-[5vw]">
            <TextSmallMuted className="mb-4">(04)</TextSmallMuted>
            <BannerMedium content="glassmorphism" alternateLetters="o" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-[6vw]">
            {/* Glass Light */}
            <div className="glass-light rounded-[2vw] p-8 min-h-[20vw] flex flex-col justify-between">
              <TextSmall>glass-light</TextSmall>
              <TextSmallMuted>backdrop-blur: 3.6vw</TextSmallMuted>
            </div>

            {/* Glass Medium */}
            <div className="glass-medium rounded-[2vw] p-8 min-h-[20vw] flex flex-col justify-between">
              <TextSmall>glass-medium</TextSmall>
              <TextSmallMuted>backdrop-blur: 3vw</TextSmallMuted>
            </div>

            {/* Glass Gold */}
            <div className="glass-gold rounded-[2vw] p-8 min-h-[20vw] flex flex-col justify-between">
              <TextSmall>glass-gold</TextSmall>
              <TextSmallMuted>luxurious gold tint</TextSmallMuted>
            </div>

            {/* Glass Subtle */}
            <div className="glass-subtle rounded-[2vw] p-8 min-h-[20vw] flex flex-col justify-between">
              <TextSmall>glass-subtle</TextSmall>
              <TextSmallMuted>backdrop-blur: 0.3vw</TextSmallMuted>
            </div>

            {/* Glass Gold Subtle */}
            <div className="glass-gold-subtle rounded-[2vw] p-8 min-h-[20vw] flex flex-col justify-between">
              <TextSmall>glass-gold-subtle</TextSmall>
              <TextSmallMuted>subtle gold accent</TextSmallMuted>
            </div>

            {/* Glass Card Dark */}
            <div className="glass-card-dark rounded-[2vw] p-8 min-h-[20vw] flex flex-col justify-between">
              <TextSmall>glass-card-dark</TextSmall>
              <TextSmallMuted>dark surface</TextSmallMuted>
            </div>
          </div>
        </div>
      </section>

      {/* Components Section */}
      <section className="py-[10vw] container-site">
        <div className="mb-[5vw]">
          <TextSmallMuted className="mb-4 pb-12">(05)</TextSmallMuted>
          <BannerMedium content="components" alternateLetters="o" />
        </div>

        {/* Tags */}
        <div className="mt-[6vw]">
          <TextSmall className="mb-[2vw] pb-8">Tags / Buttons</TextSmall>
          <div className="flex flex-wrap gap-4">
            <button className="tag">Plan Your Event</button>
            <button className="tag">Discuss the Project</button>
            <button className="tag">View Gallery</button>
          </div>
        </div>

        {/* Dividers */}
        <div className="mt-[4vw]">
          <TextSmall className="mb-[2vw]">Dividers</TextSmall>
          <div className="space-y-8">
            <div>
              <TextSmallMuted className="mb-2">divider-horizontal</TextSmallMuted>
              <div className="divider-horizontal" />
            </div>
            <div>
              <TextSmallMuted className="mb-2">gradient-divider-centered</TextSmallMuted>
              <div className="h-px gradient-divider-centered" />
            </div>
            <div>
              <TextSmallMuted className="mb-2">gradient-divider-gold-centered</TextSmallMuted>
              <div className="h-px gradient-divider-gold-centered" />
            </div>
          </div>
        </div>
      </section>

      {/* CircleIndicator Section */}
      <section className="py-[10vw] container-site">
        <div className="mb-[5vw]">
          <TextSmallMuted className="mb-4 pb-12">(06)</TextSmallMuted>
          <BannerMedium content="circle indicator" ornateLetters="o" />
        </div>

        <div className="space-y-[4vw] mt-[6vw]">
          {/* Basic Indicator */}
          <div className="border-t border-default pt-[2vw]">
            <TextSmallMuted className="mb-4 pb-8">basic indicator</TextSmallMuted>
            <div className="flex items-center gap-8">
              <CircleIndicator />
              <TextSmall>Default appearance with glow effect</TextSmall>
            </div>
          </div>

          {/* With Text Label */}
          <div className="border-t border-default pt-[2vw]">
            <TextSmallMuted className="mb-4 pb-8">with text label (section header style)</TextSmallMuted>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <CircleIndicator />
                <TextSmall>capabilities</TextSmall>
              </div>
              <div className="flex items-center gap-3">
                <CircleIndicator />
                <TextSmall>discover why</TextSmall>
              </div>
              <div className="flex items-center gap-3">
                <CircleIndicator />
                <Subheading>style system demo</Subheading>
              </div>
            </div>
          </div>

          {/* Interactive Variant */}
          <div className="border-t border-default pt-[2vw]">
            <TextSmallMuted className="mb-4 pb-8">interactive variant (hover to scale)</TextSmallMuted>
            <div className="space-y-6">
              <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                <CircleIndicator interactive />
                <TextSmall>Menu</TextSmall>
              </div>
              <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                <CircleIndicator interactive />
                <TextSmall>Close</TextSmall>
              </div>
              <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                <CircleIndicator interactive />
                <TextLarge>Plan Your Event</TextLarge>
              </div>
            </div>
          </div>

          {/* Active/Inactive States */}
          <div className="border-t border-default pt-[2vw]">
            <TextSmallMuted className="mb-4 pb-8">active/inactive states</TextSmallMuted>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <CircleIndicator active={true} />
                <TextSmall>Active (visible)</TextSmall>
              </div>
              <div className="flex items-center gap-3">
                <CircleIndicator active={false} />
                <TextSmall>Inactive (scaled to 0)</TextSmall>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <CircleIndicator active={true} />
                  <TextSmall>01</TextSmall>
                </div>
                <div className="flex items-center gap-2">
                  <CircleIndicator active={false} />
                  <TextSmall>02</TextSmall>
                </div>
                <div className="flex items-center gap-2">
                  <CircleIndicator active={true} />
                  <TextSmall>03</TextSmall>
                </div>
              </div>
            </div>
          </div>

          {/* Dark Mode Variant */}
          <div className="border-t border-default pt-[2vw]">
            <TextSmallMuted className="mb-4 pb-8">dark mode variant (inverted for light backgrounds)</TextSmallMuted>
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-[1vw] inline-flex items-center gap-3">
                <CircleIndicator darkMode />
                <span className="text-black text-sm font-body">Dark mode indicator</span>
              </div>
              <div className="bg-accent-bright-gold p-8 rounded-[1vw] inline-flex items-center gap-3">
                <CircleIndicator darkMode />
                <span className="text-black text-sm font-body">On gold background</span>
              </div>
              <div className="glass-light p-8 rounded-[1vw] inline-flex items-center gap-3">
                <CircleIndicator darkMode />
                <span className="text-black text-sm font-body">On glass surface</span>
              </div>
            </div>
          </div>

          {/* Multiple Indicators */}
          <div className="border-t border-default pt-[2vw]">
            <TextSmallMuted className="mb-4 pb-8">multiple indicators in sequence</TextSmallMuted>
            <div className="space-y-6">
              <div className="flex items-center gap-8 flex-wrap">
                <div className="flex items-center gap-2">
                  <CircleIndicator />
                  <TextSmall>Audiovisual</TextSmall>
                </div>
                <div className="flex items-center gap-2">
                  <CircleIndicator />
                  <TextSmall>Espectáculos</TextSmall>
                </div>
                <div className="flex items-center gap-2">
                  <CircleIndicator />
                  <TextSmall>Eventos</TextSmall>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <CircleIndicator />
                  <TextSmallMuted>01</TextSmallMuted>
                </div>
                <div className="flex items-center gap-2">
                  <CircleIndicator />
                  <TextSmallMuted>02</TextSmallMuted>
                </div>
                <div className="flex items-center gap-2">
                  <CircleIndicator />
                  <TextSmallMuted>03</TextSmallMuted>
                </div>
                <div className="flex items-center gap-2">
                  <CircleIndicator />
                  <TextSmallMuted>04</TextSmallMuted>
                </div>
              </div>
            </div>
          </div>

          {/* Size Comparison */}
          <div className="border-t border-default pt-[2vw]">
            <TextSmallMuted className="mb-4 pb-8">size reference across typography</TextSmallMuted>
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <CircleIndicator />
                <H3>H3 Heading</H3>
              </div>
              <div className="flex items-center gap-3">
                <CircleIndicator />
                <TextLarge>Text Large</TextLarge>
              </div>
              <div className="flex items-center gap-3">
                <CircleIndicator />
                <TextMedium>Text Medium</TextMedium>
              </div>
              <div className="flex items-center gap-3">
                <CircleIndicator />
                <TextSmall>Text Small</TextSmall>
              </div>
              <div className="flex items-center gap-3">
                <CircleIndicator />
                <TextSmallMuted>Text Small Muted</TextSmallMuted>
              </div>
              <div className="flex items-center gap-3">
                <CircleIndicator />
                <Subheading>Subheading</Subheading>
              </div>
            </div>
          </div>

          {/* In Context Examples */}
          <div className="border-t border-default pt-[2vw]">
            <TextSmallMuted className="mb-4 pb-8">in context (real-world usage)</TextSmallMuted>
            <div className="space-y-8">
              {/* Navigation Button Style */}
              <div className="glass-subtle p-6 rounded-[1vw] inline-flex">
                <button className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity">
                  <CircleIndicator interactive />
                  <Subheading>Menu</Subheading>
                </button>
              </div>

              {/* Section Header Style */}
              <div className="glass-card-dark p-8 rounded-[1vw]">
                <div className="flex items-center gap-3 mb-4">
                  <CircleIndicator />
                  <Subheading>capabilities</Subheading>
                </div>
                <TextSmall>
                  Del concepto a la realidad. Gestionamos cada detalle para que tú solo tengas que disfrutar del resultado.
                </TextSmall>
              </div>

              {/* List Items */}
              <div className="glass-medium p-8 rounded-[1vw] space-y-6">
                <div className="flex items-start gap-3">
                  <CircleIndicator className="mt-1" />
                  <div>
                    <HeadingSmall content="Inmersión Sensorial" />
                    <TextSmallMuted className="mt-2">
                      Diseñamos para los cinco sentidos
                    </TextSmallMuted>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CircleIndicator className="mt-1" />
                  <div>
                    <HeadingSmall content="Respuesta y Solvencia" />
                    <TextSmallMuted className="mt-2">
                      Material técnico propio y equipo multidisciplinar
                    </TextSmallMuted>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CircleIndicator className="mt-1" />
                  <div>
                    <HeadingSmall content="Ética y Cuidado" />
                    <TextSmallMuted className="mt-2">
                      El bienestar de los artistas no es negociable
                    </TextSmallMuted>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OrnateText Examples Section */}
      <section className="py-[10vw] container-site">
        <div className="mb-[5vw]">
          <TextSmallMuted className="mb-4 pb-12">(07)</TextSmallMuted>
          <BannerMedium content="ornate text" ornateLetters="o" />
        </div>

        <div className="space-y-[4vw] mt-[6vw]">
          {/* Example 1 */}
          <div className="border-t border-default pt-[2vw]">
            <TextSmallMuted className="mb-4 pb-8">
              alternateLetters=&quot;o&quot;
            </TextSmallMuted>
            <OrnateText
              content="our work, in full bloom"
              alternateLetters="o"
              className="text-banner-medium"
            />
          </div>

          {/* Example 2 */}
          <div className="border-t border-default pt-[2vw]">
            <TextSmallMuted className="mb-4 pb-12">
              ornateLetters=&quot;c&quot; alternateLetters=&quot;o&quot;
            </TextSmallMuted>
            <OrnateText
              content="artistic project"
              ornateLetters="o"
              alternateLetters="c"
              className="text-banner-large"
            />
          </div>

          {/* Example 3 */}
          <div className="border-t border-default pt-[2vw]">
            <TextSmallMuted className="mb-4 pb-8">
              alternateLetters=&quot;ocq&quot; (all curved letters)
            </TextSmallMuted>
            <OrnateText
              content="discover why"
              ornateLetters="o"
              alternateLetters="cq"
              className="text-heading-small"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-[5vw] container-site border-t border-default">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <TextSmall>The Artistic Project</TextSmall>
            <TextSmallMuted className="mt-2">Style System v2.0 — Golden Edition</TextSmallMuted>
          </div>
          <TextSmallMuted>
            Luxurious & Glamorous
          </TextSmallMuted>
        </div>
      </footer>
    </div>
  );
}
