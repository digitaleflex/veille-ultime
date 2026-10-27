import type { MetadataRoute } from "next";

const sections = ["actualites", "cybersecurite", "vulnerabilites", "developpement", "cloud-devops", "intelligence-artificielle", "open-source", "industrie-tech", "bilans", "sources", "methodologie"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://veille-ultime.vercel.app").replace(/\/$/, "");
  return [
    { url: baseUrl, changeFrequency: "daily", priority: 1 },
    ...sections.map((section) => ({ url: `${baseUrl}/${section}`, changeFrequency: "weekly" as const, priority: section === "actualites" ? 0.9 : 0.7 })),
  ];
}
