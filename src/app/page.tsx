"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, CheckCircle2, BedDouble, Bath, MoveRight } from "lucide-react";
import { useSiteContent } from "@/components/content-provider";
import { Button } from "@/components/ui/button";
import type { FormEvent } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Home() {
  const { projectData, propertyTypes, facilities, contactPersons, articles, gallery } = useSiteContent();
  function handleInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const name = String(values.get("name") || "");
    const phone = String(values.get("phone") || "");
    const type = String(values.get("type") || "Belum menentukan tipe");
    const budget = String(values.get("budget") || "Belum ditentukan");
    const visitDate = String(values.get("visitDate") || "Belum dijadwalkan");
    const message = encodeURIComponent(`Halo, saya ingin informasi ${projectData.name} by ${projectData.developer}.\nNama: ${name}\nWhatsApp: ${phone}\nTipe rumah: ${type}\nBudget: ${budget}\nJadwal kunjungan: ${visitDate}`);
    window.open(`https://wa.me/${projectData.whatsappNumber}?text=${message}`, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[760px] h-screen max-h-[1000px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={projectData.heroImage}
            alt="Hero Image"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center mt-16">
          <motion.h1 
            initial="hidden" animate="visible" variants={fadeUp}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg"
          >
            {projectData.tagline}
          </motion.h1>
          <motion.p 
            initial="hidden" animate="visible" variants={fadeUp}
            className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto drop-shadow"
          >
            {projectData.description}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="w-full sm:w-auto bg-secondary text-primary hover:bg-secondary/90 text-lg h-14 px-8" asChild>
              <Link href="/tipe-rumah">Lihat Tipe Rumah</Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-primary text-lg h-14 px-8" asChild>
              <Link href="#kontak">Hubungi Sales</Link>
            </Button>
            <Button size="lg" className="w-full sm:w-auto bg-[#25D366] text-white hover:bg-[#128C7E] text-lg h-14 px-8" asChild>
              <a href={`https://wa.me/${projectData.whatsappNumber}?text=${encodeURIComponent(`Halo, saya tertarik dengan ${projectData.name} by ${projectData.developer}. Mohon informasi lebih lanjut.`)}`} target="_blank" rel="noopener noreferrer">WhatsApp Sales</a>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="bg-primary text-white py-8">
        <div className="container mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[[projectData.landArea, "Kawasan hijau"], [projectData.unitCount, "Hunian terencana"], ["6+", "Fasilitas keluarga"], [projectData.location, "Lokasi strategis"]].map(([value, label]) => <div key={label}><p className="font-serif text-2xl md:text-3xl text-secondary">{value}</p><p className="text-white/70 text-sm mt-1">{label}</p></div>)}
        </div>
      </section>

      {/* Project Intro */}
      <section id="tentang" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-secondary font-semibold tracking-wider uppercase mb-3">Tentang Proyek</h2>
              <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-primary">{projectData.aboutTitle}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {projectData.aboutDescription}
              </p>
              <ul className="space-y-4 mb-8">
                {['Lokasi Strategis di Jakarta Selatan', 'Fasilitas Premium & Eksklusif', 'Investasi Menguntungkan', 'Desain Arsitektur Modern'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
              <Image src={gallery[0].image} alt="Tentang Kami" fill className="object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-24 bg-accent">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-secondary font-semibold tracking-wider uppercase mb-3">Tipe Hunian</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary">Pilihan Tipe Rumah</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {propertyTypes.map((type, index) => (
              <motion.div 
                key={type.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image src={type.images[0]} alt={type.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    {type.status}
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-primary mb-2">{type.name}</h4>
                  <div className="flex gap-4 text-sm text-gray-500 mb-4">
                    <span>LT {type.landArea}m²</span>
                    <span>LB {type.buildingArea}m²</span>
                  </div>
                  <div className="flex items-center gap-5 text-sm text-gray-500 mb-4"><span className="inline-flex items-center gap-1"><BedDouble className="w-4 h-4" />{type.bedrooms} kamar</span><span className="inline-flex items-center gap-1"><Bath className="w-4 h-4" />{type.bathrooms} kamar mandi</span></div>
                  <p className="text-secondary font-bold text-lg mb-6">Mulai {type.price}</p>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors" asChild>
                    <Link href={`/tipe-rumah/${type.slug}`}>Lihat Detail</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-accent/50">
        <div className="container mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div><p className="text-secondary font-semibold tracking-wider uppercase mb-3">Lokasi Terhubung</p><h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-5">Dekat dengan hal penting dalam hidup Anda</h2><p className="text-gray-600 leading-relaxed mb-7">Akses praktis ke jalan tol, pusat belanja, sekolah, dan layanan kesehatan di Jakarta Selatan.</p><Button asChild><Link href="/lokasi">Jelajahi Lokasi <ArrowRight className="ml-2 w-4 h-4" /></Link></Button></div>
          <div className="relative h-[340px] rounded-2xl overflow-hidden shadow-lg"><iframe title={`Peta ${projectData.name}`} src={projectData.mapEmbedUrl} className="absolute inset-0 w-full h-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end gap-4 mb-10"><div><p className="text-secondary font-semibold tracking-wider uppercase mb-3">Galeri</p><h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">Detail yang terasa seperti rumah</h2></div><Link href="/galeri" className="hidden sm:inline-flex items-center gap-2 text-primary font-semibold">Lihat semua <MoveRight className="w-4 h-4" /></Link></div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{gallery.slice(0, 3).map((item, i) => <Link href="/galeri" key={item.id} className={`relative overflow-hidden rounded-xl ${i === 0 ? "col-span-2 md:col-span-1 h-56 md:h-80" : "h-56 md:h-80"}`}><Image src={item.image} alt={item.caption} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover transition-transform duration-500 hover:scale-105" /><span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-6 text-white font-medium">{item.caption}</span></Link>)}</div>
        </div>
      </section>

      <section className="py-24 bg-accent/40">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end gap-4 mb-10"><div><p className="text-secondary font-semibold tracking-wider uppercase mb-3">Wawasan Hunian</p><h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">Cerita dan panduan properti</h2></div><Link href="/artikel" className="hidden sm:inline-flex items-center gap-2 text-primary font-semibold">Semua artikel <MoveRight className="w-4 h-4" /></Link></div>
          <div className="grid md:grid-cols-2 gap-6">{articles.slice(0, 2).map((article) => <Link href={`/artikel/${article.slug}`} key={article.id} className="group flex gap-5 bg-white p-4 rounded-xl shadow-sm"><div className="relative w-28 md:w-40 shrink-0 min-h-32 rounded-lg overflow-hidden"><Image src={article.coverImage} alt={article.title} fill sizes="160px" className="object-cover transition-transform group-hover:scale-105" /></div><div className="py-2"><p className="text-xs uppercase tracking-wide text-secondary font-semibold">{article.category}</p><h3 className="text-lg md:text-xl font-bold text-primary mt-2 group-hover:text-secondary">{article.title}</h3><p className="text-gray-500 text-sm mt-3">{article.excerpt}</p></div></Link>)}</div>
        </div>
      </section>

      {/* Facilities */}
      <section id="fasilitas" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-secondary font-semibold tracking-wider uppercase mb-3">Fasilitas</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary">Kenyamanan dalam Kawasan</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-10">
            {facilities.map((fac, index) => (
              <motion.div 
                key={fac.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative h-48 md:h-64 rounded-xl overflow-hidden flex items-end p-6"
              >
                <Image src={fac.image} alt={fac.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
                <h4 className="relative z-10 text-white font-bold text-lg md:text-xl">{fac.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontak" className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-secondary font-semibold tracking-wider uppercase mb-3">Hubungi Kami</h2>
              <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6">Jadwalkan Kunjungan Anda</h3>
              <p className="text-gray-300 mb-10 text-lg">
                Tim sales kami siap membantu memberikan informasi lebih lanjut dan mendampingi Anda melihat show unit kami.
              </p>
              
              <div className="space-y-6">
                {contactPersons.map((person) => {
                  const message = encodeURIComponent(`Halo ${person.name}, saya ingin menjadwalkan kunjungan ke ${projectData.name}.`);
                  return (
                    <div key={person.id} className="flex items-center gap-6 bg-white/5 p-4 rounded-xl border border-white/10">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        <Image src={person.photo} alt={person.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg">{person.name}</h4>
                        <p className="text-sm text-secondary">{person.position}</p>
                      </div>
                      <Button variant="secondary" className="hidden sm:flex" asChild>
                        <a href={`https://wa.me/${person.whatsapp}?text=${message}`} target="_blank" rel="noopener noreferrer">
                          Chat WhatsApp
                        </a>
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="bg-white text-gray-900 p-8 rounded-xl shadow-2xl">
              <h4 className="font-bold text-2xl mb-6 font-serif text-primary">Request Informasi</h4>
              <form className="space-y-4" onSubmit={handleInquiry}>
                <div>
                  <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
                  <input name="name" required type="text" autoComplete="name" className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary" placeholder="Masukkan nama Anda" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Nomor WhatsApp</label>
                  <input name="phone" required type="tel" autoComplete="tel" className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary" placeholder="Contoh: 0812..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Tipe Rumah Diminati</label>
                  <select name="type" className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary bg-white">
                    <option value="">Pilih Tipe</option>
                    {propertyTypes.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                  </select>
                </div>
                <div><label className="block text-sm font-medium mb-1">Kisaran Budget</label><select name="budget" className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary bg-white"><option value="">Pilih kisaran budget</option><option>Di bawah Rp 750 juta</option><option>Rp 750 juta–Rp 1,2 miliar</option><option>Di atas Rp 1,2 miliar</option></select></div>
                <div><label className="block text-sm font-medium mb-1">Tanggal Kunjungan (opsional)</label><input name="visitDate" type="date" className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary" /></div>
                <Button type="submit" className="w-full mt-4 h-12 text-lg">Kirim Permintaan</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
