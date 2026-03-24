// Récupérer son IP locale via l'OS

import os from "node:os"

for (const [name, addrs] of Object.entries(os.networkInterfaces())) {
    for (const addr of addrs) {
        if (addr.family === "IPv4" && !addr.internal) {
            console.log(`${name}: ${addr.address}`)
        }
    }
}
