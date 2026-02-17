// Génère vecteurs.json — word embeddings synthétiques pour le TD Pedantle
// Les mots sont regroupés par catégories sémantiques.
// Les mots d'une même catégorie ont des vecteurs proches.

const DIMENSIONS = 20;

const categories = {
    animaux: [
        "chat", "chien", "souris", "rat", "lapin", "cheval", "vache", "cochon",
        "mouton", "poule", "canard", "lion", "tigre", "ours", "loup", "renard",
        "cerf", "aigle", "serpent", "poisson", "dauphin", "baleine", "requin",
        "tortue", "grenouille", "araignée", "abeille", "papillon", "fourmi", "hibou",
    ],
    nourriture: [
        "pain", "fromage", "beurre", "lait", "oeuf", "viande", "poulet", "poisson",
        "riz", "pâtes", "soupe", "salade", "tomate", "pomme", "banane", "orange",
        "fraise", "raisin", "cerise", "citron", "chocolat", "gâteau", "tarte",
        "glace", "bonbon", "sucre", "sel", "poivre", "huile", "farine",
    ],
    nature: [
        "arbre", "fleur", "herbe", "forêt", "jardin", "montagne", "colline",
        "rivière", "lac", "mer", "océan", "plage", "île", "désert", "prairie",
        "soleil", "lune", "étoile", "nuage", "pluie", "neige", "vent", "orage",
        "arc-en-ciel", "aurore", "crépuscule", "brouillard", "rosée", "tempête", "éclair",
    ],
    maison: [
        "porte", "fenêtre", "mur", "toit", "sol", "plafond", "escalier",
        "cuisine", "chambre", "salon", "salle", "jardin", "garage", "cave",
        "grenier", "balcon", "terrasse", "couloir", "entrée", "bureau",
        "table", "chaise", "lit", "armoire", "canapé", "lampe", "miroir",
        "rideau", "tapis", "étagère",
    ],
    transport: [
        "voiture", "vélo", "moto", "bus", "train", "métro", "tramway",
        "avion", "hélicoptère", "bateau", "navire", "ferry", "taxi",
        "camion", "ambulance", "route", "autoroute", "gare", "aéroport",
        "port", "pont", "tunnel", "carrefour", "feu", "roue", "moteur",
        "essence", "volant", "frein", "vitesse",
    ],
    corps: [
        "tête", "visage", "oeil", "nez", "bouche", "oreille", "cheveux",
        "main", "doigt", "bras", "épaule", "coude", "poignet", "jambe",
        "genou", "pied", "dos", "ventre", "coeur", "poumon", "cerveau",
        "os", "muscle", "peau", "sang", "dent", "langue", "ongle", "cou", "poitrine",
    ],
    emotions: [
        "joie", "tristesse", "colère", "peur", "surprise", "dégoût",
        "amour", "haine", "espoir", "désespoir", "fierté", "honte",
        "jalousie", "envie", "gratitude", "culpabilité", "nostalgie",
        "ennui", "curiosité", "émerveillement", "angoisse", "sérénité",
        "enthousiasme", "mélancolie", "tendresse", "rage", "bonheur",
        "malheur", "plaisir", "douleur",
    ],
    metiers: [
        "médecin", "professeur", "avocat", "ingénieur", "architecte",
        "boulanger", "boucher", "cuisinier", "serveur", "coiffeur",
        "plombier", "électricien", "maçon", "menuisier", "peintre",
        "musicien", "acteur", "journaliste", "photographe", "écrivain",
        "policier", "pompier", "pilote", "marin", "agriculteur",
        "dentiste", "pharmacien", "infirmier", "chirurgien", "chercheur",
    ],
    vetements: [
        "chemise", "pantalon", "robe", "jupe", "veste", "manteau",
        "pull", "chaussure", "botte", "sandale", "chapeau", "casquette",
        "écharpe", "gant", "ceinture", "cravate", "chaussette", "short",
        "maillot", "pyjama", "costume", "uniforme", "jean", "sweat",
        "blouson", "imperméable", "gilet", "lunettes", "montre", "bague",
    ],
    sciences: [
        "nombre", "calcul", "équation", "formule", "théorie", "hypothèse",
        "expérience", "résultat", "donnée", "mesure", "atome", "molécule",
        "cellule", "gène", "énergie", "force", "gravité", "lumière",
        "température", "pression", "vitesse", "masse", "volume",
        "électricité", "magnétisme", "chimie", "physique", "biologie",
        "mathématique", "informatique",
    ],
    ecole: [
        "élève", "étudiant", "classe", "cours", "examen", "note",
        "devoir", "exercice", "leçon", "cahier", "stylo", "crayon",
        "gomme", "règle", "tableau", "craie", "livre", "page",
        "chapitre", "paragraphe", "phrase", "mot", "lettre", "dictée",
        "lecture", "écriture", "récréation", "cantine", "bibliothèque", "diplôme",
    ],
    temps: [
        "seconde", "minute", "heure", "jour", "semaine", "mois",
        "année", "siècle", "matin", "midi", "soir", "nuit",
        "aube", "lever", "coucher", "instant", "moment", "époque",
        "passé", "présent", "futur", "hier", "demain", "aujourd'hui",
        "lundi", "mardi", "printemps", "été", "automne", "hiver",
    ],
    ville: [
        "rue", "avenue", "boulevard", "place", "parc", "bâtiment",
        "immeuble", "magasin", "restaurant", "café", "hôtel", "hôpital",
        "école", "église", "mairie", "cinéma", "théâtre", "musée",
        "stade", "piscine", "banque", "poste", "marché", "supermarché",
        "pharmacie", "boulangerie", "librairie", "fontaine", "statue", "monument",
    ],
    musique: [
        "chanson", "mélodie", "rythme", "harmonie", "note", "accord",
        "piano", "guitare", "violon", "flûte", "batterie", "trompette",
        "saxophone", "harpe", "orgue", "chant", "choeur", "orchestre",
        "concert", "opéra", "festival", "album", "disque", "radio",
        "micro", "son", "voix", "silence", "tempo", "refrain",
    ],
    sport: [
        "football", "tennis", "basket", "rugby", "natation", "athlétisme",
        "course", "marathon", "sprint", "saut", "lancer", "match",
        "équipe", "joueur", "entraîneur", "arbitre", "stade", "terrain",
        "ballon", "raquette", "filet", "but", "point", "victoire",
        "défaite", "champion", "médaille", "record", "compétition", "tournoi",
    ],
};

