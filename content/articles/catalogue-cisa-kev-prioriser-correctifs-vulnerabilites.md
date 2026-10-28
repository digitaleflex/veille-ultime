---
slug: "catalogue-cisa-kev-prioriser-correctifs-vulnerabilites"
title: "CISA KEV : une méthode concrète pour prioriser les correctifs de sécurité"
seoTitle: "CISA KEV : prioriser les correctifs selon l’exploitation réelle"
seoDescription: "Apprenez à croiser le catalogue CISA KEV avec l’inventaire, l’exposition et les correctifs disponibles pour construire une file de remédiation défendable."
keywords: "CISA KEV, vulnérabilités exploitées, gestion des correctifs, CVE, priorisation sécurité"
category: "Cybersécurité"
publishedAt: "2026-10-28"
sourceName: "CISA — Known Exploited Vulnerabilities Catalog"
sourceUrl: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog"
excerpt: "Le catalogue KEV de CISA répertorie les vulnérabilités pour lesquelles une exploitation dans la nature est connue. Croisé avec l’inventaire et l’exposition, il aide à prioriser les correctifs."
takeaways:
  - "Un CVE présent dans KEV mérite une priorité élevée, mais l’exposition locale reste à vérifier."
  - "Relier chaque CVE aux actifs, à un responsable, à une échéance et à une preuve de correction."
  - "Ne pas confondre score de sévérité, exploitation connue et impact métier."
---

## À quoi sert le catalogue KEV

Le catalogue **Known Exploited Vulnerabilities (KEV)** de la CISA recense les vulnérabilités pour lesquelles l’agence dispose d’éléments indiquant une exploitation active. Il apporte un signal utile pour la gestion des correctifs : une vulnérabilité connue comme exploitée ne doit pas être traitée comme une simple entrée de backlog classée uniquement par score CVSS.

Le catalogue n’est toutefois pas un inventaire des systèmes vulnérables de votre organisation. Il faut encore déterminer si le produit, la version et la configuration concernés sont présents dans votre environnement.

## Une méthode de priorisation exploitable

**1. Synchroniser les données.** Importez le catalogue KEV depuis la source officielle et conservez la date de dernière synchronisation. Associez les entrées aux identifiants CVE de votre outil de gestion des vulnérabilités.

**2. Croiser avec l’inventaire.** Reliez chaque produit détecté à un actif, une version, un environnement, un propriétaire et son exposition réseau. Une correspondance de nom approximative ne suffit pas : vérifiez l’éditeur, le produit et la version.

**3. Déterminer l’urgence.** Donnez une priorité élevée aux actifs réellement concernés par une CVE KEV, en augmentant encore l’urgence si le service est exposé à Internet, détient des données sensibles ou permet un mouvement latéral. Le CVSS reste utile, mais ne remplace pas ces éléments de contexte.

**4. Choisir une mesure vérifiable.** Appliquez le correctif fournisseur, désactivez temporairement la fonction affectée ou isolez le service si aucune mise à jour immédiate n’est possible. Toute mesure compensatoire doit avoir un propriétaire et une date d’expiration.

**5. Vérifier la correction.** Confirmez la version déployée par une nouvelle analyse, un inventaire de paquets ou une preuve équivalente. Fermer un ticket sans vérifier le système ne constitue pas une remédiation.

## Exemple de file de travail

Pour chaque vulnérabilité retenue, suivez au minimum : CVE, produit et version détectés, actif concerné, criticité métier, exposition, statut de correctif, responsable, échéance, mesure temporaire et preuve de clôture. Cela permet de justifier pourquoi une vulnérabilité est traitée avant une autre et de repérer les exceptions qui vieillissent.

## Limites et erreurs fréquentes

- **Traiter KEV comme une preuve d’exploitation interne.** Le catalogue indique une exploitation connue quelque part; il ne prouve pas qu’un actif local a été attaqué.
- **Ignorer les actifs inconnus.** L’absence de correspondance peut signaler un inventaire incomplet, pas l’absence de risque.
- **Automatiser sans contrôle.** Une mise à jour automatique peut casser une application; testez les changements selon leur criticité.
- **Laisser les exceptions sans date.** Une mitigation temporaire doit être suivie jusqu’à sa suppression.

## À retenir

Utilisez KEV comme un signal fort, puis reliez-le à l’inventaire, à l’exposition et à la capacité de remédiation. Le résultat attendu est une file de correctifs traçable et vérifiable, pas seulement une liste de CVE triée par score.

## Source primaire

[CISA — Known Exploited Vulnerabilities Catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog)
