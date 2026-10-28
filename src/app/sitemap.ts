import type { MetadataRoute } from "next";
import { editorialArticles } from "@/lib/editorial-content";

const sections = ["actualites", "cybersecurite", "vulnerabilites", "developpement", "cloud-devops", "intelligence-artificielle", "open-source", "industrie-tech", "bilans", "sources", "methodologie"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://veille-ultime.vercel.app").replace(/\/$/, "");
  const sectionEntries: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "daily", priority: 1 },
    ...sections.map((section) => ({ url: `${baseUrl}/${section}`, changeFrequency: "weekly" as const, priority: section === "actualites" ? 0.9 : 0.7 })),
  ];
  const articleEntries: MetadataRoute.Sitemap = editorialArticles.map((article) => ({
    url: `${baseUrl}/actualites/${article.slug}`,
    lastModified: new Date(`${article.publishedAt}T12:00:00.000Z`),
    changeFrequency: "monthly",
    priority: 0.75,
  }));
  return [...sectionEntries, ...articleEntries];
}
