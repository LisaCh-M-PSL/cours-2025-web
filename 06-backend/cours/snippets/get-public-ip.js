// Récupérer son IP publique via un service externe

const response = await fetch(
  "https://api64.ipify.org?format=json"
)
const { ip } = await response.json()
console.log("Public IP:", ip)
