export type EditorialArticle = {
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
  sourceName: string;
  sourceUrl: string;
  excerpt: string;
  readingMinutes: number;
  takeaways: string[];
  body: string[];
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string;
};

const legacyArticles: EditorialArticle[] = [
  {
    slug: "php-corrige-deux-vulnerabilites-critiques-rce-21-octobre-2026",
    title: "PHP publie des correctifs pour deux vulnérabilités critiques permettant une exécution de code à distance",
    category: "Cybersécurité",
    publishedAt: "2026-10-21",
    sourceName: "PHP.net — avis officiel",
    sourceUrl: "https://www.php.net/archive/2026.php",
    excerpt: "Les branches PHP 8.5, 8.4, 8.3 et 8.2 ont reçu des mises à jour de sécurité le 21 octobre. Les deux failles peuvent permettre une exécution de code à distance sans authentification.",
    readingMinutes: 4,
    takeaways: [
      "Mettre à jour vers PHP 8.5.12, 8.4.27, 8.3.36 ou 8.2.35 selon la branche utilisée.",
      "Vérifier les installations exposées, notamment PHP-FPM, Apache avec mod_php, PHP-CGI et les distributions Windows.",
      "PHP 8.2 arrive en fin de support le 31 décembre 2026 : préparer une migration vers une branche encore maintenue."
    ],
    body: [
      "Le projet PHP a annoncé le 21 octobre 2026 des correctifs pour CVE-2026-109618 et CVE-2026-109619. L’équipe indique que ces vulnérabilités peuvent conduire à une exécution de code à distance sans authentification. L’avis officiel recommande de mettre à jour immédiatement et précise qu’aucune mesure de contournement complète ne remplace le correctif.",
      "Les versions publiées pour corriger ces problèmes sont PHP 8.5.12, 8.4.27, 8.3.36 et 8.2.35. L’impact concret dépend du mode de déploiement et de la configuration : les responsables doivent inventorier les versions réellement utilisées, y compris celles intégrées à des images de conteneurs, panneaux d’hébergement et applications.",
      "Le 23 octobre, l’équipe PHP a également publié une note informative recommandant de désactiver temporairement session.upload_progress.enabled dans un scénario de configuration inhabituel lié à CVE-2026-109619. Le 26 octobre, des builds Windows mis à jour ont été publiés pour intégrer Brotli 1.2.1 et corriger une vulnérabilité distincte de Brotli, CVE-2026-111497.",
      "À retenir : vérifier la version installée sur chaque serveur, appliquer les versions corrigées, redémarrer les processus concernés et confirmer que les images de déploiement ne réintroduisent pas une ancienne version. Ne pas conclure qu’un système a été compromis sans éléments de télémétrie ou confirmation de l’incident."
    ]
  },
  {
    slug: "ia-accelere-decouverte-vulnerabilites-delais-correction-octobre-2026",
    title: "La découverte de failles assistée par l’IA raccourcit le temps de réaction des équipes sécurité",
    category: "Cybersécurité & IA",
    publishedAt: "2026-10-23",
    sourceName: "Reuters",
    sourceUrl: "https://www.reuters.com/legal/litigation/ai-discovered-bugs-may-soon-trigger-fresh-disruptions-cyber-experts-say-2026-10-23/",
    excerpt: "Des experts interrogés par Reuters avertissent que les outils d’IA peuvent accélérer la recherche de bugs et le développement d’exploits. Ils ne s’accordent toutefois pas sur l’ampleur future des attaques réussies.",
    readingMinutes: 5,
    takeaways: [
      "Réduire le délai entre la publication d’un avis et l’évaluation des systèmes exposés.",
      "Préparer des procédures de correctifs d’urgence, d’inventaire et de retour arrière.",
      "Ne pas confondre augmentation des vulnérabilités découvertes et augmentation automatique des compromissions."
    ],
    body: [
      "Dans un article publié le 23 octobre 2026, Reuters rapporte que des professionnels de la cybersécurité observent une accélération de la découverte de vulnérabilités grâce à l’intelligence artificielle. L’article fait notamment le lien avec la vague de correctifs PHP et d’autres incidents techniques signalés durant la même semaine.",
      "L’enjeu opérationnel est le temps disponible pour les défenseurs. Si l’analyse automatisée permet de repérer des erreurs plus rapidement, les équipes doivent pouvoir identifier les actifs concernés, vérifier les versions, tester les correctifs et les déployer sans attendre le cycle de maintenance habituel.",
      "Les experts cités par Reuters ne considèrent pas tous qu’une hausse des vulnérabilités publiées entraîne nécessairement davantage d’attaques réussies. Certaines failles peuvent rester difficiles à exploiter. Le niveau de risque doit donc être évalué à partir de preuves : accessibilité du système, conditions d’exploitation, disponibilité d’un correctif et indices d’exploitation réelle.",
      "Pour les équipes techniques, les mesures les plus utiles sont un inventaire fiable des logiciels, une veille alimentée par des avis éditeurs, des sauvegardes testées, une procédure de patching d’urgence et une surveillance renforcée des services exposés à Internet."
    ]
  },
  {
    slug: "github-reviewbench-benchmark-agents-revue-code-5-octobre-2026",
    title: "GitHub présente ReviewBench, un benchmark pour évaluer les agents de revue de code",
    category: "Développement & IA",
    publishedAt: "2026-10-05",
    sourceName: "GitHub Blog",
    sourceUrl: "https://github.blog/latest/",
    excerpt: "ReviewBench vise à comparer les agents de revue de code à partir de pull requests représentatives, de références multi-sources et de mesures proches des conditions de production.",
    readingMinutes: 3,
    takeaways: [
      "Comparer les agents sur des cas représentatifs plutôt que sur une démonstration isolée.",
      "Évaluer la pertinence des défauts détectés et les faux positifs.",
      "Conserver une revue humaine pour les changements à fort impact."
    ],
    body: [
      "Le 5 octobre, GitHub a annoncé ReviewBench, un benchmark destiné à l’évaluation des agents d’intelligence artificielle qui examinent du code. Selon la présentation de l’entreprise, le jeu d’évaluation s’appuie sur des pull requests représentatives, des références provenant de plusieurs sources et des métriques conçues pour refléter davantage les usages de production.",
      "L’intérêt d’un benchmark commun est de rendre les comparaisons plus structurées. Pour une équipe, la question n’est pas seulement de savoir si un agent peut commenter du code, mais s’il identifie des défauts pertinents, explique correctement leur impact et évite de produire trop de faux positifs.",
      "ReviewBench est un point de départ pour mesurer les capacités, pas une garantie qu’un agent détectera toutes les régressions. Les résultats doivent être rapprochés du langage, du type de dépôt, des règles internes et du coût de vérification des suggestions.",
      "Dans un flux CI/CD, il reste prudent de traiter les commentaires générés comme des recommandations à vérifier. Les contrôles déterministes, les tests, l’analyse statique et la revue humaine gardent leur rôle, en particulier pour l’authentification, les paiements et les opérations sur les données."
    ]
  },
  {
    slug: "github-copilot-interaction-applications-bureau-1-octobre-2026",
    title: "GitHub annonce l’interaction de Copilot avec des applications de bureau",
    category: "Développement & IA",
    publishedAt: "2026-10-01",
    sourceName: "GitHub Changelog",
    sourceUrl: "https://github.blog/changelog/month/10-2026/",
    excerpt: "La mise à jour du 1er octobre étend les interactions possibles de Copilot vers des applications de bureau. Cette capacité ouvre des scénarios d’automatisation, mais demande des permissions et des contrôles adaptés.",
    readingMinutes: 3,
    takeaways: [
      "Évaluer les permissions données à l’agent et les applications qu’il peut manipuler.",
      "Tester les actions dans un environnement contrôlé avant un usage sur des données importantes.",
      "Ne pas accorder à un agent plus de privilèges que nécessaire."
    ],
    body: [
      "Le changelog de GitHub du 1er octobre 2026 annonce que GitHub Copilot peut désormais interagir avec des applications de bureau. Cette évolution élargit le champ des tâches qu’un assistant peut exécuter au-delà du texte et du code, vers des interfaces logicielles utilisées dans un environnement de travail.",
      "Ce type d’interaction peut simplifier des opérations répétitives, mais les risques changent aussi : une action dans une interface peut modifier des fichiers, déclencher un envoi ou toucher un environnement de production. Les permissions, les confirmations et la traçabilité deviennent donc des éléments essentiels de conception.",
      "Avant d’activer une capacité de ce type, les équipes devraient préciser les actions autorisées, isoler les tests, limiter l’accès aux secrets et vérifier les journaux d’activité. Les tâches sensibles doivent rester soumises à une confirmation explicite."
    ]
  },
  {
    slug: "github-metrics-copilot-agents-mcp-22-octobre-2026",
    title: "GitHub enrichit les métriques Copilot avec les données des agents et serveurs MCP",
    category: "Développement & IA",
    publishedAt: "2026-10-22",
    sourceName: "GitHub Changelog",
    sourceUrl: "https://github.blog/changelog/month/10-2026/",
    excerpt: "Les métriques d’usage peuvent maintenant identifier les skills, agents personnalisés, serveurs MCP, commandes et plugins configurés par les organisations, pour une visibilité plus précise sur l’usage de Copilot.",
    readingMinutes: 3,
    takeaways: [
      "Améliorer l’observabilité des usages d’IA dans les équipes.",
      "Utiliser ces métriques pour comprendre les outils employés, pas pour supposer automatiquement leur qualité.",
      "Associer le suivi d’usage à une gouvernance des agents et des connecteurs."
    ],
    body: [
      "Dans son changelog du 22 octobre 2026, GitHub indique que les métriques d’usage de Copilot affichent désormais plus précisément les skills, agents personnalisés, serveurs Model Context Protocol (MCP), commandes slash et plugins créés par une organisation.",
      "Cette granularité peut aider les responsables à mieux comprendre les outils mobilisés par leurs équipes et à distinguer les usages standards des extensions internes. Elle est particulièrement pertinente à mesure que les workflows de développement associent modèles, agents, outils et connecteurs externes.",
      "Les données d’usage ne démontrent pas, à elles seules, la qualité du code généré ni le retour sur investissement. Elles doivent être interprétées avec des indicateurs complémentaires : temps de revue, défauts détectés après fusion, incidents, satisfaction des développeurs et coût."
    ]
  },
  {
    slug: "github-public-monitoring-alertes-secrets-23-octobre-2026",
    title: "GitHub améliore le triage des alertes de secrets exposés",
    category: "Cybersécurité",
    publishedAt: "2026-10-23",
    sourceName: "GitHub Changelog",
    sourceUrl: "https://github.blog/changelog/month/10-2026/",
    excerpt: "Les fonctions de monitoring public ajoutent notamment des contrôles de validité automatiques, des outils de triage, des chronologies et des webhooks pour faciliter le traitement des secrets divulgués.",
    readingMinutes: 3,
    takeaways: [
      "Traiter un secret exposé comme un incident : révoquer ou faire tourner le secret, puis enquêter.",
      "Automatiser la priorisation sans considérer une alerte comme inoffensive par défaut.",
      "Étendre la surveillance aux dépôts publics pertinents et définir un processus de réponse."
    ],
    body: [
      "Le changelog GitHub du 23 octobre 2026 présente des améliorations du monitoring public des secrets. Elles comprennent des contrôles automatiques de validité, des fonctions de triage et de filtrage, des chronologies d’alertes et des webhooks.",
      "L’objectif est de faciliter la priorisation des alertes et la coordination de la remédiation. Une clé API ou un jeton exposé peut être encore valide, révoqué ou difficile à qualifier ; disposer d’informations de validité peut aider à concentrer l’effort sur les risques les plus immédiats.",
      "La réponse à un secret exposé ne doit pas se limiter à fermer l’alerte. Il faut révoquer ou renouveler le secret, rechercher son usage dans les journaux, vérifier les accès inhabituels et supprimer la valeur de l’historique lorsque c’est possible. La suppression du dépôt public ne garantit pas que le secret n’a pas déjà été copié."
    ]
  },
  {
    slug: "php-brotli-builds-windows-cve-2026-111497-26-octobre-2026",
    title: "PHP publie de nouveaux builds Windows intégrant un correctif de sécurité Brotli",
    category: "Cybersécurité & développement",
    publishedAt: "2026-10-26",
    sourceName: "PHP.net — avis officiel",
    sourceUrl: "https://www.php.net/archive/2026.php",
    excerpt: "Les builds Windows de plusieurs branches PHP ont été reconstruits avec Brotli 1.2.1 afin de corriger CVE-2026-111497, une vulnérabilité d’écriture hors limites dans la décompression Brotli.",
    readingMinutes: 3,
    takeaways: [
      "Vérifier les packages Windows PHP distribués par l’équipe PHP et les fournisseurs tiers.",
      "Les builds concernés portent le suffixe -1 ; le numéro de version du runtime reste identique.",
      "Évaluer si l’application active la décompression HTTP automatique via cURL."
    ],
    body: [
      "Le 26 octobre 2026, PHP a annoncé des builds Windows actualisés pour les branches 8.5, 8.4, 8.3 et 8.2. Ces packages embarquent Brotli 1.2.1, qui corrige CVE-2026-111497, une vulnérabilité d’écriture hors limites lors de la décompression Brotli.",
      "Selon l’avis officiel, le décodeur vulnérable peut être accessible via l’extension cURL lorsque la décompression automatique des réponses HTTP est activée. Cette option est désactivée par défaut dans cURL, mais une application ou une bibliothèque cliente peut l’activer.",
      "Les builds Windows concernés utilisent un suffixe de package -1. Il s’agit d’une reconstruction avec une dépendance mise à jour ; la version du runtime PHP reste la même. Les équipes doivent vérifier la provenance de leurs binaires et suivre les recommandations du fournisseur de leur environnement."
    ]
  },
  {
    slug: "github-copilot-gpt-6-1-terra-26-octobre-2026",
    title: "GPT-6.1 Terra devient disponible dans GitHub Copilot",
    category: "Intelligence artificielle",
    publishedAt: "2026-10-26",
    sourceName: "GitHub Changelog",
    sourceUrl: "https://github.blog/changelog/month/10-2026/",
    excerpt: "GitHub indique que GPT-6.1 Terra est généralement disponible dans Copilot et le présente comme un modèle orienté vers le codage agentique quotidien et le travail en terminal, avec un coût inférieur à GPT-6.1 Sol.",
    readingMinutes: 3,
    takeaways: [
      "Comparer les modèles sur les tâches réellement utilisées par l’équipe.",
      "Mesurer le coût total, la latence, la qualité et le besoin de supervision.",
      "Conserver des validations explicites avant toute action agentique à fort impact."
    ],
    body: [
      "Le changelog GitHub du 26 octobre 2026 annonce la disponibilité générale de GPT-6.1 Terra dans GitHub Copilot. GitHub le décrit comme un modèle destiné au codage agentique courant et au travail dans le terminal, à un coût inférieur à GPT-6.1 Sol.",
      "Pour les développeurs, l’annonce renforce la tendance à intégrer des agents dans des tâches qui combinent analyse du dépôt, modifications de fichiers et commandes. Le choix d’un modèle ne devrait toutefois pas reposer uniquement sur le prix annoncé : les résultats dépendent du contexte, des tests disponibles, des outils autorisés et de la complexité de la tâche.",
      "Une évaluation pratique doit utiliser un ensemble de tâches représentatives, mesurer le taux de réussite, le nombre de corrections humaines, les régressions, la latence et le coût. Les changements proposés par un agent doivent continuer à passer par des tests et une revue adaptés au risque."
    ]
  }
];


