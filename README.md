# Veille Ultime

Plateforme de veille technologique et cybersécurité : actualités sourcées, suivi des vulnérabilités, analyses et bilans quotidiens, hebdomadaires et mensuels.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS v4
- PostgreSQL (Neon) + Prisma 6
- Vercel pour l'hébergement web
- GitHub Actions pour contrôles qualité et futures tâches planifiées

## Démarrer en local

Prérequis : Node.js 20.9+ et pnpm.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Ouvre http://localhost:3000.

Pour générer Prisma et synchroniser le schéma avec Neon :

```bash
pnpm db:generate
pnpm db:push
```

Renseigne `DATABASE_URL` et `DIRECT_URL` dans `.env.local` avant ces commandes. Ne commite jamais les secrets. La base est facultative pour afficher la maquette initiale.

## État actuel

L'interface d'accueil et les pages de rubriques sont initialisées. Les pages expliquent le cadre éditorial mais ne présentent pas de flux d'actualités réel. Le schéma Prisma est préparé, mais Neon n'est pas connecté. La collecte automatique, l'authentification d'administration, les bilans automatisés et les tests de build doivent encore être configurés et vérifiés.

## Rubriques

Accueil, actualités, cybersécurité, vulnérabilités, développement, cloud & DevOps, IA, open source, industrie tech, bilans, sources et méthodologie.

## Principes éditoriaux

- Conserver l'URL et la date de publication des sources.
- Séparer date de publication, date de découverte et date de confirmation d'exploitation.
- Ne publier CVSS, versions affectées ou statut d'exploitation qu'avec une référence vérifiable.
- Dédupliquer les contenus et conserver les journaux de collecte.
- Passer les alertes de sécurité par une validation éditoriale avant publication.
- Distinguer explicitement les faits sourcés de l'analyse.
