"use client";

// Конфигурация на Sanity Studio, което се хоства на /studio.
// Схемата засега е празна (types: []) — само инсталация на този етап.

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool(),
    // Vision — инструмент за тестване на GROQ заявки вътре в Studio.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
