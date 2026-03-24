const etudiant = { nom: "Alice", formation: "Javascript", devise: "JS c'est sympa" }

function greeting({ nom, devise, formation, preferences}) {
    console.log("Mon nom est :", nom)
    console.log("Ma devise est :", devise)
    console.log("Ma formation est :", formation)
    console.log("Ma preference a moi est :", preferences)

    return { nom, devise, formation, preferences}
}


console.log(greeting(etudiant))