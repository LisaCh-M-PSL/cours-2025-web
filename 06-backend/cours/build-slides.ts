const baseDir = new URL("./", import.meta.url);
const templatePath = new URL("template.html", baseDir);
const template = await Bun.file(templatePath).text();

const slideshows: Array<{ md: string; title: string }> = [
    { md: "slides1.md", title: "06 — Réseau & Backend (1/3)" },
    // { md: "slides2.md", title: "06 — Côté Serveur (2/3)" },
    // { md: "slides3.md", title: "06 — Framework (3/3)" },
];

for (const { md, title } of slideshows) {
    const outputPath = new URL(md.replace(".md", ".html"), baseDir);
    const html = template
        .replaceAll("__TITLE__", title)
        .replaceAll("__MD_FILE__", md);

    await Bun.write(outputPath, html);
    console.log(`Generated ${outputPath.pathname}`);
}
