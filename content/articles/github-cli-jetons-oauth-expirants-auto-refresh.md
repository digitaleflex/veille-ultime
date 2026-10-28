---
slug: "github-cli-jetons-oauth-expirants-auto-refresh"
title: "GitHub CLI : préparer les intégrations aux jetons OAuth à durée limitée"
seoTitle: "GitHub CLI et jetons OAuth expirants : checklist de migration"
seoDescription: "GitHub CLI ajoute une option pour des jetons OAuth expirants avec renouvellement automatique. Vérifiez les scripts, sessions et intégrations avant activation."
keywords: "GitHub CLI, OAuth, jetons expirants, refresh token, sécurité développeur"
category: "Développement & cybersécurité"
publishedAt: "2026-10-21"
sourceName: "GitHub Changelog"
sourceUrl: "https://github.blog/changelog/2026-10-21-github-cli-opt-in-to-expiring-auto-refreshing-oauth-tokens/"
excerpt: "L’option de jetons OAuth expirants avec renouvellement automatique réduit la durée de vie des identifiants, mais peut affecter les scripts et environnements qui supposent des jetons statiques."
takeaways:
  - "Inventorier les scripts qui utilisent gh auth token ou lisent directement les jetons."
  - "Tester le renouvellement dans les environnements interactifs et automatisés."
  - "Ne jamais contourner l’expiration en stockant le jeton dans un fichier partagé."
---

## Ce qui change

Le changelog GitHub du 21 octobre 2026 décrit une option de GitHub CLI permettant d’utiliser des jetons OAuth qui expirent et se renouvellent automatiquement. Le modèle réduit la durée de vie d’un jeton utilisable en cas de fuite, mais introduit une dépendance au mécanisme de renouvellement et à la session d’authentification.

Vérifiez la version de GitHub CLI, le statut de disponibilité de l’option et les instructions officielles avant de l’activer à grande échelle. Une fonctionnalité opt-in ne doit pas être supposée active par défaut.

## Quels environnements tester

- Les postes développeurs avec authentification interactive.
- Les scripts qui appellent GitHub CLI et récupèrent un jeton pour une autre commande.
- Les runners CI et tâches planifiées qui dépendent d’une session locale.
- Les conteneurs éphémères, machines de build et environnements sans interface.
- Les outils internes qui supposent qu’un jeton reste valide pendant toute une exécution.

Le renouvellement automatique ne signifie pas que tous les usages d’un jeton exporté bénéficieront du renouvellement. Un script qui copie une valeur dans une variable d’environnement peut continuer à utiliser une valeur expirée.

## Plan de migration

1. Mettre à jour GitHub CLI dans un environnement de test et lire la documentation associée à l’option.
2. Rechercher les usages de jetons exportés, copiés ou stockés dans des fichiers.
3. Préférer les mécanismes d’authentification dédiés aux workflows CI plutôt qu’une session personnelle persistante.
4. Tester les commandes après expiration et renouvellement, y compris en cas de réseau indisponible ou de session révoquée.
5. Documenter les comptes de service, les permissions et la procédure de rotation.
6. Surveiller les erreurs d’authentification après activation et prévoir un retour arrière contrôlé.

## Bonnes pratiques qui restent valables

Accordez uniquement les scopes nécessaires, séparez les identités humaines et automatisées, évitez les jetons longue durée et révoquez tout identifiant exposé. Le renouvellement automatique améliore le cycle de vie du jeton, mais ne compense pas des permissions excessives ni une machine compromise.

## À retenir

La durée de vie courte réduit la fenêtre d’exploitation d’un jeton volé, à condition que les clients et scripts gèrent correctement son renouvellement. Testez les usages non interactifs avant d’activer le changement dans les workflows critiques.

## Source primaire

[GitHub CLI: opt in to expiring, auto-refreshing OAuth tokens — GitHub Changelog, 21 octobre 2026](https://github.blog/changelog/2026-10-21-github-cli-opt-in-to-expiring-auto-refreshing-oauth-tokens/)
