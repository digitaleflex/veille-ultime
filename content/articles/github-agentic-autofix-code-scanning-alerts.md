---
slug: "github-agentic-autofix-code-scanning-alerts"
title: "GitHub généralise Agentic Autofix : comment contrôler les correctifs générés par IA"
seoTitle: "GitHub Agentic Autofix : disponibilité et contrôles sécurité"
seoDescription: "GitHub a généralisé Agentic Autofix pour les alertes Code Scanning. Comprendre le flux, les prérequis et les vérifications avant fusion."
keywords: "GitHub Agentic Autofix, CodeQL, Copilot, code scanning, correction vulnérabilité"
category: "Cybersécurité"
publishedAt: "2026-10-15"
sourceName: "GitHub Changelog"
sourceUrl: "https://github.blog/changelog/2026-10-15-agentic-autofix-for-code-scanning-alerts-general-availability/"
excerpt: "Agentic Autofix peut proposer un correctif à partir d’une alerte de sécurité, relancer l’analyse et ouvrir une pull request. Le résultat doit rester soumis à une revue adaptée au risque."
takeaways:
  - "La fonctionnalité exige les licences et politiques de sécurité GitHub applicables."
  - "Une analyse qui passe ne prouve pas que le correctif est complet ni sans régression."
  - "Revoir le diff, les tests, le périmètre et les autorisations avant fusion."
---

## Ce que GitHub a annoncé

Le 15 octobre 2026, GitHub a annoncé la disponibilité générale d’Agentic Autofix pour les alertes Code Scanning. Lorsqu’une alerte est assignée à Copilot, l’agent explore les fichiers pertinents, propose une modification, relance l’analyse d’origine et peut ouvrir une pull request brouillon pour revue.

La fonctionnalité vise les clients GitHub Code Security ou GitHub Advanced Security sur GitHub Enterprise Cloud, selon les politiques et conditions de licence applicables. Les administrateurs doivent vérifier les prérequis et l’activation dans leur organisation avant de planifier un déploiement.

## Ce que l’automatisation apporte — et ce qu’elle ne garantit pas

L’agent peut réduire le temps nécessaire pour préparer un correctif et fournir une trace des changements proposés. Le fait qu’il relance CodeQL constitue un contrôle utile, mais limité : l’analyse vérifie les alertes ciblées selon ses règles et sa configuration. Elle ne démontre pas à elle seule que la logique métier est correcte, qu’aucune régression n’a été introduite ou que d’autres vulnérabilités n’existent pas.

Les correctifs peuvent aussi nécessiter des changements plus larges, des tests d’intégration ou une migration de dépendance. La revue doit donc tenir compte du contexte du dépôt et du risque de l’alerte.

## Workflow recommandé

1. Vérifier que l’alerte concerne la branche par défaut et que les politiques de l’organisation autorisent l’usage.
2. Examiner le chemin d’attaque, la gravité, l’exploitabilité et le contexte métier avant d’assigner l’agent.
3. Lire le diff complet et vérifier qu’il ne modifie pas de fichiers ou comportements sans rapport avec l’alerte.
4. Exécuter les tests unitaires, d’intégration, de sécurité et les contrôles de style adaptés.
5. Examiner les dépendances et les permissions si le correctif ajoute un nouvel appel, un nouveau paquet ou une nouvelle configuration.
6. Faire approuver la pull request par un mainteneur responsable.
7. Après fusion, confirmer que l’alerte est fermée sur la branche concernée et surveiller le déploiement.

## Contrôles de gouvernance

Définissez les dépôts et catégories d’alertes autorisés, les personnes habilitées à approuver, le budget IA et la manière de traiter les échecs. Les opérations de l’agent consomment des crédits IA et peuvent utiliser des minutes GitHub Actions; mesurez le coût par correction acceptée, pas seulement le nombre de suggestions produites.

## À retenir

Agentic Autofix peut accélérer la préparation d’un correctif, mais ne doit pas devenir un mécanisme de fusion automatique sans revue. Le bon indicateur est le délai jusqu’à une correction vérifiée, sans régression, et non le volume de pull requests générées.

## Source primaire

[Agentic autofix for code scanning alerts general availability — GitHub Changelog, 15 octobre 2026](https://github.blog/changelog/2026-10-15-agentic-autofix-for-code-scanning-alerts-general-availability/)
