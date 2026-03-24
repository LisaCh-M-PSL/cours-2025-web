const res = await fetch(
  "http://localhost:3000/api/submissions"
)
const data = await res.json()
console.log(data.items)
