import Link from "next/link";
import { ArrowRight, AudioLines, Bot, Boxes, Braces, Clock3, ExternalLink, Globe2, RadioTower, ShieldAlert, ShieldCheck, Terminal } from "lucide-react";
import { editorialArticles } from "@/lib/editorial-content";

const categories = [
  { icon: ShieldCheck, title: "Cybersécurité", copy: "Menaces, incidents, défense et renseignement.", href: "/cybersecurite" },
  { icon: ShieldAlert, title: "Vulnérabilités", copy: "CVE, correctifs, sévérité et exploitation confirmée.", href: "/vulnerabilites" },
  { icon: Braces, title: "Développement", copy: "Frameworks, langages, outils et écosystèmes.", href: "/developpement" },
  { icon: Boxes, title: "Cloud & DevOps", copy: "Infrastructure, conteneurs, CI/CD et plateformes.", href: "/cloud-devops" },
  { icon: Bot, title: "Intelligence artificielle", copy: "Modèles, agents, usages et sécurité de l'IA.", href: "/intelligence-artificielle" },
  { icon: Terminal, title: "Open source", copy: "Projets, mainteneurs et chaîne logicielle.", href: "/open-source" },
  { icon: Globe2, title: "Industrie tech", copy: "Entreprises, stratégies et tendances mondiales.", href: "/industrie-tech" },
  { icon: AudioLines, title: "Bilans & analyses", copy: "Vue d'ensemble du corpus réellement publié.", href: "/bilans" },
];

const latest = editorialArticles.slice(0, 4);
const featured = latest[0];
const categoryCount = new Set(editorialArticles.map((article) => article.category)).size;
const latestDate = editorialArticles[0]?.publishedAt;
const formattedLatestDate = latestDate
  ? new Date(latestDate + "T12:00:00Z").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
  : "Aucune publication";

