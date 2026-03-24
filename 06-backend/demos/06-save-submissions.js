const port = 3005;
const dataFile = new URL("./submissions.json", import.meta.url);

function html(content) {
    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sauvegarde</title>
    <style>
        body { font-family: sans-serif; max-width: 760px; margin: 40px auto; padding: 0 16px; }
        form { display: grid; gap: 12px; margin-bottom: 24px; }
        input, textarea, button { font: inherit; padding: 10px; }
        textarea { min-height: 120px; }
        li { margin-bottom: 12px; }
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

async function readSubmissions() {
    const file = Bun.file(dataFile);

    if (!(await file.exists())) {
        return [];
    }

    return JSON.parse(await file.text());
}

async function writeSubmissions(submissions) {
    await Bun.write(dataFile, `${JSON.stringify(submissions, null, 2)}\n`);
}

const server = Bun.serve({
    port,
    async fetch(request) {
        const url = new URL(request.url);

        if (url.pathname === "/" && request.method === "GET") {
            const submissions = await readSubmissions();
            const list = submissions
                .map(
                    (submission) => `
                    <li>
                        <strong>${escapeHtml(submission.name)}</strong> — ${escapeHtml(submission.createdAt)}<br>
                        ${escapeHtml(submission.message)}
                    </li>`,
                )
                .join("");

            return new Response(
                html(`
                    <h1>Mini backend de formulaires</h1>
                    <form method="POST" action="/submit">
                        <label>Nom <input name="name" /></label>
                        <label>Message <textarea name="message"></textarea></label>
                        <button type="submit">Envoyer</button>
                    </form>
                    <h2>Soumissions (${submissions.length})</h2>
                    <ul>${list}</ul>
                `),
                { headers: { "Content-Type": "text/html; charset=utf-8" } },
            );
        }

        if (url.pathname === "/submit" && request.method === "POST") {
            const formData = await request.formData();
            const name = String(formData.get("name") ?? "").trim();
            const message = String(formData.get("message") ?? "").trim();

            if (!name || !message) {
                return new Response("name et message sont obligatoires\n", {
                    status: 400,
                    headers: { "Content-Type": "text/plain; charset=utf-8" },
                });
            }

            const submissions = await readSubmissions();
            submissions.push({
                name,
                message,
                createdAt: new Date().toISOString(),
            });
            await writeSubmissions(submissions);

            return Response.redirect(`${url.origin}/`, 302);
        }

        return new Response("Not found\n", { status: 404 });
    },
});

console.log(`Server running on ${server.url}`);
