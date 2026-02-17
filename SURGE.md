# Héberger un site avec Surge

## C'est quoi l'hébergement statique ?

Votre fichier HTML fonctionne en local (dans votre navigateur), mais personne d'autre ne peut le voir. Pour le rendre accessible à tout le monde, il faut le **mettre sur un serveur** — c'est l'hébergement.

Un **hébergement statique** sert des fichiers tels quels (HTML, CSS, JS, images) sans traitement côté serveur. Pas de base de données, pas de PHP — juste vos fichiers envoyés au navigateur du visiteur.

[Surge](https://surge.sh) est un outil en ligne de commande qui permet de publier un site statique en une seule commande, gratuitement.

---

## Installation

Surge n'a pas besoin d'être installé. On le lance avec `bunx` :

```bash
bunx surge
```

### C'est quoi `bunx` ?

`bunx` permet d'**exécuter un outil JavaScript sans l'installer** sur votre machine. La première fois, il télécharge automatiquement l'outil (ici `surge`) dans un cache temporaire, puis le lance. Les fois suivantes, c'est instantané.

C'est l'équivalent de `npx` (pour ceux qui connaissent Node.js). On utilise `bunx` parce qu'on utilise Bun comme runtime.

> **En résumé** : `bunx surge` = "télécharge surge si besoin, puis lance-le".

---

## Publier un site

### 1. Se placer dans le dossier à publier

```bash
cd 01-introduction
```

### 2. Lancer surge

```bash
bunx surge
```

Surge va vous demander :

1. **Email + mot de passe** (création de compte automatique la première fois)
2. **Le dossier à publier** — appuyez sur Entrée pour confirmer le dossier courant
3. **Le nom de domaine** — Surge propose un nom aléatoire (ex: `funny-rabbit.surge.sh`). Vous pouvez le modifier avant de valider.

```
   Running as alice@mines-paris.fr
        project: /home/alice/cours-2025-web/01-introduction
         domain: funny-rabbit.surge.sh
         upload: [====================] 100%
   CDN: [====================] 100%
            IP: 138.197.235.123

   Success! - Published to funny-rabbit.surge.sh
```

C'est tout ! Votre site est en ligne.

### 3. Vérifier

Ouvrez l'URL dans votre navigateur en ajoutant le nom de votre fichier HTML :

`https://funny-rabbit.surge.sh/perdu.html`

> Pourquoi `/perdu.html` ? Voir la section [Publier le "perdu"](#publier-le-perdu-du-cours-1) plus bas — on y explique la différence avec `index.html`.

### À propos du nom de domaine

Surge vous propose un nom **aléatoire** (du style `funny-rabbit.surge.sh`). Ça peut arriver que le nom proposé soit **déjà pris** par quelqu'un d'autre — dans ce cas, effacez-le et tapez-en un autre avant de valider.

Vous pouvez aussi choisir directement votre nom en le passant en argument :

```bash
bunx surge . alice-perdu.surge.sh
```

Le nom doit être unique sur tout Surge. Soyez créatifs !

---

## Publier le "perdu" du cours 1

### Premier déploiement : publier tel quel

```bash
cd 01-introduction
bunx surge .
```

Allez sur l'URL que Surge vous a donnée, par exemple `https://funny-rabbit.surge.sh`.

**Vous tombez sur une page vide ou une erreur.** C'est normal ! Le dossier contient `perdu.html`, mais quand on visite un site à la racine (`/`), le serveur cherche un fichier nommé **`index.html`** — et il n'existe pas.

Pour voir votre page, il faut ajouter le nom du fichier dans l'URL :

👉 `https://funny-rabbit.surge.sh/perdu.html`

Ça marche ! Mais c'est pas très pratique de devoir taper `/perdu.html` à chaque fois…

### Second déploiement : avec un `index.html`

La convention sur le web : quand on visite `https://mon-site.com/`, le serveur sert automatiquement le fichier `index.html`. C'est la **page d'accueil** par défaut.

Pour que notre page s'affiche directement, il suffit de la copier avec le bon nom :

```bash
cd 01-introduction
cp perdu.html index.html
bunx surge . funny-rabbit.surge.sh
```

> On repasse le même nom de domaine pour **mettre à jour** le site existant (pas en créer un nouveau).

Maintenant, visitez `https://funny-rabbit.surge.sh` — votre page s'affiche directement !

**En résumé :**
- `perdu.html` → accessible uniquement via `https://mon-site.surge.sh/perdu.html`
- `index.html` → s'affiche automatiquement quand on visite `https://mon-site.surge.sh/`

---

## Mettre à jour son site

Relancez la même commande avec le même domaine :

```bash
bunx surge . mon-site.surge.sh
```

Les fichiers sont écrasés par la nouvelle version.

---

## Supprimer son site

```bash
bunx surge teardown mon-site.surge.sh
```

---

## Résumé des commandes

```bash
bunx surge .                          # publier le dossier courant
bunx surge . mon-site.surge.sh        # publier avec un nom choisi
bunx surge teardown mon-site.surge.sh # supprimer un site
bunx surge list                       # lister ses sites publiés
bunx surge whoami                     # voir son compte
```

---

## Ressources

- [surge.sh](https://surge.sh) — site officiel
- [Surge Documentation](https://surge.sh/help/) — aide complète
