const port = 3000;

const server = Bun.serve({
    port,
    fetch() {
        return new Response("Bonjour depuis Bun 👋\n", {
            headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
    },
});

console.log(`Server running on ${server.url}`);
