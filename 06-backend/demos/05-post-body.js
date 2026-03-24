const port = 3004;

function html(content) {
    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>POST body</title>
    <style>
        body { font-family: sans-serif; max-width: 720px; margin: 40px auto; padding: 0 16px; }
        form { display: grid; gap: 12px; }
        input, textarea, button { font: inherit; padding: 10px; }
        textarea { min-height: 120px; }
    </style>
</head>
<body>${content}</body>
</html>`;
}

function escapeHtml(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

const server = Bun.serve({
    port,
    async fetch(request) {
        const url = new URL(request.url);

        if (url.pathname === "/" && request.method === "GET") {
            return new Response(
                html(`
                    <h1>Recevoir un formulaire</h1>
                    <form method="POST" action="/submit">
                        <label>Nom <input name="name" /></label>
                        <label>Message <textarea name="message"></textarea></label>
                        <button type="submit">Envoyer</button>
                    </form>
                `),
                { headers: { "Content-Type": "text/html; charset=utf-8" } },
            );
        }

        if (url.pathname === "/submit" && request.method === "POST") {
            const formData = await request.formData();
            const name = escapeHtml(String(formData.get("name") ?? "Anonyme"));
            const message = escapeHtml(String(formData.get("message") ?? ""));

            return new Response(
                html(`
                    <h1>Merci ${name}</h1>
                    <p>Message reçu :</p>
                    <pre>${message}</pre>
                    <p><a href="/">Retour</a></p>
                `),
                { headers: { "Content-Type": "text/html; charset=utf-8" } },
            );
        }

        return new Response("Not found\n", { status: 404 });
    },
});

console.log(`Server running on ${server.url}`);
