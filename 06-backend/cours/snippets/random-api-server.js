Bun.serve({
  port: 3000,
  fetch(request) {
    const url = new URL(request.url)
    if (url.pathname === "/api/integer") {
      const n = Number(url.searchParams.get("n") ?? 1)
      const numbers = Array.from({ length: n }, () => Math.floor(Math.random() * 1000))
      return Response.json(numbers)
    }
    return new Response("Not found", { status: 404 })
  },
})
