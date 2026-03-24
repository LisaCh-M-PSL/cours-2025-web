const port = 3002;

const server = Bun.serve({
    port,
    fetch(request) {
        const url = new URL(request.url);

        if (url.pathname !== "/hello") {
            return new Response("Essaie /hello?name=Ada\n", {
                status: 404,
                headers: { "Content-Type": "text/plain; charset=utf-8" },
            });
        }

        const name = url.searchParams.get("name") ?? "inconnu";

        return new Response(`Bonjour ${name} !\n`, {
            headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
    },
});

console.log(`Server running on ${server.url}`);
