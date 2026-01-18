import { BannerLarge, BannerMedium, HeadingSmall, TextSmall, CircleIndicator, TestimonialCard } from "@/components";
import { NayaCarousel } from "@/components/carousel/NayaCarousel";
import ContactForm from "@/components/ContactForm";
import AnimatedSectionHeader from "@/components/elements/AnimatedSectionHeader";
import Button from "@/components/elements/Button";
import PosterHero from "@/components/heroes/PosterHero";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      {
        //> Section - Hero
      }
      <section id="hero">
        <PosterHero imageSrc="/assets/images/poster-hero-2.jpg" imageAlt="Hero image" />
          {/* TODO scroll down indicator */}
        <div id="below-the-fold" className="mt-32 w-full">
          {[
            'convertimos',
            'visiones',
            'en','experiencias',
          ].map((item, index) => (
            <div key={index} className="flex justify-center w-full">
              <BannerLarge 
              content={item} 
              alternateLetters="oÓ" 
              ornateLetters="cx" 
              className="text-center"
              />
            </div>
          ))}
          <div className="w-full aspect-31/30 relative overflow-hidden">
            <Image src="/assets/images/feature-a.jpg" alt="Diamond" fill className="w-full h-full object-cover" />
          </div>
        </div>
      {/* <div className="w-full aspect-31/30 relative overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/animations/blur-animation.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div> */}
      </section>
      {
        //> Section - Services
      }
      <section id="services" className="relative min-h-screen flex flex-col items-center justify-center container-site overflow-hidden">
        <div className="w-full flex items-center justify-center my-12">
          <AnimatedSectionHeader title="Servicios" topHeight="200px" bottomHeight="350px" />
          <div
            className="absolute mt-[150px] md:mt-[90] lg:mt-[200px] py-18 w-full flex items-center justify-center"
            style={{
              background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 45%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)"
            }}
          >
            <div className="w-[70vw] md:w-[90vw] lg:w-[20vw] flex items-center justify-center relative overflow-hidden">
              <TextSmall className="text-center w-full flex items-center justify-center">
                DIRECCIÓN ARTÍSTICA Y PRODUCCIÓN EJECUTIVA PARA MARCAS QUE BUSCAN IMPACTO.
                TRANSFORMAMOS CONCEPTOS EN EXPERIENCIAS SENSORIALES QUE SE SIENTEN,
                SE RECUERDAN Y TRASCIENDEN
              </TextSmall>
            </div>
          </div>
        </div>
        {/* Services Content Wrapper - relative for background image positioning */}
        <div className="relative w-full">
          <div id="services-content" className="relative lg:z-10">
            <div className="mt-32 flex flex-col w-full">
            {[
              'creamos',
              'lo que otros',
              'imaginan',
            ].map((item, index) => (
              <div key={index} className={clsx(
                "w-full",
                index === 1 && "pl-8 md:pl-24"
              )}>
                <BannerMedium content={item} ornateLetters="ocg" alternateLetters="q" />
              </div>
            ))}
            </div>
            <div className="w-full flex flex-col lg:flex-row justify-between items-stretch gap-8 my-32">
              {/* Left columns: CircleIndicator+Capacidades | Text */}
              <div className="flex flex-row w-full lg:w-1/2 gap-6">
                {/* Column 1: CircleIndicator + Capacidades */}
                <div className="flex items-start gap-2 w-auto lg:w-auto">
                  <CircleIndicator animated className="mt-0.5 mr-2"/>
                  <TextSmall>Capacidades</TextSmall>
                </div>
                {/* Column 2: Description */}
                <div className="flex flex-col items-start md:w-2/5 pl-4 md:pl-0">
                  <TextSmall>
                    DEL CONCEPTO A LA REALIDAD.
                  </TextSmall>
                  <br />
                  <TextSmall>
                    GESTIONAMOS CADA DETALLE
                    —COREOGRAFÍA, CASTING, VESTUARIO, DIRECCIÓN DE ARTE—
                    PARA QUE TÚ SOLO TENGAS QUE DISFRUTAR DEL RESULTADO.
                  </TextSmall>
                  <div className="mt-24">
                    <Link href="#contact"><Button>Solicita una propuesta</Button></Link>
                  </div>
                </div>
              </div>
              {/* Right column: empty space */}
              <div className="flex w-full items-center justify-center">
                <div />
              </div>
            </div>
       
          </div>
          
          {/* TODO Services Background Image 
              - Mobile/Tablet: Full-width block element below content (aspect 0.63)
              - Desktop (lg+): Absolute background layer pinned to right viewport edge
              - Image always shows full height, positioned from right, left side may overflow/clip
          */}
          <div 
            className="
              relative lg:absolute lg:inset-0
              w-screen lg:w-[calc(100%+3.125vw)]
              -ml-[4.8vw] lg:ml-0
              aspect-[0.63] lg:aspect-auto
              mt-8 lg:mt-0
              overflow-hidden
            "
          >
            <Image
              src="/assets/images/services-banner.jpg"
              alt="Services background"
              width={2000}
              height={1260}
              className="absolute right-0 top-0 h-full w-auto max-w-none"
              sizes="100vw"
              priority
            />
          </div>
        </div>
        {/* TODO Implement cards and animation */}
        <div id="services-cards" className="w-full flex flex-col md:flex-row justify-between items-stretch gap-8 my-24">
          <div className="w-1/3">
            <TextSmall className="pb-4">01</TextSmall>
            <HeadingSmall content="Audiovisual y Contenido Digital" alternateLetters="q" />
            <TextSmall className="pt-4">Videoclips, spots publicitarios y contenido para redes sociales. Dirección artística integral para pantallas que capturan.</TextSmall>
          </div>
          <div className="w-1/3">
            <TextSmall className="pb-4">02</TextSmall>
            <HeadingSmall content="Espectáculos y Producción Escénica" alternateLetters="q" />
            <TextSmall className="pt-4">Dinner shows, cabaret, teatro y pasacalles. Experiencias en vivo que rompen la cuarta pared.</TextSmall>
          </div>
          <div className="w-1/3">
            <TextSmall className="pb-4">03</TextSmall>
            <HeadingSmall content="Eventos Corporativos" alternateLetters="q" />
            <TextSmall className="pt-4">Activaciones de marca, team building artístico y experiencias de fidelización. El arte al servicio del negocio.</TextSmall>
          </div>
        </div>
        {/* TODO Implement Brands Grid */}
        <div className="py-24">
          <TextSmall className="text-center">Sony Music • Warner Music • Universal Music • Loewe • Diesel • Starlite Marbella • Grupo Kapital • Teatro Eslava</TextSmall>
        </div>
      </section>
      {/* DIVIDER IMAGE */}
      <div className="w-full aspect-20/39 relative overflow-hidden">
        <Image src="/assets/images/divider-banner-1.jpg" alt="Divider image" fill className="w-full h-full object-cover" />
      </div>
      {
        //> Section - Portfolio
      }
      <section id="portfolio" className="relative min-h-screen flex flex-col items-center justify-center container-site overflow-hidden">
      <AnimatedSectionHeader title="Portfolio" topHeight="200px" bottomHeight="350px" className="mb-32" />
        {[
          'proyectos',
          'que hablan',
          'por sí mismos',
        ].map((item, index) => (
          <div key={index}>
            <BannerMedium content={item} ornateLetters="oc" alternateLetters="q" />
          </div>
        ))}     
      </section>
      <div className="mb-32 mt-24 md:mt-0">
        <NayaCarousel items={[
          {
            id: '1',
            image: '/assets/images/pcards/pcard-audiovisual.jpg',
            title: 'Audiovisual y Contenido Digital',
            year: '2024',
            href: '/portfolio/audiovisual-y-contenido-digital',
          },
          {
            id: '2',
            image: '/assets/images/pcards/pcard-escenicos.jpg',
            title: 'Espectáculos y Producción Escénica',
            year: '2024',
            href: '/portfolio/espectaculos-y-produccion-escenica',
          },
          {
            id: '3',
            image: '/assets/images/pcards/pcard-corporativos.jpg',
            title: 'Eventos Corporativos',
            year: '2024',
            href: '/portfolio/eventos-corporativos',
          },
          {
            id: '4',
            image: '/assets/images/pcards/pcard-entertainment.jpg',
            title: 'Entertainment y Gran Formato',
            year: '2024',
            href: '/portfolio/entertainment-y-gran-formato',
          },
        ]} />
      </div>
      {
        //> Section - Benefits
      }
      <section id="benefits" className="relative min-h-screen flex flex-col items-center justify-center container-site overflow-hidden">
        <div className="flex flex-col ld:flex-row w-full gap-8">
          {/* Left Column */}
          <div className="flex flex-col items-start lg:w-1/4">
            <div className="flex items-start gap-0">
              <div className="aspect-square">
                <CircleIndicator animated className="mt-0.5 mr-2" />
              </div>
              <TextSmall>POR QUÉ ELEGIRNOS</TextSmall>
            </div>
          </div>
          {/* Right Column */}
          <div className="flex flex-col w-full">
            {[
              'no solo','producimos',
              'creamos',
              'mundos',
            ].map((item, index) => (
              <div key={index} className={clsx(
                "w-full", 
                index === 2 && "mt-4",
                index > 1 && "ml-0 text-end lg:hidden",
                index < 2 && "lg:ml-48"
                )}>
                <BannerMedium content={item} ornateLetters="oc" alternateLetters="q" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 w-full items-start my-24 md:my-0">
          <div className="relative w-full md:w-1/2 aspect-9/16 overflow-hidden rounded-lg">
            <Image
              src="/assets/images/feature-b.jpg"
              alt="Benefits"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div
            id="benefits-list"
            className="flex flex-col gap-8 w-full md:w-1/2"
          >
            <div>
              {[
                'creamos',
                'mundos',
              ].map((item, index) => (
                <div key={index} className={clsx(
                  "w-full hidden lg:block", 
                  )}>
                  <BannerMedium content={item} ornateLetters="oc" alternateLetters="q" />
                </div>
              ))}
            </div>
            {[{
              title: 'INMERSIÓN SENSORIAL',
              description: 'DISEÑAMOS PARA LOS CINCO SENTIDOS. CADA PROYECTO INTEGRA AL PÚBLICO EN LA EXPERIENCIA, DIFUMINANDO LA LÍNEA ENTRE ESPECTADOR Y PROTAGONISTA',
            }, {
              title: 'RESPUESTA Y SOLVENCIA',
              description: 'MATERIAL TÉCNICO PROPIO Y EQUIPO MULTIDISCIPLINAR. DESDE LA CONSULTORÍA CREATIVA HASTA LA EJECUCIÓN LOGÍSTICA, TODO BAJO UN MISMO TECHO',
            }, {
              title: 'ÉTICA Y CUIDADO',
              description: 'EL BIENESTAR DE LOS ARTISTAS NO ES NEGOCIABLE. TRABAJAMOS CON TRANSPARENCIA, COMUNICACIÓN FLUIDA Y RESPETO ABSOLUTO POR CADA PERSONA INVOLUCRADA',
            }].map((item, index) => (
              <div key={index} className="flex items-start gap-4 mt-12">
                {/* Number indicator column (hugs content) */}
                <div className="shrink-0">
                  <TextSmall>{`0${index + 1}`}</TextSmall>
                </div>
                {/* Content column (full width) */}
                <div className="flex flex-col flex-1 min-w-0">
                  <HeadingSmall content={item.title} ornateLetters="oócg" alternateLetters="q" />
                  <div className="mt-4 w-2/3 md:w-full lg:w-1/2">
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        color: 'var(--color-text-muted)',
                        textTransform: 'uppercase',
                        fontWeight: 400,
                        lineHeight: '110.6%',
                        fontSize: '14px',
                      }}
                      className="
                        sm:text-[14px]
                        md:text-[10px]
                        lg:text-[16px]
                      "
                    >
                      {item.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* TODO Implement Testimonials Carousel */}
      </section>
      <div className="w-full h-px gradient-divider-centered my-32" />
      {
      //> Section - Testimonials
      }
      <section id="testimonials" className="relative min-h-screen flex flex-col items-center justify-center container-site overflow-hidden">
        <div className="w-full my-24">
          {[
            'lo que',
            'dicen',
            'nuestros',
            'clientes',
          ].map((item, index) => (
            <div key={index}>
              <div className={clsx("flex", index > 1 ? "justify-end" : "justify-start")}>
                <BannerLarge
                  content={item}
                  ornateLetters="oc"
                  alternateLetters="q"
                />
              </div>
            </div>
          ))}
        </div>
        {/* Testimonials Cards */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 my-16">
          <TestimonialCard
            name="Omar"
            role="Hospitality Brand Manager"
            quote="Everything was delivered on time and with zero stress."
            testimonial="We needed a clean, elegant setup for a private dinner. The team handled everything quietly and efficiently. The space looked sharp, exactly how we imagined it — no distractions, no noise, just quality."
            index={1}
            avatarSrc="/assets/images/dev-placeholder-portrait.jpg"
          />
          <TestimonialCard
            name="Layla"
            role="Event Producer"
            quote="They listen — and that shows in the result."
            testimonial="We had a layered concept and limited time. They didn't overcomplicate anything. Just understood the direction, kept it clean, and delivered something that made sense visually and emotionally."
            index={2}
            avatarSrc="/assets/images/dev-placeholder-landscape.jpg"
          />
          <TestimonialCard
            name="Zain"
            role="Founder, Boutique Fashion Label"
            quote="They respected the tone of our brand completely."
            testimonial="It's rare to work with a team that doesn't try to 'make it theirs.' The mood, the materials, the flow — it all felt aligned with what we stand for. Subtle, minimal, but with intention."
            index={3}
          />
        </div>
      </section>
      <section id="contact" className="relative min-h-screen flex flex-col items-center justify-center container-site overflow-hidden">
        <div>
          <div className="w-full flex items-center justify-center">
            <AnimatedSectionHeader title="Contacto" topHeight="300px" bottomHeight="150px" className="mb-32" />
          </div>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="flex-col items-center hidden lg:flex w-1/3">
              <TextSmall>
                ¿TIENES UN VIDEOCLIP, UN EVENTO CORPORATIVO, UN FESTIVAL O UN ESPECTÁCULO EN MENTE? CUÉNTANOS TU VISIÓN. NOSOTROS LA HACEMOS REALIDAD.
              </TextSmall>
            </div>
            <div className="flex flex-col w-full gap-2">
              {[
                'creemos',
                'juntos',
                'algo',
                'inolvidable',
              ].map((item, index) => (
                <div
                  key={index}
                  className={clsx(
                    // Force right alignment for first two, left for the rest
                    index < 2 ? "flex justify-end" : "flex justify-start",
                    "w-full"
                  )}
                >
                  <BannerMedium
                    content={item}
                    ornateLetters="oc"
                    alternateLetters="q"
                  />
                </div>
              ))}
              <div id="contact-form" className="w-full my-24">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
