# JavaScript — Contenu du cours

Chaque fichier dans `cours/` est exécutable indépendamment :

```bash
bun run cours/01-variables-types.js
bun run cours/02-fonctions.js
# etc.
```

---

## Partie 1 — Découvrir JavaScript (~45 min)

> JavaScript n'est pas "juste pour les pages web". C'est un **langage complet**,
> comme Python ou C, qui se lance dans un terminal avec `bun`.

### Rappel express : qu'est-ce que JavaScript ? (~5 min)

- Créé en 1995, standardisé (ECMAScript), omniprésent
- À l'origine dans le navigateur, mais aujourd'hui un langage généraliste (Node.js 2009, Bun 2022)
- 📖 [Un peu d'histoire](https://ue22-p24-web.surge.sh/cours3/commencer-js/#1-un-peu-dhistoire)

### Bun : notre runtime JS (~10 min)

- Pourquoi Bun ? (rapide, batteries incluses, TypeScript natif)
- `bun run script.js` — exécuter un fichier (comme `python script.py`)
- `bun repl` — mode interactif (comme `python` sans argument)
- Démo : `cours/01-variables-types.js`

### Les bases de la syntaxe (~30 min)

- Variables : `let`, `const` (jamais `var` !)
- Types : `number`, `string`, `boolean`, `null`, `undefined`
- Template strings : `` `Bonjour ${nom}` `` (comme les f-strings Python)
- Fonctions classiques et arrow functions `=>`
- Comparaison : `==` vs `===` (toujours utiliser `===`)
- Structures de contrôle : `if`, `for`, `while`, `for...of`
- 📖 [Vue d'ensemble du langage](https://frontend.info-mines.paris/js-language-overview-nb/)
- 📖 [Les bases de la syntaxe](https://ue22-p24-web.surge.sh/cours3/commencer-js/#3-les-bases-de-la-syntaxe)
- Démos : `cours/01-variables-types.js`, `cours/02-fonctions.js`

## Partie 2 — Structures de données et objets (~30 min)

### Tableaux et objets (~15 min)

- Arrays : `[]`, `push`, `pop`, `map`, `filter`, `find`
- Objets : `{}`, clés/valeurs, destructuring
- `Map` et `Set` (équivalents de `dict` et `set` en Python)
- Spread operator `...`
- 📖 [Types natifs de JS](https://frontend.info-mines.paris/builtin-types-nb/)
- Démos : `cours/03-tableaux.js`, `cours/04-objets.js`

### Classes (~15 min)

- `class`, `constructor`, `this`
- Héritage avec `extends` et `super`
- Propriétés privées `#`
- Getters/setters
- 📖 [Les classes](https://ue22-p24-web.surge.sh/cours3/commencer-js/#6-les-classes-en-javascript)
- Démos : `cours/05-classes.js`, `cours/06-map-set.js`

## _Pause_ (~15 min)

## Partie 3 — Fichiers, JSON et asynchronisme (~30 min)

### Lire et écrire des fichiers (~15 min)

- `Bun.file()` et `await file.text()`
- `Bun.write()` pour écrire
- `JSON.parse()` / `JSON.stringify()`
- Modules ES : `import` / `export`
- `prompt()` pour lire l'entrée utilisateur
- Démos : `cours/07-fichiers.js`, `cours/08-prompt-modules.js`

### Asynchronisme : promises et async/await (~15 min)

- Pourquoi l'asynchronisme ? (certaines opérations sont lentes : réseau, disque)
- `fetch()` — récupérer des données depuis une URL
- Promises et `.then()` / `.catch()`
- `async` / `await` — la syntaxe moderne et lisible
- `Promise.all()` — lancer plusieurs opérations en parallèle
- 📖 [L'asynchronisme en JS](https://frontend.info-mines.paris/async-nb/)
- Démo : `cours/09-async.js`

## Partie 4 — TD Pedantle (~1h+)

**TD : Pedantle en ligne de commande**

Construire un jeu de devinettes sémantiques → [td-pedantle.md](td-pedantle.md)

---

## Ressources

### Cours de référence (à lire/parcourir)

- [Débuter avec JavaScript](https://ue22-p24-web.surge.sh/cours3/commencer-js/) — bases de la syntaxe, fonctions, classes
- [JavaScript by examples](https://frontend.info-mines.paris/js-by-examples-nb/) — exemples commentés
- [Vue d'ensemble du langage](https://frontend.info-mines.paris/js-language-overview-nb/) — syntaxe, variables, fonctions, classes
- [Types natifs](https://frontend.info-mines.paris/builtin-types-nb/) — number, string, array, object, Map, Set
- [Asynchronisme](https://frontend.info-mines.paris/async-nb/) — promises, async/await, fetch

### Documentation

- [MDN — JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript) — la référence
- [javascript.info](https://javascript.info/) — tutoriel complet et progressif
- [Bun Documentation](https://bun.sh/docs) — runtime et APIs

### Pour aller plus loin

- [JS vs Python](https://observablehq.com/@ballingt/javascript-for-python-programmers) — comparaison pour Pythonistes
