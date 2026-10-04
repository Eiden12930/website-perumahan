"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { useSiteContent } from "@/components/content-provider";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Tentang", href: "/#tentang" },
  { name: "Tipe Rumah", href: "/tipe-rumah" },
  { name: "Fasilitas", href: "/#fasilitas" },
  { name: "Lokasi", href: "/lokasi" },
  { name: "Galeri", href: "/galeri" },
  { name: "Artikel", href: "/artikel" },
  { name: "Kontak", href: "/#kontak" },
];

export default function Navbar() {
  const { projectData } = useSiteContent();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const solid = isScrolled || pathname !== "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-white shadow-md py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span
              className={`font-serif text-2xl font-bold tracking-tight ${
                solid ? "text-primary" : "text-white"
              }`}
            >
              {projectData.name.toUpperCase()}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-secondary ${
                    solid ? "text-gray-600" : "text-gray-200"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Button
              variant={solid ? "default" : "secondary"}
              className="gap-2"
              asChild
            >
              <Link href="/#kontak">
                <Phone className="w-4 h-4" /> Hubungi Sales
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${solid ? "text-primary" : "text-white"}`} />
            ) : (
              <Menu className={`w-6 h-6 ${solid ? "text-primary" : "text-white"}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t py-4 px-4 flex flex-col space-y-4 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-800 font-medium py-2 border-b border-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button className="w-full mt-4 gap-2" asChild>
            <Link href="/#kontak" onClick={() => setIsMobileMenuOpen(false)}>
              <Phone className="w-4 h-4" /> Hubungi Sales
            </Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
