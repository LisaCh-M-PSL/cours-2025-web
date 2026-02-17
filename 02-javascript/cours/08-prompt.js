// ============================================
// 08 — Arguments CLI et prompt
// Exécuter avec : bun run cours/08-prompt.js
// ============================================

// ------------------------------------------
// 1. Arguments de la ligne de commande
// ------------------------------------------

console.log("--- Arguments CLI ---");

// Bun.argv contient les arguments (comme sys.argv en Python)
// Bun.argv[0] = chemin vers bun
// Bun.argv[1] = chemin vers le script
// Bun.argv[2+] = arguments passés par l'utilisateur
console.log("Tous les arguments :", Bun.argv);
console.log("Arguments utilisateur :", Bun.argv.slice(2));

// Essayer : bun run cours/08-prompt-modules.js hello world
if (Bun.argv.length > 2) {
    console.log(`Premier argument : ${Bun.argv[2]}`);
} else {
    console.log("(Essayez : bun run cours/08-prompt-modules.js hello world)");
}

process.exit();

// ------------------------------------------
// 2. Lire l'entrée utilisateur (stdin)
// ------------------------------------------

console.log("\n--- Entrée utilisateur ---");

// La fonction prompt() est disponible dans Bun (pas dans Node !)
// Elle bloque l'exécution en attendant l'input de l'utilisateur
const reponse = prompt("Comment vous appelez-vous ?");
console.log(`Bonjour ${reponse} !`);

const age = prompt("Quel âge avez-vous ?");
console.log(`Vous avez ${age} ans, né·e vers ${new Date().getFullYear() - Number(age)}`);
