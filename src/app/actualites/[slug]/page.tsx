import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { editorialArticles, getArticleBySlug } from "@/lib/editorial-content";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
 const { slug } = await params;
 const article = getArticleBySlug(slug);
 if (!article) return { title: "Article introuvable | Veille Ultime" };
 const title = article.seoTitle || article.title;
 const description = article.seoDescription || article.excerpt;
 const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://veille-ultime.vercel.app").replace(/\/$/, "");
 const url = `${baseUrl}/actualites/${article.slug}`;
 return { title, description, keywords: article.keywords ? article.keywords.split(",").map((keyword) => keyword.trim()) : undefined, alternates: { canonical: url }, openGraph: { type: "article", title, description, url, publishedTime: article.publishedAt, siteName: "Veille Ultime", locale: "fr_FR" }, twitter: { card: "summary", title, description } };
}

export function generateStaticParams() {
  return editorialArticles.map(({ slug }) => ({ slug }));
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
    <main className="container" style={{ paddingTop: 48, paddingBottom: 80, minHeight: "70vh", maxWidth: 980 }}>\n      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }} />
      <Link href="/actualites" className="text-link" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 34 }}><ArrowLeft size={14} /> Toutes les actualités</Link>
      <div className="section-kicker">{article.category} · {new Date(article.publishedAt + "T12:00:00Z").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</div>
      <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", lineHeight: 1.08, letterSpacing: "-.045em", margin: "16px 0 24px", maxWidth: 900 }}>{article.title}<span style={{ color: "#c5f441" }}>.</span></h1>
      <p style={{ color: "var(--muted, #a1a1aa)", fontSize: 20, lineHeight: 1.75, maxWidth: 820 }}>{article.excerpt}</p>
      <div className="disclaimer" style={{ marginTop: 26 }}><strong style={{ color: "#c5f441" }}>Source principale — </strong><a href={article.sourceUrl} target="_blank" rel="noreferrer" className="text-link">{article.sourceName} <ExternalLink size={12} style={{ display: "inline" }} /></a></div>
      <article style={{ maxWidth: 780, marginTop: 40 }}>
        {article.body.map((block, index) => {
          if (block.startsWith("## ")) return <h2 key={index} style={{ fontSize: 25, lineHeight: 1.3, margin: "30px 0 14px" }}>{block.slice(3)}</h2>;
          if (block.split("\n").every((line) => line.startsWith("- "))) return <ul key={index} style={{ paddingLeft: 22, color: "var(--muted, #c4c4cc)", fontSize: 17, lineHeight: 1.9, marginBottom: 22 }}>{block.split("\n").map((line) => <li key={line}>{line.slice(2)}</li>)}</ul>;
          const parts = block.split(/(\[[^\]]+\]\(https?:\/\/[^)]+\))/g);
          return <p key={index} style={{ color: "var(--muted, #c4c4cc)", fontSize: 17, lineHeight: 1.9, marginBottom: 22 }}>{parts.map((part, partIndex) => { const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/); return link ? <a key={partIndex} href={link[2]} target="_blank" rel="noreferrer" className="text-link">{link[1]}</a> : part; })}</p>;
        })}
        <section className="report-card" style={{ marginTop: 34 }}><h2 style={{ fontSize: 22, marginBottom: 18 }}>À retenir</h2><ul style={{ paddingLeft: 20, color: "var(--muted, #a1a1aa)", lineHeight: 1.9 }}>{article.takeaways.map((item) => <li key={item} style={{ marginBottom: 8 }}>{item}</li>)}</ul></section>
        <p style={{ color: "var(--muted, #a1a1aa)", fontSize: 13, lineHeight: 1.7, marginTop: 28 }}>Article de synthèse rédigé à partir de la source citée. Les recommandations générales ne remplacent pas l’avis de sécurité du fournisseur ni la vérification de l’environnement concerné.</p>
        <Link href="/actualites" className="button-secondary" style={{ marginTop: 20 }}>Retour aux actualités <ArrowLeft size={13} /></Link>
      </article>
    </main>
  );
}