function genererVecteurBase(indexCategorie, totalCategories) {
    const vec = new Array(DIMENSIONS).fill(0);
    const angle = (indexCategorie / totalCategories) * Math.PI * 2;

    for (let d = 0; d < DIMENSIONS; d++) {
        vec[d] = Math.cos(angle + (d * Math.PI) / DIMENSIONS) * 0.5;
    }

    const primaryDim = indexCategorie % DIMENSIONS;
    vec[primaryDim] += 0.8;

    const secondaryDim = (indexCategorie * 3 + 7) % DIMENSIONS;
    vec[secondaryDim] += 0.4;

    return vec;
}

function ajouterBruit(vec, amplitude) {
    return vec.map(v => v + (Math.random() - 0.5) * amplitude);
}

function normaliser(vec) {
    const norme = Math.sqrt(vec.reduce((sum, v) => sum + v * v, 0));
    return norme > 0 ? vec.map(v => v / norme) : vec;
}

const nomsCategories = Object.keys(categories);
const vecteurs = {};
const dejaVu = new Set();

for (let i = 0; i < nomsCategories.length; i++) {
    const nomCat = nomsCategories[i];
    const mots = categories[nomCat];
    const base = genererVecteurBase(i, nomsCategories.length);

    for (let j = 0; j < mots.length; j++) {
        const mot = mots[j].toLowerCase();
        if (dejaVu.has(mot)) continue;
        dejaVu.add(mot);

        const bruitAmplitude = 0.15 + (j / mots.length) * 0.15;
        const vec = normaliser(ajouterBruit(base, bruitAmplitude));
        const vecArrondi = vec.map(v => Math.round(v * 10000) / 10000);
        vecteurs[mot] = vecArrondi;
    }
}

const chemin = "vecteurs.json";
await Bun.write(chemin, JSON.stringify(vecteurs, null, 2));

const nbMots = Object.keys(vecteurs).length;
console.log(`${nbMots} mots générés dans ${chemin}`);
console.log(`${nomsCategories.length} catégories : ${nomsCategories.join(", ")}`);
console.log(`Dimensions par vecteur : ${DIMENSIONS}`);
