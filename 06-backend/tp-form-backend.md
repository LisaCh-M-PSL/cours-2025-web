# TP — Mini backend de formulaires avec Bun

**Objectif** : construire un serveur qui affiche un formulaire, reçoit les données, les stocke et les expose via une API.

---

## 🎯 Progression

| Étape | Durée estimée | Compétence |
|:------|:-------------|:-----------|
| 1 | 5 min | Serveur minimal qui répond |
| 2 | 10 min | Afficher du HTML |
| 3 | 15 min | Formulaire + POST |
| 4 | 20 min | Sauvegarde JSON |
| 5 | 10 min | API JSON |
| 6 | 15 min | Validation |

---

## Étape 0 — Mise en place

Créez le fichier de travail :

```bash
mkdir -p 06-backend/perso
touch 06-backend/perso/tp-form-backend.js
```

**Pour lancer votre serveur à chaque étape :**

```bash
bun run 06-backend/perso/tp-form-backend.js
```

💡 **Astuce** : en cas d'erreur `EADDRINUSE`, le port est déjà utilisé. Tuez le processus avec `Ctrl+C` ou changez de port.

---

## Étape 1 — Serveur minimal "Hello World"

**But** : vérifier que Bun fonctionne.

Dans `tp-form-backend.js` :

```javascript
Bun.serve({
  port: 3000,
  fetch(request) {
    return new Response("Hello depuis mon backend !")
  },
})

console.log("Serveur lancé sur http://localhost:3000")
```

**Test** : ouvrez `http://localhost:3000` dans votre navigateur.

✅ Vous devriez voir : `Hello depuis mon backend !`

---

## Étape 2 — Afficher une vraie page HTML

**But** : servir une page HTML au lieu d'un simple texte.

**2.1** — Modifiez la réponse pour renvoyer du HTML :

```javascript
const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Mon Backend</title>
</head>
<body>
  <h1>Bienvenue !</h1>
  <p>Mon premier serveur Bun 🚀</p>
</body>
</html>
`

return new Response(html, {
  headers: { "Content-Type": "text/html; charset=utf-8" }
})
```

**2.2** — Testez : actualisez la page, vous devriez voir une vraie page avec un titre.

💡 **Indice** : n'oubliez pas le `headers` avec `Content-Type`, sinon le navigateur affichera le HTML en texte brut.

---

## Étape 3 — Ajouter un formulaire

**But** : créer une page avec un formulaire de contact.

**3.1** — Modifiez le HTML pour inclure un formulaire :

```html
<body>
  <h1>Contactez-nous</h1>
  
  <form method="POST" action="/submit">
    <p>
      <label>Nom :<br>
        <input type="text" name="name" required>
      </label>
    </p>
    
    <p>
      <label>Email :<br>
        <input type="email" name="email" required>
      </label>
    </p>
    
    <p>
      <label>Message :<br>
        <textarea name="message" rows="4" required></textarea>
      </label>
    </p>
    
    <button type="submit">Envoyer</button>
  </form>
</body>
```

**3.2** — Testez : vous devriez voir un formulaire avec 3 champs.

**⚠️ Attention** : ne cliquez pas encore sur "Envoyer" — ça ne marchera pas car la route `/submit` n'existe pas !

---

## Étape 4 — Recevoir les données (POST /submit)

**But** : créer la route qui reçoit le formulaire.

**4.1** — Modifiez votre `fetch` pour gérer plusieurs routes :

```javascript
fetch(request) {
  const url = new URL(request.url)
  
  // Route principale : affiche le formulaire
  if (url.pathname === "/") {
    const html = `...votre HTML avec le formulaire...`
    return new Response(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" }
    })
  }
  
  // Route submit : reçoit le formulaire
  if (url.pathname === "/submit" && request.method === "POST") {
    // TODO : lire les données du formulaire
    return new Response("Formulaire reçu !")
  }
  
  // Si aucune route ne correspond
  return new Response("Page non trouvée", { status: 404 })
}
```

**4.2** — Lire les données avec `formData()` :

```javascript
if (url.pathname === "/submit" && request.method === "POST") {
  const formData = await request.formData()
  
  const name = formData.get("name")
  const email = formData.get("email")
  const message = formData.get("message")
  
  return new Response(`
    <h1>Merci ${name} !</h1>
    <p>Email : ${email}</p>
    <p>Message : ${message}</p>
    <a href="/">Retour</a>
  `, {
    headers: { "Content-Type": "text/html; charset=utf-8" }
  })
}
```

**4.3** — Testez : remplissez le formulaire, envoyez, vous devriez voir la page de confirmation.

---

## Étape 5 — Sauvegarder dans un fichier JSON

**But** : conserver les soumissions entre deux lancements du serveur.

**5.1** — Créez une fonction pour lire les soumissions :

```javascript
const dataFile = new URL("./submissions.json", import.meta.url)

