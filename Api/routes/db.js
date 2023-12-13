"use strict";

const express = require("express");
const dbController = require("../controllers/dbController");
const router = express.Router();

router.get("/modify", dbController.ModifyData);
router.get("/seed", dbController.seed);
router.post('/voiture', dbController.AddVoiture);
router.get("/", dbController.test);

module.exports = router;
