import { getCliClient } from "sanity/cli";
import {
  articles,
  contactPersons,
  facilities,
  gallery,
  projectData,
  propertyTypes,
} from "../src/data/cms";

const client = getCliClient().withConfig({ apiVersion: "2025-03-01", useCdn: false });
const uploadedImages = new Map<string, { _type: "reference"; _ref: string }>();

async function uploadImage(url: string, label: string) {
  const cached = uploadedImages.get(url);
  if (cached) return cached;

  if (!url.startsWith("https://")) {
    throw new Error(`Gambar lokal tidak dapat diimpor otomatis (${label}: ${url}). Unggah ulang gambar ini lewat Studio.`);
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Gagal mengambil gambar ${label}: HTTP ${response.status}`);

  const asset = await client.assets.upload("image", Buffer.from(await response.arrayBuffer()), {
    filename: `${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.jpg`,
  });
  const reference = { _type: "reference" as const, _ref: asset._id };
  uploadedImages.set(url, reference);
  return reference;
}

async function saveIfMissing(document: { _id: string; _type: string; [key: string]: unknown }) {
  const existing = await client.fetch<number>("count(*[_id == $id])", { id: document._id });
  if (existing > 0) return false;
  await client.createIfNotExists(document as never);
  return true;
}

async function main() {
  let created = 0;
  let alreadyExisted = 0;

  const project = {
    _id: "project-duta-griya-idaman",
    _type: "project",
    ...projectData,
    heroImage: { _type: "image", asset: await uploadImage(projectData.heroImage, "hero") },
  };
  (await saveIfMissing(project)) ? created++ : alreadyExisted++;

  for (const item of propertyTypes) {
    const document = {
      _id: `property-type-${item.slug}`,
      _type: "propertyType",
      name: item.name,
      slug: { _type: "slug", current: item.slug },
      price: item.price,
      landArea: item.landArea,
      buildingArea: item.buildingArea,
      bedrooms: item.bedrooms,
      bathrooms: item.bathrooms,
      floors: item.floors,
      carport: item.carport,
      description: item.description,
      specifications: item.specifications,
      status: item.status,
      featured: false,
      images: await Promise.all(item.images.map(async (url, index) => ({
        _type: "image",
        _key: `photo-${index + 1}`,
        asset: await uploadImage(url, `${item.slug}-foto-${index + 1}`),
      }))),
    };
    (await saveIfMissing(document)) ? created++ : alreadyExisted++;
  }

  for (const item of facilities) {
    const document = {
      _id: `facility-${String(item.name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/g, "")}`,
      _type: "facility",
      name: item.name,
      icon: item.icon,
      description: "",
      image: { _type: "image", asset: await uploadImage(item.image, `fasilitas-${item.name}`) },
    };
    (await saveIfMissing(document)) ? created++ : alreadyExisted++;
  }

  for (const item of contactPersons) {
    const document = {
      _id: `contact-${item.id}`,
      _type: "contactPerson",
      name: item.name,
      position: item.position,
      whatsapp: item.whatsapp,
      email: item.email,
      photo: { _type: "image", asset: await uploadImage(item.photo, `kontak-${item.name}`) },
    };
    (await saveIfMissing(document)) ? created++ : alreadyExisted++;
  }

  for (const item of articles) {
    const document = {
      _id: `article-${item.slug}`,
      _type: "article",
      title: item.title,
      slug: { _type: "slug", current: item.slug },
      excerpt: item.excerpt,
      content: item.content,
      category: item.category,
      author: item.author,
      publishedAt: item.publishedAt,
      seoTitle: item.seoTitle,
      seoDescription: item.seoDescription,
      isPublished: true,
      coverImage: { _type: "image", asset: await uploadImage(item.coverImage, `artikel-${item.slug}`) },
    };
    (await saveIfMissing(document)) ? created++ : alreadyExisted++;
  }

  let skippedLocalImages = 0;
  for (const [index, item] of gallery.entries()) {
    if (!item.image.startsWith("https://")) {
      skippedLocalImages++;
      console.log(`Lewati gambar lokal "${item.caption}"; unggah gambar pengganti lewat Studio.`);
      continue;
    }

    const document = {
      _id: `gallery-${item.id}`,
      _type: "galleryItem",
      category: item.category,
      caption: item.caption,
      order: index + 1,
      image: { _type: "image", asset: await uploadImage(item.image, `galeri-${item.id}`) },
    };
    (await saveIfMissing(document)) ? created++ : alreadyExisted++;
  }

  console.log(`Selesai. Dokumen baru: ${created}; sudah ada dan tidak diubah: ${alreadyExisted}; gambar lokal dilewati: ${skippedLocalImages}.`);
  console.log(`Project: ${client.config().projectId}; dataset: ${client.config().dataset}.`);
  console.log("Buka /studio, edit dokumen, lalu klik Publish. Jalankan script ini lagi aman; dokumen yang sudah ada tidak ditimpa.");
}

main().catch((error) => {
  console.error("Impor konten gagal:", error);
  process.exitCode = 1;
});
