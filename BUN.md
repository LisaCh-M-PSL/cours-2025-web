# Bun — Guide d'installation

[Bun](https://bun.sh) est un runtime JavaScript ultra-rapide. On l'utilise tout au long du cours comme outil principal.

## Installation

### macOS / Linux

```bash
curl -fsSL https://bun.sh/install | bash
```

### Windows (Git Bash)

```bash
curl -fsSL https://bun.sh/install | bash
```

> Après l'installation, **redémarrer le terminal** pour que la commande `bun` soit disponible.

### Vérifier

```bash
bun --version
```

---

## Commandes essentielles

### Servir un fichier HTML

```bash
bun index.html
```

Lance un serveur de développement sur http://localhost:3000 avec rechargement automatique.

### Servir plusieurs fichiers HTML

```bash
bun ./**/*.html
```

### Exécuter un fichier JavaScript / TypeScript

```bash
bun run script.js
bun run script.ts
```

### Initialiser un projet

```bash
bun init
```

Crée un `package.json` et la structure de base.

### Installer des dépendances

```bash
bun install              # installe tout depuis package.json
bun add express          # ajoute un package
bun add -d vitest        # ajoute un package de dev
bun remove express       # supprime un package
```

### Lancer un script du package.json

```bash
bun run dev
bun run test
```

---

## Problèmes d'installation (Windows)

### Erreur `CRYPT_E_NO_REVOCATION_CHECK` avec curl

**Symptôme** : en lançant `curl -fsSL https://bun.sh/install | bash` dans Git Bash, vous obtenez :

```
schannel: next InitializeSecurityContext failed: CRYPT_E_NO_REVOCATION_CHECK (0x80092012)
- The revocation function was unable to check revocation for the certificate.
```

**Cause** : Windows utilise `schannel` pour les connexions HTTPS. Il tente de vérifier la révocation du certificat SSL (via CRL/OCSP), mais le réseau (proxy, pare-feu de l'école, antivirus) bloque cette vérification.

**Solutions** (dans l'ordre de préférence) :

#### Solution 1 — Installer via PowerShell (recommandé)

Ouvrir **PowerShell** (pas Git Bash) et lancer :

```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

`irm` (Invoke-RestMethod) ne passe pas par schannel de la même façon et n'est généralement pas bloqué.

> **Bun sera aussi disponible dans Git Bash** : l'installeur ajoute `%USERPROFILE%\.bun\bin` au `PATH` utilisateur Windows. Git Bash hérite de ce `PATH`. Il suffit de **relancer Git Bash** après l'installation.
>
> Si `bun` n'est pas trouvé dans Git Bash après redémarrage, ajouter dans `~/.bashrc` :
>
> ```bash
> export PATH="$HOME/.bun/bin:$PATH"
> ```

#### Solution 2 — Installer via npm

Si vous avez déjà Node.js / npm installé :

```bash
npm install -g bun
```

Le registry npm pose rarement ce problème de certificat.

#### Solution 3 — Désactiver la vérification de révocation (curl)

Si vous tenez à utiliser curl, ajoutez le flag `--ssl-no-revoke` :

```bash
curl --ssl-no-revoke -fsSL https://bun.sh/install | bash
```

Ce flag désactive uniquement la vérification de révocation du certificat (pas toute la vérification SSL).

### `bun` n'est pas reconnu après installation

**Symptôme** : `bun: command not found` ou `bun n'est pas reconnu en tant que commande interne`.

**Solutions** :

1. **Redémarrer le terminal** (Git Bash, PowerShell, cmd) — le `PATH` n'est rechargé qu'à l'ouverture d'un nouveau terminal.

2. **Vérifier que Bun est dans le PATH** :

   ```bash
   # Git Bash
   echo $PATH | tr ':' '\n' | grep -i bun
   ```

   ```powershell
   # PowerShell
   $env:PATH -split ';' | Select-String bun
   ```

3. **Ajouter manuellement au PATH** si absent :

   - Git Bash — ajouter dans `~/.bashrc` :

     ```bash
     export PATH="$HOME/.bun/bin:$PATH"
     ```

   - Windows — ajouter `%USERPROFILE%\.bun\bin` dans les variables d'environnement utilisateur (Paramètres → Système → Variables d'environnement).

### Problème de proxy / réseau d'entreprise

Si vous êtes derrière un proxy (réseau école, entreprise), les téléchargements peuvent échouer silencieusement.

**Configurer le proxy pour curl** (Git Bash) :

```bash
export HTTPS_PROXY=http://adresse-du-proxy:port
export HTTP_PROXY=http://adresse-du-proxy:port
curl -fsSL https://bun.sh/install | bash
```

**Configurer le proxy pour PowerShell** :

```powershell
$env:HTTPS_PROXY = "http://adresse-du-proxy:port"
powershell -c "irm bun.sh/install.ps1 | iex"
```

> Demandez l'adresse du proxy à votre administrateur réseau si nécessaire.

---

## Pourquoi Bun ?

- **Rapide** : démarrage quasi-instantané
- **Tout-en-un** : runtime + bundler + gestionnaire de packages + serveur de dev
- **Compatible** : exécute du JavaScript, TypeScript et JSX sans config
- **Simple** : `bun fichier.html` et c'est parti

---

## Ressources

- [Documentation officielle](https://bun.sh/docs)
- [HTML & sites statiques](https://bun.sh/docs/bundler/html-static)
