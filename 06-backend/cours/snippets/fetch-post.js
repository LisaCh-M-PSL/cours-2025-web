// Faire une requête POST avec fetch

const response = await fetch("https://httpbin.org/post", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Ada", message: "Bonjour" }),
})
const result = await response.json()
console.log(result)
