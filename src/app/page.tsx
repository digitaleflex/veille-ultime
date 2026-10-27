import Link from "next/link";
import { ArrowDownRight, ArrowRight, AudioLines, Bot, Boxes, Braces, Clock3, ExternalLink, Fingerprint, Globe2, RadioTower, ShieldAlert, ShieldCheck, Sparkles, Terminal, Zap } from "lucide-react";

const categories = [
  { icon: ShieldCheck, title: "Cybersécurité", copy: "Menaces, incidents, défense et renseignement.", href: "/cybersecurite" },
  { icon: ShieldAlert, title: "Vulnérabilités", copy: "CVE, correctifs, sévérité et exploitation confirmée.", href: "/vulnerabilites" },
  { icon: Braces, title: "Développement", copy: "Frameworks, langages, outils et écosystèmes.", href: "/developpement" },
  { icon: Boxes, title: "Cloud & DevOps", copy: "Infrastructure, conteneurs, CI/CD et plateformes.", href: "/cloud-devops" },
  { icon: Bot, title: "Intelligence artificielle", copy: "Modèles, agents, usages et sécurité de l'IA.", href: "/intelligence-artificielle" },
  { icon: Terminal, title: "Open source", copy: "Projets, mainteneurs et chaîne logicielle.", href: "/open-source" },
  { icon: Globe2, title: "Industrie tech", copy: "Entreprises, stratégies et tendances mondiales.", href: "/industrie-tech" },
  { icon: AudioLines, title: "Bilans & analyses", copy: "Synthèses quotidiennes, hebdomadaires et mensuelles.", href: "/bilans" },
];

