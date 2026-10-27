# Architecture éditoriale — Veille Ultime

## Principe de séparation

- **Git / code** : catégories autorisées, tags éditoriaux, catalogue déclaratif des sources, connecteurs et règles de validation.
- **Neon / PostgreSQL** : état opérationnel des sources, éléments collectés, articles Markdown, références précises, vulnérabilités, rapports et journaux de collecte.
- **Next.js** : pages publiques, formulaire d'édition et interfaces de validation.
- **GitHub Actions** : planification de collecte et de génération de brouillons; ne pas dépendre des visites du site.

## Administration éditoriale

La page `/admin` permet d'ouvrir une session à l'aide de `VEILLE_ADMIN_PASSWORD` et d'enregistrer un brouillon Markdown. La session est un cookie HTTP-only signé par `VEILLE_ADMIN_SESSION_SECRET`. Ces secrets doivent exister dans l'environnement d'hébergement et ne doivent jamais être committés. Une session dure huit heures. Avant une mise en production plus large, ajouter une protection contre les tentatives répétées et, si plusieurs éditeurs sont prévus, une gestion des comptes individuels.

Le formulaire vérifie les champs, la catégorie, les tags et au moins une URL de référence. Il enregistre les articles avec le statut `DRAFT`; aucune publication publique automatique n'est déclenchée.

## Sources et confiance

Le catalogue de `src/config/source-catalog.ts` contient des pages canoniques et des métadonnées, pas une garantie que chaque page expose un flux ou une API exploitable. Les URLs de flux (`feedUrl`) doivent être ajoutées uniquement après vérification. Chaque connecteur doit parser explicitement son format et conserver l'URL précise de chaque élément collecté.

Le seed crée les sources avec `enabled=false`. Il faut implémenter et tester un collecteur compatible avant d'activer une source. Les niveaux de confiance sont des priorités éditoriales, pas des scores de vérité absolue. Les publications commerciales, prépublications et annonces éditeur doivent être présentées comme telles et recoupées quand la nature de l'affirmation l'exige.

## Cycle éditorial

1. Collecter depuis une source activée et enregistrer l'URL, les dates et les données brutes.
2. Dédupliquer les éléments par URL et empreinte.
3. Préparer un article Markdown en statut `DRAFT`.
4. Exiger des références précises et une validation humaine avant publication.
5. Conserver `lastVerifiedAt` pour les éléments susceptibles d'évoluer.
6. Générer les rapports quotidiens, hebdomadaires et mensuels uniquement à partir des articles validés.

## Mise en place

Après vérification des variables d'environnement dans un environnement privé :

```bash
pnpm install
pnpm db:generate
pnpm db:push
pnpm db:seed
```

Ne jamais committer `.env`, une URL de base de données contenant des identifiants ou des jetons. Le schéma n'est pas appliqué à Neon par un commit Git : la commande `db:push` doit être exécutée depuis un environnement disposant des variables valides.
