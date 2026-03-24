# Cours 06 — Introduction au réseau et au backend

**Date :** mardi 24 mars 2026

---

## Objectifs

- Comprendre pourquoi un site web dynamique a besoin d'un backend
- Comprendre le modèle client / serveur et les grandes couches réseau utiles pour le web
- Savoir relier **nom de domaine**, **IP**, **port**, **TCP/UDP** et **HTTP**
- Savoir créer un premier serveur HTTP avec **Bun**
- Savoir recevoir un formulaire HTML côté serveur et renvoyer une réponse
- Comprendre la différence entre une page HTML rendue par un serveur et une API JSON
- Voir qu'HTTP n'est qu'un protocole parmi d'autres avec un mini exemple **UDP + nc**

---

## Déroulé (~3h)

1. Appel / rappel du cours précédent
2. Pourquoi le frontend seul ne suffit pas
3. Cours : client / serveur, réseau, IP, DNS, ports, TCP/UDP
4. Cours : HTTP et formulaires
5. *Pause*
6. Live coding : premier serveur Bun, routes, formulaires, JSON
7. TP : mini backend de collecte de formulaires
8. Ouverture : serveur UDP + `nc`
9. Récap

---

### 1. Rappel (~5 min)

Rappel rapide des séances précédentes :
- HTML/CSS/JS pour faire des interfaces
- `fetch()` pour appeler une API
- `bun` comme runtime JS dans le terminal

Question de départ : **qu'est-ce qu'on ne sait toujours pas faire si on n'a que du frontend ?**

Exemples à faire émerger :
- mémoriser des données entre deux visites
- recevoir des formulaires
- authentifier des utilisateurs
- cacher une clé API
- avoir une logique commune pour tous les visiteurs

---

### 2. Pourquoi un backend ? (~15 min)

> Cours magistral, en s'appuyant sur les slides.

Use case fil rouge du cours :

> Un site affiche un formulaire de contact / inscription / feedback. Quand un visiteur l'envoie, le serveur reçoit les données, les valide, les stocke, puis renvoie une réponse.

Points clés :
- le navigateur de l'utilisateur ne doit pas être la seule source de vérité
- le serveur peut centraliser les données
- le serveur peut répondre différemment selon l'URL, la méthode ou les paramètres
- on peut répondre en **HTML** ou en **JSON**

---

### 3. Réseau utile pour le web (~35 min)

> Cours + schémas des slides.

Notions à faire passer :
- client / serveur
- nom de domaine → DNS → adresse IP
- port = numéro de porte d'entrée d'une application
- TCP = fiable, ordonné, plus coûteux
- UDP = simple, rapide, pas de garantie
- HTTP = protocole applicatif construit au-dessus de TCP

Animation suggérée :
- apparition progressive **nom de domaine → IP → port → requête HTTP**
- mini animation du handshake TCP en 3 temps

---

### 4. HTTP et formulaires (~25 min)

> Transition entre théorie réseau et vrai backend.

À montrer dans les slides :
- structure d'une requête HTTP
- méthodes `GET` et `POST`
- codes de retour `200`, `404`, `500`
- différence entre query string, headers, body
- formulaire HTML comme manière simple de fabriquer une requête `POST`

Commandes utiles :

```bash
curl http://localhost:3000
curl -X POST http://localhost:3000/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Ada","message":"Bonjour"}'
```

---

### *Pause* (~15 min)

---

### 5. Live coding Bun (~45 min)

> Démo exécutée en live, fichiers dans `demos/`.

Ordre conseillé :

1. **Premier serveur HTTP**
   ```bash
   bun run 06-backend/demos/01-first-server.js
   ```

2. **Routes + méthodes**
   ```bash
   bun run 06-backend/demos/02-routes-methods.js
   ```

3. **Query params**
   ```bash
   bun run 06-backend/demos/03-query-params.js
   ```

4. **Formulaire HTML**
   ```bash
   bun run 06-backend/demos/04-html-form.js
   ```

5. **Recevoir un POST**
   ```bash
   bun run 06-backend/demos/05-post-body.js
   ```

6. **Stocker des soumissions**
   ```bash
   bun run 06-backend/demos/06-save-submissions.js
   ```

7. **Exposer une API JSON**
   ```bash
   bun run 06-backend/demos/07-json-api.js
   ```

Messages clés :
- `Bun.serve()` démarre un serveur HTTP
- un handler reçoit une `Request` et renvoie une `Response`
- `await request.formData()` et `await request.json()` permettent de lire le body
- le serveur peut soit renvoyer du HTML, soit renvoyer du JSON

---

### 6. TP — Mini backend de formulaires (~35 min)

> Les élèves codent. Le prof circule.

📄 Énoncé : [tp-form-backend.md](tp-form-backend.md)

Objectif minimum :
- afficher un formulaire HTML
- recevoir les données avec `POST`
- renvoyer une page de confirmation

Objectif normal :
- stocker les soumissions dans un fichier JSON
- ajouter une route `/api/submissions` qui renvoie les données

Bonus :
- validation côté serveur
- filtre par type de formulaire (`contact`, `feedback`, `inscription`)

---

### 7. Ouverture — UDP + `nc` (~10 min)

> Pour montrer que le réseau ne se résume pas à HTTP.

```bash
bun run 06-backend/demos/08-udp-server.js
echo "ping" | nc -u -w1 127.0.0.1 4001
```

À expliquer :
- pas de page web ici
- pas de requête HTTP
- juste des datagrammes UDP envoyés à un port

---

### 8. Récap (~5 min)

- frontend = interface ; backend = logique + données + réponses
- URL = protocole + domaine + port + chemin
- HTTP = requête / réponse au-dessus de TCP
- un serveur Bun peut répondre en HTML ou en JSON
- un formulaire HTML est déjà une vraie requête HTTP
- UDP montre qu'il existe d'autres façons de communiquer sur le réseau

---

## Fichiers de la séance

| Fichier | Description |
|---------|-------------|
| `programme.md` | Ce document |
| `cours.md` | Support détaillé pour suivre le live coding |
| `tp-form-backend.md` | Énoncé du TP |
| `cours/slides1.md` | Slides du cours (support visuel) |
| `cours/build-slides.ts` | Générateur HTML de slides en Bun |
| `cours/serve.ts` | Serveur local pour les slides |
| `demos/01-first-server.js` | Premier serveur HTTP minimal |
| `demos/02-routes-methods.js` | Routes et méthodes HTTP |
| `demos/03-query-params.js` | Lecture des query params |
| `demos/04-html-form.js` | Formulaire HTML servi par Bun |
| `demos/05-post-body.js` | Lecture d'un body `POST` |
| `demos/06-save-submissions.js` | Sauvegarde de soumissions en JSON |
| `demos/07-json-api.js` | Mini API JSON |
| `demos/08-udp-server.js` | Serveur UDP pour test avec `nc` |

---

## Pour la prochaine fois

- [ ] Refaire les exemples `01` à `07` sans copier-coller
- [ ] Finir le TP si pas terminé en cours
- [ ] Tester les routes avec `curl`
- [ ] Relire les slides sur IP / DNS / ports / HTTP
- [ ] *(optionnel)* Modifier `demos/08-udp-server.js` pour répondre aussi au client
