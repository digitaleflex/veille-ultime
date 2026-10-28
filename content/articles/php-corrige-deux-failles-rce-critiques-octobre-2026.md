---
slug: "php-corrige-deux-failles-rce-critiques-octobre-2026"
title: "PHP corrige deux vulnérabilités critiques RCE : versions et plan d’urgence"
seoTitle: "PHP : deux failles RCE critiques corrigées en octobre 2026"
seoDescription: "PHP a corrigé CVE-2026-109618 et CVE-2026-109619 dans les versions 8.5.12, 8.4.27, 8.3.36 et 8.2.35. Voici les actions prioritaires."
keywords: "PHP sécurité, CVE-2026-109618, CVE-2026-109619, RCE, PHP-FPM, mod_php"
category: "Cybersécurité"
publishedAt: "2026-10-21"
sourceName: "PHP.net — avis de sécurité officiel"
sourceUrl: "https://www.php.net/archive/2026.php#2026-10-21-5"
excerpt: "Le 21 octobre 2026, PHP a publié des correctifs pour deux vulnérabilités critiques susceptibles de permettre une exécution de code à distance sans authentification. Le projet recommande une mise à jour immédiate."
takeaways:
  - "Versions corrigées : PHP 8.5.12, 8.4.27, 8.3.36 et 8.2.35."
  - "L’avis officiel précise qu’aucune mitigation complète ne remplace la mise à jour."
  - "Vérifier les versions dans les conteneurs, les hébergements managés et les environnements Windows."
---

## L’alerte

Le 21 octobre 2026, l’équipe PHP a publié des correctifs pour **CVE-2026-109618** et **CVE-2026-109619**, deux vulnérabilités critiques susceptibles de permettre une exécution de code à distance sans authentification. L’avis officiel recommande de mettre à jour immédiatement et précise qu’aucune mesure de mitigation complète ne remplace le correctif.

Les versions corrigées annoncées sont PHP 8.5.12, 8.4.27, 8.3.36 et 8.2.35. Le projet signale un risque pour les installations servant des requêtes web, notamment PHP-FPM, Apache avec mod_php, php-cgi, FrankenPHP et LiteSpeed. Le niveau de risque dépend du mode d’intégration et de la configuration.

## Ce que décrivent les avis techniques

- **CVE-2026-109618 — corruption liée à un échec mémoire :** un chemin de gestion d’erreur pouvait laisser des données internes de requête partiellement initialisées, ensuite utilisées pendant le nettoyage.
- **CVE-2026-109619 — état global périmé :** un état interne associé à une requête pouvait subsister alors que la mémoire correspondante avait été libérée.

Ces résumés sont synthétiques. Les détails techniques et les mitigations limitées sont décrits dans les avis liés depuis le site PHP; consultez-les avant de modifier la configuration de production.

## Plan d’action prioritaire

**1. Inventorier le runtime réel.** Relevez la version exécutée par chaque service, pas seulement celle installée sur le poste de développement. Vérifiez PHP-FPM, Apache, les images de conteneurs, les tâches planifiées, les panneaux d’hébergement et les binaires Windows.

**2. Appliquer la version corrigée.** Mettez à jour vers la version corrigée de la branche supportée. Si PHP est fourni par une distribution ou un hébergeur, vérifiez son avis et ses rétroportages plutôt que de comparer uniquement le numéro amont.

**3. Redémarrer et confirmer.** Redémarrez les workers concernés et vérifiez la version réellement chargée. Une mise à jour du paquet sans redémarrage peut laisser d’anciens processus actifs.

**4. Encadrer les exceptions.** Si une mise à jour immédiate est impossible, documentez le responsable, le délai, l’exposition et les mesures temporaires explicitement proposées par l’avis officiel. Ne présentez pas ces mesures comme équivalentes au correctif.

**5. Vérifier les indices d’incident.** Examinez les journaux web, applicatifs et système sur la période d’exposition. L’absence d’alerte ne prouve pas à elle seule qu’aucune exploitation n’a eu lieu.

## Attention à PHP 8.2

PHP 8.2 atteint sa fin de vie le 31 décembre 2026 et ne recevra ensuite plus de correctifs de sécurité du projet. Planifiez la migration vers une branche maintenue, avec tests de compatibilité et procédure de retour arrière.

## À retenir

Vérifiez chaque runtime PHP qui reçoit des requêtes, déployez la version corrigée adaptée et confirmez le redémarrage des processus. Les réglages temporaires ne doivent pas repousser indéfiniment la mise à jour.

## Sources primaires

- [PHP — avis de sécurité du 21 octobre 2026](https://www.php.net/archive/2026.php#2026-10-21-5)
- [PHP — archive officielle des annonces 2026](https://www.php.net/archive/2026.php)