import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

function parseMarkdownArticle(fileName: string): EditorialArticle | null {
  const raw = readFileSync(join(process.cwd(), "content/articles", fileName), "utf8");
  const match = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n([\s\S]*)$/);
  if (!match) return null;

  const metadata: Record<string, string | string[]> = {};
  let currentListKey = "";
  for (const line of match[1].split(/\r?\n/)) {
    const listItem = line.match(/^\s+-\s+(.+)$/);
    if (listItem && currentListKey) {
      const value = metadata[currentListKey];
      if (Array.isArray(value)) value.push(listItem[1].trim().replace(/^["']|["']$/g, ""));
      continue;
    }
    const field = line.match(/^([a-zA-Z][\w]*):\s*(.*)$/);
    if (!field) continue;
    currentListKey = field[1];
    const value = field[2].trim();
    if (!value) metadata[currentListKey] = [];
    else metadata[currentListKey] = value.replace(/^["']|["']$/g, "");
  }

  const required = ["slug", "title", "category", "publishedAt", "sourceName", "sourceUrl", "excerpt"];
  if (required.some((key) => typeof metadata[key] !== "string" || !metadata[key])) return null;
  const body = match[2].trim().split(/\r?\n\s*\r?\n/).map((block) => block.trim()).filter(Boolean);
  const takeaways = Array.isArray(metadata.takeaways) ? metadata.takeaways : [];
  const wordCount = match[2].split(/\s+/).filter(Boolean).length;
  return {
    slug: metadata.slug as string,
    title: metadata.title as string,
    category: metadata.category as string,
    publishedAt: metadata.publishedAt as string,
    sourceName: metadata.sourceName as string,
    sourceUrl: metadata.sourceUrl as string,
    excerpt: metadata.excerpt as string,
    seoTitle: typeof metadata.seoTitle === "string" ? metadata.seoTitle : undefined,
    seoDescription: typeof metadata.seoDescription === "string" ? metadata.seoDescription : undefined,
    keywords: typeof metadata.keywords === "string" ? metadata.keywords : undefined,
    readingMinutes: Math.max(1, Math.ceil(wordCount / 200)),
    takeaways,
    body,
  };
}

function loadMarkdownArticles(): EditorialArticle[] {
  const directory = join(process.cwd(), "content/articles");
  try {
    return readdirSync(directory)
      .filter((fileName) => fileName.endsWith(".md") && !fileName.startsWith("_"))
      .map(parseMarkdownArticle)
      .filter((article): article is EditorialArticle => article !== null);
  } catch {
    return [];
  }
}

// Les articles historiques restent compatibles pendant la migration progressive vers Markdown.
const markdownArticles = loadMarkdownArticles();
export const editorialArticles: EditorialArticle[] = [
  ...markdownArticles,
  ...legacyArticles.filter((legacy) => !markdownArticles.some((article) => article.slug === legacy.slug)),
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const getArticleBySlug = (slug: string) => editorialArticles.find((article) => article.slug === slug);

