/**
 * Catalogue versionné des sources de veille.
 * Les URLs sont les pages canoniques des éditeurs; elles ne sont pas toutes des flux RSS.
 * Un connecteur ne doit être activé que lorsque son parser/API a été implémenté et testé.
 */
export type SourceDefinition = {
  key: string;
  name: string;
  url: string;
  kind: "RSS" | "API" | "WEB" | "ADVISORY" | "CHANGELOG";
  parserKey?: string;
  description: string;
  topics: string[];
  language: "en" | "fr" | "multi";
  trustLevel: 1 | 2 | 3 | 4 | 5;
  isOfficial: boolean;
  fetchIntervalMinutes: number;
};

export const sourceCatalog: SourceDefinition[] = [
  { key: "cisa-kev", name: "CISA Known Exploited Vulnerabilities", url: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog", kind: "API", parserKey: "cisa-kev-json", description: "Catalogue officiel des vulnérabilités dont l'exploitation est connue.", topics: ["cybersecurite", "vulnerabilites"], language: "en", trustLevel: 5, isOfficial: true, fetchIntervalMinutes: 360 },
  { key: "nvd", name: "NIST National Vulnerability Database", url: "https://nvd.nist.gov/vuln", kind: "API", parserKey: "nvd-api", description: "Référentiel NIST pour les données CVE et les métriques de vulnérabilité.", topics: ["vulnerabilites"], language: "en", trustLevel: 5, isOfficial: true, fetchIntervalMinutes: 360 },
  { key: "cve", name: "CVE Program", url: "https://www.cve.org/", kind: "WEB", description: "Référentiel public d'identifiants CVE et d'informations associées.", topics: ["vulnerabilites", "cybersecurite"], language: "en", trustLevel: 5, isOfficial: true, fetchIntervalMinutes: 720 },
  { key: "github-advisories", name: "GitHub Security Advisories", url: "https://github.com/advisories", kind: "ADVISORY", description: "Avis de sécurité, notamment pour les dépendances open source.", topics: ["cybersecurite", "open-source", "developpement"], language: "en", trustLevel: 5, isOfficial: true, fetchIntervalMinutes: 180 },
  { key: "cert-eu", name: "CERT-EU", url: "https://cert.europa.eu/publications/security-advisories/", kind: "ADVISORY", description: "Avis et publications de cybersécurité du CERT des institutions de l'Union européenne.", topics: ["cybersecurite", "vulnerabilites"], language: "en", trustLevel: 5, isOfficial: true, fetchIntervalMinutes: 360 },
  { key: "cert-fr", name: "CERT-FR / ANSSI", url: "https://www.cert.ssi.gouv.fr/", kind: "ADVISORY", description: "Alertes, avis et bulletins de sécurité de l'autorité française.", topics: ["cybersecurite", "vulnerabilites"], language: "fr", trustLevel: 5, isOfficial: true, fetchIntervalMinutes: 180 },
  { key: "enisa", name: "ENISA", url: "https://www.enisa.europa.eu/news", kind: "WEB", description: "Actualités et analyses de l'Agence de l'Union européenne pour la cybersécurité.", topics: ["cybersecurite", "industrie-tech"], language: "en", trustLevel: 5, isOfficial: true, fetchIntervalMinutes: 720 },
  { key: "php", name: "PHP News", url: "https://www.php.net/archive.php", kind: "CHANGELOG", description: "Annonces officielles du langage PHP, dont les versions et correctifs.", topics: ["developpement", "vulnerabilites"], language: "en", trustLevel: 5, isOfficial: true, fetchIntervalMinutes: 720 },
  { key: "nodejs", name: "Node.js Blog", url: "https://nodejs.org/en/blog", kind: "CHANGELOG", description: "Annonces officielles du projet Node.js.", topics: ["developpement", "open-source"], language: "en", trustLevel: 5, isOfficial: true, fetchIntervalMinutes: 720 },
  { key: "react", name: "React Blog", url: "https://react.dev/blog", kind: "CHANGELOG", description: "Annonces et changements officiels de React.", topics: ["developpement", "open-source"], language: "en", trustLevel: 5, isOfficial: true, fetchIntervalMinutes: 720 },
  { key: "nextjs", name: "Next.js Blog", url: "https://nextjs.org/blog", kind: "CHANGELOG", description: "Versions, changements et annonces officiels de Next.js.", topics: ["developpement", "cloud-devops"], language: "en", trustLevel: 5, isOfficial: true, fetchIntervalMinutes: 720 },
  { key: "kubernetes", name: "Kubernetes Blog", url: "https://kubernetes.io/blog/", kind: "CHANGELOG", description: "Actualités officielles du projet Kubernetes.", topics: ["cloud-devops", "open-source"], language: "en", trustLevel: 5, isOfficial: true, fetchIntervalMinutes: 720 },
  { key: "docker", name: "Docker Blog", url: "https://www.docker.com/blog/", kind: "WEB", description: "Actualités et annonces de l'éditeur Docker.", topics: ["cloud-devops", "developpement"], language: "en", trustLevel: 4, isOfficial: true, fetchIntervalMinutes: 720 },
  { key: "msrc", name: "Microsoft Security Response Center", url: "https://msrc.microsoft.com/update-guide", kind: "ADVISORY", description: "Avis de sécurité et mises à jour Microsoft.", topics: ["cybersecurite", "vulnerabilites", "industrie-tech"], language: "en", trustLevel: 5, isOfficial: true, fetchIntervalMinutes: 180 },
  { key: "aws-security", name: "AWS Security Bulletins", url: "https://aws.amazon.com/security/security-bulletins/", kind: "ADVISORY", description: "Bulletins de sécurité officiels AWS.", topics: ["cloud-devops", "cybersecurite"], language: "en", trustLevel: 5, isOfficial: true, fetchIntervalMinutes: 360 },
  { key: "google-security", name: "Google Security Blog", url: "https://security.googleblog.com/", kind: "WEB", description: "Analyses et annonces de sécurité publiées par Google.", topics: ["cybersecurite", "intelligence-artificielle"], language: "en", trustLevel: 4, isOfficial: true, fetchIntervalMinutes: 720 },
  { key: "cloudflare", name: "Cloudflare Blog", url: "https://blog.cloudflare.com/", kind: "WEB", description: "Analyses et annonces de Cloudflare sur réseau, sécurité et infrastructure.", topics: ["cloud-devops", "cybersecurite", "industrie-tech"], language: "en", trustLevel: 4, isOfficial: true, fetchIntervalMinutes: 720 },
  { key: "github-changelog", name: "GitHub Changelog", url: "https://github.blog/changelog/", kind: "CHANGELOG", description: "Changements et nouvelles fonctionnalités de la plateforme GitHub.", topics: ["developpement", "cloud-devops", "open-source"], language: "en", trustLevel: 5, isOfficial: true, fetchIntervalMinutes: 360 },
  { key: "openai-news", name: "OpenAI News", url: "https://openai.com/news/", kind: "WEB", description: "Annonces officielles d'OpenAI; à recouper pour les évaluations indépendantes.", topics: ["intelligence-artificielle", "industrie-tech"], language: "en", trustLevel: 4, isOfficial: true, fetchIntervalMinutes: 720 },
  { key: "arxiv-cs", name: "arXiv Computer Science", url: "https://arxiv.org/list/cs/recent", kind: "WEB", description: "Prépublications de recherche en informatique; les articles ne sont pas nécessairement évalués par les pairs.", topics: ["intelligence-artificielle", "developpement"], language: "en", trustLevel: 3, isOfficial: false, fetchIntervalMinutes: 1440 },
];

export const editorialCategories = [
  { slug: "actualites", label: "Actualités" },
  { slug: "cybersecurite", label: "Cybersécurité" },
  { slug: "vulnerabilites", label: "Vulnérabilités" },
  { slug: "developpement", label: "Développement" },
  { slug: "cloud-devops", label: "Cloud & DevOps" },
  { slug: "intelligence-artificielle", label: "Intelligence artificielle" },
  { slug: "open-source", label: "Open source" },
  { slug: "industrie-tech", label: "Industrie tech" },
  { slug: "bilans", label: "Bilans & analyses" },
] as const;

export const editorialTags = [
  "alerte", "analyse", "api", "cloud", "cve", "devops", "ia", "open-source",
  "patch", "release", "recherche", "securite", "incident", "reglementation",
] as const;
