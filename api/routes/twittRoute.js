const express = require("express");
const router = express.Router();

const twitt = require("../controllers/twittController");

router.get("/", twitt.list_all);

module.exports = router;