---
slug: "sauvegardes-restauration-testee-resilience-entreprise"
title: "Sauvegardes : pourquoi une restauration testée vaut mieux qu’un simple statut vert"
seoTitle: "Sauvegarde et restauration : checklist de résilience informatique"
seoDescription: "Définir RPO et RTO, protéger les copies, tester la restauration et documenter la reprise pour réduire l’impact d’une panne ou d’un rançongiciel."
keywords: "sauvegarde, restauration, RPO, RTO, ransomware, résilience informatique"
category: "Cloud & DevOps"
publishedAt: "2026-10-28"
sourceName: "CISA — StopRansomware Guide"
sourceUrl: "https://www.cisa.gov/stopransomware/ransomware-guide"
excerpt: "Une sauvegarde n’est utile que si elle est récupérable dans le délai requis. La résilience exige des copies protégées, des objectifs de reprise et des exercices de restauration réguliers."
takeaways:
  - "Définir un RPO et un RTO pour chaque service métier important."
  - "Protéger au moins une copie contre la modification ou la suppression depuis l’environnement de production."
  - "Tester la restauration de bout en bout et mesurer le temps réellement nécessaire."
---

## Une sauvegarde n’est pas une preuve de reprise

Un tableau de bord peut indiquer que le dernier job de sauvegarde a réussi, sans prouver que les fichiers sont cohérents, que les clés sont disponibles ou que l’application peut redémarrer. Une copie peut aussi être supprimée par un compte compromis si elle partage les mêmes privilèges que la production.

La stratégie doit partir des besoins métier : quelle quantité de données peut être perdue et combien de temps le service peut rester indisponible?

## Définir deux objectifs

Le **RPO** (Recovery Point Objective) définit la perte de données maximale acceptable, exprimée comme un intervalle de temps. Le **RTO** (Recovery Time Objective) définit le délai cible pour rétablir le service. Ces objectifs peuvent varier selon les applications et doivent être validés avec les responsables métier.

Un service transactionnel critique peut nécessiter des sauvegardes plus fréquentes et une réplication, tandis qu’un site statique peut accepter une reprise plus simple. La réplication seule n’est pas une sauvegarde : une suppression ou une corruption peut se propager.

## Concevoir des copies résistantes

- Séparer les identités et permissions de sauvegarde de celles de la production.
- Protéger les copies contre la suppression ou la modification non autorisée, avec une isolation ou une immutabilité lorsque disponible.
- Chiffrer les sauvegardes et protéger les clés indépendamment.
- Conserver des copies dans un domaine de panne distinct adapté au risque.
- Inclure bases de données, fichiers, configurations, secrets nécessaires à la reprise et procédures d’exploitation, sans copier inutilement des secrets périmés.
- Documenter la rétention et vérifier que les exigences légales ou contractuelles sont respectées.

## Tester la restauration, pas seulement le job

Planifiez des exercices où une personne restaure réellement une sauvegarde dans un environnement isolé. Vérifiez l’intégrité des données, les migrations nécessaires, les accès, les dépendances externes et le comportement fonctionnel de l’application.

Mesurez le temps entre le début de l’exercice et le retour à un service utilisable. Comparez-le au RTO et documentez les blocages : accès manquants, documentation obsolète, volume de données, clés indisponibles ou dépendances qui ne peuvent être restaurées.

Après un incident de sécurité, ne restaurez pas automatiquement sur un système qui pourrait encore être compromis. Identifiez la cause, assainissez l’environnement et validez les sauvegardes avant de réintroduire les données.

## Checklist de validation

- [ ] Les RPO/RTO sont documentés et approuvés par le métier.
- [ ] Les sauvegardes sont chiffrées et les permissions sont séparées.
- [ ] Une copie est protégée contre la suppression par un compte de production compromis.
- [ ] Les restaurations sont testées à une fréquence définie.
- [ ] Les résultats et temps de reprise sont consignés.
- [ ] Les procédures sont accessibles même en cas d’indisponibilité du système principal.

## À retenir

La preuve de résilience est une restauration réussie et mesurée. Les sauvegardes doivent être protégées contre les mêmes scénarios qui pourraient détruire la production, puis testées comme une procédure opérationnelle.

## Source de référence

[CISA — StopRansomware Guide](https://www.cisa.gov/stopransomware/ransomware-guide)
