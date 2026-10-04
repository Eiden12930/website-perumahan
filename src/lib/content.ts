import { createClient } from "next-sanity";
import {
  articles as fallbackArticles,
  contactPersons as fallbackContactPersons,
  facilities as fallbackFacilities,
  gallery as fallbackGallery,
  projectData as fallbackProjectData,
  propertyTypes as fallbackPropertyTypes,
} from "@/data/cms";

export type SiteContent = {
  projectData: typeof fallbackProjectData;
  propertyTypes: typeof fallbackPropertyTypes;
  facilities: typeof fallbackFacilities;
  contactPersons: typeof fallbackContactPersons;
  articles: typeof fallbackArticles;
  gallery: typeof fallbackGallery;
};

export const fallbackContent: SiteContent = {
  projectData: fallbackProjectData,
  propertyTypes: fallbackPropertyTypes,
  facilities: fallbackFacilities,
  contactPersons: fallbackContactPersons,
  articles: fallbackArticles,
  gallery: fallbackGallery,
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const sanity = projectId
  ? createClient({ projectId, dataset, apiVersion: "2025-03-01", useCdn: true })
  : null;

const contentQuery = `{
  "project": *[_type == "project"] | order(_updatedAt desc)[0] {
    name, tagline, description, location, address, developer, landArea, unitCount, constructionStatus,
    mapUrl, mapEmbedUrl, whatsappNumber, email, instagram, facebook, youtube,
    "heroImage": heroImage.asset->url
  },
  "propertyTypes": *[_type == "propertyType"] | order(name asc) {
    "id": _id, name, "slug": slug.current, price, landArea, buildingArea, bedrooms, bathrooms, floors, carport,
    description, specifications, status, "images": images[].asset->url, "floorPlan": floorPlan.asset->url
  },
  "facilities": *[_type == "facility"] | order(name asc) {
    "id": _id, name, description, icon, "image": image.asset->url
  },
  "contactPersons": *[_type == "contactPerson"] | order(name asc) {
    "id": _id, name, position, "photo": photo.asset->url, whatsapp, email
  },
  "articles": *[_type == "article" && isPublished != false] | order(publishedAt desc) {
    "id": _id, title, "slug": slug.current, excerpt, content, "coverImage": coverImage.asset->url,
    category, author, publishedAt, seoTitle, "seoDescription": seoDescription
  },
  "gallery": *[_type == "galleryItem"] | order(order asc) {
    "id": _id, "image": image.asset->url, category, caption
  }
}`;

export async function getSiteContent(): Promise<SiteContent> {
  if (!sanity) return fallbackContent;

  try {
    const result = await sanity.fetch<Record<string, any>>(contentQuery, {}, { cache: "no-store" });
    const project = result.project;
    const projectData = project
      ? { ...fallbackProjectData, ...project, heroImage: project.heroImage || fallbackProjectData.heroImage, whatsappNumber: project.whatsappNumber || fallbackProjectData.whatsappNumber }
      : fallbackProjectData;
    const propertyTypes = (result.propertyTypes || []).filter((item: any) => item.slug && item.images?.[0]).map((item: any) => ({ ...item, floorPlan: item.floorPlan || "/floor-plan.svg", specifications: item.specifications || [] }));
    const facilities = (result.facilities || []).filter((item: any) => item.name && item.image);
    const contactPersons = (result.contactPersons || []).filter((item: any) => item.name && item.photo);
    const articles = (result.articles || []).filter((item: any) => item.slug && item.coverImage);
    const gallery = (result.gallery || []).filter((item: any) => item.image);

    return {
      projectData: projectData as SiteContent["projectData"],
      propertyTypes: (propertyTypes.length ? propertyTypes : fallbackPropertyTypes) as SiteContent["propertyTypes"],
      facilities: (facilities.length ? facilities : fallbackFacilities) as SiteContent["facilities"],
      contactPersons: (contactPersons.length ? contactPersons : fallbackContactPersons) as SiteContent["contactPersons"],
      articles: (articles.length ? articles : fallbackArticles) as SiteContent["articles"],
      gallery: (gallery.length ? gallery : fallbackGallery) as SiteContent["gallery"],
    };
  } catch (error) {
    console.error("Gagal mengambil konten Sanity; menggunakan data contoh.", error);
    return fallbackContent;
  }
}
