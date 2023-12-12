"use strict";

const bcrypt = require("bcryptjs");
const config = require("../config");

const Voiture = require("../models/voiture");
const Facture = require("../models/facture");
const User = require("../models/user");
const Historique = require("../models/historique");

const voiture = require("../seeds/voiture");
const facture = require("../seeds/facture");
const users = require("../seeds/users");
const historique = require("../seeds/historique");
const saltRounds = 10;

exports.seed = async (req, res, next) => {
	const result = {};

	try {
		await Promise.all([
			Voiture.deleteMany(),
			Facture.deleteMany(),
			User.deleteMany(),
			Historique.deleteMany(),
		]);

		const [usersInsert, voituresInsert, facturesInsert, historiquesInsert] =
			await Promise.all([
				User.insertMany(users),
				Voiture.insertMany(voiture),
				Facture.insertMany(facture),
				Historique.insertMany(historique),
			]);

		if (facturesInsert.length > 0) {
			result.facture = facturesInsert;
		}

		if (voituresInsert.length > 0) {
			result.voitures = voituresInsert;
		}

		if (usersInsert.length > 0) {
			result.users = usersInsert;
		}

		if (historiquesInsert.length > 0) {
			result.historique = historiquesInsert;
		}

		res.status(200).json(result);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

exports.ModifyData = async (req, res, next) => {
	let users = await User.find({ isValet: false });
	let voitures = await Voiture.find();

	let hashed;
	hashed = await bcrypt.hash("123456", saltRounds).catch((err) => {
		console.error(err);
	});

	try {
		for (let user of users) {
			user.password = hashed;
			await user.save();
		}
		res.status(200).json(users);
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: "il y a eu un problème" });
	}
};

exports.AddVoiture = async (req, res, next) => {
	const { marque, modele, couleur, plaque } = req.body;
	const infos = { marque, modele, couleur, plaque };

	try {
		let newest = await Voiture.create(infos);
		res.status(200).json(newest);
	} catch (error) {
		console.log(error);
	}
};

exports.AddFacture = async (req, res, next) => {
	const { userId, price } = req.body;
};
