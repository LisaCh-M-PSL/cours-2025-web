const port = 3001;

const server = Bun.serve({
    port,
    fetch(request) {
        const url = new URL(request.url);

        if (url.pathname === "/") {
            return new Response("Accueil\n", {
                headers: { "Content-Type": "text/plain; charset=utf-8" },
            });
        }

        if (url.pathname === "/hello" && request.method === "GET") {
            return new Response("Bonjour route /hello\n", {
                headers: { "Content-Type": "text/plain; charset=utf-8" },
            });
        }

        if (url.pathname === "/contact" && request.method === "POST") {
            return new Response("POST /contact reçu\n", {
                headers: { "Content-Type": "text/plain; charset=utf-8" },
            });
        }

        return new Response("Not found\n", { status: 404 });
    },
});

console.log(`Server running on ${server.url}`);
