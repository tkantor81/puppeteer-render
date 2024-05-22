const express = require("express");
const { scrapeLogic } = require("./scrapeLogic");
const app = express();

const PORT = process.env.PORT || 4000;

app.get("/:route", (req, res) => {
    // Extract route name from request parameters
    const { route } = req.params;
    scrapeLogic(res, route);
});

app.get("/", (req, res) => {
    res.send("Render Puppeteer server is up and running!");
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});