export function add(a, b) {
    throw Error("Mon message d'erreur")
    return a + b
}

export async function add2(a, b) {
    return a + b
}

class MonError extends Error {
    constructor(message) {
        super(message)
    }
}

class MonError2 extends Error {
    constructor(message) {
        super(message)
    }
}


function maFunction() {
    try {
        add(3,4)
    } catch (e) {
        if (e instanceof MonError) {

        }

        e.message
    }
    console.log("Tout va bien se passer")
}

// try {
//     maFunction()

// } catch (e) {
//     console.error('Cette erreur:', e.message)
// }

maFunction()
console.log("Mon programme est termine")