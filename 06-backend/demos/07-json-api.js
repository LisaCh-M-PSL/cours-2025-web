const port = 3006;
const dataFile = new URL("./api-submissions.json", import.meta.url);

async function readItems() {
    const file = Bun.file(dataFile);

    if (!(await file.exists())) {
        return [];
    }

    return JSON.parse(await file.text());
}

async function writeItems(items) {
    await Bun.write(dataFile, `${JSON.stringify(items, null, 2)}\n`);
}

const server = Bun.serve({
    port,
    async fetch(request) {
        const url = new URL(request.url);

        if (url.pathname === "/api/submissions" && request.method === "GET") {
            const items = await readItems();
            return Response.json({ count: items.length, items });
        }

        if (url.pathname === "/api/submissions" && request.method === "POST") {
            let body;

            try {
                body = await request.json();
            } catch (error) {
                return Response.json(
                    { ok: false, error: "JSON invalide" },
                    { status: 400 },
                );
            }

            const name = String(body.name ?? "").trim();
            const message = String(body.message ?? "").trim();
            const type = String(body.type ?? "contact").trim();

            if (!name || !message) {
                return Response.json(
                    { ok: false, error: "name et message sont obligatoires" },
                    { status: 400 },
                );
            }

            const items = await readItems();
            const newItem = {
                id: crypto.randomUUID(),
                name,
                message,
                type,
                createdAt: new Date().toISOString(),
            };

            items.push(newItem);
            await writeItems(items);

            return Response.json({ ok: true, item: newItem }, { status: 201 });
        }

        if (url.pathname === "/" && request.method === "GET") {
            return new Response(
                `API ready on ${url.origin}\nGET /api/submissions\nPOST /api/submissions\n`,
                { headers: { "Content-Type": "text/plain; charset=utf-8" } },
            );
        }

        return new Response("Not found\n", { status: 404 });
    },
});

console.log(`Server running on ${server.url}`);
