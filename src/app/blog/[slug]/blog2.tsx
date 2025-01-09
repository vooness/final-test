"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BlogArticle: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Obsah článku */}
      <main className="flex-grow container mx-auto py-16 px-6">
        {/* Modré tlačítko pro návrat */}
        <div className="flex justify-start mb-8">
          <button
            onClick={() => (window.location.href = "/#blog")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition"
          >
            ← Zpět
          </button>
        </div>

        {/* Nadpis článku */}
        <h1 className="text-5xl font-bold text-center text-blue-500 mb-12">
          AI umí šetřit desítky hodin měsíčně
        </h1>

        {/* Text článku */}
        <article className="prose prose-lg lg:prose-xl prose-invert max-w-none">
          <p>
            AI je dneska tak trochu buzzword, ale pokud se na ni podíváš z praktického hlediska,
            můžeš být příjemně překvapený. V tomhle článku ti představím, jak AI
            opravdu pomáhá šetřit čas, a to ne jen teoreticky, ale na základě reálných
            dat. Společně projdeme konkrétní příklady a tipy, které ti pomůžou AI
            začlenit do každodenních činností, nebo tě alespoň inspirují, jak s AI začít.
          </p>

          <h2>Kde se data měří</h2>
          <h3>1. Automatizace e-mailů</h3>
          <p>
            <strong>Příklad:</strong> AI generuje shrnutí dlouhých e-mailů nebo odpoví na běžné dotazy.
          </p>
          <p>
            <strong>Reálná data:</strong> Společnost Gartner zjistila, že v regionu EMEA AI ušetří zaměstnancům
            v průměru <strong>3,37 hodiny týdně</strong> (zdroj: <a href="https://cio.cz" className="text-blue-400 hover:underline">CIO.cz</a>).
          </p>
          <p>
            <strong>Tip:</strong> Využij nástroje jako ChatGPT nebo Grammarly Business pro mailing.
          </p>

          <h3>2. Třídění životopisů a HR procesy</h3>
          <p>
            <strong>Příklad:</strong> AI prochází složky životopisů, filtruje kandidáty a navrhuje ty nejlepší.
          </p>
          <p>
            <strong>Reálná data:</strong> Automatizace HR procesů zkracuje čas na screening o <strong>30–40 %</strong> 
            (zdroj: <a href="https://gartner.com" className="text-blue-400 hover:underline">Gartner</a>).
          </p>
          <p>
            <strong>Tip:</strong> Vyzkoušej ATS systémy jako Recruitee nebo Workable.
          </p>

          {/* Zbytek článku zde */}
        </article>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BlogArticle;
