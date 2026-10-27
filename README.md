# Veille Ultime

Plateforme de veille technologique et cybersécurité : actualités sourcées, suivi des vulnérabilités, analyses et bilans quotidiens, hebdomadaires et mensuels.

## Stack de départ

- Next.js App Router + TypeScript
- Tailwind CSS v4
- PostgreSQL (Neon) + Prisma 6
- Vercel pour l'hébergement web
- GitHub Actions pour les tâches planifiées (à ajouter après configuration des sources)

## Prérequis

- Node.js 20.9+
- pnpm
- Une base PostgreSQL Neon (facultative pour afficher la maquette initiale)

## Démarrer en local

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Ouvre http://localhost:3000.

Pour préparer le client Prisma et synchroniser le schéma avec Neon :

```bash
pnpm db:generate
pnpm db:push
```

Renseigne `DATABASE_URL` et `DIRECT_URL` dans `.env.local` avant ces commandes. Ne commite jamais les secrets.

## État actuel

La première version contient une page d'accueil de démarrage, le système de styles global et le schéma de données initial. Les cartes d'actualité sont des placeholders éditoriaux et ne représentent pas des événements réels. Aucune collecte automatique, authentification d'administration, génération de rapports, ni connexion Neon n'est activée à ce stade.

## Principes éditoriaux

- Conserver l'URL et la date de publication des sources.
- Séparer date de publication, date de découverte et date de confirmation d'exploitation.
- Ne publier CVSS, versions affectées ou statut d'exploitation qu'avec une référence vérifiable.
- Dédupliquer les contenus et conserver les journaux de collecte.
- Passer les alertes de sécurité par une validation éditoriale avant publication.
- Distinguer explicitement les faits sourcés de l'analyse.

## Routes prévues

`/`, `/actualites`, `/actualites/[slug]`, `/cybersecurite`, `/vulnerabilites`, `/developpement`, `/cloud-devops`, `/intelligence-artificielle`, `/open-source`, `/industrie-tech`, `/bilans`, `/sources`, `/methodologie`, `/admin`.

Les rubriques listées sont la cible de l'architecture ; seules les routes dont les fichiers existent sont actives.
