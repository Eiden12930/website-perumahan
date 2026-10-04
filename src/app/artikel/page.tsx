import Image from "next/image";
import Link from "next/link";
import { getSiteContent } from "@/lib/content";

export const metadata = {
  title: "Artikel & Berita Properti | Panduan Hunian",
  description: "Dapatkan tips, inspirasi desain, dan informasi terbaru seputar properti.",
  openGraph: { title: "Artikel & Berita Properti", description: "Tips, inspirasi, dan informasi terbaru seputar properti." },
};

export default async function ArtikelPage() {
  const { articles } = await getSiteContent();
  return (
    <div className="pt-32 pb-24 min-h-screen bg-accent/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Artikel & Berita</h1>
          <p className="text-gray-600 text-lg">
            Temukan inspirasi dan informasi berharga seputar dunia properti.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article key={article.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <Link href={`/artikel/${article.slug}`}>
                <div className="relative h-60 w-full overflow-hidden">
                  <Image 
                    src={article.coverImage} 
                    alt={article.title} 
                    fill 
                    className="object-cover hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    {article.category}
                  </div>
                </div>
              </Link>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{article.publishedAt}</span>
                  <span className="mx-2">•</span>
                  <span>Oleh {article.author}</span>
                </div>
                <Link href={`/artikel/${article.slug}`}>
                  <h2 className="text-xl font-bold text-primary mb-3 hover:text-secondary transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                </Link>
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {article.excerpt}
                </p>
                <Link href={`/artikel/${article.slug}`} className="text-secondary font-bold hover:underline">
                  Baca Selengkapnya &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
