# Architecture éditoriale — Veille Ultime

## Principe

Veille Ultime est un site **statique-first, sans base de données**. Git est la source de vérité du contenu; Next.js génère les pages et Vercel les déploie à chaque mise à jour de la branche principale.

- `content/articles/*.md` : articles publiables, écrits en Markdown avec métadonnées en tête.
- `src/lib/editorial-content.ts` : chargement des fichiers Markdown et compatibilité temporaire avec les articles historiques.
- `src/config/source-catalog.ts` : catalogue versionné de sources à consulter. Il s'agit d'un référentiel documentaire, pas d'un collecteur automatique.
- `src/app/` : pages publiques, navigation et génération des pages statiques.
- GitHub : historique, revue des modifications et validation éditoriale.
- Vercel : build et déploiement déclenchés par les commits.

Aucune base PostgreSQL, Prisma, interface d'administration, clé secrète ou variable de connexion n'est nécessaire pour publier un article.

## Ajouter un article

1. Copier `content/articles/_template.md` vers un nouveau fichier, par exemple `content/articles/nom-de-l-article.md`.
2. Remplir les métadonnées et le contenu sans inventer les faits manquants.
3. Utiliser une URL directe vers la publication ou l'avis cité, et non une page d'accueil générique lorsque la référence précise existe.
4. Vérifier les dates, versions, identifiants CVE, produits affectés et correctifs auprès de la source.
5. Relire le rendu, puis committer le fichier. Le déploiement Vercel est déclenché par GitHub.

Les fichiers dont le nom commence par `_` sont des modèles et ne sont pas publiés.

## Format Markdown

Les champs requis sont `slug`, `title`, `category`, `publishedAt`, `sourceName`, `sourceUrl` et `excerpt`. `takeaways` est une liste YAML simple. Le corps utilise des paragraphes séparés par une ligne vide.

## Règles éditoriales

- Distinguer les faits vérifiés, les déclarations d'un éditeur et l'analyse.
- Ne pas présenter une vulnérabilité comme exploitée activement sans preuve citée.
- Préférer les avis de sécurité, notes de version et publications originales.
- Indiquer la date de la source et les limites connues; revérifier les informations sensibles avant publication.
- Ne pas publier de secrets, données personnelles ni détails opérationnels dangereux.
- Les anciennes fiches restent temporairement dans `src/lib/editorial-content.ts`; migrer ou corriger leurs références au fil des mises à jour.

## Vérifications locales

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm build
```

Aucune de ces vérifications n'est réputée réussie tant qu'elle n'a pas été exécutée sur le commit concerné.
