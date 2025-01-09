"use client";

import React from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Data článků
const blogPosts = [
  {
    slug: "jak-ai-meni-trh-prace",
    title: "AI šetří desítky hodin měsíčně",
    sections: [
      {
        heading: "Co se dozvíš v tomhle článku?",
        content: `
          <p class="mb-4">
            AI je dneska tak trochu buzzword, ale pokud se na ni podíváš z praktického hlediska, 
            můžeš být příjemně překvapený. V tomhle článku ti představím, jak AI opravdu pomáhá 
            šetřit čas, a to nejen teoreticky, ale na základě reálných dat.
          </p>
          <p class="mb-4">
            Společně projdeme konkrétní příklady a tipy, které ti pomůžou AI začlenit do každodenních 
            činností, nebo tě alespoň inspirují, jak s AI začít.
          </p>
        `,
      },
      {
        heading: "Kde se data měří",
        content: `
          <div class="mb-10">
            <h3 class="text-xl font-semibold mb-3">1. Automatizace e-mailů</h3>
            <p class="mb-2">
              <strong>Příklad:</strong> AI generuje shrnutí dlouhých e-mailů nebo odpoví na běžné dotazy.
            </p>
            <p class="mb-2">
              <strong>Reálná data:</strong> Společnost Gartner zjistila, že v regionu EMEA AI ušetří 
              zaměstnancům v průměru <strong>3,37 hodiny týdně</strong>.
            </p>
            <p class="mb-2">
              <strong>Tip:</strong> Využij nástroje jako <em>ChatGPT</em> nebo <em>Grammarly Business</em> pro mailing.
            </p>
          </div>

          <div class="mb-10">
            <h3 class="text-xl font-semibold mb-3">2. Třídění životopisů a HR procesy</h3>
            <p class="mb-2">
              <strong>Příklad:</strong> AI prochází složky životopisů, filtruje kandidáty a navrhuje ty nejlepší.
            </p>
            <p class="mb-2">
              <strong>Reálná data:</strong> Automatizace HR procesů zkracuje čas na screening o <strong>30–40 %</strong>.
            </p>
            <p class="mb-2">
              <strong>Tip:</strong> Vyzkoušej ATS systémy jako <em>Recruitee</em> nebo <em>Workable</em>.
            </p>
          </div>

          <div class="mb-4">
            <h3 class="text-xl font-semibold mb-3">3. Tvorba obsahu (marketing, blogy)</h3>
            <p class="mb-2">
              <strong>Příklad:</strong> AI generuje blogy, popisy produktů nebo návrhy na reklamy.
            </p>
            <p class="mb-2">
              <strong>Reálná data:</strong> MIT zjistilo, že psaní obsahu pomocí AI zvyšuje produktivitu 
              o <strong>59 %</strong>.
            </p>
            <p class="mb-2">
              <strong>Tip:</strong> Použij <em>Jasper</em>, <em>Copy.ai</em> nebo <em>OpenAI API</em> pro automatickou tvorbu textů.
            </p>
          </div>
        `,
      },
    ],
  },
  {
    slug: "prakticka-ukazka-uspechu-ai",
    title: "Praktická ukázka: Kolik to skutečně ušetří?",
    sections: [
      {
        heading: "Příklad modelového zaměstnance",
        content: `
          <ul class="list-disc pl-5 mb-4">
            <li><strong>Čas bez AI:</strong> 34 hodin týdně</li>
            <li><strong>Čas s AI:</strong> 17 hodin týdně</li>
            <li><strong>Úspora:</strong> 17 hodin týdně (zdroj: kombinace dat z MIT, Gartner a vlastní kalkulace)</li>
          </ul>
          <p class="mb-4">Konkrétně tohle zahrnuje:</p>
          <ul class="list-disc pl-5 mb-4">
            <li>E-maily: 3 hodiny týdně</li>
            <li>Třídění HR dat: 4 hodiny týdně</li>
            <li>Blogy a marketing: 6 hodin týdně</li>
            <li>Přepisy meetingů: 2 hodiny týdně</li>
            <li>Reporting: 2 hodiny týdně</li>
          </ul>
        `,
      },
      {
        heading: "Co si z toho vzít?",
        content: `
          <div class="mb-8">
            <h3 class="text-xl font-semibold mb-3">1. AI funguje. Konec výmluv. Začni teď.</h3>
            <p class="mb-3">
              Žádný složitosti. Zkrátka si vyber jednu oblast, kde tě to nejvíc tlačí. 
              Fakt nemusíš hned předělávat celou firmu. Automatizace e-mailů? Super. HR procesy? Ještě lepší. 
              Nebo snad tvorba obsahu? Perfektní. Začni malým pilotem, měř výsledky a uvidíš. 
              Když to půjde, rozjedeš AI i na dalších frontách.
            </p>
          </div>

          <div class="mb-8">
            <h3 class="text-xl font-semibold mb-3">2. Správný nástroje jsou základ</h3>
            <p class="mb-3">
              Nekoukej po složitém systému, který zabije víc času, než ušetří. 
              Potřebuješ něco, co zapadne do tvých procesů jako klíč do zámku. 
              ChatGPT na e-maily? Boží. Grammarly Business na lepší texty? Ano, prosím. 
              Recruitee na HR? Jednoznačně. Jednoduchý nástroje = rychlý výsledky.
            </p>
          </div>

          <div class="mb-8">
            <h3 class="text-xl font-semibold mb-3">3. Testuj a neboj se průšvihů</h3>
            <p class="mb-3">
              Jo, něco se třeba nepovede. A co? Nikdo učený z nebe nespadl. Hlavní je testovat a hledat, co funguje. 
              Experimentuj, sbírej data a neboj se přiznat, že to chce doladit. Výsledky přijdou.
            </p>
          </div>

          <div class="mb-4">
            <h3 class="text-xl font-semibold mb-3">4. Oslov experty, když nevíš kudy kam</h3>
            <p class="mb-3">
              Jasně, můžeš se v tom plácat sám, ale proč? Jsou lidi, co už AI zaváděli stokrát a vědí, co dělají. 
              Zavolej někomu, kdo tě provede celým procesem, a ušetříš si nervy i čas.
            </p>
            <p>
              Takže teď už víš, co dělat. Nenech AI jen jako buzzword. Začni ji využívat. 
              A jestli chceš konkrétní tipy, pomoc nebo jen nakopnout správným směrem, ozvi se.
            </p>
          </div>
        `,
      },
    ],
  },
  {
  "slug": "jak-zacit-s-ai-v-praxi",
  "title": "Jak začít s AI v praxi",
  "sections": [
    {
      "heading": "Úvod do praktického využití AI",
      "content": `
        <p class="mb-4">
          AI dnes není jen módní slovo. Je to nástroj, který může firmám a jednotlivcům výrazně usnadnit práci, 
          zvýšit produktivitu a zlepšit rozhodovací procesy. Tento článek vám ukáže, jak s AI začít efektivně a 
          krok za krokem ji zavést do vaší každodenní praxe.
        </p>
        <p>
          V průběhu článku najdete konkrétní tipy, příklady nástrojů a doporučení, které vám usnadní první kroky 
          s AI, a to nejen v profesionálním, ale i osobním životě.
        </p>
      `
    },
    {
      "heading": "Kde začít s implementací AI",
      "content": `
        <ul class="list-disc list-inside mb-4">
          <li>
            <strong>Automatizace administrativy:</strong> Začněte s nástroji jako <em>ChatGPT</em> nebo 
            <em>Grammarly</em>, které vám pomohou zpracovat e-maily, vytvářet texty nebo sumarizovat dokumenty.
          </li>
          <li>
            <strong>Analýza dat:</strong> Nástroje jako <em>Power BI</em> nebo <em>Tableau</em> umožňují 
            vizualizovat data a získat cenné poznatky během několika minut.
          </li>
          <li>
            <strong>Personalizované marketingové kampaně:</strong> Pomocí AI nástrojů jako <em>Jasper</em> nebo 
            <em>Copy.ai</em> můžete vytvářet personalizovaný obsah, který zaujme vaše zákazníky.
          </li>
        </ul>
        <p>
          Tyto oblasti mají největší potenciál přinést okamžité výsledky a rychlou návratnost investic.
        </p>
      `
    },
    {
      "heading": "Tipy pro úspěšný start",
      "content": `
        <ol class="list-decimal list-inside mb-4">
          <li>
            <strong>Začněte v malém:</strong> Vyberte si jednu konkrétní oblast nebo proces, kde AI může 
            přinést okamžitou hodnotu. Například automatizace e-mailových odpovědí nebo analýza dat.
          </li>
          <li>
            <strong>Vybírejte správné nástroje:</strong> Otestujte několik AI nástrojů a zvolte ten, který 
            nejlépe odpovídá vašim potřebám. Nebojte se experimentovat a měnit přístup podle výsledků.
          </li>
          <li>
            <strong>Školení a vzdělávání:</strong> Ujistěte se, že vaši zaměstnanci rozumí, jak nástroje 
            používat. Poskytněte jim školení nebo workshopy, které jim ukážou nejlepší postupy.
          </li>
        </ol>
        <p>
          Pamatujte, že klíčem k úspěšnému zavedení AI je pravidelná optimalizace a zpětná vazba od uživatelů.
        </p>
      `
    },
    {
      "heading": "Závěr",
      "content": `
        <p>
          AI je mocný nástroj, který vám může ušetřit čas, zvýšit produktivitu a zlepšit celkovou efektivitu. 
          Ať už jste začátečník nebo pokročilý uživatel, začít s AI je jednodušší, než si myslíte. Udělejte 
          první krok ještě dnes a objevte potenciál AI pro vaše projekty.
        </p>
        <p>
          Pokud máte jakékoli dotazy nebo potřebujete poradit, neváhejte se na nás obrátit. Jsme tu, abychom 
          vám pomohli na vaší cestě k úspěšnému využití AI.
        </p>
      `
    }
  ]
},
{
  slug: "jak-efektivne-vyuzit-ai-v-praxi",
  title: "Prompting AI: Jak efektivně využít potenciál LLM, jako je ChatGPT",
  image: "/imgs/prompt-01.jpg",
  excerpt: "Umělá inteligence není vědma, která čte vaše myšlenky.",
  sections: [
    {
      heading: "Úvod: Co je prompting a proč je důležitý?",
      content: `
        <p class="mb-4">
          Umělá inteligence není vědma, která čte vaše myšlenky a přichází s dokonalou odpovědí. Abychom 
          z ní získali to nejlepší, musíme jí zadat jasné, konkrétní a promyšlené pokyny, tedy tzv. 
          <strong>prompty</strong>. Právě způsob, jakým s AI komunikujeme, určuje kvalitu výsledků, které 
          od ní dostaneme.
        </p>
        <p class="mb-4">
          Tento článek vám ukáže, jak efektivně využít potenciál AI modelů, jako je ChatGPT, k řešení 
          každodenních úkolů, zvýšení produktivity a kreativnímu přístupu k práci.
        </p>
      `
    },
    {
      heading: "Jak AI funguje a co potřebuje?",
      content: `
        <p class="mb-4">
          LLM (large language models), jako je ChatGPT, fungují na základě analýzy obrovského množství 
          textových dat a algoritmů, které předpovídají další slova v textu. AI však nerozumí kontextu, 
          pokud jí ho neposkytneme.
        </p>
        <ul class="list-disc list-inside mb-4">
          <li><strong>Kontext:</strong> Bez kontextu AI může dávat povrchní nebo nesmyslné odpovědi.</li>
          <li><strong>Konkrétnost:</strong> Čím přesnější otázky a úkoly zadáte, tím lepší odpověď získáte.</li>
          <li><strong>Kreativita:</strong> AI exceluje při řešení specifických a originálních úkolů, pokud ji správně navedete.</li>
        </ul>
      `
    },
    {
      heading: "Příklady správných promptů",
      content: `
        <p class="mb-4">
          Naučte se efektivně zadávat prompty, aby AI porozuměla vašim potřebám. Podívejte se na rozdíl 
          mezi špatně formulovanými a správně formulovanými pokyny:
        </p>
        <ul class="list-disc list-inside mb-4">
          <li><strong>Špatně:</strong> "Napiš mi příběh."</li>
          <li><strong>Správně:</strong> "Napiš krátký příběh o dobrodružném astronautovi na Marsu, který objeví mimozemský život."</li>
        </ul>
        <p class="mb-4">
          Experimentujte s formulacemi, přidávejte detaily, klíčová slova a zkoušejte různé přístupy, abyste 
          našli ten nejvhodnější.
        </p>
      `
    },
    {
      heading: "Jak využít AI v každodenní praxi?",
      content: `
        <p class="mb-4">
          AI může být neocenitelným pomocníkem v mnoha oblastech. Tady jsou konkrétní způsoby, jak ji začlenit 
          do vaší práce:
        </p>
        <ul class="list-disc list-inside mb-4">
          <li><strong>Automatizace administrativy:</strong> Používejte AI pro tvorbu e-mailů, plánování a sumarizaci dokumentů.</li>
          <li><strong>Tvorba obsahu:</strong> Generujte texty pro marketingové kampaně, blogy nebo popisy produktů.</li>
          <li><strong>Analýza dat:</strong> Zpracovávejte velké objemy dat rychle a efektivně pomocí vizualizačních nástrojů.</li>
        </ul>
        <p class="mb-4">
          Klíčem je začít v malém a postupně integrovat AI do dalších procesů, jakmile se osvědčí.
        </p>
      `
    },
    {
      heading: "Tipy a triky pro lepší výsledky",
      content: `
        <p class="mb-4">
          Aby AI přinesla co nejlepší výsledky, držte se následujících tipů:
        </p>
        <ul class="list-decimal list-inside mb-4">
          <li><strong>Zjednodušte zadání:</strong> Rozdělte složité úkoly na menší části, které AI snáze zvládne.</li>
          <li><strong>Testujte a optimalizujte:</strong> Zkoušejte různé formulace promptů a sledujte, co funguje nejlépe.</li>
          <li><strong>Dejte AI čas na přemýšlení:</strong> U komplexních úkolů postupujte krok za krokem a umožněte AI analyzovat každý krok zvlášť.</li>
        </ul>
      `
    },
    {
      heading: "Závěr: Využijte potenciál AI naplno",
      content: `
        <p class="mb-4">
          Umělá inteligence je mocný nástroj, který může změnit způsob, jakým pracujeme, tvoříme a rozhodujeme se. 
          Klíčem k úspěchu je naučit se správně zadávat prompty a neustále se učit, jak AI využívat efektivněji.
        </p>
        <p class="mb-4">
          Takže neváhejte – začněte ještě dnes. Experimentujte, zkoušejte a získejte náskok s pomocí AI!
        </p>
      `
    }
  ]
}

];

const BlogDetail: React.FC = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <h1 className="text-4xl font-bold">Článek nenalezen</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-6 py-16">
        {/* Tlačítko Zpět na články */}
        <div className="flex justify-start mb-8">
          <a
            href="/blog"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 mt-6 rounded-md transition"
          >
            ← Zpět na články
          </a>
        </div>

        {/* Název článku */}
        <h1 className="text-5xl font-bold text-blue-500 my-6 text-center">{post.title}</h1>

        {/* Obsah článku */}
        {post.sections.map((section, index) => (
          <section key={index} className="mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-blue-400 mb-4 text-center">
              {section.heading}
            </h2>
            <div
              className="text-lg text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: section.content }}
            ></div>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetail;
