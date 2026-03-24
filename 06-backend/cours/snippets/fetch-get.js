// Faire une requête GET avec fetch

const response = await fetch("https://httpbin.org/get")
const data = await response.json()
console.log(data)
