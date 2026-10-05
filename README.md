# Perumahan by Duta Griya Idaman

Website pemasaran perumahan berbasis Next.js 14, React, TypeScript, Tailwind CSS, dan Vercel.

## Menjalankan secara lokal

```bash
pnpm install
pnpm dev
```

Perintah produksi:

```bash
pnpm build
pnpm start
```

Salin `.env.example` menjadi `.env.local`, lalu sesuaikan nilai konfigurasi.

## Konfigurasi

- `NEXT_PUBLIC_SITE_URL`: URL publik situs, misalnya domain production Vercel. Dipakai untuk metadata, `robots.txt`, dan sitemap.
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: nomor tujuan WhatsApp dalam format internasional tanpa tanda `+` atau spasi.
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: ID project Sanity untuk CMS dan admin `/studio`.
- `NEXT_PUBLIC_SANITY_DATASET`: dataset Sanity, default `production`.

Jangan menyimpan token atau credential rahasia di variabel `NEXT_PUBLIC_*`.

## Deploy ke Vercel

1. Push repository ini ke GitHub, GitLab, atau Bitbucket.
2. Import repository dari dashboard Vercel. Framework akan terdeteksi sebagai Next.js dan root directory tetap di root repository.
3. Tambahkan `NEXT_PUBLIC_SITE_URL` dan `NEXT_PUBLIC_WHATSAPP_NUMBER` pada Project Settings → Environment Variables.
4. Deploy branch production. Setiap push berikutnya akan membuat deployment otomatis.

Vercel App di Codex sudah terhubung ke akun, namun linking project Git baru dapat diselesaikan setelah repository remote tersedia.

## Admin konten

Admin konten berada di `/studio` dan menggunakan Sanity Studio. Login memakai akun Sanity yang diberi akses ke project; tidak ada kata sandi admin hard-coded di source website. Pengelola dapat mengubah nama brand/developer, tagline, narasi utama, gambar hero, alamat, telepon/WhatsApp, peta, tipe rumah, fasilitas, kontak sales, artikel, dan galeri.

1. Buat project dan dataset publik di [Sanity](https://www.sanity.io/manage).
2. Salin Project ID dan isi `NEXT_PUBLIC_SANITY_PROJECT_ID` serta `NEXT_PUBLIC_SANITY_DATASET` pada `.env.local` dan Vercel Project Settings → Environment Variables.
3. Di pengaturan API Sanity, tambahkan origin lokal `http://localhost:3000` dan domain production Vercel sebagai CORS origins. Aktifkan Allow credentials untuk kedua origin.
4. Jalankan ulang aplikasi/deploy, lalu buka `/studio` dan masuk dengan akun Sanity yang memiliki akses ke project.

Konten yang dipublish di Sanity langsung dipakai halaman publik. Dataset tetap public-read; jangan menaruh token tulis Sanity atau credential dalam `NEXT_PUBLIC_*`.

## Data contoh

### Memasukkan data contoh ke Sanity agar bisa diedit

Website memakai data contoh dari `src/data/cms.ts` jika dataset Sanity belum memiliki dokumen. Untuk menyalinnya ke Sanity satu kali, jalankan dari folder repository setelah dependencies terpasang dan login ke Sanity CLI:

```bash
pnpm install
pnpm exec sanity login
pnpm content:seed
```

Pastikan `.env.local` berisi `NEXT_PUBLIC_SANITY_PROJECT_ID` dan `NEXT_PUBLIC_SANITY_DATASET` untuk project yang benar. Perintah ini membuat dokumen yang belum ada dan mengunggah gambar contoh; dokumen yang sudah ada tidak ditimpa. Gambar lokal `floor-plan.svg` dilewati—unggah gambar denah pengganti lewat Studio bila diperlukan. Setelah selesai, buka `/studio`, edit data pada menu **Informasi Proyek**, **Tipe Rumah**, **Fasilitas**, **Kontak Sales**, **Artikel**, atau **Foto Galeri**, lalu klik **Publish**.

Konten contoh terpusat di `src/data/cms.ts`: proyek, tipe rumah, fasilitas, galeri, artikel, dan contact person. Gambar denah di `public/floor-plan.svg` adalah ilustrasi, bukan gambar teknis resmi. Ganti data contoh dan asset dengan materi proyek yang telah disetujui sebelum situs dipublikasikan.

Jika Project ID belum diisi, situs tetap menggunakan konten contoh di `src/data/cms.ts` dan `/studio` menampilkan instruksi konfigurasi.
