if (url.pathname === "/api/submissions" && request.method === "GET") {
  const submissions = await loadSubmissions()
  return Response.json({ ok: true, count: submissions.length, items: submissions })
}
