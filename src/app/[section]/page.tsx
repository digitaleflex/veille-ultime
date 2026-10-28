import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, ExternalLink, ShieldAlert } from "lucide-react";
import { editorialArticles } from "@/lib/editorial-content";

const sections: Record<string, { title: string; eyebrow: string; intro: string; focus: string[] }> = {
  actualites: { title: "Actualités", eyebrow: "Le fil de veille", intro: "Les publications présentes dans le corpus éditorial, avec leur date, leur résumé et leur source.", focus: ["Dates et sources conservées", "Résumé factuel et contexte", "Liens directs vers les références"] },
  cybersecurite: { title: "Cybersécurité", eyebrow: "Menaces & défense", intro: "Articles liés aux vulnérabilités, à la réponse aux incidents, à la sécurité des applications et à la défense des systèmes.", focus: ["Sources et avis de sécurité", "Mesures de réduction du risque", "Distinction entre fait confirmé et analyse"] },
  vulnerabilites: { title: "Vulnérabilités", eyebrow: "CVE & avis de sécurité", intro: "Publications relatives aux vulnérabilités, aux versions corrigées, à la sévérité et aux priorités de remédiation.", focus: ["Identifiants et avis lorsque disponibles", "Versions à vérifier auprès des éditeurs", "Exploitation confirmée distincte du risque théorique"] },
  developpement: { title: "Développement", eyebrow: "Outils & écosystèmes", intro: "Évolutions des langages, plateformes de développement, outils d’ingénierie et pratiques de livraison logicielle.", focus: ["Annonces et documentation éditeur", "Compatibilité et migration", "Impacts sur les équipes techniques"] },
  "cloud-devops": { title: "Cloud & DevOps", eyebrow: "Infrastructure & livraison", intro: "Sécurité et fiabilité opérationnelle, chaînes CI/CD, observabilité, TLS, sauvegardes et infrastructure.", focus: ["Sécurité et fiabilité", "Contrôles CI/CD et gestion des secrets", "Actions opérationnelles vérifiables"] },
  "intelligence-artificielle": { title: "Intelligence artificielle", eyebrow: "Modèles, agents & sécurité", intro: "Modèles, agents, outils d’IA appliquée et sécurité des workflows assistés par intelligence artificielle.", focus: ["Annonces rattachées à leurs sources", "Capacités et limites contextualisées", "Permissions et supervision des agents"] },
  "open-source": { title: "Open source", eyebrow: "Logiciels & supply chain", intro: "Dépendances, outils de développement, projets et pratiques de sécurisation de la chaîne logicielle.", focus: ["Sources primaires et changelogs", "SBOM et dépendances", "Maintenance et provenance logicielle"] },
  "industrie-tech": { title: "Industrie tech", eyebrow: "Entreprises & tendances", intro: "Annonces d’entreprises et tendances technologiques lorsque le corpus contient des éléments vérifiables.", focus: ["Annonces attribuées à leurs auteurs", "Contexte industriel explicite", "Conséquences étayées pour les professionnels"] },
  bilans: { title: "Bilans & analyses", eyebrow: "Vue du corpus", intro: "Une vue factuelle des publications présentes dans le dépôt, sans prétendre à une collecte exhaustive ni à des statistiques d’audience.", focus: ["Volume réel des articles publiés", "Répartition par catégorie", "Dates et sources consultables"] },
  sources: { title: "Sources", eyebrow: "Traçabilité éditoriale", intro: "Les références citées par les articles actuellement présents dans le corpus.", focus: ["Liens issus des métadonnées des articles", "Sources répétées regroupées", "Accès à la publication d’origine"] },
  methodologie: { title: "Méthodologie", eyebrow: "Cadre éditorial", intro: "La veille doit permettre de remonter de chaque synthèse vers une source, de distinguer les faits de l’analyse et de signaler les limites des informations disponibles.", focus: ["Ne pas publier de CVE ni de version sans référence vérifiable", "Distinguer date de publication et date de l’événement", "Réexaminer les informations sensibles auprès de la source primaire"] },
};

const terms: Record<string, string[]> = {
  cybersecurite: ["sécurité", "cyber", "secret", "vulnérabil", "attaque", "incident", "zero trust", "owasp", "cve", "tls", "sauvegarde", "pipeline", "cloud"],
  vulnerabilites: ["cve", "vulnérabil", "correctif", "sécurité", "kev", "faille", "rce", "tls"],
  developpement: ["développement", "github", "node.js", "php", "copilot", "code", "web", "seo", "api", "websocket", "webassembly"],
  "cloud-devops": ["cloud", "devops", "pipeline", "ci/cd", "observabilité", "sauvegarde", "tls", "infrastructure", "déploiement"],
  "intelligence-artificielle": ["ia", "intelligence artificielle", "gpt", "copilot", "agent", "mcp", "modèle", "openai", "autofix", "décisions api"],
  "open-source": ["open source", "dépendance", "sbom", "github", "npm", "node.js", "mcp"],
  "industrie-tech": ["industrie", "marché", "stratégie d'entreprise", "acquisition"],
};

export function generateStaticParams() {
  return Object.keys(sections).map((section) => ({ section }));
}

