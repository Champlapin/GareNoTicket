"use strict";

const express = require("express");
const histoController = require("../controllers/histoController");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/historique", isAuth, histoController.getHistorique);
router.get("/effectuerPaiement", isAuth, histoController.effectuerPaiement);
router.get("/facture", isAuth, histoController.getFacture);
router.post("/facturer", isAuth, histoController.createHisto);
module.exports = router;
