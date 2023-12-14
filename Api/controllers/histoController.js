"use strict";

const Histo = require("../models/historique");
const Facture = require("../models/facture");
const facture = require("../models/facture");
const historique = require("../models/historique");

exports.getHistorique = async (req, res, next) => {
	//OK


	const userId = req.user.id;
	console.log("userId", userId);
	try {
		const histos = await Histo.find({ userId: userId }).sort({ createdAt: -1 });

		res.status(200).json(histos);
	} catch (err) {
		next(err);
	}
};

exports.effectuerPaiement = async (req, res, next) => {
	const userId = req.user.id;
	let somme = 0;
	try {
		//TODO : Coder le paiement.
		if (!userId) {
			res.status(400).json({ message: "L'utilisateur n'existe pas" });
		}
		let histos = await Histo.find({ userId, isPaid: false });
		if (histos.length <= 0) {
			res.status(200).json({ message: "Aucune facture à payer" });
		} else {
			for (const histo of histos) {
				somme += histo.price;
				histo.isPaid = true;
				await histo.save();
			}
			let factures = new Facture({ userId: userId, price: somme });
			await factures.save();
			factures = await Facture.find({ userId });
			histos = await Histo.find({ userId });
			res.status(200).json({ factures, histos });
		}
	} catch (error) {
		next(error);
	}
};

exports.getFacture = async (req, res, next) => {
	const userId = req.user.id;
	let somme = 0;
	try {
		if (!userId) {
			res.status(400).json({ message: "L'utilisateur n'existe pas" });
		}
		const factures = await Facture.find({ userId });
		res.status(200).json(factures);
	} catch (err) {
		next(err);
	}
};

exports.createHisto = async (req, res, next) => {
	const { price, idUser, idValet } = req.body;
	const values = { price, userId: idUser, valetId: idValet };
	try {
		const histo = new Histo(values);
		await histo.save();

		//Update de la facture du user.

		res.status(200).json(histo);
	} catch (error) {
		next(error);
	}
};