function articleMatches(section: string, article: (typeof editorialArticles)[number]) {
  if (["bilans", "methodologie", "sources"].includes(section)) return true;
  const keywords = terms[section];
  if (!keywords) return false;
  const searchable = [article.category, article.title, article.excerpt, ...article.body].join(" ").toLocaleLowerCase("fr");
  return keywords.some((term) => searchable.includes(term));
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const data = sections[section];
  if (!data) notFound();

  const articles = editorialArticles.filter((article) => articleMatches(section, article));
  const sourceGroups = section === "sources"
    ? [...new Map(editorialArticles.map((article) => [article.sourceUrl, { name: article.sourceName, url: article.sourceUrl, count: editorialArticles.filter((item) => item.sourceUrl === article.sourceUrl).length }])).values()].sort((a, b) => a.name.localeCompare(b.name, "fr"))
    : [];

  return (
    <main className="container" style={{ paddingTop: 56, paddingBottom: 80, minHeight: "70vh" }}>
      <Link href="/" className="text-link" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 34 }}><ArrowLeft size={14} /> Retour à l’accueil</Link>
      <div className="section-kicker">{data.eyebrow}</div>
      <h1 style={{ fontSize: "clamp(2.6rem, 7vw, 5.5rem)", lineHeight: 1, letterSpacing: "-.06em", margin: "14px 0 22px", maxWidth: 900 }}>{data.title}<span style={{ color: "#c5f441" }}>.</span></h1>
      <p style={{ color: "var(--muted, #a1a1aa)", fontSize: 18, lineHeight: 1.8, maxWidth: 760 }}>{data.intro}</p>

      {section === "sources" ? <section style={{ marginTop: 38 }}>
        <div className="section-head"><div><div className="section-kicker">Références citées</div><h2 className="section-title">{sourceGroups.length} sources distinctes</h2></div></div>
        <div className="article-list">
          {sourceGroups.map((source) => <article className="article-row" key={source.url}><div className="article-time">{source.count} article{source.count > 1 ? "s" : ""}</div><div><h3>{source.name}</h3><p>{source.url}</p></div><a href={source.url} target="_blank" rel="noopener noreferrer" className="text-link">Ouvrir <ExternalLink size={12} style={{ display: "inline" }} /></a></article>)}
        </div>
      </section> : section === "bilans" ? <section style={{ marginTop: 38 }}>
        <div className="main-grid">
          <div className="feature-card"><div><span className="pill">Corpus éditorial</span><h2 style={{ fontSize: 30, marginTop: 18 }}>{editorialArticles.length} articles référencés</h2><p className="card-copy">Ce chiffre est calculé à partir des articles chargés par l’application. Il ne représente ni le nombre total d’actualités disponibles dans le monde ni une collecte automatique.</p></div><div className="card-footer"><span>PUBLICATION LA PLUS RÉCENTE</span><span>{editorialArticles[0]?.publishedAt ?? "—"}</span></div></div>
          <aside className="report-card"><span className="pill">Répartition vérifiable</span><h3>Articles par catégorie</h3>{[...new Set(editorialArticles.map((article) => article.category))].sort((a,b)=>a.localeCompare(b,"fr")).map((category) => <div className="report-line" key={category}><span>{category}</span><strong>{editorialArticles.filter((article) => article.category === category).length}</strong></div>)}</aside>
        </div>
      </section> : null}

      {section !== "sources" && <section style={{ marginTop: 38 }}>
        <div className="section-head"><div><div className="section-kicker">{section === "methodologie" ? "Exemples issus du corpus" : "Articles correspondants"}</div><h2 className="section-title">{section === "methodologie" ? "Publications consultables" : `${articles.length} publication${articles.length === 1 ? "" : "s"} correspondante${articles.length === 1 ? "" : "s"}`}</h2></div><Link href="/actualites" className="text-link">Toutes les actualités <ArrowRight size={12} style={{ display: "inline" }} /></Link></div>
        {articles.length ? <div className="article-list">
          {articles.map((article) => <article className="article-row" key={article.slug}><div className="article-time">{new Date(article.publishedAt + "T12:00:00Z").toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })}</div><div><div className="meta"><span className="category">{article.category}</span><span>{article.readingMinutes} min de lecture</span></div><h3><Link href={"/actualites/" + article.slug} className="article-title-link">{article.title}</Link></h3><p>{article.excerpt}</p><a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-link" style={{ display: "inline-flex", alignItems: "center", gap: 5, marginTop: 9 }}>Source : {article.sourceName} <ExternalLink size={12} /></a></div></article>)}
        </div> : <div className="report-card"><span className="pill"><ShieldAlert size={12} style={{ display: "inline", marginRight: 6 }} /> Pas de publication correspondante</span><h3>Aucun article ne correspond encore à cette rubrique.</h3><p>Je préfère afficher cette absence plutôt que d’inventer des actualités. Consulte les <Link href="/actualites" className="text-link">publications disponibles</Link> et leurs sources.</p></div>}
      </section>}

      <aside className="report-card" style={{ marginTop: 34 }}>
        <span className="pill"><BookOpen size={12} style={{ display: "inline", marginRight: 6 }} /> Cadre éditorial</span>
        <ul style={{ paddingLeft: 18, color: "var(--muted, #a1a1aa)", lineHeight: 1.9, marginTop: 20 }}>{data.focus.map((item) => <li key={item}>{item}</li>)}</ul>
        <Link href="/methodologie" className="button-secondary" style={{ marginTop: 14 }}>Lire la méthodologie <ArrowRight size={13} /></Link>
      </aside>
      <div className="disclaimer" style={{ marginTop: 24 }}><strong style={{ color: "#c5f441" }}>Transparence — </strong>cette page présente les données effectivement disponibles dans le dépôt. Une rubrique vide signifie qu’aucun article du corpus actuel ne lui a été associé ; cela ne signifie pas qu’aucun événement n’existe dans le secteur.</div>
    </main>
  );
}
