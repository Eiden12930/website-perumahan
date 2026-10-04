import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/site-chrome";
import { getSiteContent } from "@/lib/content";
import { ContentProvider } from "@/components/content-provider";
import { projectData as fallbackProjectData } from "@/data/cms";
import { siteUrl } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Grand Arunika Residence | Hunian Modern Tropis",
    template: "%s | Grand Arunika Residence",
  },
  description: "Temukan hunian modern tropis untuk keluarga di Jakarta Selatan. Lihat tipe rumah, fasilitas, lokasi, dan jadwalkan kunjungan.",
  keywords: ["perumahan", "rumah", "properti", "Jakarta Selatan", "Grand Arunika Residence"],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Grand Arunika Residence",
    title: "Grand Arunika Residence | Hunian Modern Tropis",
    description: "Hunian modern tropis untuk masa depan keluarga Anda.",
    images: [{ url: fallbackProjectData.heroImage, width: 1200, height: 630, alt: "Grand Arunika Residence" }],
  },
  twitter: { card: "summary_large_image", title: "Grand Arunika Residence", description: "Hunian modern tropis di Jakarta Selatan.", images: [fallbackProjectData.heroImage] },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getSiteContent();
  const { projectData } = content;
  return (
    <html lang="id">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-white text-gray-900`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          name: projectData.name,
          description: projectData.description,
          address: { "@type": "PostalAddress", streetAddress: projectData.address, addressLocality: projectData.location, addressCountry: "ID" },
          telephone: `+${projectData.whatsappNumber}`,
          email: projectData.email,
          url: siteUrl,
        }).replace(/</g, "\\u003c") }} />
        <ContentProvider value={content}>
          <SiteChrome>{children}</SiteChrome>
        </ContentProvider>
      </body>
    </html>
  );
}
