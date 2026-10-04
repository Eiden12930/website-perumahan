"use client";

import Link from "next/link";
import { useSiteContent } from "@/components/content-provider";
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const { projectData } = useSiteContent();
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-serif text-2xl font-bold mb-6">GRAND ARUNIKA</h3>
            <p className="text-gray-300 mb-6 max-w-sm">
              {projectData.description}
            </p>
            <div className="flex space-x-4">
              <a href={projectData.instagram} aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={projectData.facebook} aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={projectData.youtube} aria-label="YouTube" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Navigasi</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/tipe-rumah" className="text-gray-300 hover:text-white transition-colors">Tipe Rumah</Link></li>
              <li><Link href="/galeri" className="text-gray-300 hover:text-white transition-colors">Galeri</Link></li>
              <li><Link href="/lokasi" className="text-gray-300 hover:text-white transition-colors">Lokasi</Link></li>
              <li><Link href="/artikel" className="text-gray-300 hover:text-white transition-colors">Artikel</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Kontak</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">{projectData.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                <span className="text-gray-300">+{projectData.whatsappNumber}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                <a className="text-gray-300 hover:text-white" href={`mailto:${projectData.email}`}>{projectData.email}</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-gray-300 mb-4">Dapatkan informasi terbaru tentang promo dan penawaran eksklusif.</p>
            <div className="flex">
              <input type="email" placeholder="Email Anda" className="bg-white/10 border-none rounded-l-md px-4 py-2 w-full text-white focus:outline-none focus:ring-1 focus:ring-secondary" />
              <button className="bg-secondary text-primary font-bold px-4 py-2 rounded-r-md hover:bg-secondary/90 transition-colors">
                Kirim
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} {projectData.name}. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="/#kontak" className="hover:text-white transition-colors">Hubungi Kami</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
