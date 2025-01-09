"use client";

import React, { useState } from "react";
import { FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(false);
    setError("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        /**
         * Tady pošleme jen e-mail + krátký "subject" a "message",
         * abychom na serveru věděli, že to přišlo z footeru.
         */
        body: JSON.stringify({
          email,
          subject: "Footer Form Submission",
          message: `Uživatel (footer) se chce ozvat. E-mail: ${email}`,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Úspěch – schováme formulář a zobrazíme "Co nevidět se spojíme!"
        setSubmitted(true);
        setEmail("");
      } else {
        // Když server vrátí 4xx/5xx, vyhodíme text z API nebo fallback
        setError(data.message || "Něco se pokazilo při odesílání.");
      }
    } catch (err) {
      console.error("Chyba při odesílání:", err);
      setError("Došlo k chybě. Zkuste to prosím znovu.");
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="container mx-auto px-4">
        {/* Hlavní grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* (1) Rychlé odkazy */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Rychlé odkazy</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-blue-400 transition">
                  O mně
                </a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-blue-400 transition">
                  Spolupráce
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-blue-400 transition">
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#aibussines"
                  className="hover:text-blue-400 transition"
                >
                  Umělá inteligence
                </a>
              </li>
              <li>
                <a href="#tools" className="hover:text-blue-400 transition">
                  AI nástroje
                </a>
              </li>
            </ul>
          </div>

          {/* (2) Kontakty (LinkedIn, mail, telefon) */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Kontakt</h4>
            <ul className="space-y-4">
              {/* LinkedIn */}
              <li className="flex items-center gap-3">
                <FaLinkedin className="text-blue-400 text-xl" />
                <a
                  href="https://www.linkedin.com/in/martin-andrt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition"
                >
                  LinkedIn
                </a>
              </li>
              {/* E-mail */}
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-blue-400 text-xl" />
                <a
                  href="mailto:ai.andrt.martin@gmail.com"
                  className="hover:text-blue-400 transition"
                >
                  ai.andrt.martin@gmail.com
                </a>
              </li>
              {/* Telefon */}
              <li className="flex items-center gap-3">
                <FaPhone className="text-blue-400 text-xl" />
                <a
                  href="tel:+728788824"
                  className="hover:text-blue-400 transition"
                >
                  +420 728 788 824
                </a>
              </li>
            </ul>
          </div>

          {/* (3) Pravý blok: formulář (Ozvu se) */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Ozvu se</h4>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Váš e-mail"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Odeslat
                </button>
              </form>
            ) : (
              <p className="text-blue-400 text-lg font-bold">
                Co nevidět se spojíme!
              </p>
            )}

            {/* Chybová hláška (pokud nějaká nastane) */}
            {error && (
              <p className="text-red-500 mt-2">
                {error}
              </p>
            )}
          </div>
        </div>

        {/* Spodní část */}
        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} Martin Andrt. Všechna práva vyhrazena.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
