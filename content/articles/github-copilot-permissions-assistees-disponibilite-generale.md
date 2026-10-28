---
slug: "github-copilot-permissions-assistees-disponibilite-generale"
title: "GitHub Copilot : les permissions assistées réduisent-elles le risque des agents ?"
seoTitle: "GitHub Copilot permissions assistées : usages et limites"
seoDescription: "Les permissions assistées de Copilot sont généralement disponibles dans plusieurs clients. Comprendre les confirmations, les droits et les risques résiduels."
keywords: "GitHub Copilot, permissions assistées, agent IA, sécurité terminal, moindre privilège"
category: "Intelligence artificielle & cybersécurité"
publishedAt: "2026-10-26"
sourceName: "GitHub Changelog"
sourceUrl: "https://github.blog/changelog/2026-10-26-github-copilot-assisted-permissions-generally-available/"
excerpt: "Les permissions assistées demandent une autorisation lors de certaines actions de Copilot. Elles ne remplacent pas un environnement isolé, des droits limités et une revue des commandes."
takeaways:
  - "Lire précisément l’action et le périmètre avant d’autoriser un outil."
  - "Limiter les permissions persistantes et éviter l’approbation automatique globale."
  - "Tester les comportements sur un dépôt isolé avant d’ouvrir l’accès aux environnements sensibles."
---

## Ce que la disponibilité générale change

GitHub a annoncé le 26 octobre 2026 la disponibilité générale des permissions assistées dans GitHub Copilot CLI, l’application Copilot et Visual Studio Code. Lorsqu’un agent demande à exécuter une commande ou à accéder à un chemin, l’utilisateur peut examiner la demande et autoriser l’action selon les options du client.

L’annonce décrit une amélioration du contrôle utilisateur, pas une garantie que toutes les actions seront sûres. Les noms de paramètres, comportements par défaut et contrôles disponibles peuvent différer selon le client et sa version; consultez le changelog précis et la documentation associée.

## Pourquoi les autorisations sont critiques

Un agent de développement peut manipuler des fichiers, lancer des scripts, accéder au réseau ou exécuter des commandes. Une demande apparemment anodine peut déclencher un script de build, lire un fichier sensible ou modifier des fichiers hors du dépôt si l’environnement lui en donne le droit.

La permission doit donc être évaluée en fonction de l’action, du chemin, de l’origine du code et de la conséquence potentielle. Autoriser une commande une fois ne signifie pas qu’il faut approuver toutes les futures commandes du même outil.

## Règles d’usage recommandées

- Examiner la commande complète, ses arguments et son répertoire de travail.
- Refuser les actions destructrices ou réseau dont l’objectif n’est pas clair.
- Éviter les règles persistantes trop larges qui autorisent des catégories de commandes entières.
- Garder les secrets hors du contexte de travail de l’agent lorsque cela n’est pas nécessaire.
- Utiliser un conteneur ou un environnement isolé pour les tâches qui exécutent du code non fiable.
- Inspecter les fichiers modifiés et les tests avant de fusionner.
- Conserver les journaux utiles à l’audit, en évitant d’y exposer des secrets.

## Comment évaluer la configuration

Prenez un dépôt non critique et testez des scénarios autorisés, refusés et ambigus : lecture de fichiers du projet, modification hors dépôt, accès réseau, suppression de fichiers et exécution de scripts. Vérifiez que le client demande l’autorisation au bon moment et que le refus empêche effectivement l’action.

Répétez ces tests après une mise à jour importante du client ou un changement de politique d’organisation. Les permissions assistées constituent un contrôle dans une défense en profondeur, pas un substitut aux permissions du système d’exploitation.

## À retenir

Les permissions assistées rendent les demandes d’action plus visibles, mais la sécurité dépend toujours du contexte, des droits effectifs et de l’isolement. Autorisez des actions précises, pas une confiance générale envers l’agent.

## Source primaire

[GitHub Changelog — annonce des permissions assistées de Copilot, octobre 2026](https://github.blog/changelog/2026-10-26-github-copilot-assisted-permissions-generally-available/)
