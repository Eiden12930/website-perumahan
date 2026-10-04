"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schema";

export default defineConfig({
  name: "grand-arunika",
  title: "Grand Arunika Residence — Admin",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "setup-required",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
