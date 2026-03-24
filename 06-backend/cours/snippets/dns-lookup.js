// Résoudre un nom de domaine en IP (DNS lookup)

import { lookup } from "node:dns/promises"

const { address } = await lookup("oasis.minesparis.psl.eu")
console.log("IP:", address) // 91.134.82.158
