"use strict";

const Histo = require("../models/historique");
const Facture = require("../models/facture");

exports.getHistorique = async (req, res, next) => {
	const userId = req.user.userId;
	console.log("userId", userId);
	try {
		const histo = await Histo.find({ userId: userId }).sort({ createdAt: -1 });
		if (!histo) {
			const error = new Error("Aucun historique trouvé.");
			error.statusCode = 404;
			throw error;
		}

		res.status(200).json({
			histo: histo,
		});
	} catch (err) {
		next(err);
	}
};

exports.effectuerPaiement = async (req, res, next) => {
	const userId = req.user.userId;
	try {
		//TODO : Coder le paiement.
		let a = 0;
	} catch (error) {
		next(error);
	}
};

exports.getFacture = async (req, res, next) => {
	//TODO : Coder la fonction

	const userId = req.user.userId;
};
