---
slug: "securiser-pipeline-cicd-secrets-permissions-minimales"
title: "Sécuriser un pipeline CI/CD : secrets, permissions et provenance des artefacts"
seoTitle: "Sécurité CI/CD : checklist pratique pour pipelines fiables"
seoDescription: "Réduire le risque dans la chaîne CI/CD avec des permissions minimales, des secrets éphémères, des dépendances vérifiées et des artefacts traçables."
keywords: "sécurité CI/CD, GitHub Actions, secrets, permissions minimales, supply chain, artefacts"
category: "Cybersécurité"
publishedAt: "2026-10-28"
sourceName: "OpenSSF — guides de sécurité de la chaîne logicielle"
sourceUrl: "https://openssf.org/"
excerpt: "Un pipeline CI/CD dispose souvent d’accès au code, aux secrets et aux environnements de déploiement. Il faut limiter ces droits et pouvoir retracer comment chaque artefact a été produit."
takeaways:
  - "Réduire les permissions par job et n’exposer les secrets qu’aux étapes qui en ont besoin."
  - "Séparer les tests issus de contributions non fiables des jobs disposant de secrets."
  - "Relier chaque artefact livré au commit, au workflow et aux dépendances utilisés."
---

## Pourquoi le pipeline est une cible

Le pipeline CI/CD peut lire le code, télécharger des dépendances, produire des artefacts et parfois déployer en production. Si une étape non fiable peut modifier le workflow ou lire un jeton trop puissant, la compromission du dépôt peut devenir une compromission de l’environnement de livraison.

La sécurité doit donc couvrir le code du workflow, les identités utilisées, les dépendances téléchargées, les artefacts produits et les approbations de déploiement. Un badge vert de CI indique seulement que les contrôles exécutés ont réussi; il ne prouve pas à lui seul que le pipeline est sûr.

## Réduire les droits d’exécution

- Définir explicitement les permissions du jeton pour chaque job; éviter les droits d’écriture par défaut.
- Séparer les workflows de validation des contributions externes des workflows de publication et de déploiement.
- Ne pas exposer de secrets à des scripts ou dépendances contrôlés par une contribution non fiable.
- Utiliser des identités distinctes pour les environnements de test, préproduction et production.
- Préférer des identifiants à durée de vie courte et une fédération d’identité lorsque le fournisseur le permet.
- Protéger les environnements de production par des règles d’approbation et des restrictions de branche.

## Protéger les secrets

Un secret ne doit pas être écrit dans le dépôt, dans une commande qui sera journalisée, dans les artefacts ou dans les sorties de débogage. Masquer une valeur dans les logs est une défense supplémentaire, pas une permission de l’exposer à n’importe quel processus.

Inventoriez les secrets utilisés par le pipeline, leur propriétaire, leur portée et leur procédure de rotation. En cas d’exposition, révoquez ou renouvelez le secret auprès du fournisseur et recherchez les usages anormaux. Supprimer le commit ne rend pas un jeton déjà exposé inutilisable.

## Sécuriser les dépendances et les artefacts

Épinglez les actions et outils critiques à une version ou à un commit immuable lorsque c’est possible. Vérifiez la provenance des dépendances, activez les alertes de vulnérabilité et limitez les scripts d’installation exécutés avec des privilèges élevés.

Pour les livraisons importantes, conservez une relation vérifiable entre l’artefact, le commit source et le workflow. Les attestations de provenance peuvent aider à démontrer comment un artefact a été construit, mais elles ne garantissent pas que le code source soit exempt de défauts.

## Contrôles à automatiser

1. Analyse statique et tests avant fusion.
2. Détection des secrets et protection au push.
3. Analyse des dépendances et des images de conteneurs.
4. Permissions explicites et revue des modifications de workflow.
5. Approbation séparée pour les déploiements à fort impact.
6. Journalisation des publications, changements de permissions et déploiements.
7. Test régulier de la procédure de révocation et de retour arrière.

## Revue avant mise en production

Pour chaque workflow, posez quatre questions : quel code peut l’influencer, quels secrets peut-il lire, quels systèmes peut-il modifier et quelle preuve permet de vérifier l’artefact livré? Si la réponse n’est pas claire, le périmètre d’autorisation est trop large ou la traçabilité insuffisante.

## À retenir

Un pipeline sûr repose sur le moindre privilège, la séparation des tâches, des secrets à portée limitée et une provenance traçable. La protection doit être vérifiée à chaque étape du cycle de livraison, pas uniquement à la fin.

## Source de référence

[OpenSSF — ressources de sécurité de la chaîne logicielle](https://openssf.org/)
