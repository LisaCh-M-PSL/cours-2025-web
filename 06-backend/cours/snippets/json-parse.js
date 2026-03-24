// Parser une chaîne JSON en objet

const serialized = '{"name": "Ada Lovelace", "age": 36}'
const data = JSON.parse(serialized)
console.log(data.name)
