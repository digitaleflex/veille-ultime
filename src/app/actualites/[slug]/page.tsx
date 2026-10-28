import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { editorialArticles, getArticleBySlug } from "@/lib/editorial-content";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article introuvable | Veille Ultime" };
  const title = article.seoTitle || article.title;
  const description = article.seoDescription || article.excerpt;
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://veille-ultime.vercel.app").replace(/\/$/, "");
  const url = `${baseUrl}/actualites/${article.slug}`;
  return {
    title, description,
    keywords: article.keywords ? article.keywords.split(",").map((keyword) => keyword.trim()) : undefined,
    alternates: { canonical: url },
    openGraph: { type: "article", title, description, url, publishedTime: article.publishedAt, siteName: "Veille Ultime", locale: "fr_FR" },
    twitter: { card: "summary", title, description },
  };
}

export function generateStaticParams() {
  return editorialArticles.map(({ slug }) => ({ slug }));
}

/** Rend les principales syntaxes Markdown inline sans interpréter le HTML fourni dans le contenu. */
function renderInlineMarkdown(text: string): ReactNode[] {
  const tokenPattern = /(\[[^\]]+\]\(https?:\/\/[^\s)]+(?:\s+[^)]*)?\)|\*\*[^*]+\*\*|__[^_]+__|(?<!\*)\*[^*\n]+\*(?!\*)|(?<!_)_[^_\n]+_(?!_)|`[^`\n]+`|~~[^~]+~~)/g;
  return text.split(tokenPattern).filter(Boolean).map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)(?:\s+[^)]*)?\)$/);
    if (link) return <a key={index} href={link[2]} target="_blank" rel="noopener noreferrer" className="text-link">{link[1]}</a>;
    if ((part.startsWith("**") && part.endsWith("**")) || (part.startsWith("__") && part.endsWith("__"))) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if ((part.startsWith("*") && part.endsWith("*")) || (part.startsWith("_") && part.endsWith("_"))) return <em key={index}>{part.slice(1, -1)}</em>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={index} style={{ padding: "2px 6px", borderRadius: 5, background: "rgba(255,255,255,.08)", fontSize: ".9em" }}>{part.slice(1, -1)}</code>;
    if (part.startsWith("~~") && part.endsWith("~~")) return <del key={index}>{part.slice(2, -2)}</del>;
    return part;
  });
}

function renderMarkdownBlock(block: string, key: number): ReactNode {
  const trimmed = block.trim();
  if (/^#{1,6}\s/.test(trimmed)) {
    const level = trimmed.match(/^#+/)?.[0].length ?? 2;
    const heading = trimmed.replace(/^#{1,6}\s+/, "");
    const style = { lineHeight: 1.3, margin: "30px 0 14px", letterSpacing: "-.02em" };
    if (level === 1) return <h2 key={key} style={{ ...style, fontSize: 27 }}>{renderInlineMarkdown(heading)}</h2>;
    if (level === 2) return <h2 key={key} style={{ ...style, fontSize: 25 }}>{renderInlineMarkdown(heading)}</h2>;
    return <h3 key={key} style={{ ...style, fontSize: 21 }}>{renderInlineMarkdown(heading)}</h3>;
  }

  const lines = trimmed.split("\n");
  if (lines.every((line) => /^\s*[-*+]\s+/.test(line))) {
    return <ul key={key} style={{ paddingLeft: 24, color: "var(--muted, #c4c4cc)", fontSize: 17, lineHeight: 1.9, marginBottom: 22 }}>
      {lines.map((line, index) => <li key={index}>{renderInlineMarkdown(line.replace(/^\s*[-*+]\s+/, ""))}</li>)}
    </ul>;
  }
  if (lines.every((line) => /^\s*\d+[.)]\s+/.test(line))) {
    return <ol key={key} style={{ paddingLeft: 24, color: "var(--muted, #c4c4cc)", fontSize: 17, lineHeight: 1.9, marginBottom: 22 }}>
      {lines.map((line, index) => <li key={index}>{renderInlineMarkdown(line.replace(/^\s*\d+[.)]\s+/, ""))}</li>)}
    </ol>;
  }
  if (lines.every((line) => /^\s*>\s?/.test(line))) {
    return <blockquote key={key} style={{ margin: "0 0 22px", padding: "8px 18px", borderLeft: "3px solid #c5f441", color: "var(--muted, #c4c4cc)" }}>
      {lines.map((line) => line.replace(/^\s*>\s?/, "")).map((line, index) => <p key={index}>{renderInlineMarkdown(line)}</p>)}
    </blockquote>;
  }
  if (/^\`\`\`/.test(trimmed) && /\n\`\`\`$/.test(trimmed)) {
    const code = trimmed.replace(/^\`\`\`[^\n]*\n?/, "").replace(/\n?\`\`\`$/, "");
    return <pre key={key} style={{ overflowX: "auto", padding: 18, borderRadius: 10, background: "rgba(255,255,255,.06)", marginBottom: 22 }}><code>{code}</code></pre>;
  }
  return <p key={key} style={{ color: "var(--muted, #c4c4cc)", fontSize: 17, lineHeight: 1.9, marginBottom: 22 }}>{renderInlineMarkdown(trimmed.replace(/\n/g, " "))}</p>;
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://veille-ultime.vercel.app").replace(/\/$/, "");
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    inLanguage: "fr-FR",
    mainEntityOfPage: `${baseUrl}/actualites/${article.slug}`,
    publisher: { "@type": "Organization", name: "Veille Ultime", url: baseUrl },
    author: { "@type": "Organization", name: "Veille Ultime" },
  };

  return (
    <main className="container" style={{ paddingTop: 48, paddingBottom: 80, minHeight: "70vh", maxWidth: 980 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }} />
      <Link href="/actualites" className="text-link" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 34 }}><ArrowLeft size={14} /> Toutes les actualités</Link>
      <div className="section-kicker">{article.category} · {new Date(article.publishedAt + "T12:00:00Z").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</div>
      <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", lineHeight: 1.08, letterSpacing: "-.045em", margin: "16px 0 24px", maxWidth: 900 }}>{article.title}<span style={{ color: "#c5f441" }}>.</span></h1>
      <p style={{ color: "var(--muted, #a1a1aa)", fontSize: 20, lineHeight: 1.75, maxWidth: 820 }}>{article.excerpt}</p>
      <div className="disclaimer" style={{ marginTop: 26 }}><strong style={{ color: "#c5f441" }}>Source principale — </strong><a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-link">{article.sourceName} <ExternalLink size={12} style={{ display: "inline" }} /></a></div>
      <article style={{ maxWidth: 780, marginTop: 40 }}>
        {article.body.map((block, index) => renderMarkdownBlock(block, index))}
        <section className="report-card" style={{ marginTop: 34 }}><h2 style={{ fontSize: 22, marginBottom: 18 }}>À retenir</h2><ul style={{ paddingLeft: 20, color: "var(--muted, #a1a1aa)", lineHeight: 1.9 }}>{article.takeaways.map((item) => <li key={item} style={{ marginBottom: 8 }}>{renderInlineMarkdown(item)}</li>)}</ul></section>
        <p style={{ color: "var(--muted, #a1a1aa)", fontSize: 13, lineHeight: 1.7, marginTop: 28 }}>Article de synthèse rédigé à partir de la source citée. Les recommandations générales ne remplacent pas l’avis de sécurité du fournisseur ni la vérification de l’environnement concerné.</p>
        <Link href="/actualites" className="button-secondary" style={{ marginTop: 20 }}>Retour aux actualités <ArrowLeft size={13} /></Link>
      </article>
    </main>
  );
}
