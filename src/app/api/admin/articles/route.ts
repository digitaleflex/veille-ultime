import { NextRequest, NextResponse } from "next/server";
import { isAdminSessionValid } from "@/lib/admin-session";
import { prisma } from "@/lib/prisma";
import { editorialCategories, editorialTags } from "@/config/source-catalog";

export const runtime = "nodejs";

function slugify(value: string) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 100);
}

export async function POST(request: NextRequest) {
  if (!(await isAdminSessionValid())) return NextResponse.json({ error: "Authentification requise." }, { status: 401 });

  const body = await request.json().catch(() => null);
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  const excerpt = typeof body?.excerpt === "string" ? body.excerpt.trim() : "";
  const content = typeof body?.content === "string" ? body.content.trim() : "";
  const category = typeof body?.category === "string" ? body.category : "";
  const tags = Array.isArray(body?.tags) ? body.tags.filter((tag: unknown): tag is string => typeof tag === "string" && (editorialTags as readonly string[]).includes(tag)) : [];
  const sourceLines = typeof body?.sources === "string" ? body.sources.split(/\r?\n/).map((line: string) => line.trim()).filter(Boolean) : [];

  if (title.length < 8 || title.length > 220 || excerpt.length < 20 || excerpt.length > 500 || content.length < 80 || content.length > 50000) {
    return NextResponse.json({ error: "Vérifie le titre (8–220 caractères), le résumé (20–500) et le contenu (80–50 000)." }, { status: 400 });
  }
  if (!(editorialCategories as readonly { slug: string }[]).some((item) => item.slug === category)) {
    return NextResponse.json({ error: "Catégorie non autorisée." }, { status: 400 });
  }
  if (sourceLines.length === 0 || sourceLines.length > 10 || sourceLines.some((url: string) => {
    try { const parsed = new URL(url); return parsed.protocol !== "https:" && parsed.protocol !== "http:"; } catch { return true; }
  })) return NextResponse.json({ error: "Ajoute entre 1 et 10 URL de références HTTP(S) valides." }, { status: 400 });

  const slugBase = slugify(title);
  const slug = slugBase + "-" + Math.random().toString(36).slice(2, 7);
  try {
    const article = await prisma.article.create({
      data: {
        slug, title, excerpt, content, category, tags: [...new Set(tags)],
        status: "DRAFT", readingMinutes: Math.max(1, Math.ceil(content.split(/\s+/).length / 200)),
        sources: {
          create: await Promise.all(sourceLines.map(async (url: string) => {
            const parsed = new URL(url);
            const source = await prisma.source.upsert({
              where: { url: parsed.origin },
              create: { name: parsed.hostname.replace(/^www\./, ""), url: parsed.origin, kind: "WEB", enabled: false, trustLevel: 3 },
              update: {},
            });
            return { url, title: parsed.hostname, source: { connect: { id: source.id } } };
          })),
        },
      },
      select: { id: true, slug: true, title: true, status: true },
    });
    return NextResponse.json({ ok: true, article }, { status: 201 });
  } catch (error) {
    console.error("Article draft creation failed", error);
    return NextResponse.json({ error: "Impossible de créer le brouillon. Vérifie la connexion à Neon et le schéma Prisma." }, { status: 500 });
  }
}
