"use strict";

const User = require("../models/user");
const Voiture = require("../models/voiture");
const Histo = require("../models/historique");
const config = require("../config");
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const url_base = config.URL + ":" + config.PORT;

/**
 * Fonction pour vérifier si un utilisateur existe
 * @param {*} userId Id de l'utilisateur.
 * @returns l'utilisateur
 */
async function checkUserExists(userId) {
	const user = await User.findById(userId).populate("voiture");
	if (!user) {
		const error = new Error("L'utilisateur n'existe pas.");
		error.statusCode = 404;
		throw error;
	}
	return user;
}

/**
 * checks if the input is null or whitespaces
 * @param {*} input The input
 * @returns 
 */true;
function isNullOrWhitespace(input) {
	return !input || !input.trim();
}

exports.getUsers = async (req, res, next) => {
	try {
		const users = await User.find({ isValet: false }).populate({
			path: "voiture",
			match: { isParked: true },
		});

		const filteredUsers = users.filter((user) => user.voiture != null);
		if (!filteredUsers.length) {
			const error = new Error("Aucun utilisateur trouvé.");
			error.statusCode = 404;
			throw error;
		}

		res.status(200).json({
			users: filteredUsers,
		});
	} catch (err) {
		next(err);
	}
};

exports.getUser = async (req, res, next) => {
	try {
		const userId = req.user.userId;
		const user = await checkUserExists(userId);
		res.status(200).json({
			user: user,
		});
	} catch (err) {
		next(err);
	}
};

exports.getUserBySession = async (req, res, next) => {
	try {
		const userId = req.params.id;
		console.log(userId);
		const user = await checkUserExists(userId);
		res.status(200).json({
			user: user,
		});
	} catch (err) {
		next(err);
	}
};

exports.getUserById = async (req, res, next) => {
	try {
		const userId = req.params.id;
		console.log(userId);
		const user = await checkUserExists(userId);
		res.status(200).json({
			user: user,
		});
	} catch (err) {
		next(err);
	}
};

exports.updateUser = async (req, res, next) => {
	try {
		let userId = req.params.userId;
		const { username, email } = req.body;
		const newValues = { username, email };

		let newUser = await User.findByIdAndUpdate(userId, newValues, {
			new: true,
		}).populate("voiture");

		if (!newUser) {
			res.status(400).json({ message: "l'utilisateur n'existe pas" });
		}

		const token = await jwt.sign(
			{
				user: {
					username: newUser.username,
					email: newUser.email,
					id: newUser.id,
					isValet: newUser.isValet,
				},
				voiture: newUser.voiture,
			},
			config.SECRET_JWT,
			//TODO : changer la date d'expiration.
			{ expiresIn: "4h" }
		);

		res.status(200).json(token);
	} catch (error) {
		next(error);
	}
};

exports.updateCar = async (req, res, next) => {
	try {
		let results;
		let userId = req.params.userId;
		const { marque, modele, couleur, plaque } = req.body;
		const newValues = { marque, modele, couleur, plaque };

		let user = await checkUserExists(userId);
		if (!user) {
			res.status(400).json({ message: "l'utilisateur n'existe pas." });
		}
		//TODO : Valider les données entrants

		if (user.voiture) {
			results = await Voiture.findByIdAndUpdate(user.voiture, newValues, {
				new: true,
			});
		} else {
			results = new Voiture(newValues);
			const res = await results.save();
			user.voiture = results;
			await user.save();
		}
		user = await User.findById(userId).populate("voiture");
		const token = await jwt.sign(
			{
				user: {
					username: user.username,
					email: user.email,
					id: user.id,
					isValet: user.isValet,
				},
				voiture: user.voiture,
			},
			config.SECRET_JWT,
			//TODO : changer la date d'expiration.
			{ expiresIn: "4h" }
		);

		res.status(200).json(token);
	} catch (error) {
		next(error);
	}
};

exports.deleteUser = async (req, res, next) => {
	try {
		const userId = req.user.userId;
		const user = await checkUserExists(userId);
		await user.remove();
		if (user.voiture) {
			const voiture = await Voiture.findById(user.voiture);
			await voiture.remove();
		}
		res.status(204).send();
	} catch (err) {
		next(err);
	}
};
