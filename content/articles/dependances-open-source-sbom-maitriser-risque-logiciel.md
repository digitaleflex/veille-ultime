---
slug: "dependances-open-source-sbom-maitriser-risque-logiciel"
title: "Dépendances open source et SBOM : rendre le risque logiciel mesurable"
seoTitle: "SBOM et dépendances open source : guide pratique de gestion du risque"
seoDescription: "Construire une SBOM utile, surveiller les dépendances transitives et relier les alertes de vulnérabilité aux versions réellement déployées."
keywords: "SBOM, dépendances open source, chaîne d’approvisionnement logicielle, CycloneDX, SPDX, vulnérabilités"
category: "Développement"
publishedAt: "2026-10-28"
sourceName: "CISA — Software Bill of Materials"
sourceUrl: "https://www.cisa.gov/sbom"
excerpt: "Une SBOM décrit les composants logiciels présents dans un artefact. Elle devient utile lorsqu’elle est liée aux versions déployées, aux avis de sécurité et à un processus de remédiation."
takeaways:
  - "Générer la SBOM à partir de l’artefact livré, pas uniquement du manifeste de développement."
  - "Inclure les dépendances transitives et conserver le lien avec la version déployée."
  - "Une SBOM améliore la visibilité, mais ne garantit ni l’absence de vulnérabilité ni la qualité du logiciel."
---

## Pourquoi l’inventaire des composants est indispensable

Une application moderne assemble du code interne, des bibliothèques directes, des dépendances transitives, des images de base et parfois des composants compilés. Sans inventaire exploitable, une alerte CVE oblige l’équipe à reconstruire manuellement où le composant est utilisé et quelles versions sont réellement déployées.

Une **Software Bill of Materials (SBOM)** est un inventaire structuré des composants d’un logiciel. Des formats comme SPDX et CycloneDX permettent de représenter des informations de provenance, de version et de dépendances. La SBOM ne prouve pas qu’un composant est sûr : elle aide à savoir ce qui est présent et à accélérer les investigations.

## Construire une SBOM qui sert en production

1. **Choisir le bon point de génération.** Produisez la SBOM dans le pipeline à partir de l’artefact livré ou de l’image de conteneur finale. Une SBOM calculée uniquement depuis le dépôt peut manquer des paquets système, des étapes de build ou des composants ajoutés à l’image.
2. **Inclure les dépendances transitives.** Les bibliothèques indirectes peuvent être vulnérables même si l’application ne les importe pas directement.
3. **Associer chaque SBOM à une version immuable.** Conservez le digest d’image, le commit, le numéro de build et l’environnement de déploiement.
4. **Stocker et retrouver les SBOM.** Elles doivent pouvoir être interrogées lors d’une alerte, d’un audit ou d’un incident.
5. **Automatiser la comparaison avec les avis.** Reliez les composants et versions aux bases de vulnérabilités, puis vérifiez le périmètre et les conditions d’exploitation avant de décider.

## Du CVE à la décision

Lorsqu’un avis de sécurité apparaît, la SBOM aide à répondre à trois questions : le composant est-il présent, quelle version est livrée et quels artefacts sont concernés? Il faut ensuite confirmer si le code vulnérable est atteignable, si une configuration particulière est nécessaire et si un correctif ou une version atténuée existe.

Une alerte de dépendance n’est pas une preuve d’exploitation. À l’inverse, une absence d’alerte ne garantit pas l’absence de risque : les bases peuvent être incomplètes, les noms de paquets ambigus ou les versions corrigées publiées avec un délai.

## Contrôles à intégrer au pipeline

- Générer la SBOM de manière reproductible et l’archiver avec l’artefact.
- Scanner les dépendances directes et transitives à chaque pull request et lors de la construction de l’image.
- Bloquer automatiquement seulement selon une politique explicite, avec des seuils documentés et une procédure d’exception.
- Exiger un responsable et une échéance pour les vulnérabilités acceptées temporairement.
- Vérifier que le correctif est réellement présent dans l’image déployée.
- Réexaminer régulièrement les dépendances abandonnées et les composants dont la provenance est incertaine.

## Limites

Une SBOM est un inventaire, pas un audit de code, une attestation d’intégrité ou une certification de sécurité. Sa valeur dépend de son exactitude, de sa fraîcheur, de la couverture des composants et de la capacité de l’organisation à agir sur les alertes.

## À retenir

L’objectif n’est pas de produire un fichier SBOM pour la conformité puis de l’oublier. Il faut relier chaque inventaire à un artefact précis, aux avis de sécurité et à une procédure de remédiation mesurable.

## Source primaire

[CISA — Software Bill of Materials](https://www.cisa.gov/sbom)
