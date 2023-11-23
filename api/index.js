const app = require("express")();
const { randomBytes } = require("crypto");

app.get("/api", (req, res) => {
  const path = `/api/item/${randomBytes(8).toString("hex")}`;
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get("/api/item/:slug", (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

module.exports = app;

/**
 * Tohle si vezme parametr "--dev" ze spouštěcího commandu.
 * node api/index.js --dev
 *
 * Pokud je parametr "--dev", tak se spustí server na portu dle portu v systémových proměnných, nebo 3000.
 * 
 * Určeno pro vývoj. Startovat to můžeš pomocí "npm run dev"
 */
if (process.argv[2] === "--dev") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}
