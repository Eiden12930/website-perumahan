"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSiteContent } from "@/components/content-provider";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["Semua", "Exterior", "Interior", "Siteplan", "Fasilitas", "Lingkungan", "Construction Progress"];

export default function GaleriPage() {
  const { gallery } = useSiteContent();
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredGallery = activeCategory === "Semua" 
    ? gallery 
    : gallery.filter(item => item.category === activeCategory);

  useEffect(() => {
    if (selectedIndex === null) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowRight") setSelectedIndex((index) => index === null ? null : (index + 1) % filteredGallery.length);
      if (event.key === "ArrowLeft") setSelectedIndex((index) => index === null ? null : (index - 1 + filteredGallery.length) % filteredGallery.length);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedIndex, filteredGallery.length]);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Galeri Proyek</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Jelajahi keindahan arsitektur dan fasilitas premium di Grand Arunika melalui galeri foto kami.
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category 
                  ? "bg-primary text-white" 
                  : "bg-accent text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry-like Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredGallery.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className="group relative overflow-hidden rounded-xl bg-gray-100 aspect-[4/3]"
              >
                <button type="button" className="absolute inset-0 z-10 w-full h-full" aria-label={`Perbesar foto: ${item.caption}`} onClick={() => setSelectedIndex(filteredGallery.findIndex((photo) => photo.id === item.id))} />
                <Image
                  src={item.image} 
                  alt={item.caption} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium text-lg px-4 text-center">{item.caption}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && filteredGallery[selectedIndex] && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedIndex(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-secondary z-[110]"
              aria-label="Tutup galeri"
              onClick={() => setSelectedIndex(null)}
            >
              <X className="w-10 h-10" />
            </button>
            <div className="relative w-full max-w-5xl aspect-[16/9]" onClick={e => e.stopPropagation()}>
              <Image
                src={filteredGallery[selectedIndex].image}
                alt={filteredGallery[selectedIndex].caption}
                fill 
                className="object-contain" 
              />
            </div>
            <button type="button" aria-label="Foto sebelumnya" className="absolute left-4 md:left-10 text-white text-4xl p-3" onClick={(event) => { event.stopPropagation(); setSelectedIndex((selectedIndex - 1 + filteredGallery.length) % filteredGallery.length); }}>‹</button>
            <button type="button" aria-label="Foto berikutnya" className="absolute right-4 md:right-10 text-white text-4xl p-3" onClick={(event) => { event.stopPropagation(); setSelectedIndex((selectedIndex + 1) % filteredGallery.length); }}>›</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
