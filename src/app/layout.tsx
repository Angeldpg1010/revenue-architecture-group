import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Revenue Systems Group",
  description:
    "B2B consulting landing for companies in Spain that want to close more sales with CRM and lead automation.",
  openGraph: {
    title: "Revenue Systems Group",
    description:
      "Close more sales by automating lead management with CRM and workflows.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const analyticsHelper = `
    (function () {
      window.trackEvent = function (eventName, params) {
        if (typeof window.gtag === "function") {
          window.gtag("event", eventName, params || {});
        }
      };

      document.addEventListener("click", function (event) {
        var target = event.target;
        if (!(target instanceof Element)) return;

        var element = target.closest("a,button");
        if (!element) return;

        var text = (element.textContent || "").trim();
        if (text !== "Reservar diagnóstico gratuito") return;

        var location = "final";
        var section = element.closest("section");
        if (section) {
          var heading = section.querySelector("h1, h2");
          var headingText = heading ? (heading.textContent || "").trim() : "";
          if (headingText.indexOf("Aumentamos las ventas") === 0) location = "hero";
          if (headingText.indexOf("Qué incluye el Sistema Comercial Automatizado") === 0) location = "mid";
          if (section.id === "diagnostico") location = "final";
        }

        window.trackEvent("cta_click", { location: location });
      });
    })();
  `;

  return (
    <html lang="es">
      <body className="antialiased">
        {children}
        <Script id="analytics-helper" strategy="afterInteractive">
          {analyticsHelper}
        </Script>
      </body>
    </html>
  );
}
