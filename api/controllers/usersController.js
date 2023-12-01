"use strict";

const User = require("../models/user");
const Voiture = require("../models/voiture");
const Histo = require("../models/historique");
const config = require("../config");
const user = require("../models/user");
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

		const results = User.findByIdAndUpdate(userId, newValues, { new: true });

		if (!results) {
			res.status(400).json({ message: "l'utilisateur n'existe pas" });
		}
		res.status(200).json(results);
	} catch (error) {
		next(error);
	}
};

exports.updateCar = async (req, res, next) => {
	try {
		let userId = req.params.userId;
		const { marque, modele, couleur, immatriculation } = req.body;
		const newValues = { marque, modele, couleur, immatriculation };

		let user = User.findById(userId);
		if (!user) {
			res.status(400).json({ message: "l'utilisateur n'existe pas." });
		}

		const results = Voiture.findById(user.voiture, newValues);
		if (!results) {
			res.status(400).json({ message: "l'utilisateur n'a pas de voiture." });
		}

		res.status(200).json(results);
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
