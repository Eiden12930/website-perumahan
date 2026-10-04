import StudioClient from "./StudioClient";

export const metadata = {
  title: "Admin Konten | Perumahan by Duta Griya Idaman",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <main className="min-h-screen bg-[#f4f1eb] px-6 py-16 text-[#1c2c39]">
        <section className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-xl md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9b805c]">Pengaturan satu kali</p>
          <h1 className="mt-3 font-serif text-3xl font-bold">Hubungkan Sanity untuk membuka admin</h1>
          <p className="mt-5 leading-7 text-slate-600">Buat project di Sanity, lalu masukkan project ID ke environment variable <code className="rounded bg-slate-100 px-2 py-1">NEXT_PUBLIC_SANITY_PROJECT_ID</code>. Dataset default adalah <code className="rounded bg-slate-100 px-2 py-1">production</code>. Tambahkan URL situs ini ke CORS Origins di pengaturan API Sanity dan aktifkan Allow credentials.</p>
          <p className="mt-4 leading-7 text-slate-600">Salin konfigurasi dari <code className="rounded bg-slate-100 px-2 py-1">.env.example</code>. Setelah diset, redeploy aplikasi dan buka kembali <code className="rounded bg-slate-100 px-2 py-1">/studio</code>.</p>
        </section>
      </main>
    );
  }

  return <StudioClient />;
}
