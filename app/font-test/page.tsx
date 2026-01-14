import { BannerMedium, HeadingSmall } from "@/components";

export default function FontTest() {
  return (
    <div className="min-h-screen bg-pure p-8">
      <h1 className="text-h3-plain mb-8 text-primary">Font Diacritics Test</h1>
      
      <div className="mb-12 p-6 bg-elevated border border-default rounded">
        <p className="text-small text-muted mb-4">Instructions:</p>
        <p className="text-small text-primary mb-2">
          Compare fonts to ensure all Spanish diacritics render correctly.
        </p>
        <p className="text-small text-secondary">
          ✅ Characters should appear crisp and clear, not as boxes (□), question marks (?), or incorrect characters.
        </p>
      </div>

      {/* Carl Brown Display Font Test */}
      <div className="mb-12 border-2 border-accent-bright-gold p-6 rounded">
        <p className="text-small text-accent-bright-gold mb-6 font-bold">⚠️ CRITICAL: Carl Brown Font (Display/Ornate)</p>
        
        <div className="space-y-4">
          <div>
            <p className="text-small text-muted mb-2">Carl Brown - Uppercase Diacritics</p>
            <p className="font-display text-large text-primary">
              ÁÉÍÓÚÑÜ DIRECCIÓN PRODUCCIÓN INMERSIÓN
            </p>
          </div>
          
          <div>
            <p className="text-small text-muted mb-2">Carl Brown - Lowercase Diacritics (for alternate glyphs)</p>
            <p className="font-display text-large text-primary" style={{ textTransform: 'none' }}>
              áéíóúñü dirección producción inmersión
            </p>
          </div>

          <div>
            <p className="text-small text-muted mb-2">Real Usage Example - Banner with Ornate Letters</p>
            <BannerMedium content="DIRECCIÓN" ornateLetters="óc" />
          </div>

          <div>
            <p className="text-small text-muted mb-2">Real Usage Example - Heading with Ornate Letters</p>
            <HeadingSmall content="INMERSIÓN SENSORIAL" ornateLetters="oóc" alternateLetters="q" />
          </div>

          <div className="mt-4 p-4 bg-bg-warm rounded">
            <p className="text-small text-accent-bright-gold">
              ⚠️ If you see boxes or wrong characters in Carl Brown sections, you need a proper Carl Brown font file with Latin Extended characters.
            </p>
          </div>
        </div>
      </div>
      
      {/* Test all Spanish diacritics */}
      <div className="space-y-8">
        {/* Adobe Fonts Helvetica Neue LT Pro (Current Implementation) */}
        <div className="border-2 border-accent-gold p-6 rounded">
          <p className="text-small text-accent-bright-gold mb-2 font-bold">✅ Adobe Fonts - Helvetica Neue LT Pro (Current Implementation)</p>
          
          <div className="space-y-4">
            <div>
              <p className="text-small text-muted mb-1">Weight 100 (25 Ultra Light) - Display Text</p>
              <p className="font-body font-thin text-large text-primary">
                ÁÉÍÓÚÑÜ áéíóúñü ¿¡
              </p>
              <p className="font-body font-thin text-large text-primary">
                DIRECCIÓN ARTÍSTICA PRODUCCIÓN EJECUCIÓN
              </p>
              <p className="font-body font-thin text-large text-primary">
                DONDE LA VISIÓN SE CONVIERTE EN EXPERIENCIA
              </p>
            </div>
            
            <div>
              <p className="text-small text-muted mb-1">Weight 400 (55 Roman) - Body Text</p>
              <p className="font-body font-normal text-medium text-primary">
                ÁÉÍÓÚÑÜ - ¿QUÉ? ¡CUÉNTANOS!
              </p>
              <p className="font-body font-normal text-medium text-primary">
                COREOGRAFÍA INMERSIÓN LÍNEA ÉTICA
              </p>
              <p className="font-body font-normal text-medium text-primary">
                DISEÑAMOS AÑOS - TÚ PRÓXIMO PROYECTO
              </p>
            </div>
            
            <div>
              <p className="text-small text-muted mb-1">Weight 500 (65 Medium) - Emphasis</p>
              <p className="font-body font-medium text-medium text-primary">
                ÁÉÍÓÚÑÜ - HABLEMOS DE TU PRÓXIMO PROYECTO
              </p>
              <p className="font-body font-medium text-medium text-primary">
                DIRECCIÓN ARTÍSTICA Y PRODUCCIÓN EJECUTIVA
              </p>
            </div>
          </div>
        </div>

        <hr className="divider-horizontal my-8" />

        {/* Helvetica Neue Thin (100) */}
        <div>
          <p className="text-small text-muted mb-2">Helvetica Neue Thin (100)</p>
          <p className="font-body font-thin text-large text-primary">
            ÁÉÍÓÚÑÜ áéíóúñü ¿¡
          </p>
          <p className="font-body font-thin text-large text-primary">
            DIRECCIÓN ARTÍSTICA PRODUCCIÓN EJECUCIÓN
          </p>
          <p className="font-body font-thin text-large text-primary">
            COREOGRAFÍA INMERSIÓN LÍNEA ÉTICA
          </p>
          <p className="font-body font-thin text-large text-primary">
            ¿QUÉ? ¡CUÉNTANOS! DISEÑAMOS AÑOS
          </p>
        </div>

        {/* Helvetica Neue Regular (400) */}
        <div>
          <p className="text-small text-muted mb-2">Helvetica Neue Regular (400)</p>
          <p className="font-body font-normal text-large text-primary">
            ÁÉÍÓÚÑÜ áéíóúñü ¿¡
          </p>
          <p className="font-body font-normal text-large text-primary">
            DIRECCIÓN ARTÍSTICA PRODUCCIÓN EJECUCIÓN
          </p>
          <p className="font-body font-normal text-large text-primary">
            COREOGRAFÍA INMERSIÓN LÍNEA ÉTICA
          </p>
          <p className="font-body font-normal text-large text-primary">
            ¿QUÉ? ¡CUÉNTANOS! DISEÑAMOS AÑOS
          </p>
        </div>

        {/* Helvetica Neue Medium (500) */}
        <div>
          <p className="text-small text-muted mb-2">Helvetica Neue Medium (500)</p>
          <p className="font-body font-medium text-large text-primary">
            ÁÉÍÓÚÑÜ áéíóúñü ¿¡
          </p>
          <p className="font-body font-medium text-large text-primary">
            DIRECCIÓN ARTÍSTICA PRODUCCIÓN EJECUCIÓN
          </p>
          <p className="font-body font-medium text-large text-primary">
            COREOGRAFÍA INMERSIÓN LÍNEA ÉTICA
          </p>
          <p className="font-body font-medium text-large text-primary">
            ¿QUÉ? ¡CUÉNTANOS! DISEÑAMOS AÑOS
          </p>
        </div>

        {/* Fallback Arial */}
        <div>
          <p className="text-small text-muted mb-2">Arial (Fallback)</p>
          <p className="text-large text-primary" style={{ fontFamily: 'Arial, sans-serif' }}>
            ÁÉÍÓÚÑÜ áéíóúñü ¿¡
          </p>
          <p className="text-large text-primary" style={{ fontFamily: 'Arial, sans-serif' }}>
            DIRECCIÓN ARTÍSTICA PRODUCCIÓN EJECUCIÓN
          </p>
          <p className="text-large text-primary" style={{ fontFamily: 'Arial, sans-serif' }}>
            COREOGRAFÍA INMERSIÓN LÍNEA ÉTICA
          </p>
          <p className="text-large text-primary" style={{ fontFamily: 'Arial, sans-serif' }}>
            ¿QUÉ? ¡CUÉNTANOS! DISEÑAMOS AÑOS
          </p>
        </div>

        {/* System Sans-Serif */}
        <div>
          <p className="text-small text-muted mb-2">System Sans-Serif</p>
          <p className="text-large text-primary" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            ÁÉÍÓÚÑÜ áéíóúñü ¿¡
          </p>
          <p className="text-large text-primary" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            DIRECCIÓN ARTÍSTICA PRODUCCIÓN EJECUCIÓN
          </p>
          <p className="text-large text-primary" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            COREOGRAFÍA INMERSIÓN LÍNEA ÉTICA
          </p>
          <p className="text-large text-primary" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            ¿QUÉ? ¡CUÉNTANOS! DISEÑAMOS AÑOS
          </p>
        </div>
      </div>

      <div className="mt-12 p-6 bg-elevated border border-default rounded">
        <p className="text-small text-muted mb-4">Instructions:</p>
        <p className="text-small text-primary">
          Compare the Helvetica Neue weights with the Arial and System fonts below.
          If you see squares (□), question marks (?), or different characters in the Helvetica Neue sections,
          those font files don&apos;t support Spanish diacritics.
        </p>
      </div>
    </div>
  );
}
