import { defineField, defineType } from "sanity";

const slug = (fieldName: string) => defineField({
  name: "slug",
  title: "Slug URL",
  type: "slug",
  options: { source: fieldName, maxLength: 96 },
  validation: (rule) => rule.required(),
});

const image = (name: string, title: string, required = false) => defineField({
  name,
  title,
  type: "image",
  options: { hotspot: true },
  validation: (rule) => required ? rule.required() : rule,
});

export const projectSchema = defineType({
  name: "project",
  title: "Informasi Proyek",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nama Proyek", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "description", title: "Deskripsi", type: "text", rows: 4 }),
    defineField({ name: "location", title: "Kota / Area", type: "string" }),
    defineField({ name: "address", title: "Alamat Lengkap", type: "string" }),
    defineField({ name: "developer", title: "Developer", type: "string" }),
    defineField({ name: "landArea", title: "Luas Kawasan", type: "string" }),
    defineField({ name: "unitCount", title: "Jumlah Unit", type: "string" }),
    defineField({ name: "constructionStatus", title: "Status Pembangunan", type: "string" }),
    image("heroImage", "Gambar Hero"),
    defineField({ name: "mapUrl", title: "Link Google Maps", type: "url" }),
    defineField({ name: "mapEmbedUrl", title: "URL Embed Google Maps", type: "url" }),
    defineField({ name: "whatsappNumber", title: "WhatsApp Utama (format internasional)", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
    defineField({ name: "facebook", title: "Facebook URL", type: "url" }),
    defineField({ name: "youtube", title: "YouTube URL", type: "url" }),
  ],
  preview: { select: { title: "name", subtitle: "location", media: "heroImage" } },
});

export const propertyTypeSchema = defineType({
  name: "propertyType",
  title: "Tipe Rumah",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nama Tipe", type: "string", validation: (rule) => rule.required() }),
    slug("name"),
    defineField({ name: "price", title: "Harga Mulai Dari", type: "string" }),
    defineField({ name: "landArea", title: "Luas Tanah (m²)", type: "number" }),
    defineField({ name: "buildingArea", title: "Luas Bangunan (m²)", type: "number" }),
    defineField({ name: "bedrooms", title: "Kamar Tidur", type: "number" }),
    defineField({ name: "bathrooms", title: "Kamar Mandi", type: "number" }),
    defineField({ name: "floors", title: "Jumlah Lantai", type: "number" }),
    defineField({ name: "carport", title: "Carport", type: "number" }),
    defineField({ name: "description", title: "Deskripsi", type: "text", rows: 4 }),
    defineField({ name: "specifications", title: "Spesifikasi Bangunan", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "images", title: "Foto Rumah", type: "array", of: [image("image", "Foto")], validation: (rule) => rule.min(1) }),
    image("floorPlan", "Denah Rumah"),
    defineField({ name: "status", title: "Status Ketersediaan", type: "string", options: { list: ["Available", "Limited", "Sold Out"] } }),
    defineField({ name: "featured", title: "Tampilkan sebagai tipe unggulan", type: "boolean", initialValue: false }),
  ],
  preview: { select: { title: "name", subtitle: "price", media: "images.0" } },
});

export const facilitySchema = defineType({
  name: "facility",
  title: "Fasilitas",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nama Fasilitas", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Deskripsi", type: "text", rows: 3 }),
    defineField({ name: "icon", title: "Nama Ikon Lucide", type: "string" }),
    image("image", "Foto Fasilitas"),
  ],
  preview: { select: { title: "name", subtitle: "description", media: "image" } },
});

export const articleSchema = defineType({
  name: "article",
  title: "Artikel",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Judul", type: "string", validation: (rule) => rule.required() }),
    slug("title"),
    defineField({ name: "excerpt", title: "Ringkasan", type: "text", rows: 3 }),
    defineField({ name: "content", title: "Isi Artikel", type: "text", rows: 12 }),
    image("coverImage", "Gambar Cover"),
    defineField({ name: "category", title: "Kategori", type: "string" }),
    defineField({ name: "author", title: "Penulis", type: "string" }),
    defineField({ name: "publishedAt", title: "Tanggal Terbit", type: "date" }),
    defineField({ name: "seoTitle", title: "SEO Title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO Description", type: "text", rows: 3 }),
    defineField({ name: "isPublished", title: "Tampilkan di situs", type: "boolean", initialValue: true }),
  ],
  preview: { select: { title: "title", subtitle: "category", media: "coverImage" } },
});

export const contactPersonSchema = defineType({
  name: "contactPerson",
  title: "Kontak Sales",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nama", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "position", title: "Jabatan", type: "string" }),
    image("photo", "Foto"),
    defineField({ name: "whatsapp", title: "WhatsApp (format internasional)", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
  ],
  preview: { select: { title: "name", subtitle: "position", media: "photo" } },
});

export const galleryItemSchema = defineType({
  name: "galleryItem",
  title: "Foto Galeri",
  type: "document",
  fields: [
    image("image", "Foto", true),
    defineField({ name: "category", title: "Kategori", type: "string", options: { list: ["Exterior", "Interior", "Siteplan", "Fasilitas", "Lingkungan", "Construction Progress"] }, validation: (rule) => rule.required() }),
    defineField({ name: "caption", title: "Keterangan Foto", type: "string" }),
    defineField({ name: "order", title: "Urutan", type: "number" }),
  ],
  preview: { select: { title: "caption", subtitle: "category", media: "image" } },
});

export const schemaTypes = [projectSchema, propertyTypeSchema, facilitySchema, articleSchema, contactPersonSchema, galleryItemSchema];
