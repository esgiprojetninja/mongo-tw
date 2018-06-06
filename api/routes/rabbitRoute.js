const express = require("express");
const router = express.Router();

const rabbit = require("../controllers/rabbitController");

router.get("/", rabbit.list_all_rabbits);

router.post("/", rabbit.create_rabbit);

router.get("/:Id", rabbit.read_rabbit);

router.put("/:Id", rabbit.update_rabbit);

router.delete("/:Id", rabbit.delete_rabbit);


module.exports = router;