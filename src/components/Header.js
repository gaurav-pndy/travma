"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Главная", id: "home" },
  { label: "Обо мне", id: "about" },
  { label: "Сфера деятельности", id: "activity" },
  { label: "Написать отзыв", id: "testimonials" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll to section and close menu if open
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
        {/* Left side: logo and site name */}
        <div className="flex items-center space-x-4">
          <img src="/logo.avif" alt="Logo" className="h-16 w-auto" />
          <h1 className="text-lg sm:text-xl font-impact text-[#116089] tracking-wide">
            КОНСУЛЬТАЦИЯ <br />
            <span className="text-[#02b8bf] font-impact">
              ТРАВМАТОЛОГА - ОРТОПЕДА
            </span>
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-10 font-medium text-lg">
          {navItems.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => handleScroll(id)}
              className="text-gray-700 hover:text-cyan-500 transition-colors duration-200"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col space-y-1.5 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            className="block h-1.5 w-6 bg-cyan-500 rounded"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="block h-1.5 w-6 bg-cyan-500 rounded"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            className="block h-1.5 w-6 bg-cyan-500 rounded"
          />
        </button>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-gray-50 border-t border-gray-200"
          >
            <div className="flex flex-col px-6 py-4 space-y-4 font-medium text-lg">
              {navItems.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => handleScroll(id)}
                  className="text-gray-700 hover:text-cyan-500 text-left"
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
