---
slug: "fin-support-php-82-preparer-migration-2026"
title: "Fin du support de PHP 8.2 en décembre 2026 : préparer la migration sans interruption"
seoTitle: "PHP 8.2 : fin du support le 31 décembre 2026, plan de migration"
seoDescription: "PHP 8.2 atteint sa fin de vie le 31 décembre 2026. Inventaire, tests de compatibilité et déploiement progressif pour migrer vers une branche maintenue."
keywords: "PHP 8.2 fin de support, migration PHP, PHP 8.3, PHP 8.4, PHP 8.5"
category: "Développement"
publishedAt: "2026-10-28"
sourceName: "PHP.net — archive officielle"
sourceUrl: "https://www.php.net/archive/2026.php"
excerpt: "PHP 8.2 doit atteindre sa fin de vie le 31 décembre 2026. La migration doit être préparée avant l’échéance, avec un inventaire des dépendances, des tests et une stratégie de retour arrière."
takeaways:
  - "Confirmer le calendrier officiel et le support réel du fournisseur d’hébergement."
  - "Tester l’application et ses dépendances sur une version cible avant la bascule."
  - "Déployer progressivement et conserver une possibilité de retour arrière limitée dans le temps."
---

## L’échéance à préparer

Le calendrier officiel PHP indique que PHP 8.2 atteint sa fin de vie le 31 décembre 2026. Après cette date, le projet PHP ne prévoit plus de correctifs de sécurité pour cette branche. Un fournisseur peut proposer un support étendu ou des rétroportages distincts; il faut vérifier explicitement le contrat et ne pas supposer qu’ils existent.

Une migration ne consiste pas seulement à changer l’image Docker ou le paquet système. Le code, les extensions, les dépendances Composer, les workers et les tâches planifiées doivent tous être compatibles avec la version cible.

## Inventorier avant de modifier

- Rechercher les versions PHP sur les serveurs, conteneurs, jobs CI, tâches planifiées et postes de déploiement.
- Lister les extensions natives et leur disponibilité sur la version cible.
- Vérifier les contraintes PHP déclarées dans Composer et les versions des dépendances.
- Identifier les composants non maintenus, les bibliothèques qui utilisent des API dépréciées et les tests absents.
- Associer chaque application à un propriétaire, une criticité et une fenêtre de maintenance.

## Plan de migration en six étapes

1. Choisir une branche PHP maintenue selon le calendrier officiel et les contraintes de l’application.
2. Mettre à jour l’environnement de développement et les dépendances dans une branche dédiée.
3. Exécuter les tests unitaires, d’intégration et les scénarios métier critiques.
4. Tester les tâches planifiées, workers, uploads, génération de fichiers, extensions et connexions externes.
5. Déployer en préproduction avec une configuration aussi proche que possible de la production.
6. Basculer progressivement, surveiller erreurs et latence, et conserver une procédure de retour arrière.

## Comment éviter les faux signaux

Un test qui passe sur le poste du développeur ne prouve pas que l’image de production contient la même version ou les mêmes extensions. Vérifiez la version réellement exécutée dans chaque environnement et reconstruisez les images à partir d’une base maintenue. Évitez de mélanger migration de version majeure, refactorisation et changements d’infrastructure dans un seul déploiement.

## À retenir

La fin de support est une échéance de gestion du risque, pas une raison de migrer sans test. Commencez par l’inventaire, définissez une version cible supportée et planifiez une migration testée avant le 31 décembre 2026.

## Source primaire

[PHP.net — archive des annonces et calendrier de support](https://www.php.net/archive/2026.php)
