# Cours 02 — JavaScript

**Date :** Lundi 17 février 2025

---

## Objectifs

- Identifier ce qu'il manque pour faire un "vrai" site web
- Savoir héberger un site statique avec **Surge**
- Comprendre JavaScript comme **langage de programmation** à part entière
- Savoir exécuter du JS avec **Bun** (dans le terminal, comme Python)
- Maîtriser les bases : variables, types, fonctions, objets, classes
- Comprendre l'asynchronisme : promises, async/await
- Manipuler des fichiers et du JSON
- **TD** : Construire un jeu Pedantle en ligne de commande

---

## Déroulé (~3h)

1. Appel / rappel du cours précédent
2. Brainstorm : que manque-t-il pour faire un "vrai" site web ?
3. Héberger son site avec Surge
4. Découvrir JavaScript (syntaxe, types, fonctions)
5. Structures de données et objets (tableaux, classes)
6. *Pause*
7. Fichiers, JSON et asynchronisme
8. TD Pedantle

📖 Contenu détaillé du cours JS : [cours.md](cours.md)

---

### Brainstorm : que manque-t-il ? (~15 min)

> La semaine dernière on a fait une page HTML/CSS/JS. Qu'est-ce qu'il vous
> manque pour faire un "vrai" site web ?

Ouvrez le pad collaboratif et notez vos idées :

👉 **https://semestriel.framapad.org/p/cours-web-2026-ajnl?lang=fr**

Chacun ajoute au moins une chose qui lui manque (ou qu'il aimerait savoir faire) pour pouvoir construire un site web. On en discute ensemble.

### Héberger son site avec Surge (~15 min)

> Un fichier HTML sur votre ordi, c'est bien. Un site accessible par tout
> le monde, c'est mieux.

1. **Hébergement statique** : qu'est-ce que c'est ? (~5 min)
   - Vos fichiers (HTML/CSS/JS) sont envoyés tels quels au visiteur
   - Pas de serveur "intelligent" — juste un distributeur de fichiers
   - Gratuit et instantané avec [Surge](https://surge.sh)

2. **Démo : publier le "perdu" du cours 1** (~10 min)
   - Voir le guide complet : [SURGE.md](../SURGE.md)
   - ```bash
     cd 01-introduction
     bunx surge .
     ```
   - Choisir un nom, voir son site en ligne !
   - **Exercice** : chaque élève publie sa version de `perdu.html`

---

## Fichiers de la séance

| Fichier | Description |
|---------|-------------|
| `cours.md` | Contenu détaillé du cours JS |
| `cours/` | Démos JS exécutables indépendamment |
| `td-pedantle.md` | Énoncé du TD |
| `pedantle/` | Fichiers du TD Pedantle |

---

## Pour la prochaine fois

- [ ] Terminer le TD Pedantle si pas fini en cours
- [ ] Lire [Débuter avec JavaScript](https://ue22-p24-web.surge.sh/cours3/commencer-js/) — reprend les bases vues en cours avec plus de détails
- [ ] Lire [JavaScript by examples](https://frontend.info-mines.paris/js-by-examples-nb/) — exemples commentés
- [ ] *(optionnel)* Expérimenter : écrivez un script qui lit un fichier CSV et le convertit en JSON

---

## Pour aller plus loin

- [javascript.info](https://javascript.info/) — tutoriel complet et progressif
- [Execute Program](https://www.executeprogram.com/) — exercices interactifs pour apprendre JS par la pratique