const latest = [
  { time: "À CONFIGURER", category: "Sources officielles", title: "Les flux de veille seront affichés ici après connexion des sources", description: "Aucun événement n'est présenté comme une actualité réelle tant que la collecte n'est pas activée.", label: "À venir", kind: "watch" },
  { time: "À CONFIGURER", category: "Vulnérabilités", title: "Suivi CVE, avis éditeurs et vulnérabilités exploitées", description: "Les identifiants, versions affectées et statuts d'exploitation devront être reliés à des références vérifiables.", label: "À venir", kind: "high" },
  { time: "À CONFIGURER", category: "Développement", title: "Sorties logicielles, correctifs et changements majeurs", description: "Les publications seront dédupliquées et horodatées avant toute synthèse éditoriale.", label: "À venir", kind: "watch" },
];

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
          <div className="header-meta"><span className="live-dot" /> PLATEFORME EN INITIALISATION</div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <div className="eyebrow"><RadioTower size={14} /> Veille technologique indépendante</div>
            <h1>L’essentiel de la tech.<br /><span>Sans le bruit.</span></h1>
            <p className="hero-copy">Cybersécurité, vulnérabilités, développement, cloud et IA : une veille structurée pour comprendre ce qui change, ce qui menace et ce qui compte vraiment.</p>
            <div className="hero-bottom">
              <Link href="/actualites" className="button-primary">Explorer la veille <ArrowRight size={15} /></Link>
              <Link href="/methodologie" className="button-secondary">Notre méthodologie <ArrowDownRight size={14} /></Link>
            </div>
            <div className="stats">
              <div className="stat"><strong>8 domaines</strong><span>Un panorama technologique organisé</span></div>
              <div className="stat"><strong>Sources citées</strong><span>Traçabilité avant interprétation</span></div>
              <div className="stat"><strong>3 rythmes</strong><span>Quotidien · hebdomadaire · mensuel</span></div>
            </div>
          </div>
        </section>

        <section className="content container">
          <div className="section-head"><div><div className="section-kicker">Point de départ</div><h2 className="section-title">À surveiller</h2></div><span className="text-link">Architecture éditoriale en cours</span></div>
          <div className="main-grid">
            <article className="feature-card">
              <div><span className="pill"><Sparkles size={11} style={{ display: "inline", marginRight: 5 }} /> Ligne éditoriale</span><h3>Comprendre l’information, pas seulement la faire défiler.</h3><p className="card-copy">Chaque publication devra répondre à trois questions : que s’est-il passé, pourquoi est-ce important, et que faut-il vérifier ou faire ensuite ?</p></div>
              <div className="card-footer"><span>VEILLE · CONTEXTE · IMPACT</span><span>01 / MÉTHODE</span></div>
            </article>
            <div className="side-stack">
              <article className="side-card"><div className="meta"><span className="category">01 / Sécurité</span><span>Priorité éditoriale</span></div><h3>Les vulnérabilités critiques méritent des sources, pas des suppositions.</h3><p>CVSS, produits affectés, correctifs et exploitation seront renseignés uniquement lorsque les références les confirment.</p></article>
              <article className="side-card"><div className="meta"><span className="category">02 / Analyse</span><span>Contexte utile</span></div><h3>Des synthèses qui séparent les faits de l’interprétation.</h3><p>Les bilans mettront en avant les tendances et leur impact concret pour les équipes techniques.</p></article>
            </div>
          </div>

          <div className="section-head" style={{ marginTop: 38 }}><div><div className="section-kicker">Explorer par thème</div><h2 className="section-title">Les domaines de veille</h2></div><span className="text-link">8 rubriques</span></div>
          <div className="category-grid">
            {categories.map(({ icon: Icon, title, copy, href }) => <Link className="category-card" href={href} key={title}><span className="category-symbol"><Icon size={17} /></span><h3>{title}</h3><p>{copy}</p></Link>)}
          </div>

          <div className="lower-grid">
            <section>
              <div className="section-head"><div><div className="section-kicker">Flux éditorial</div><h2 className="section-title">Dernières publications</h2></div><Link href="/actualites" className="text-link">Voir tout <ArrowRight size={12} style={{ display: "inline" }} /></Link></div>
              <div className="article-list">
                {latest.map((item) => <article className="article-row" key={item.title}><div className="article-time">{item.time}</div><div><div className="meta"><span className="category">{item.category}</span></div><h3>{item.title}</h3><p>{item.description}</p></div><span className={`severity ${item.kind === "high" ? "severity-high" : "severity-watch"}`}>{item.label}</span></article>)}
              </div>
            </section>
            <aside>
              <div className="section-head"><div><div className="section-kicker">Lecture stratégique</div><h2 className="section-title">Bilans</h2></div></div>
              <div className="report-card"><span className="pill"><Clock3 size={11} style={{ display: "inline", marginRight: 5 }} /> À venir</span><h3>Des synthèses utiles pour décider.</h3><p>Les rapports seront générés à partir des articles vérifiés de la période, avec liens vers les sources et méthode de classement explicitée.</p><div className="report-line"><span>Brief quotidien</span><span>À configurer</span></div><div className="report-line"><span>Récapitulatif hebdomadaire</span><span>À configurer</span></div><div className="report-line"><span>Bilan mensuel</span><span>À configurer</span></div><Link href="/bilans" className="button-secondary" style={{ marginTop: 12 }}>Découvrir les bilans <ArrowRight size={13} /></Link></div>
            </aside>
          </div>
          <div className="disclaimer"><strong style={{ color: "#c5f441" }}>État du projet — </strong>interface de démarrage. Les éléments de cette page décrivent la structure éditoriale prévue, pas un flux d’actualités opérationnel. La collecte automatique, la base de données et la validation éditoriale restent à connecter.</div>
        </section>
      </main>
      <footer className="footer"><div className="container footer-inner"><Link href="/" className="brand"><span className="brand-mark">V.</span><span>VEILLE <em>ULTIME</em></span></Link><span>Une information sourcée. Une analyse explicite. Pas de faits inventés.</span><Link href="/methodologie" className="text-link">Lire la méthodologie <ExternalLink size={11} style={{ display: "inline" }} /></Link></div></footer>
    </div>
  );
}
