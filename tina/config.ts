import { defineConfig } from "tinacms";

const branch =
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  process.env.GITHUB_HEAD_REF ||
  "main";

export default defineConfig({
  branch,
  clientId:
    process.env.NEXT_PUBLIC_TINA_CLIENT_ID ||
    "9defa199-0b2b-4d76-a29e-b6933007cfd4",
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "site",
        label: "Website Content",
        path: "content",
        format: "json",
        match: { include: "site" },
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: "object",
            name: "settings",
            label: "Site Settings",
            fields: [
              { type: "string", name: "name", label: "Artist name", required: true },
              { type: "string", name: "tagline", label: "Professional title", required: true },
              { type: "string", name: "email", label: "Email", required: true },
              { type: "string", name: "instagramUrl", label: "Instagram URL" },
              { type: "string", name: "instagramLabel", label: "Instagram label" },
              { type: "string", name: "location", label: "Location" },
            ],
          },
          {
            type: "object",
            name: "hero",
            label: "Homepage Hero",
            fields: [
              { type: "string", name: "eyebrow", label: "Location line" },
              { type: "string", name: "title", label: "Headline", ui: { component: "textarea" } },
              { type: "string", name: "intro", label: "Introduction", ui: { component: "textarea" } },
              { type: "image", name: "image", label: "Hero image" },
              { type: "string", name: "imageAlt", label: "Image description" },
              { type: "string", name: "captionTitle", label: "Caption title" },
              { type: "string", name: "captionMeta", label: "Caption details" },
              {
                type: "object",
                name: "facts",
                label: "Practice highlights",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.value || "Highlight" }) },
                fields: [
                  { type: "string", name: "value", label: "Value" },
                  { type: "string", name: "label", label: "Description" },
                ],
              },
            ],
          },
          { type: "string", name: "statement", label: "Artist statement", ui: { component: "textarea" } },
          {
            type: "object",
            name: "projects",
            label: "Selected Projects",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title || "Project" }) },
            fields: [
              { type: "string", name: "number", label: "Number / category" },
              { type: "string", name: "title", label: "Title", required: true },
              { type: "string", name: "meta", label: "Location / materials" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "image", name: "image", label: "Image" },
              { type: "string", name: "imageAlt", label: "Image description" },
              { type: "boolean", name: "featured", label: "Featured project" },
              {
                type: "object",
                name: "specs",
                label: "Project facts",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.label || "Fact" }) },
                fields: [
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "value", label: "Value" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "gallery",
            label: "Image Gallery",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label || "Gallery image" }) },
            fields: [
              { type: "image", name: "src", label: "Image", required: true },
              { type: "string", name: "alt", label: "Image description" },
              { type: "string", name: "label", label: "Caption" },
            ],
          },
          {
            type: "object",
            name: "process",
            label: "Process",
            fields: [
              { type: "string", name: "title", label: "Heading", ui: { component: "textarea" } },
              { type: "string", name: "lead", label: "Introduction", ui: { component: "textarea" } },
              {
                type: "object",
                name: "steps",
                label: "Steps",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.title || "Step" }) },
                fields: [
                  { type: "string", name: "number", label: "Number" },
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                ],
              },
              { type: "image", name: "mainImage", label: "Main process image" },
              { type: "string", name: "mainImageAlt", label: "Main image description" },
              { type: "image", name: "secondaryImage", label: "Secondary process image" },
              { type: "string", name: "secondaryImageAlt", label: "Secondary image description" },
            ],
          },
          {
            type: "object",
            name: "film",
            label: "Featured Film",
            fields: [
              { type: "string", name: "title", label: "Heading", ui: { component: "textarea" } },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "youtubeId", label: "YouTube video ID" },
            ],
          },
          {
            type: "object",
            name: "about",
            label: "Biography",
            fields: [
              { type: "string", name: "title", label: "Heading", ui: { component: "textarea" } },
              { type: "string", name: "lead", label: "Short biography", ui: { component: "textarea" } },
              { type: "string", name: "paragraphs", label: "Biography paragraphs", list: true, ui: { component: "textarea" } },
              { type: "image", name: "image", label: "Portrait" },
              { type: "string", name: "imageAlt", label: "Portrait description" },
              {
                type: "object",
                name: "recognition",
                label: "Credentials",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.name || "Credential" }) },
                fields: [
                  { type: "string", name: "name", label: "Organization" },
                  { type: "string", name: "detail", label: "Role / dates" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "press",
            label: "News + Press",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title || "Article" }) },
            fields: [
              { type: "string", name: "publication", label: "Publication" },
              { type: "string", name: "date", label: "Publication date" },
              { type: "string", name: "title", label: "Headline", required: true },
              { type: "string", name: "description", label: "Summary", ui: { component: "textarea" } },
              { type: "string", name: "url", label: "Article URL", required: true },
              { type: "boolean", name: "featured", label: "Featured article" },
            ],
          },
          {
            type: "object",
            name: "contact",
            label: "Contact Section",
            fields: [
              { type: "string", name: "eyebrow", label: "Section label" },
              { type: "string", name: "title", label: "Heading", ui: { component: "textarea" } },
              { type: "string", name: "buttonLabel", label: "Button label" },
            ],
          },
        ],
      },
    ],
  },
});


