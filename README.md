# Cours Web - Mines Paris 2025

Bienvenue dans le repository du cours de développement Web !

## Informations pratiques

* **Repository** : https://github.com/raphaelpra/cours-2025-web
* **Discord** : https://discord.gg/K7xUuxud
* **Horaires** : 13h45 - 17h00 (pause 15 min)

### Calendrier des séances

| # | Date |
|---|------|
| 1 | Mardi 10/02 |
| 2 | Mardi 17/02 |
| 3 | Vendredi 20/02 |
| 4 | Mardi 24/02 |
| 5 | Mardi 10/03 |
| | *vacances* |
| 6 | Mardi 24/03 |
| 7 | Mardi 31/03 |
| 8 | Mardi 07/04 |
| 9 | Mardi 21/04 |

---

## Première installation

### 1. Installer les outils

- **[Bun](https://bun.sh)** : notre runtime JavaScript → voir [BUN.md](BUN.md)
- **[Git](https://git-scm.com)** : gestion de versions → voir [GIT.md](GIT.md)
- **Un navigateur moderne** (Chrome ou Firefox)
- **Un éditeur de code** ([VS Code](https://code.visualstudio.com/) recommandé)

### 2. Cloner le repository

```bash
git clone git@github.com:raphaelpra/cours-2025-web.git
cd cours-2025-web
```

### 3. Vérifier que tout marche

```bash
bun --version
git --version
```

---

## Récupérer les nouveaux cours

Avant chaque séance :

```bash
cd cours-2025-web
git pull
```

Vos fichiers `perso*` sont automatiquement ignorés — pas de conflits.

### En cas de problème

```bash
git fetch --all
git reset --hard origin/master
```

> **Attention** : cette commande écrase tout sauf vos fichiers/dossiers `perso*`

---

## Fichiers personnels

Créez des fichiers ou dossiers commençant par `perso` — ils sont ignorés par git :

```
01-introduction/perso-notes.md
02-html-css/perso-index.html
perso/
perso/mon-projet/
```

Vos fichiers restent locaux, jamais envoyés sur GitHub, aucun risque de conflit.

---

## Structure du repository

```
.
├── README.md                # Ce fichier
├── BUN.md                   # Guide Bun
├── GIT.md                   # Guide Git
├── 01-introduction/         # ...
├── 02-<suspense>/           # ...
├── 03-<teaser>/             # ...
├── 04-<cliff-hanger>/       # ...
├── 05-<plot-twist>/         # ...
├── 06-<revelation>/         # ...
├── 07-<rebondissement>/     # ...
├── 08-<denouement>/         # ...
└── 09-<epilogue>/           # ...
```

---

## Ressources

* [MDN Web Docs](https://developer.mozilla.org/fr/) — la référence
* [Bun Documentation](https://bun.sh/docs)
* [Frontend](https://frontend.info-mines.paris) — cours frontend
* [Backend](https://backend.info-mines.paris) — cours backend

---

Bon cours !
