"use client";

import React from "react";
import Slider from "react-slick";
import {
  FaCode,
  FaPhotoVideo,
  FaLanguage,
  FaProjectDiagram,
  FaMicrophone,
  FaToolbox,
} from "react-icons/fa";

type Tool = {
  title: string;
  icon: JSX.Element;
  items: {
    name: string;
    description: string;
    features?: string[];
  }[];
};

const tools: Tool[] = [
  {
    title: "Tvorba obsahu",
    icon: <FaCode className="text-blue-400 text-3xl mb-4" />,
    items: [
      {
        name: "ChatGPT",
        description:
          "Generování kreativního textu a odpovědi na dotazy v reálném čase.",
        features: ["Kreativní psaní", "Rychlé odpovědi", "Podpora mnoha jazyků"],
      },
      {
        name: "Grammarly",
        description:
          "Zlepšuje psaní pomocí pokročilé kontroly gramatiky a stylu.",
        features: ["Kontrola pravopisu", "Návrhy na zlepšení stylu"],
      },
    ],
  },
  {
    title: "Úprava fotek",
    icon: <FaPhotoVideo className="text-blue-400 text-3xl mb-4" />,
    items: [
      {
        name: "Fotor",
        description:
          "Úprava fotek a vytváření designů s automatickými šablonami.",
        features: ["Šablony designů", "Snadná úprava", "Export ve vysoké kvalitě"],
      },
      {
        name: "Deep Art Effects",
        description:
          "Přeměňte fotky na umělecká díla inspirovaná slavnými malíři.",
        features: ["Efekty AI", "Transformace obrázků"],
      },
    ],
  },
  {
    title: "Překladače",
    icon: <FaLanguage className="text-blue-400 text-3xl mb-4" />,
    items: [
      {
        name: "DeepL",
        description: "Přirozenější překlady pomocí strojového učení.",
        features: ["Přesné překlady", "Podpora jazykových nuancí"],
      },
      {
        name: "Google Translate",
        description: "Široký rozsah jazyků s online učením.",
        features: ["Podpora více než 100 jazyků", "Rozpoznávání hlasu"],
      },
    ],
  },
  {
    title: "Převod audia + videa",
    icon: <FaMicrophone className="text-blue-400 text-3xl mb-4" />,
    items: [
      {
        name: "Descript",
        description:
          "Audio a video editor, který umožňuje snadnou transkripci a úpravu s pomocí AI.",
        features: ["Transkripce zvuku", "Snadné editace", "Podpora různých formátů"],
      },
      {
        name: "Audext",
        description:
          "AI řešení pro převod zvuku na text, vhodné pro rychlé transkripty.",
        features: ["Rychlý převod", "Přesné přepisy", "Snadná integrace"],
      },
    ],
  },
  {
    title: "Projektový management",
    icon: <FaProjectDiagram className="text-blue-400 text-3xl mb-4" />,
    items: [
      {
        name: "Jira Software",
        description:
          "Prediktivní analytika a automatizace pro správu projektů.",
        features: ["Návrhy workflow", "Plánování projektů", "Automatizace úkolů"],
      },
      {
        name: "Trello",
        description: "Optimalizace workflow s AI doporučeními.",
        features: ["Týmy v reálném čase", "Snadné sdílení úkolů", "Vizualizace projektů"],
      },
    ],
  },
  {
    title: "Další užitečné nástroje",
    icon: <FaToolbox className="text-blue-400 text-3xl mb-4" />,
    items: [
      {
        name: "IBM Watson",
        description: "Nabízí AI řešení pro analýzu dat a strojové učení.",
        features: ["Analýza dat", "Návrhy na základě AI", "Snadná integrace s nástroji"],
      },
      {
        name: "Zapier",
        description:
          "Automatizuje úlohy mezi různými webovými aplikacemi pomocí AI.",
        features: ["Automatizace procesů", "Široká škála aplikací", "Jednoduché nastavení"],
      },
    ],
  },
];

const ToolSection: React.FC = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        {/* Nadpis */}
        <h2 className="text-4xl font-bold text-left text-white mb-4">
          Prozkoumejte AI nástroje
        </h2>

        {/* Motivující text */}
        <p className="text-gray-300 text-lg max-w-2xl mb-12">
        Mrkněte na oblasti, ve kterých můžete využít konkrétní AI nástroje.
        </p>

        {/* Slider */}
        <Slider {...sliderSettings}>
          {tools.map((tool, index) => (
            <div
              key={index}
              className="rounded-lg bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg flex flex-col justify-between p-6 min-h-[400px]"
            >
              {tool.icon}
              <h3 className="text-2xl font-semibold text-blue-500 mb-4">
                {tool.title}
              </h3>
              <ul className="space-y-6 flex-grow">
                {tool.items.map((item, idx) => (
                  <li key={idx}>
                    <p className="font-bold mb-1">{item.name}</p>
                    <p className="text-sm text-gray-400 mb-2">
                      {item.description}
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {item.features?.map((feature, i) => (
                        <li
                          key={i}
                          className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full border border-blue-500"
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ToolSection;