export default function Home() {
  return (
    <div className="site-shell">
      <div className="topline" />
      <header className="header">
        <div className="container header-inner">
          <Link href="/" className="brand" aria-label="Veille Ultime, accueil"><span className="brand-mark">V.</span><span>VEILLE <em>ULTIME</em></span></Link>
          <nav className="nav" aria-label="Navigation principale">
            <Link href="/actualites">Actualités</Link><Link href="/cybersecurite">Cyber</Link><Link href="/vulnerabilites">CVE & alertes</Link><Link href="/bilans">Bilans</Link><Link href="/methodologie">Méthodologie</Link>
          </nav>
          <div className="header-meta"><span className="live-dot" /> VEILLE ÉDITORIALE</div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <div className="eyebrow"><RadioTower size={14} /> Veille technologique indépendante</div>
            <h1>L’essentiel de la tech.<br /><span>Sans le bruit.</span></h1>
            <p className="hero-copy">Cybersécurité, vulnérabilités, développement, cloud et IA : une veille structurée pour comprendre ce qui change, ce qui menace et ce qui compte vraiment. Chaque article renvoie vers sa source pour permettre la vérification.</p>
            <div className="hero-bottom">
              <Link href="/actualites" className="button-primary">Explorer la veille <ArrowRight size={15} /></Link>
              <Link href="/methodologie" className="button-secondary">Notre méthodologie <ArrowRight size={14} /></Link>
            </div>
            <div className="stats">
              <div className="stat"><strong>{editorialArticles.length} articles</strong><span>Publications présentes dans le dépôt</span></div>
              <div className="stat"><strong>{categoryCount} catégories</strong><span>Catégories réellement utilisées</span></div>
              <div className="stat"><strong>{formattedLatestDate}</strong><span>Date la plus récente du corpus</span></div>
            </div>
          </div>
        </section>

        <section className="content container">
          <div className="section-head"><div><div className="section-kicker">Publication la plus récente</div><h2 className="section-title">À la une</h2></div><Link href="/actualites" className="text-link">Toutes les publications <ArrowRight size={12} style={{ display: "inline" }} /></Link></div>
          {featured ? <div className="main-grid">
            <article className="feature-card">
              <div><span className="pill">{featured.category}</span><h3><Link href={"/actualites/" + featured.slug}>{featured.title}</Link></h3><p className="card-copy">{featured.excerpt}</p><Link href={"/actualites/" + featured.slug} className="button-primary" style={{ marginTop: 12 }}>Lire l’article <ArrowRight size={14} /></Link></div>
              <div className="card-footer"><span>DATE DE PUBLICATION</span><span>{formattedLatestDate}</span></div>
            </article>
            <div className="side-stack">
              {latest.slice(1, 3).map((article) => <article className="side-card" key={article.slug}><div className="meta"><span className="category">{article.category}</span><span>{new Date(article.publishedAt + "T12:00:00Z").toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}</span></div><h3><Link href={"/actualites/" + article.slug}>{article.title}</Link></h3><p>{article.excerpt}</p></article>)}
            </div>
          </div> : <div className="report-card"><h3>Aucun article publié</h3><p>Le corpus ne contient actuellement aucune publication exploitable.</p></div>}

          <div className="section-head" style={{ marginTop: 38 }}><div><div className="section-kicker">Explorer par thème</div><h2 className="section-title">Les domaines de veille</h2></div><span className="text-link">{categories.length} rubriques</span></div>
          <div className="category-grid">
            {categories.map(({ icon: Icon, title, copy, href }) => <Link className="category-card" href={href} key={title}><span className="category-symbol"><Icon size={17} /></span><h3>{title}</h3><p>{copy}</p></Link>)}
          </div>

          <div className="lower-grid">
            <section>
              <div className="section-head"><div><div className="section-kicker">Flux éditorial</div><h2 className="section-title">Dernières publications</h2></div><Link href="/actualites" className="text-link">Voir tout <ArrowRight size={12} style={{ display: "inline" }} /></Link></div>
              <div className="article-list">
                {latest.map((article) => <article className="article-row" key={article.slug}><div className="article-time">{new Date(article.publishedAt + "T12:00:00Z").toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}</div><div><div className="meta"><span className="category">{article.category}</span><span>{article.readingMinutes} min</span></div><h3><Link href={"/actualites/" + article.slug}>{article.title}</Link></h3><p>{article.excerpt}</p></div><span className="severity severity-watch">Source citée</span></article>)}
              </div>
            </section>
            <aside>
              <div className="section-head"><div><div className="section-kicker">Transparence</div><h2 className="section-title">Repères du corpus</h2></div></div>
              <div className="report-card"><span className="pill"><Clock3 size={11} style={{ display: "inline", marginRight: 5 }} /> Données du dépôt</span><h3>Des informations vérifiables.</h3><p>Les compteurs ci-dessous sont calculés à partir des articles présents dans le dépôt, pas d'estimations d'audience ou de collecte automatique.</p><div className="report-line"><span>Articles disponibles</span><strong>{editorialArticles.length}</strong></div><div className="report-line"><span>Catégories éditoriales</span><strong>{categoryCount}</strong></div><div className="report-line"><span>Dernière date publiée</span><strong>{latestDate ?? "—"}</strong></div><Link href="/sources" className="button-secondary" style={{ marginTop: 12 }}>Consulter les sources <ExternalLink size={13} /></Link></div>
            </aside>
          </div>
          <div className="disclaimer"><strong style={{ color: "#c5f441" }}>Périmètre — </strong>cette version présente les articles effectivement versionnés dans le dépôt. Elle ne prétend pas effectuer une collecte automatique en temps réel. Les dates, résumés et liens doivent être vérifiés auprès des sources citées avant toute décision opérationnelle.</div>
        </section>
      </main>
      <footer className="footer"><div className="container footer-inner"><Link href="/" className="brand"><span className="brand-mark">V.</span><span>VEILLE <em>ULTIME</em></span></Link><span>Une information sourcée. Une analyse explicite. Pas de faits inventés.</span><Link href="/methodologie" className="text-link">Lire la méthodologie <ExternalLink size={11} style={{ display: "inline" }} /></Link></div></footer>
    </div>
  );
}
