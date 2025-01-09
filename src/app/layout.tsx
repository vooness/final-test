import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Načtení fontu Inter
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Andrt",
  description:
    "Konzultant a nadšenec do AI, který pomáhá firmám s implementací umělé inteligence. Specializace na strategie, marketing, HR a transformaci byznysu. Ušetřete čas a získejte náskok díky AI nástrojům a technologiím.",
  keywords: [
    "AI",
    "Umělá inteligence",
    "Konzultant AI",
    "Implementace AI",
    "Automatizace",
    "Transformace byznysu",
    "HR",
    "Marketing",
    "Strategie",
    "Start-up",
    "Digitální transformace",
    "AI nástroje",
    "Inovace",
    "Machine learning",
    "ChatGPT",
    "OpenAI",
    "Podnikání",
    "Technologie",
    "Management",
    "Budoucnost práce",
    "Digitalizace",
  ],
  openGraph: {
    title: "AI Andrt",
    description:
      "Konzultant a nadšenec do AI, pomáhající firmám s rychlou implementací a efektivním nasazením umělé inteligence.",
    url: "https://vas-web.cz", // Upravte na svou URL
    siteName: "Martin Andrt AI Consulting",
    images: [
      {
        url: "https://vas-web.cz/og-image.jpg", // URL k náhledovému obrázku
        width: 1200,
        height: 630,
      },
    ],
    locale: "cs_CZ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <head>
        {/* Odkaz na favicon */}
        <link
  type="image/png"
  sizes="32x32"
  rel="icon"
  href="/icons/icons8-ai-color-32.png" // Příklad cesty k ikoně, pokud je ve složce icons
/>

        <title>AI Andrt</title>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
