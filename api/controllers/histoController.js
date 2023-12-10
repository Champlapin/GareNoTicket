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
		if (!userId) {
			res.status(400).json({ message: "L'utilisateur n'existe pas" });
		}
		let histos = await Histo.find({ userId, isPaid: false });
		const facture = await Facture.findByIdAndUpdate(
			userId,
			{ price: 0 },
			{ new: true }
		);
		if (histos.length <= 0) {
			res.status(200).json({ message: "Aucune facture à payer" });
		}
		for (const histo of histos) {
			histo.isPaid = true;
			await histo.save();
		}
		res.status(200).json({ histos, facture });
	} catch (error) {
		next(error);
	}
};

exports.getFacture = async (req, res, next) => {
	const userId = req.user.userId;
	let somme = 0;
	try {
		if (!userId) {
			res.status(400).json({ message: "L'utilisateur n'existe pas" });
		}

		const histos = await Histo.find({ userId });

		for (const histo of histos) {
			somme += histo.price;
		}

		const facture = await Facture.findByIdAndUpdate(
			userId,
			{ price: somme },
			{ new: true }
		);

		res.status(200).json(facture);
	} catch (err) {
		next(err);
	}
};
