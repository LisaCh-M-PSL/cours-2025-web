# Cours 06 — Support détaillé

Ce document accompagne les slides et le live coding.

> **Idée centrale** : Un backend, c'est juste un programme qui écoute sur un port, reçoit des requêtes, puis renvoie des réponses.

---

## Vocabulaire

- **Client** : envoie une requête
- **Serveur** : attend les requêtes
- **IP** : adresse d'une machine
- **Port** : porte d'entrée d'une application (0-65535)
- **Protocole** : règles communes de communication

```text
https://example.com:443/contact
│      │           │    └── chemin
│      │           └────── port (443 = HTTPS)
│      └────────────────── domaine
└───────────────────────── protocole
```

---

## Pattern Bun

```javascript
Bun.serve({
    port: 3000,
    fetch(request) {
        // request.url, request.method, request.headers
        return new Response("Réponse")
    },
})
```

---

## Réponse HTML ou JSON ?

```javascript
// HTML pour afficher dans le navigateur
return new Response("<h1>Merci !</h1>", {
    headers: { "Content-Type": "text/html; charset=utf-8" },
})

// JSON pour une API
return Response.json({ ok: true, count: 3 })
```

---

## Lire les données

### Query params
```javascript
const url = new URL(request.url)
const name = url.searchParams.get("name")
```

### Formulaire POST
```javascript
const formData = await request.formData()
const name = formData.get("name")
```

### Body JSON
```javascript
const body = await request.json()
```

---

## Sauvegarder (fichier JSON)

```javascript
// Lire
const data = JSON.parse(await Bun.file("data.json").text())

// Écrire
await Bun.write("data.json", JSON.stringify(data, null, 2))
```

---

## Tester

```bash
# Navigateur
http://localhost:3000

# curl
curl http://localhost:3000/hello?name=Ada
curl -X POST http://localhost:3000/submit -d '{"msg":"hello"}'

# UDP
nc -u -w1 127.0.0.1 4001
```

---

## Lancer les slides

```bash
cd 06-backend
bun slides        # ou : bun run cours/serve.ts
```

Puis ouvrir : http://localhost:3000/slides1.html

**⚠️ À propos de `build-slides`**

Si vous modifiez `cours/slides1.md`, il faut regénérer le HTML :

```bash
cd 06-backend
bun build-slides  # génère cours/slides1.html à partir de cours/slides1.md
```

Pas besoin de le faire pendant le cours — les slides sont déjà générées.

---

## Fichiers de démo (`06-backend/demos/`)

| Fichier | Concept |
|---------|---------|
| `01-first-server.js` | Serveur minimal |
| `02-routes-methods.js` | Routes et méthodes HTTP |
| `03-query-params.js` | Query params |
| `04-html-form.js` | Formulaire HTML |
| `05-post-body.js` | Recevoir un POST |
| `06-save-submissions.js` | Sauvegarde JSON |
| `07-json-api.js` | API REST |
| `08-udp-server.js` | Socket UDP |

---

## Montée en abstraction

1. Réseau → transporte des messages
2. TCP/UDP → stratégie de transport
3. HTTP → forme du dialogue
4. Bun → écrire le serveur
5. Logique métier → formulaire, validation, stockage, API
