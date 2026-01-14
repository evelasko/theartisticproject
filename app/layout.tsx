import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ReactLenis from "lenis/react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NoiseOverlay } from "@/components";

// Carl Brown - Display font for ornate letters
const carlBrown = localFont({
  src: "../public/fonts/CarlBrown.woff2",
  variable: "--font-carl-brown",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "The Artistic Project | Dirección Artística y Producción Ejecutiva",
  description:
    "Transformamos ideas conceptuales en realidades tangibles. Dirección artística y producción ejecutiva en entretenimiento en vivo y producción audiovisual.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${carlBrown.variable}`}>
      <head>
        {/* Adobe Fonts - Helvetica Neue LT Pro with full Spanish diacritics support */}
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://use.typekit.net/ooe6cmg.css" />
      </head>
      <body className="antialiased">
        <ReactLenis root>{children}</ReactLenis>
        <NoiseOverlay />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
