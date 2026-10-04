import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSiteContent } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, Phone } from "lucide-react";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { propertyTypes, projectData } = await getSiteContent();
  const property = propertyTypes.find(p => p.slug === params.slug);
  if (!property) return { title: 'Not Found' };
  
  return {
    title: `${property.name} di ${projectData.location}`,
    description: `Hunian ${property.name} dengan LT ${property.landArea} m², LB ${property.buildingArea} m². Mulai ${property.price}. ${property.description}`,
    openGraph: { title: `${property.name} | ${projectData.name}`, description: property.description, images: [{ url: property.images[0], alt: property.name }] },
  };
}

export default async function PropertyDetail({ params }: { params: { slug: string } }) {
  const { propertyTypes, projectData } = await getSiteContent();
  const property = propertyTypes.find(p => p.slug === params.slug);
  
  if (!property) {
    notFound();
  }

  const message = encodeURIComponent(`Halo, saya tertarik dengan tipe rumah ${property.name}. Mohon informasi lebih lanjut mengenai harga dan ketersediaannya.`);

  return (
    <div className="pt-24 pb-24 min-h-screen bg-white">
      {/* Hero Image */}
      <div className="relative h-[60vh] w-full bg-gray-100">
        <Image 
          src={property.images[0]} 
          alt={property.name} 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white container mx-auto">
          <Link href="/tipe-rumah" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5" /> Kembali ke Tipe Rumah
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-block bg-secondary text-primary text-sm font-bold px-3 py-1 rounded-full mb-4">
                {property.status}
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold">{property.name}</h1>
            </div>
            <div className="text-left md:text-right">
              <div className="text-lg text-white/80 mb-1">Mulai dari</div>
              <div className="text-3xl md:text-4xl font-bold text-secondary">{property.price}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 mt-16">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-serif font-bold text-primary mb-6">Deskripsi</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {property.description}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-primary mb-6">Spesifikasi Utama</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-accent p-6 rounded-xl text-center">
                  <div className="text-sm text-gray-500 mb-2">Luas Tanah</div>
                  <div className="text-2xl font-bold text-primary">{property.landArea} m²</div>
                </div>
                <div className="bg-accent p-6 rounded-xl text-center">
                  <div className="text-sm text-gray-500 mb-2">Luas Bangunan</div>
                  <div className="text-2xl font-bold text-primary">{property.buildingArea} m²</div>
                </div>
                <div className="bg-accent p-6 rounded-xl text-center">
                  <div className="text-sm text-gray-500 mb-2">Kamar Tidur</div>
                  <div className="text-2xl font-bold text-primary">{property.bedrooms}</div>
                </div>
                <div className="bg-accent p-6 rounded-xl text-center">
                  <div className="text-sm text-gray-500 mb-2">Kamar Mandi</div>
                  <div className="text-2xl font-bold text-primary">{property.bathrooms}</div>
                </div>
                <div className="bg-accent p-6 rounded-xl text-center"><div className="text-sm text-gray-500 mb-2">Lantai</div><div className="text-2xl font-bold text-primary">{property.floors}</div></div>
                <div className="bg-accent p-6 rounded-xl text-center"><div className="text-sm text-gray-500 mb-2">Carport</div><div className="text-2xl font-bold text-primary">{property.carport}</div></div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-primary mb-6">Spesifikasi Bangunan</h2>
              <ul className="grid sm:grid-cols-2 gap-3">{property.specifications.map((specification: string) => <li key={specification} className="flex items-center gap-3 bg-accent/60 p-4 rounded-lg"><Check className="w-5 h-5 text-secondary" />{specification}</li>)}</ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-primary mb-6">Galeri Interior & Eksterior</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.images.map((img, i) => (
                  <div key={i} className="relative h-64 rounded-xl overflow-hidden">
                    <Image src={img} alt={`${property.name} ${i+1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-primary mb-6">Denah Rumah (Floor Plan)</h2>
              <div className="relative w-full h-[400px] bg-gray-100 rounded-xl overflow-hidden border">
                <Image src={property.floorPlan} alt={`Denah ${property.name}`} fill className="object-contain" />
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-white border shadow-xl rounded-2xl p-8">
              <h3 className="text-xl font-bold text-primary mb-6">Tertarik dengan unit ini?</h3>
              <p className="text-gray-600 mb-8">
                Hubungi sales representatif kami untuk mendapatkan penawaran spesial, brosur lengkap, dan jadwal kunjungan.
              </p>
              
              <Button size="lg" className="w-full h-14 text-lg bg-[#25D366] hover:bg-[#128C7E] text-white gap-2" asChild>
                <a href={`https://wa.me/${projectData.whatsappNumber}?text=${message}`} target="_blank" rel="noopener noreferrer">
                  <Phone className="w-5 h-5" /> Chat dengan Sales
                </a>
              </Button>
              
              <Button size="lg" variant="outline" className="w-full h-14 text-lg mt-4 border-primary text-primary hover:bg-primary hover:text-white" asChild>
                <Link href="/#kontak">
                  Jadwalkan Kunjungan
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const { propertyTypes } = await getSiteContent();
  return propertyTypes.map((p) => ({
    slug: p.slug,
  }));
}
