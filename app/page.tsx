export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-black dark:to-zinc-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl lg:text-7xl">
              The Artistic Project
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Dirección Artística y Producción Ejecutiva
            </p>
            <p className="mt-8 text-xl leading-8 text-zinc-700 dark:text-zinc-300">
              Transformamos ideas conceptuales en realidades tangibles
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Nuestra Empresa
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Fundada en <span className="font-semibold text-zinc-900 dark:text-zinc-50">2023</span>, The Artistic Project se dedica a la dirección artística y la producción ejecutiva en el sector del entretenimiento en vivo y la producción audiovisual.
            </p>
            <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Consolidamos una oferta integral que fusiona la creatividad artística con la ejecución técnica y logística, operando a nivel <span className="font-semibold text-zinc-900 dark:text-zinc-50">nacional (España)</span> e <span className="font-semibold text-zinc-900 dark:text-zinc-50">internacional</span>, con presencia y proyectos en Marruecos, Francia y Reino Unido.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Liderazgo
            </h2>
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                Inés Mostalac
              </h3>
              <p className="mt-2 text-lg text-zinc-700 dark:text-zinc-300">
                Fundadora y Directora
              </p>
              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">Formación Académica</h4>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                    Graduada en Artes Visuales y Danza (URJC), con un Máster en Liderazgo y Gestión de Proyectos Culturales y un posgrado en Marketing Cultural.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">Investigación e Innovación</h4>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                    Actualmente cursa el doctorado, investigando el "contenido corto" como nuevo lenguaje de performance, aportando una visión vanguardista sobre tendencias digitales. Experta en danzas urbanas y culturas underground.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900 dark:text-zinc-50">Gestión Integral</h4>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                    Su formación abarca el ciclo completo del negocio, desde la visión artística hasta la viabilidad comercial y el marketing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Clientes Destacados
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Una cartera de clientes de primer nivel que avala nuestra excelencia.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Industria Musical</h3>
                <ul className="mt-3 space-y-2 text-zinc-600 dark:text-zinc-400">
                  <li>• Sony Music</li>
                  <li>• Warner Music</li>
                  <li>• Universal Music</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Moda y Lifestyle</h3>
                <ul className="mt-3 space-y-2 text-zinc-600 dark:text-zinc-400">
                  <li>• Loewe</li>
                  <li>• Diesel</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Festivales y Espectáculos</h3>
                <ul className="mt-3 space-y-2 text-zinc-600 dark:text-zinc-400">
                  <li>• Starlite Marbella</li>
                  <li>• Boombastic Festival</li>
                  <li>• Perreolab Festival</li>
                  <li>• Teatro Eslava</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">Grupos de Ocio y Restauración</h3>
                <ul className="mt-3 space-y-2 text-zinc-600 dark:text-zinc-400">
                  <li>• Grupo Kapital</li>
                  <li>• Grupo Rock Star</li>
                  <li>• Grupo GOA</li>
                  <li>• Grupo Sounds</li>
                  <li>• Grupo Resistencia Tortuga</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Nuestros Servicios
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Soluciones "llave en mano", gestionando coreografía, casting, vestuario, maquillaje y dirección de arte.
            </p>
            <div className="mt-12 space-y-12">
              <div>
                <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                  Audiovisuales y Contenido Digital
                </h3>
                <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                  Producción estética y técnica para formatos de pantalla:
                </p>
                <ul className="mt-4 space-y-2 text-zinc-600 dark:text-zinc-400">
                  <li>• Videoclips y Spots Publicitarios: Gestión integral de imagen para artistas y marcas</li>
                  <li>• Contenido para RRSS: Adaptación de lenguajes artísticos a plataformas digitales</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                  Espectáculos (Producción Escénica)
                </h3>
                <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                  Diseño y ejecución de shows en diversos entornos:
                </p>
                <ul className="mt-4 space-y-2 text-zinc-600 dark:text-zinc-400">
                  <li>• Hostelería y Ocio: Dinner Shows y Cabaret, integrando gastronomía y arte</li>
                  <li>• Teatral y Convencional: Obras de teatro (incluyendo guionización) y espectáculos infantiles</li>
                  <li>• Exterior e Itinerante: Pasacalles con interacción directa con el público</li>
                  <li>• Apoyo a Artistas: Diseño coreográfico y acompañamiento escénico para giras y presentaciones</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                  Eventos Corporativos
                </h3>
                <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                  Experiencias de marca no intrusivas orientadas al team building, fidelización y promoción, bajo un prisma artístico.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                  Entertainment (Gran Formato y Nocturno)
                </h3>
                <ul className="mt-4 space-y-2 text-zinc-600 dark:text-zinc-400">
                  <li>• Festivales: Diseño de activaciones y experiencias para eventos masivos</li>
                  <li>• Vida Nocturna: Animación inmersiva para discotecas con artistas multidisciplinares</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Nuestra Filosofía
            </h2>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Tres pilares que garantizan la calidad y la ética profesional:
            </p>
            <div className="mt-10 space-y-8">
              <div className="relative pl-8 border-l-4 border-zinc-300 dark:border-zinc-700">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                  1. Inmersión Sensorial
                </h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  Proyectos diseñados para estimular los cinco sentidos e integrar al público, rompiendo la "cuarta pared".
                </p>
              </div>
              <div className="relative pl-8 border-l-4 border-zinc-300 dark:border-zinc-700">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                  2. Capacidad de Respuesta
                </h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  Contamos con material técnico propio y ofrecemos consultoría creativa completa (construcción y realce de la visión del cliente).
                </p>
              </div>
              <div className="relative pl-8 border-l-4 border-zinc-300 dark:border-zinc-700">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                  3. Ética y Bienestar
                </h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  Priorizamos la seguridad y bienestar de los artistas como condición indispensable para el éxito, manteniendo siempre una comunicación cercana y fluida con el cliente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="text-center">
            <p className="text-lg font-semibold text-zinc-50">
              The Artistic Project
            </p>
            <p className="mt-2 text-sm text-zinc-400">
              Dirección Artística y Producción Ejecutiva
            </p>
            <p className="mt-4 text-sm text-zinc-500">
              España • Marruecos • Francia • Reino Unido
            </p>
            <p className="mt-6 text-xs text-zinc-600">
              © 2023-2026 The Artistic Project. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
