"use strict";

const flagController = require("../controllers/flagController");
const router = require("express").Router();

router.get("/", flagController.getAll.bind(flagController));
router.get("/:id", flagController.getById.bind(flagController));
router.post("/", flagController.post.bind(flagController));
router.put("/:id", flagController.put.bind(flagController));
router.delete("/:id", flagController.delete.bind(flagController));

module.exports = router;
