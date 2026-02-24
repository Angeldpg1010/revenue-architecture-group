import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://revenuearchitecturegroup.com";
const siteTitle =
  "Arquitectura y Dirección Tecnológica B2B | Selección y Supervisión de Proyectos";
const siteDescription =
  "Intermediación estratégica de proyectos tecnológicos B2B. Definimos alcance, seleccionamos el partner adecuado y estructuramos la ejecución con supervisión por hitos.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Revenue Architecture Group",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Revenue Architecture Group",
    url: siteUrl,
    description: siteDescription,
    areaServed: "ES",
    sameAs: [],
    logo: `${siteUrl}/logo.png`,
  };

  return (
    <html lang="es" className="scroll-smooth">
      <body className="bg-white text-[#0E2A47] antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}