async function loadSubmissions() {
  try {
    const file = Bun.file(dataFile)
    const text = await file.text()
    return JSON.parse(text)
  } catch {
    // Le fichier n'existe pas encore → tableau vide
    return []
  }
}
```

**5.2** — Créez une fonction pour sauvegarder :

```javascript
async function saveSubmission(entry) {
  const submissions = await loadSubmissions()
  
  submissions.push({
    ...entry,
    createdAt: new Date().toISOString()
  })
  
  await Bun.write(
    dataFile, 
    JSON.stringify(submissions, null, 2)
  )
}
```

**5.3** — Utilisez dans la route `/submit` :

```javascript
if (url.pathname === "/submit" && request.method === "POST") {
  const formData = await request.formData()
  
  await saveSubmission({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message")
  })
  
  return new Response(`
    <h1>Merci !</h1>
    <p>Votre message a été sauvegardé.</p>
    <a href="/">Retour</a>
  `, { headers: { "Content-Type": "text/html; charset=utf-8" }})
}
```

**5.4** — Testez : envoyez plusieurs formulaires, puis vérifiez le fichier `submissions.json` créé à côté de votre script.

---

## Étape 6 — Créer une API JSON

**But** : exposer les données via une URL en JSON.

**6.1** — Ajoutez une nouvelle route `/api/submissions` :

```javascript
// Route API : renvoie les soumissions en JSON
if (url.pathname === "/api/submissions" && request.method === "GET") {
  const submissions = await loadSubmissions()
  return Response.json({
    count: submissions.length,
    items: submissions
  })
}
```

**6.2** — Testez avec curl :

```bash
curl http://localhost:3000/api/submissions
```

✅ Vous devriez voir les données au format JSON.

---

## Étape 7 — Validation (optionnel mais recommandé)

**But** : refuser les formulaires incomplets.

**7.1** — Dans `/submit`, ajoutez des vérifications :

```javascript
const name = formData.get("name")?.trim()
const email = formData.get("email")?.trim()
const message = formData.get("message")?.trim()

if (!name || !email || !message) {
  return new Response(
    "Tous les champs sont obligatoires", 
    { status: 400 }
  )
}

// Optionnel : vérifier que l'email contient @
if (!email.includes("@")) {
  return new Response(
    "Email invalide",
    { status: 400 }
  )
}
```

**7.2** — Testez : essayez d'envoyer un formulaire vide.

---

## 🎉 Récapitulatif

Vous avez construit :

1. ✅ Un serveur HTTP avec Bun
2. ✅ Une page HTML avec formulaire
3. ✅ Une route POST qui reçoit les données
4. ✅ Une sauvegarde persistante en JSON
5. ✅ Une API REST qui expose les données
6. ✅ Une validation des données

---

## 🚀 Bonus (si vous avez fini)

**Bonus 1** — Afficher les soumissions en HTML

Créez une route `/submissions` qui affiche toutes les entrées sous forme de liste HTML.

**Bonus 2** — Champ "type"

Ajoutez un `<select>` au formulaire pour le type : `contact`, `feedback`, `inscription`.

**Bonus 3** — Filtrer par type

Ajoutez un paramètre à l'API :
```
GET /api/submissions?type=feedback
```

**Bonus 4** — CSS

Ajoutez du style au formulaire (inline ou via une route CSS séparée).

**Bonus 5** — Supprimer une soumission

Ajoutez une route `DELETE /api/submissions/:id` (nécessite un identifiant unique par soumission).

---

## 🔧 Commandes de test

```bash
# Test de l'API avec curl
curl http://localhost:3000/api/submissions

# Envoi avec curl
curl -X POST http://localhost:3000/submit \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "name=Test&email=test@example.com&message=Hello"

# Voir le fichier JSON
cat 06-backend/perso/submissions.json | jq
```

---

## 📚 Ressources utiles

- Exemples complets : `06-backend/demos/04-html-form.js` à `07-json-api.js`
- Snippets de référence : `06-backend/cours/snippets/`
- Support cours : `06-backend/cours.md`
