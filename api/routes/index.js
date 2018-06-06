const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/", (req, res) => {
    res.send({ coucou: "coucou" });
});

router.get("/robots.txt", (req, res) => {
    const txt = fs.readFileSync("./public/robots.txt", "utf8");
    res.type("text/plain");
    res.send(txt);
});

router.get("/favicon.ico", (req, res) => {
    const img = fs.readFileSync("./public/favicon.ico");
    res.type("image/ico");
    res.end(img, "binary");
});

module.exports = router;
