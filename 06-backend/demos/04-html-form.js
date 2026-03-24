const port = 3003;

function page(title, content) {
    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body { font-family: sans-serif; max-width: 720px; margin: 40px auto; padding: 0 16px; }
        form { display: grid; gap: 12px; }
        input, textarea, button { font: inherit; padding: 10px; }
        textarea { min-height: 120px; }
    </style>
</head>
<body>
    ${content}
</body>
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
    fetch(request) {
        const url = new URL(request.url);

        if (url.pathname === "/preview") {
            const name = escapeHtml(url.searchParams.get("name") ?? "");
            const email = escapeHtml(url.searchParams.get("email") ?? "");
            const message = escapeHtml(url.searchParams.get("message") ?? "");

            return new Response(
                page(
                    "Preview GET",
                    `
                    <h1>GET /preview</h1>
                    <p>Les champs ont été envoyés dans l'URL.</p>
                    <ul>
                        <li><strong>Nom :</strong> ${name}</li>
                        <li><strong>Email :</strong> ${email}</li>
                        <li><strong>Message :</strong> ${message}</li>
                    </ul>
                    <p><a href="/">Retour</a></p>
                    `,
                ),
                { headers: { "Content-Type": "text/html; charset=utf-8" } },
            );
        }

        const html = page(
            "Formulaire Bun",
            `
            <h1>Formulaire de contact</h1>
            <p>Ce formulaire fait volontairement un <code>GET</code> simple, juste pour visualiser le HTML servi par Bun et voir les champs partir dans l'URL.</p>
            <form method="GET" action="/preview">
                <label>Nom <input name="name" /></label>
                <label>Email <input name="email" type="email" /></label>
                <label>Message <textarea name="message"></textarea></label>
                <button type="submit">Envoyer</button>
            </form>
            `,
        );

        return new Response(html, {
            headers: { "Content-Type": "text/html; charset=utf-8" },
        });
    },
});

console.log(`Server running on ${server.url}`);
