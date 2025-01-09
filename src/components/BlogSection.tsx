"use client";

import React from "react";
import Slider from "react-slick"; // Používáme react-slick pro slider
import Link from "next/link"; // Používáme pro navigaci
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Typ článku
type BlogPost = {
  title: string;
  image: string;
  excerpt: string;
  slug: string;
};

// Ukázková data článků
const blogPosts: BlogPost[] = [
  {
    title: "AI šetří desítky hodin měsíčně",
    image: "/imgs/blog1.jpg",
    excerpt: "Ponořte se do světa umělé inteligence...",
    slug: "jak-ai-meni-trh-prace",
  },
  {
    title: "Praktická ukázka: Kolik to skutečně ušetří?",
    image: "/imgs/blog2.jpg",
    excerpt: "Prozkoumejte nejnovější technologie...",
    slug: "prakticka-ukazka-uspechu-ai",
  },
  {
    title: "Jak začít s AI v praxi",
    image: "/imgs/blog3.jpg",
    excerpt: "Úvod do praktického využití AI",
    slug: "jak-zacit-s-ai-v-praxi",
  },
  {
    title: "Prompting AI: Jak efektivně využít potenciál LLM, jako je ChatGPT",
    image: "/imgs/prompt-01.jpg",
    excerpt: "Umělá inteligence není vědma, která čte vaše myšlenky.",
    slug: "jak-efektivne-vyuzit-ai-v-praxi",
  },
];

// Nastavení slideru
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
  ],
};

const BlogSection: React.FC = () => {
  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        {/* Nadpis sekce */}
        <h2 className="text-4xl font-bold text-left text-white mb-12">
          Články a novinky
        </h2>

        {/* Slider článků */}
        <Slider {...sliderSettings}>
          {blogPosts.map((post) => (
            <div key={post.slug} className="p-4">
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full">
                {/* Obrázek jako klikací link */}
                <Link href={`/blog/${post.slug}`} className="relative block h-48 w-full overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform"
                  />
                  {/* Přidání overlay pro lepší viditelnost textu při hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black opacity-0 hover:opacity-50 transition-opacity"></div>
                </Link>
                {/* Obsah */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-semibold text-blue-400 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 text-sm flex-grow mb-4">
                    {post.excerpt}
                  </p>
                  <Link href={`/blog/${post.slug}`} className="inline-block bg-blue-500 text-white px-5 py-2 rounded-full text-center font-bold hover:bg-blue-600 transition-colors">
                    Celý článek
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Tlačítko "Přejít na blog" */}
        <div className="text-center mt-16">
          <Link href="/blog" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition">
            Přejít na blog
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
