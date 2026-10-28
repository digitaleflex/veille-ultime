---
slug: "secrets-github-reponse-incident-cles-api-exposees"
title: "Clé API exposée sur GitHub : les étapes de réponse à incident à suivre immédiatement"
seoTitle: "Clé API exposée sur GitHub : procédure de réponse à incident"
seoDescription: "Révoquer un secret exposé, identifier les usages, vérifier les journaux et assainir les dépôts sans confondre suppression du commit et révocation."
keywords: "secret exposé GitHub, clé API compromise, réponse incident, rotation secrets, Secret Scanning"
category: "Cybersécurité"
publishedAt: "2026-10-28"
sourceName: "GitHub Docs — Removing sensitive data"
sourceUrl: "https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository"
excerpt: "Lorsqu’une clé API est publiée dans un dépôt, il faut d’abord la révoquer ou la faire tourner. Supprimer le texte du dernier commit ne rend pas le secret inutilisable et n’efface pas toutes ses copies."
takeaways:
  - "Révoquer ou renouveler le secret chez le fournisseur avant de nettoyer l’historique."
  - "Rechercher les usages anormaux et les copies dans les logs, artefacts, forks et environnements."
  - "Nettoyer l’historique seulement après containment et coordination avec les collaborateurs."
---

## Priorité immédiate : invalider le secret

Si une clé API, un jeton ou un mot de passe a été publié dans un dépôt accessible à des personnes non autorisées, considérez-le comme compromis. La première mesure est de révoquer ou renouveler le secret chez le fournisseur, puis de vérifier que la nouvelle valeur n’est pas réintroduite dans le code ou les journaux.

Supprimer la ligne dans un nouveau commit ne suffit pas. Le secret peut rester dans l’historique Git, les clones, les forks, les caches, les artefacts CI, les captures d’écran ou les logs.

## Procédure de réponse

**1. Contenir.** Révoquez le secret, désactivez l’identité si nécessaire et remplacez-le par un identifiant à portée limitée. Si la clé est utilisée par un service critique, planifiez la rotation de manière à éviter une panne tout en réduisant la fenêtre d’exposition.

**2. Déterminer le périmètre.** Identifiez le fournisseur, les permissions de la clé, la période d’exposition, les dépôts concernés et les systèmes qui l’utilisaient. Recherchez les commits, branches, forks, workflows, artefacts et journaux où la valeur peut apparaître.

**3. Examiner les usages.** Consultez les journaux d’audit et l’activité du fournisseur pour repérer des requêtes inhabituelles, des adresses inattendues ou des changements de configuration. Conservez les éléments nécessaires à l’enquête avant de nettoyer l’historique.

**4. Nettoyer les copies.** Suivez la procédure officielle pour réécrire l’historique si nécessaire. Coordonnez-vous avec les collaborateurs, car les clones existants peuvent réintroduire les anciens commits. La réécriture ne remplace jamais la révocation.

**5. Corriger la cause.** Déplacez les secrets vers un gestionnaire dédié, limitez les permissions, ajoutez la détection de secrets et la protection au push, puis vérifiez que les logs n’impriment pas les valeurs.

**6. Documenter et vérifier.** Notez l’heure de découverte, l’heure de révocation, le périmètre, les actions et les résultats. Vérifiez que l’ancien secret échoue et que le nouveau est accessible uniquement aux services prévus.

## Quand considérer l’incident comme contenu

La suppression du texte du dépôt n’est pas un critère de clôture. L’incident peut être considéré comme contenu lorsque l’ancien secret est invalide, les usages anormaux ont été évalués, les copies identifiées ont été traitées autant que possible et la cause de l’exposition a été corrigée. Si des indices d’abus existent, suivez le processus de réponse à incident de l’organisation.

## Prévention

Activez Secret Scanning et push protection lorsqu’ils sont disponibles, appliquez le moindre privilège aux jetons, utilisez des identifiants courts pour l’automatisation et évitez de partager les mêmes secrets entre environnements. Testez périodiquement la procédure de rotation.

## À retenir

L’ordre des opérations est important : révoquer, enquêter, nettoyer, corriger et vérifier. Un commit de suppression ne neutralise pas une clé qui a déjà été copiée.

## Source primaire

[GitHub Docs — Removing sensitive data from a repository](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
