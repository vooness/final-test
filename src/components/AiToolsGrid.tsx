"use client";

import React, { useState } from "react";

type Tool = {
  name: string;
  icon: string; // URL obrázku ikony
  description: string;
  price: string;
  purpose: string;
  link: string;
};

// Kompletní seznam nástrojů (ChatGPT, Canva AI, MidJourney jsou nyní na začátku)
const tools: Tool[] = [
  {
    name: "ChatGPT",
    icon: "/icons/chatgpt.png",
    description:
      "Pokročilý AI chatbot pro přirozené rozhovory a generování textu.",
    price: "Zdarma / Prémiové plány od $20 měsíčně",
    purpose: "Chatbot a generování obsahu",
    link: "https://chat.openai.com/",
  },
  {
    name: "Canva AI",
    icon: "/icons/canva.svg",
    description:
      "Navrhování grafiky pomocí AI. Vytvářejte bannery, příspěvky a prezentace snadno a rychle.",
    price: "Zdarma / Pro plán od $12 měsíčně",
    purpose: "Grafický design",
    link: "https://www.canva.com/",
  },
  {
    name: "MidJourney",
    icon: "/icons/midjourney.png",
    description:
      "Generátor umění na základě AI. Vytvářejte originální umělecká díla s minimálním úsilím.",
    price: "Od $10 měsíčně",
    purpose: "Tvorba umění",
    link: "https://www.midjourney.com/",
  },
  // Zbytek nástrojů zůstává ve stejném pořadí
  {
    name: "Remove.BG",
    icon: "/icons/bgremove.png",
    description:
      "Automaticky odstraní pozadí z obrázků během několika sekund. Skvělé pro fotografy a grafiky.",
    price: "Zdarma s omezeními / od $9 měsíčně",
    purpose: "Úprava fotek",
    link: "https://www.remove.bg/",
  },
  {
    name: "Claude 3.5",
    icon: "/icons/claude.webp",
    description:
      "Pokročilý AI chatbot pro přirozené rozhovory. Ideální pro zákaznickou podporu a brainstorming.",
    price: "Zdarma / Prémiové plány od $10 měsíčně",
    purpose: "Chatbot a analýzy",
    link: "https://www.anthropic.com/",
  },
  {
    name: "Opus.pro",
    icon: "/icons/opuspro.png",
    description:
      "Platforma pro rychlou tvorbu sociálních videí. Jednoduché šablony pro profesionální výstup.",
    price: "Zdarma / Prémiové plány od $15 měsíčně",
    purpose: "Videa pro sociální sítě",
    link: "https://www.opus.pro/",
  },
  {
    name: "Pictory AI",
    icon: "/icons/pictory.jpg",
    description:
      "Převádí text nebo články do profesionálních videí. Automaticky přidává titulky a efekty.",
    price: "Od $19 měsíčně",
    purpose: "Tvorba videí",
    link: "https://www.pictory.ai/",
  },
  {
    name: "Synthesia",
    icon: "/icons/synthesia.png",
    description:
      "Generuje videa s virtuálními prezentéry. Vhodné pro školení, marketing nebo firemní komunikaci.",
    price: "Od $30 měsíčně",
    purpose: "Firemní videa",
    link: "https://www.synthesia.io/",
  },
  {
    name: "Runway ML",
    icon: "/icons/r.png",
    description:
      "AI nástroj pro tvorbu vizuálních efektů a editaci videí. Ideální pro kreativní profesionály.",
    price: "Od $12 měsíčně",
    purpose: "Úprava videí",
    link: "https://runwayml.com/",
  },
  {
    name: "Copy.ai",
    icon: "/icons/copyai.png",
    description:
      "Automatické generování marketingových textů, blogových příspěvků a e-mailů.",
    price: "Zdarma / Prémiové plány od $36 měsíčně",
    purpose: "Tvorba obsahu",
    link: "https://www.copy.ai/",
  },
  {
    name: "DeepL Translator",
    icon: "/icons/deepl.png",
    description:
      "Vysoce přesné a přirozené překlady textů. Ideální pro profesionály pracující s více jazyky.",
    price: "Zdarma / od $6 měsíčně",
    purpose: "Překlady",
    link: "https://www.deepl.com/",
  },
  {
    name: "Grammarly",
    icon: "/icons/grammarly.png",
    description:
      "Automatická kontrola gramatiky, pravopisu a stylu. Užitečné pro profesionální psaní.",
    price: "Zdarma / Prémiové plány od $12 měsíčně",
    purpose: "Tvorba obsahu",
    link: "https://www.grammarly.com/",
  },
  {
    name: "Notion AI",
    icon: "/icons/notion.png",
    description:
      "Rozšiřuje produktivitu a usnadňuje správu poznámek. AI pomáhá s analýzou dat a tvorbou obsahu.",
    price: "Od $10 měsíčně",
    purpose: "Produktivita",
    link: "https://www.notion.so/",
  },
  {
    name: "Descript",
    icon: "/icons/descript.png",
    description:
      "Nástroj pro úpravu audia a videa. Obsahuje pokročilou transkripci a snadné střihy.",
    price: "Zdarma / Prémiové plány od $12 měsíčně",
    purpose: "Úprava audia",
    link: "https://www.descript.com/",
  },
  {
    name: "Zapier",
    icon: "/icons/zapier.png",
    description:
      "Automatizuje procesy mezi aplikacemi, jako jsou Gmail, Trello nebo Slack.",
    price: "Zdarma / Prémiové plány od $19 měsíčně",
    purpose: "Automatizace",
    link: "https://zapier.com/",
  },
  {
    name: "Beautiful.ai",
    icon: "/icons/beautifulai.png",
    description:
      "Automatická tvorba prezentací s profesionálním designem. Ušetří čas a přidá styl.",
    price: "Od $12 měsíčně",
    purpose: "Prezentace",
    link: "https://www.beautiful.ai/",
  },
  {
    name: "Hotpot.ai",
    icon: "/icons/hotspot.jpg",
    description:
      "AI nástroj pro generování grafiky, ilustrací a bannerů. Rychlá a snadná tvorba designu.",
    price: "Zdarma / Prémiové plány od $10 měsíčně",
    purpose: "Grafický design",
    link: "https://hotpot.ai/",
  },
  {
    name: "Otter.ai",
    icon: "/icons/otterai.png",
    description:
      "Automatická transkripce meetingů a rozhovorů. Ideální pro podnikatele, novináře nebo studenty.",
    price: "Zdarma / Prémiové plány od $8 měsíčně",
    purpose: "Transkripce",
    link: "https://otter.ai/",
  },
  {
    name: "Hemingway Editor",
    icon: "/icons/hemmingway.jpg",
    description:
      "Zjednodušuje složité texty a zvyšuje jejich čitelnost. Perfektní pro psaní článků.",
    price: "Jednorázová platba $19.99",
    purpose: "Tvorba obsahu",
    link: "https://hemingwayapp.com/",
  },
  {
    name: "Adobe Firefly",
    icon: "/icons/firefly.png",
    description:
      "Generativní AI pro profesionální návrhy. Funguje perfektně s produkty Adobe.",
    price: "Součást Adobe plánů",
    purpose: "Tvorba designu",
    link: "https://www.adobe.com/sensei/generative-ai/firefly.html",
  },
  {
    name: "Jasper AI",
    icon: "/icons/jasper.jpg",
    description:
      "Generuje marketingové texty a obsah pro e-maily a reklamy. Ideální pro marketéry.",
    price: "Od $49 měsíčně",
    purpose: "Marketing",
    link: "https://www.jasper.ai/",
  },
];

const AiToolsGrid: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const visibleTools = expanded ? tools : tools.slice(0, 3);

  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-left text-white mb-8">
          20 Užitečných AI nástrojů
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleTools.map((tool, index) => (
            <div
              key={index}
              className="rounded-lg bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg p-6 flex flex-col justify-between"
            >
              <img
                src={tool.icon}
                alt={tool.name}
                className="w-16 h-16 mb-4 border-2 border-blue-500 rounded-full p-1"
              />
              <h3 className="text-xl font-semibold text-blue-400">{tool.name}</h3>
              <p className="text-sm text-gray-300 mt-2">{tool.description}</p>
              <p className="text-sm text-gray-400 mt-2">
                <strong>Cena:</strong> {tool.price}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                <strong>Na co je to dobré:</strong> {tool.purpose}
              </p>
              <a
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-400 mt-2 inline-block"
              >
                Otevřít nástroj →
              </a>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition"
          >
            {expanded ? "Zavřít" : "Zobrazit více"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default AiToolsGrid;
