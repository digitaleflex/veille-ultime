import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, ShieldAlert } from "lucide-react";

const sections: Record<string, { title: string; eyebrow: string; intro: string; focus: string[] }> = {
  actualites: { title: "Actualités", eyebrow: "Le fil de veille", intro: "Les informations technologiques seront publiées ici après collecte, déduplication et vérification éditoriale.", focus: ["Sources et dates de publication conservées", "Résumé factuel et contexte séparés", "Liens directs vers les références originales"] },
  cybersecurite: { title: "Cybersécurité", eyebrow: "Menaces & défense", intro: "Incidents, campagnes, stratégies de défense et renseignements de sécurité documentés par des sources vérifiables.", focus: ["Incidents confirmés et chronologies", "Conseils de réduction du risque", "Références CERT et avis officiels"] },
  vulnerabilites: { title: "Vulnérabilités", eyebrow: "CVE & avis de sécurité", intro: "Un suivi structuré des vulnérabilités, de leur sévérité, des produits affectés et des correctifs disponibles.", focus: ["Identifiant CVE ou GHSA vérifiable", "Versions affectées et corrigées sourcées", "Exploitation active distinguée du risque théorique"] },
  developpement: { title: "Développement", eyebrow: "Outils & écosystèmes", intro: "Les évolutions importantes des langages, frameworks, IDE, bibliothèques et pratiques d'ingénierie.", focus: ["Sorties et changements majeurs", "Compatibilité et migrations", "Impact sur les équipes de développement"] },
  "cloud-devops": { title: "Cloud & DevOps", eyebrow: "Infrastructure & livraison", intro: "Une veille sur le cloud, les conteneurs, les bases de données, les plateformes et les chaînes CI/CD.", focus: ["Incidents et changements de plateformes", "Sécurité et fiabilité opérationnelle", "Outils d'automatisation et observabilité"] },
  "intelligence-artificielle": { title: "Intelligence artificielle", eyebrow: "Modèles, agents & sécurité", intro: "Nouveaux modèles, outils d'IA appliquée, agents, usages professionnels et risques de sécurité associés.", focus: ["Annonces reliées aux sources officielles", "Capacités et limites explicitées", "Sécurité des modèles et des agents"] },
  "open-source": { title: "Open source", eyebrow: "Logiciels & supply chain", intro: "Les projets, mainteneurs, dépendances et changements qui comptent dans l'écosystème open source.", focus: ["Publications et changelogs officiels", "Alertes sur les dépendances", "Contexte de maintenance et de pérennité"] },
  "industrie-tech": { title: "Industrie tech", eyebrow: "Entreprises & tendances", intro: "Les décisions, stratégies et mouvements de l'industrie technologique qui ont un impact concret.", focus: ["Annonces d'entreprises sourcées", "Contexte économique et industriel", "Conséquences pour les professionnels"] },
  bilans: { title: "Bilans & analyses", eyebrow: "Synthèses périodiques", intro: "Des synthèses quotidiennes, hebdomadaires et mensuelles construites à partir de publications vérifiées.", focus: ["Faits marquants et tendances", "Classement avec critères explicités", "Liens vers les articles et sources d'origine"] },
  sources: { title: "Sources", eyebrow: "Traçabilité éditoriale", intro: "Le catalogue des sources retenues pour la veille et les critères utilisés pour les évaluer.", focus: ["Sources officielles et éditeurs", "Organismes CERT et bases de vulnérabilités", "Fréquence de collecte et niveau de confiance"] },
  methodologie: { title: "Méthodologie", eyebrow: "Notre cadre éditorial", intro: "Veille Ultime privilégie la traçabilité, la précision des dates et la distinction entre faits établis et analyse.", focus: ["Aucune CVE ni version affectée publiée sans référence", "Date de publication distincte de la date d'incident", "Validation humaine avant publication des alertes sensibles"] },
};

export function generateStaticParams() {
  return Object.keys(sections).map((section) => ({ section }));
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const data = sections[section];
  if (!data) notFound();

  return (
    <main className="container" style={{ paddingTop: 56, paddingBottom: 80, minHeight: "70vh" }}>
      <Link href="/" className="text-link" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 34 }}><ArrowLeft size={14} /> Retour à l'accueil</Link>
      <div className="section-kicker">{data.eyebrow}</div>
      <h1 style={{ fontSize: "clamp(2.6rem, 7vw, 5.5rem)", lineHeight: 1, letterSpacing: "-.06em", margin: "14px 0 22px", maxWidth: 900 }}>{data.title}<span style={{ color: "#c5f441" }}>.</span></h1>
      <p style={{ color: "var(--muted, #a1a1aa)", fontSize: 18, lineHeight: 1.8, maxWidth: 760 }}>{data.intro}</p>
      <div className="main-grid" style={{ marginTop: 44 }}>
        <section className="feature-card">
          <div><span className="pill"><BookOpen size={12} style={{ display: "inline", marginRight: 6 }} /> Cadre de publication</span><h2 style={{ fontSize: 27, lineHeight: 1.25, marginTop: 22 }}>La fiabilité avant la vitesse.</h2><p className="card-copy">Cette rubrique est initialisée, mais son flux éditorial n'est pas encore connecté à la base de données. Aucun contenu ci-dessous ne doit être interprété comme une actualité réelle.</p></div>
          <div className="card-footer"><span>VEILLE · SOURCES · CONTEXTE</span><span>ÉTAT : INITIALISATION</span></div>
        </section>
        <aside className="report-card">
          <span className="pill"><ShieldAlert size={12} style={{ display: "inline", marginRight: 6 }} /> Principes de veille</span>
          <ul style={{ paddingLeft: 18, color: "var(--muted, #a1a1aa)", lineHeight: 1.9, marginTop: 20 }}>{data.focus.map((item) => <li key={item}>{item}</li>)}</ul>
          <Link href="/methodologie" className="button-secondary" style={{ marginTop: 14 }}>Lire la méthodologie <ArrowRight size={13} /></Link>
        </aside>
      </div>
      <div className="disclaimer" style={{ marginTop: 34 }}><strong style={{ color: "#c5f441" }}>Prochaine étape — </strong>connexion de Neon, ingestion de sources officielles et publication uniquement après contrôle des références.</div>
    </main>
  );
}
