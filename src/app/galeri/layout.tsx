import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeri Hunian dan Fasilitas",
  description: "Lihat inspirasi desain, interior, eksterior, dan fasilitas Perumahan by Duta Griya Idaman.",
};

export default function GalleryLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
