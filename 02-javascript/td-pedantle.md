# TD — Pedantle en ligne de commande

## Le jeu

[Pedantle](https://pedantle.certitudes.org/) est un jeu de devinettes sémantiques. Le principe :

1. Un **mot secret** est choisi au hasard
2. Le joueur propose des mots
3. Pour chaque proposition, le jeu indique un **score de proximité sémantique** (0 à 100)
4. Le but : trouver le mot secret en un minimum d'essais

La proximité sémantique est calculée grâce à des **word embeddings** (vecteurs de mots). L'idée : chaque mot est représenté par un vecteur de nombres. Les mots qui ont un sens proche (comme "chat" et "chien") ont des vecteurs proches.

> Exemple : "roi" est plus proche de "reine" que de "voiture", même si les lettres sont très différentes.

## Objectif du TD

Construire un Pedantle jouable dans le terminal, en JavaScript avec Bun.

**Concepts pratiqués :**
- Lecture de fichiers (`Bun.file`)
- JSON (`JSON.parse`)
- Fonctions et arrow functions
- Tableaux : `map`, `sort`, `filter`
- Boucle de jeu avec `prompt()`
- Calcul mathématique (similarité cosinus)

---

## Étape 0 — Préparer les données

Les word embeddings sont fournis. Lancez le script de préparation :

```bash
cd 02-javascript/pedantle
bun run genere-donnees.js
```

Cela crée un fichier `vecteurs.json` contenant ~500 mots français avec leurs vecteurs.

**Explorez le fichier :**

```bash
bun -e "const d = await Bun.file('vecteurs.json').json(); console.log(Object.keys(d).length, 'mots'); console.log(Object.keys(d).slice(0, 10))"
```

Le format est :
```json
{
  "chat": [0.12, -0.34, 0.56, ...],
  "chien": [0.15, -0.30, 0.52, ...],
  ...
}
```

Chaque mot est associé à un vecteur de 20 nombres.

---

## Étape 1 — Charger les vecteurs

Créez un fichier `pedantle.js` dans le dossier `pedantle/`.

```javascript
// Charger le fichier de vecteurs
const vecteurs = await Bun.file("vecteurs.json").json();

// Récupérer la liste des mots disponibles
const mots = Object.keys(vecteurs);
console.log(`${mots.length} mots chargés`);
```

Testez :
```bash
bun run pedantle.js
```

---

## Étape 2 — Similarité cosinus

La **similarité cosinus** mesure l'angle entre deux vecteurs. Elle vaut :
- **1** si les vecteurs pointent dans la même direction (mots identiques)
- **0** si les vecteurs sont perpendiculaires (mots sans rapport)
- **-1** si les vecteurs sont opposés

La formule :

```
                    A · B
cos(A, B) = ─────────────────
              ‖A‖ × ‖B‖
```

Où :
- `A · B` = somme des `a[i] * b[i]` (produit scalaire)
- `‖A‖` = racine carrée de la somme des `a[i]²` (norme)

**Implémentez la fonction :**

```javascript
function similariteCosinus(vecA, vecB) {
    // TODO : calculer et retourner la similarité cosinus
    // Indice : utilisez une boucle ou .reduce()
}
```

**Testez :**

```javascript
// Deux vecteurs identiques → similarité = 1
console.log(similariteCosinus([1, 0], [1, 0])); // 1

// Deux vecteurs perpendiculaires → similarité = 0
console.log(similariteCosinus([1, 0], [0, 1])); // 0

// Testez avec de vrais mots
console.log(similariteCosinus(vecteurs["chat"], vecteurs["chien"]));
console.log(similariteCosinus(vecteurs["chat"], vecteurs["voiture"]));
```

Les mots de la même catégorie (animaux, nourriture...) devraient avoir une similarité plus élevée.

---

## Étape 3 — Convertir en score 0–100

Le score de Pedantle va de 0 à 100. Convertissez la similarité cosinus (entre -1 et 1) :

```javascript
function score(vecA, vecB) {
    // TODO : retourner un entier entre 0 et 100
    // similarité -1 → score 0
    // similarité  1 → score 100
}
```

---

## Étape 4 — La boucle de jeu

C'est le cœur du programme. Le jeu :

1. Choisit un mot secret au hasard
2. Demande un mot au joueur
3. Calcule et affiche le score
4. Recommence jusqu'à ce que le joueur trouve

```javascript
// Choisir un mot secret
const motSecret = mots[Math.floor(Math.random() * mots.length)];

let essais = 0;

while (true) {
    const proposition = prompt("Votre mot :");

    // TODO :
    // 1. Vérifier que le mot existe dans le dictionnaire
    //    → sinon, afficher "Mot inconnu" et continuer
    // 2. Incrémenter le compteur d'essais
    // 3. Calculer le score
    // 4. Si score === 100, le joueur a gagné → afficher et break
    // 5. Sinon, afficher le score
}
```

**Testez le jeu :**
```bash
bun run pedantle.js
```

---

## Étape 5 — Afficher l'historique trié

Après chaque essai, affichez la liste de tous les mots essayés, triés par score décroissant.

```javascript
const historique = []; // { mot, score }

// Dans la boucle, après chaque essai :
historique.push({ mot: proposition, score: scoreActuel });

// Trier et afficher
// TODO : trier historique par score décroissant
// TODO : afficher chaque entrée
```

Exemple de sortie :

```
🎯 Votre mot : mer
   Score : 62

📊 Historique (3 essais) :
   72  océan
   62  mer
   34  maison
```

---

## Étape 6 — Couleurs dans le terminal

Ajoutez des couleurs pour rendre le jeu plus lisible. Bun supporte les codes ANSI :

```javascript
const ROUGE = "\x1b[31m";
const JAUNE = "\x1b[33m";
const VERT = "\x1b[32m";
const GRAS = "\x1b[1m";
const RESET = "\x1b[0m";

function colorerScore(score) {
    if (score >= 80) return `${VERT}${GRAS}${score}${RESET}`;
    if (score >= 50) return `${JAUNE}${score}${RESET}`;
    return `${ROUGE}${score}${RESET}`;
}
```

Utilisez `colorerScore()` dans l'affichage de l'historique.

---

## Bonus

### Bonus 1 — Indice "chaud/froid"

Après chaque essai, affichez un indicateur visuel :

```
Score : 85  🔥🔥🔥🔥
Score : 45  🔥🔥
Score : 12  ❄️
```

### Bonus 2 — Top 5 des mots les plus proches

Au début de la partie, calculez les 5 mots les plus proches du mot secret et affichez-les à la fin :

```
🏆 Vous avez trouvé "océan" en 12 essais !

Les 5 mots les plus proches étaient :
  99  mer
  95  vague
  89  plage
  85  eau
  80  bateau
```

### Bonus 3 — Mode défi

Ajoutez un argument CLI pour fixer le mot secret :

```bash
bun run pedantle.js --mot soleil
```

Utilisez `Bun.argv` pour lire l'argument.

### Bonus 4 — Statistiques

À la fin de chaque partie, sauvegardez les stats dans un fichier JSON :

```javascript
const stats = {
    parties: [...],
    moyenne_essais: 0,
};
```

Affichez les stats cumulées au lancement du jeu.

### Bonus 5 — Remplacer par de vrais word embeddings

Les vecteurs fournis sont synthétiques (générés par catégories). Pour utiliser de vrais word embeddings :

1. Téléchargez un modèle FastText français : https://fasttext.cc/docs/en/crawl-vectors.html
2. Écrivez un script qui extrait les N premiers mots du fichier `.vec`
3. Sauvegardez au format `vecteurs.json`

Le jeu fonctionnera tel quel avec les nouveaux vecteurs — la similarité cosinus sera plus fine et les résultats plus intéressants !

---

## Rappel des commandes

```bash
# Générer les données (une seule fois)
bun run genere-donnees.js

# Lancer le jeu
bun run pedantle.js

# Lancer en mode défi (bonus)
bun run pedantle.js --mot soleil
```
