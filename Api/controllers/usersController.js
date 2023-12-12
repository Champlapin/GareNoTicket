"use strict";

const User = require("../models/user");
const Voiture = require("../models/voiture");
const Histo = require("../models/historique");
const Facture = require("../models/facture");
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
	const user = await User.findById(userId)
		.select("email username _id")
		.populate("voiture");
	if (!user) {
		const error = new Error("L'utilisateur n'existe pas.");
		error.statusCode = 404;
		throw error;
	}
	return user;
}

// eslint-disable-next-line no-undef
exports.getUsers = async (req, res, next) => {
	try {
		const users = await User.find({ isValet: false })
			.select("email username _id")
			.populate({
				path: "voiture",
				match: { isParked: true },
			});

		const filteredUsers = users.filter((user) => user.voiture != null);
		if (!filteredUsers.length) {
			const error = new Error("Aucun utilisateur trouvé.");
			error.statusCode = 404;
			throw error;
		}

		return res.status(200).json({
			users: filteredUsers,
		});
	} catch (err) {
		next(err);
	}
};

// eslint-disable-next-line no-undef
exports.getUser = async (req, res, next) => {
	try {
		const userId = req.user.userId;
		const user = await checkUserExists(userId);
		return res.status(200).json(user);
	} catch (err) {
		next(err);
	}
};

// eslint-disable-next-line no-undef
exports.getUserBySession = async (req, res, next) => {
	try {
		const userId = req.user.id;
		console.log(userId);
		const user = await checkUserExists(userId);
		return status(200).json(user);
	} catch (err) {
		next(err);
	}
};

// eslint-disable-next-line no-undef
exports.getUserById = async (req, res, next) => {
	try {
		const userId = req.params.id;
		const user = await checkUserExists(userId);
		return res.status(200).json(user);
	} catch (err) {
		next(err);
	}
};

// eslint-disable-next-line no-undef
exports.updateUser = async (req, res, next) => {
	try {
		let userId = req.params.userId;
		const { username, email } = req.body;
		const newValues = { username, email };

		let newUser = await User.findByIdAndUpdate(userId, newValues, {
			new: true,
		}).populate("voiture");

		if (!newUser) {
			return res.status(400).json({ message: "l'utilisateur n'existe pas" });
		}

		const token = await jwt.sign(
			{
				user: {
					username: newUser.username,
					email: newUser.email,
					id: newUser.id,
					isValet: newUser.isValet,
					price: user.price,
				},
				voiture: newUser.voiture,
			},
			config.SECRET_JWT,
			//TODO : changer la date d'expiration.
			{ expiresIn: "4h" }
		);

		return res.status(200).json(token);
	} catch (error) {
		next(error);
	}
};

// eslint-disable-next-line no-undef
exports.updateCar = async (req, res, next) => {
	try {
		let results;
		let userId = req.params.userId;
		const newValues = req.body;

		let user = await User.findById(userId).populate("voiture");

		if (!user) {
			return res.status(400).json({ message: "l'utilisateur n'existe pas." });
		}
		//TODO : Valider les données entrants

		if (user.voiture) {
			results = await Voiture.findByIdAndUpdate(user.voiture, newValues, {
				new: true,
			});
		} else {
			results = new Voiture(newValues);
			await results.save();
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

		return res.status(200).json(token);
	} catch (error) {
		next(error);
	}
};

// eslint-disable-next-line no-undef
exports.deleteUser = async (req, res, next) => {
	try {
		const userId = req.user.userId;
		const user = await checkUserExists(userId);
		await user.remove();
		if (user.voiture) {
			const voiture = await Voiture.findById(user.voiture);
			await voiture.remove();
		}
		return res.status(204).send();
	} catch (err) {
		next(err);
	}
};
