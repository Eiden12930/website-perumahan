import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteContent } from "@/lib/content";
import { ArrowLeft, Calendar, User } from "lucide-react";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { articles } = await getSiteContent();
  const article = articles.find(a => a.slug === params.slug);
  if (!article) return { title: 'Not Found' };
  
  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    openGraph: { type: "article", title: article.seoTitle || article.title, description: article.seoDescription || article.excerpt, publishedTime: article.publishedAt, authors: [article.author], images: [{ url: article.coverImage, alt: article.title }] },
  };
}

export default async function ArticleDetail({ params }: { params: { slug: string } }) {
  const { articles } = await getSiteContent();
  const article = articles.find(a => a.slug === params.slug);
  
  if (!article) {
    notFound();
  }
  const readingTime = Math.max(1, Math.ceil(article.content.split(/\s+/).length / 200));

  return (
    <div className="pt-24 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/artikel" className="inline-flex items-center gap-2 text-primary hover:text-secondary mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" /> Kembali ke Artikel
          </Link>

          <div className="mb-8">
            <div className="inline-block bg-accent text-primary font-bold px-3 py-1 rounded-full mb-4">
              {article.category}
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex items-center gap-6 text-gray-500 pb-8 border-b">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{article.publishedAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              <span className="text-sm">{readingTime} menit baca</span>
            </div>
          </div>

          <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12">
            <Image 
              src={article.coverImage} 
              alt={article.title} 
              fill 
              className="object-cover" 
              priority
            />
          </div>

          <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-primary prose-p:text-gray-600 prose-a:text-secondary">
            {/* In a real app, you would use a markdown parser or dangerouslySetInnerHTML. 
                For this template we just render the raw string or map it. */}
            {article.content.split('\n').map((paragraph, idx) => (
              <p key={idx} className="mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          
          <div className="mt-16 pt-8 border-t">
            <h3 className="font-serif font-bold text-2xl text-primary mb-6">Artikel Lainnya</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {articles.filter(a => a.id !== article.id).slice(0, 2).map(related => (
                <Link key={related.id} href={`/artikel/${related.slug}`} className="group border rounded-xl p-4 hover:border-secondary transition-colors">
                  <h4 className="font-bold text-primary group-hover:text-secondary mb-2 line-clamp-2">{related.title}</h4>
                  <p className="text-sm text-gray-500">{related.publishedAt}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const { articles } = await getSiteContent();
  return articles.map((a) => ({
    slug: a.slug,
  }));
}
