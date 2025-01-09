"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link"; // Pro odkazy na detail článků

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

const BlogGrid: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Obsah stránky */}
      <main className="flex-grow">
        <section className="container mx-auto py-16 px-6">
          {/* Modré tlačítko pro návrat */}
          <div className="flex justify-start mb-8">
            <button
              onClick={() => (window.location.href = "/#blog")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition mt-12"
            >
              ← Zpět
            </button>
          </div>

          {/* Nadpis stránky */}
          <h1 className="text-5xl font-bold text-center text-blue-500 mb-12">
            Blogové články
          </h1>

          {/* Grid článků */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.slug}
                className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* Obrázek článku jako klikací link */}
                <Link href={`/blog/${post.slug}`} className="relative block h-48 w-full overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform"
                  />
                  {/* Přidání overlay pro lepší viditelnost textu při hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black opacity-0 hover:opacity-50 transition-opacity"></div>
                </Link>

                {/* Obsah článku */}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-blue-400 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="text-blue-500 hover:text-blue-400">
                    Přečíst článek →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BlogGrid;
