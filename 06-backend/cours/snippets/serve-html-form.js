if (url.pathname === "/contact") {
  return new Response(`
    <h1>Contactez-nous</h1>
    <form method="POST" action="/submit">
      <input name="name" placeholder="Votre nom" required />
      <textarea name="message" placeholder="Votre message" required></textarea>
      <button type="submit">Envoyer</button>
    </form>
  `, { headers: { "Content-Type": "text/html; charset=utf-8" } })
}
