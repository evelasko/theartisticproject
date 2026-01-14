import { BannerLarge, BannerMedium, HeadingSmall, TextSmall, TextSmallMuted } from "@/components";
import PosterHero from "@/components/heroes/PosterHero";

export default function Home() {
  return (
    <main>
      {/* Hero Section with golden glow */}
      <section id="hero">
        <PosterHero imageSrc="/assets/images/poster-hero.jpg" imageAlt="Hero image" />
        {/* <div id="above-the-fold" className="w-full h-full"> */}
          {/* <div className="mr-120 mt-[80px] grid grid-cols-2 grid-rows-2 gap-x-8 gap-y-2 justify-center">
            <div className="flex justify-end w-full">
              <BannerMedium content="The" ornateLetters="c" />
            </div>
            <div className="flex justify-start w-full">
              <BannerMedium content="Artistic" ornateLetters="c" />
            </div>
            <div />
            <div className="flex justify-start w-full">
              <BannerMedium content="Project" alternateLetters="o" />
            </div>
          </div> */}
          {/* TODO Image above the fold */}
          {/* TODO scroll down indicator */}
        {/* </div> */}
        <div id="below-the-fold" className="w-full">
          <BannerLarge 
          content="Donde la visión se convierte en experiencia" 
          alternateLetters="oÓ" 
          ornateLetters="c" 
          className="text-center"
          />
          {/* TODO Image below the fold */}
          {/* TODO Diamond animation */}
          <TextSmall className="text-center">
          DIRECCIÓN ARTÍSTICA Y PRODUCCIÓN EJECUTIVA PARA MARCAS QUE BUSCAN IMPACTO.
          TRANSFORMAMOS CONCEPTOS EN EXPERIENCIAS SENSORIALES QUE SE SIENTEN,
          SE RECUERDAN Y TRASCIENDEN
          </TextSmall>
        </div>
      <div className="w-full aspect-31/30 relative overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/animations/blur-animation.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      </section>
      <section id="services" className="relative min-h-screen flex flex-col items-center justify-center container-site overflow-hidden">
        <div className="tag">Servicios</div>
        <BannerMedium content="CREAMOS LO QUE OTROS IMAGINAN" ornateLetters="oc" alternateLetters="q" />
        <TextSmall>Capacidades</TextSmall>
        <TextSmall>DEL CONCEPTO A LA REALIDAD. GESTIONAMOS CADA DETALLE —COREOGRAFÍA, CASTING, VESTUARIO, DIRECCIÓN DE ARTE— PARA QUE TÚ SOLO TENGAS QUE DISFRUTAR DEL RESULTADO.</TextSmall>
        {/* TODO Implement buttons with animation */}
        <button className="tag">Solicita una propuesta</button>
        {/* TODO Implement cards and animation */}
        <div id="services-cards">
          <div>
            <TextSmall>01</TextSmall>
            <HeadingSmall content="Audiovisual y Contenido Digital" alternateLetters="q" />
            <TextSmall>Videoclips, spots publicitarios y contenido para redes sociales. Dirección artística integral para pantallas que capturan.</TextSmall>
          </div>
          <div>
            <TextSmall>02</TextSmall>
            <HeadingSmall content="Espectáculos y Producción Escénica" alternateLetters="q" />
            <TextSmall>Dinner shows, cabaret, teatro y pasacalles. Experiencias en vivo que rompen la cuarta pared.</TextSmall>
          </div>
          <div>
            <TextSmall>03</TextSmall>
            <HeadingSmall content="Eventos Corporativos" alternateLetters="q" />
            <TextSmall>Activaciones de marca, team building artístico y experiencias de fidelización. El arte al servicio del negocio.</TextSmall>
          </div>
        </div>
      </section>
      <section id="portfolio" className="relative min-h-screen flex flex-col items-center justify-center container-site overflow-hidden">
        <BannerMedium content="PROYECTOS QUE HABLAN POR SÍ MISMOS" ornateLetters="oc" alternateLetters="q" />
        {/* TODO Implement Three 3D Circular Carousel */}
        {/* TODO Implement Brands Grid */}
        <TextSmall>Sony Music • Warner Music • Universal Music • Loewe • Diesel • Starlite Marbella • Grupo Kapital • Teatro Eslava</TextSmall>
      </section>
      <section id="benefits" className="relative min-h-screen flex flex-col items-center justify-center container-site overflow-hidden">
        <TextSmall>POR QUÉ ELEGIRNOS</TextSmall>
        <TextSmall>Lo que nos diferencia</TextSmall>
        <BannerMedium content="NO SOLO PRODUCIMOS. CREAMOS MUNDOS." ornateLetters="oc" alternateLetters="q" />
        {/* TODO Implement Ordered List */}
        <div id="benefits-list">
          <div>
            <TextSmall>01</TextSmall>
            <HeadingSmall content="INMERSIÓN SENSORIAL" ornateLetters="oóc" alternateLetters="q" />
            <TextSmallMuted>DISEÑAMOS PARA LOS CINCO SENTIDOS. CADA PROYECTO INTEGRA AL PÚBLICO EN LA EXPERIENCIA, DIFUMINANDO LA LÍNEA ENTRE ESPECTADOR Y PROTAGONISTA</TextSmallMuted>
          </div>
          <div>
            <TextSmall>02</TextSmall>
            <HeadingSmall content="RESPUESTA Y SOLVENCIA" ornateLetters="oc" alternateLetters="q" />
            <TextSmallMuted>MATERIAL TÉCNICO PROPIO Y EQUIPO MULTIDISCIPLINAR. DESDE LA CONSULTORÍA CREATIVA HASTA LA EJECUCIÓN LOGÍSTICA, TODO BAJO UN MISMO TECHO</TextSmallMuted>
          </div>
          <div>
            <TextSmall>03</TextSmall>
            <HeadingSmall content="ÉTICA Y CUIDADO" ornateLetters="oc" alternateLetters="q" />
            <TextSmallMuted>EL BIENESTAR DE LOS ARTISTAS NO ES NEGOCIABLE. TRABAJAMOS CON TRANSPARENCIA, COMUNICACIÓN FLUIDA Y RESPETO ABSOLUTO POR CADA PERSONA INVOLUCRADA</TextSmallMuted>
          </div>
        </div>
        {/* TODO Implement Testimonials Carousel */}
      </section>
      <section id="founder" className="relative min-h-screen flex flex-col items-center justify-center container-site overflow-hidden">
        {/* TODO Ask if founder section content is needed */}
      </section>
      <section id="testimonials" className="relative min-h-screen flex flex-col items-center justify-center container-site overflow-hidden">
        <BannerLarge content="LO QUE DICEN NUESTROS CLIENTES" ornateLetters="oc" alternateLetters="q" />
        {/* TODO Implement testimonials cards */}
      </section>
      <section id="contact" className="relative min-h-screen flex flex-col items-center justify-center container-site overflow-hidden">
        <TextSmall>CONTACTO</TextSmall>
        <TextSmall>¿TIENES UN VIDEOCLIP, UN EVENTO CORPORATIVO, UN FESTIVAL O UN ESPECTÁCULO EN MENTE? CUÉNTANOS TU VISIÓN. NOSOTROS LA HACEMOS REALIDAD.</TextSmall>
        <BannerLarge content="HABLEMOS DE TU PRÓXIMO PROYECTO" ornateLetters="oc" alternateLetters="q" />
        {/* TODO Implement contact form */}
        <button className="tag">Enviar propuesta</button>
      </section>
      <footer>
        {/* Implement Footer Section */}
        <TextSmall>Dirección Artística • Producción Ejecutiva • Experiencias que trascienden</TextSmall>
        <TextSmall>Madrid • Internacional</TextSmall>
        <TextSmall>Instagram • LinkedIn • Vimeo</TextSmall>
      </footer>
    </main>
  );
}
