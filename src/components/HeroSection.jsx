"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "ЛЕЧЕНИЕ ПЕРЕЛОМОВ",

      image: "/hero1.jpg",
      gradient: "from-blue-600/60 via-cyan-500/50 to-teal-400/40",
      bg: "blue-600",
    },
    {
      title: "ЗАМЕНА СУСТАВОВ",
      image: "/hero2.jpg",
      gradient: "from-teal-600/60 via-emerald-500/50 to-green-400/40",
      bg: "green-600",
    },
    {
      title: "АРТРОСКОПИЯ",
      image: "/hero3.jpg",
      gradient: "from-emerald-600/60 via-teal-500/50 to-cyan-400/40",
      bg: "emerald-600",
    },
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-slate-900">
      {/* Background Images with Crossfade */}
      <AnimatePresence mode="wait">
        {slides.map(
          (slide, index) =>
            index === currentSlide && (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}
                />
                {/* Vignette Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Content Container */}
      <div className="relative z-10 flex h-full items-end pb-20 justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
            {slides.map((slide, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: currentSlide === index ? 1 : 0.4,
                  y: 0,
                  scale: currentSlide === index ? 1 : 0.95,
                }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                onClick={() => setCurrentSlide(index)}
                className={`
                  group relative cursor-pointer overflow-hidden rounded-lg backdrop-blur-md
                  transition-all duration-500
                  ${
                    currentSlide === index
                      ? `bg-${slide.bg}/20 shadow-2xl ring-2 ring-${slide.bg}/50`
                      : "bg-white/10 shadow-lg hover:bg-white/15"
                  }
                `}
              >
                {/* Card Content */}
                <div className="relative p-4 ">
                  {/* Icon/Number Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: currentSlide === index ? 1 : 0.8 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className={`
                      mb-6 inline-flex h-8 w-8 items-center justify-center rounded-full
                      ${
                        currentSlide === index
                          ? `bg-${slide.bg}/20 ring-2 ring-${slide.bg}/60`
                          : "bg-white/20"
                      }
                      transition-all duration-500
                    `}
                  >
                    <span className="text-lg  text-white">{index + 1}</span>
                  </motion.div>

                  {/* Title */}
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-2 text-lg font-semibold uppercase tracking-wider text-white md:text-xl"
                  >
                    {slide.title}
                  </motion.h2>
                </div>

                {/* Active Indicator Glow */}
                {currentSlide === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 rounded-2xl shadow-[0_0_60px_rgba(255,255,255,0.3)]"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`
              h-2 rounded-full transition-all duration-500
              ${
                currentSlide === index
                  ? "w-12 bg-white shadow-lg shadow-white/50"
                  : "w-2 bg-white/50 hover:bg-white/70"
              }
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
