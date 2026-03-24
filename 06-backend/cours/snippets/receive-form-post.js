if (url.pathname === "/submit" && request.method === "POST") {
  const formData = await request.formData()
  const name = formData.get("name")
  const message = formData.get("message")

  return new Response(`
    <h1>Merci ${name} !</h1>
    <p>Votre message : ${message}</p>
    <a href="/contact">Retour</a>
  `, { headers: { "Content-Type": "text/html; charset=utf-8" } })
}
