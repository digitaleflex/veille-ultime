---
slug: "github-secret-scanning-anthropic-salesforce-octobre-2026"
title: "GitHub élargit Secret Scanning : clés Anthropic, Salesforce et protection au push"
seoTitle: "GitHub Secret Scanning : nouvelles clés Anthropic et Salesforce"
seoDescription: "Le 13 octobre 2026, GitHub a ajouté des détecteurs Anthropic, Cloudsmith et Salesforce et activé par défaut la protection au push pour les nouveaux secrets Anthropic."
keywords: "GitHub Secret Scanning, Anthropic API key, Salesforce, push protection, secrets"
category: "Cybersécurité"
publishedAt: "2026-10-13"
sourceName: "GitHub Changelog"
sourceUrl: "https://github.blog/changelog/2026-10-13-secret-scanning-blocks-anthropic-keys-by-default-adds-salesforce/"
excerpt: "GitHub a ajouté de nouveaux types de secrets détectés, notamment des clés Anthropic et Cloudsmith, et intégré Salesforce au programme de partenariat de Secret Scanning."
takeaways:
  - "La protection au push bloque certains secrets avant qu’ils n’entrent dans l’historique du dépôt."
  - "La détection ne remplace pas la rotation immédiate d’un secret exposé."
  - "Vérifier les réglages, les types de secrets pris en charge et la couverture des dépôts."
---

## Ce qui change

Dans son annonce du 13 octobre 2026, GitHub indique que Secret Scanning détecte de nouveaux types de secrets liés à Salesforce, Anthropic et Cloudsmith. Salesforce rejoint le programme de partenariat : lorsqu’un secret partenaire est détecté dans un dépôt public, GitHub peut transmettre l’information au fournisseur afin qu’il puisse révoquer ou renouveler l’identifiant.

Les nouveaux types cités sont notamment les clés de service et d’utilisateur Anthropic, une clé API Cloudsmith et un jeton OAuth2 API Marketing Cloud de Salesforce. GitHub indique également que la protection au push est activée par défaut pour les nouveaux types de secrets Anthropic dans les dépôts où Secret Scanning est activé.

## Pourquoi la protection au push compte

Un secret commité peut être copié par des clones, des forks, des caches ou des automatisations avant même que le commit soit supprimé. La protection au push vise à bloquer certains identifiants avant qu’ils entrent dans l’historique distant. Elle réduit le risque d’exposition accidentelle, sans éliminer tous les scénarios : les secrets peuvent aussi apparaître dans des journaux, des artefacts CI, des tickets ou des images de conteneurs.

Le périmètre exact dépend des fonctionnalités activées, du type de dépôt, des droits et du plan GitHub. Consultez la documentation actuelle de Secret Scanning plutôt que de supposer que tous les types sont disponibles partout.

## Actions recommandées

1. Vérifier que Secret Scanning et push protection sont activés sur les dépôts concernés.
2. Examiner les alertes ouvertes et traiter en priorité les secrets actifs.
3. En cas d’exposition confirmée, révoquer ou faire tourner le secret chez le fournisseur; supprimer la valeur du dépôt ne suffit pas.
4. Rechercher les copies éventuelles dans l’historique, les forks, les logs CI, les artefacts et les environnements de déploiement.
5. Déplacer les secrets vers un gestionnaire dédié ou le mécanisme de secrets du fournisseur CI.
6. Tester le flux de push protection avec un faux secret de test, sans utiliser de véritable clé.

## Limites à connaître

Un détecteur peut ne pas reconnaître un format personnalisé ou une nouvelle variante. La couverture doit être complétée par des règles internes, des scans de dépôts et des contrôles sur les pipelines. Ne désactivez pas la protection uniquement pour faire passer un commit : utilisez le mécanisme d’exception prévu et documentez la justification.

## À retenir

L’annonce améliore la couverture de détection et le blocage préventif de certains secrets. La mesure opérationnelle la plus importante reste un processus de gestion des secrets qui combine prévention, alertes, révocation rapide et vérification des copies.

## Source primaire

[Secret scanning blocks Anthropic keys by default, adds Salesforce — GitHub Changelog, 13 octobre 2026](https://github.blog/changelog/2026-10-13-secret-scanning-blocks-anthropic-keys-by-default-adds-salesforce/)
