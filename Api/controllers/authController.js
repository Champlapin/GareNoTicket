"use strict";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/user");
const Facture = require("../models/facture");
const saltRounds = 10;

exports.login = async (req, res, next) => {
	const { email, password } = req.body;
	const noHash = req.body.noHash ? true : false;
	try {
		if (!email || email.trim() === "") {
			const err = new Error("Le champ email est vide.");
			err.statusCode = 400;
			throw err;
		}

		if (!password || password.trim() === "") {
			const err = new Error("Le champ password est vide.");
			err.statusCode = 400;
			throw err;
		}

		const user = await User.findOne({ email }).populate("voiture");

		if (!user) {
			const err = new Error("Aucun utilisateur avec ce email.");
			err.statusCode = 400;
			throw err;
		}

		const valide = await bcrypt.compare(password, user.password);

		if (!valide) {
			const err = new Error("Mot de passe est invalide");
			err.statusCode = 400;
			throw err;
		}

		const token = await jwt.sign(
			{
				user: {
					username: user.username,
					email: user.email,
					id: user.id,
					isValet: user.isValet,
					price: user.price,
				},
				voiture: user.voiture,
			},
			config.SECRET_JWT,
			{ expiresIn: "24h" }
		);
		req.user = user;
		if (noHash) {
			return res.status(200).json(user);
		} else {
			return res.status(200).json({ jwt: token, email: true, password: true });
		}
	} catch (err) {
		if (err.name === "ValidationError") {
			err.statusCode = 400;
		}

		if (!err.statusCode) {
			err.statusCode = 500;
		}

		next(err);
	}
};

exports.signup = async (req, res, next) => {
	const { email, username, password, confirmPassword } = req.body;

	try {
		const existeDeja = await User.findOne({ email });

		if (existeDeja) {
			const err = new Error("utilisateur avec cet email existe deja");
			err.statusCode = 400;
			throw err;
		}

		if (password !== confirmPassword) {
			const err = new Error("Le mot de passe ne correspond pas");
			err.statusCode = 400;
			throw err;
		}

		const hashed = await bcrypt.hash(password, saltRounds);

		const user = new User({
			email,
			username,
			password: hashed,
		});

		await user.save();

		return res.status(201).json(user);
	} catch (err) {
		if (err.name === "ValidationError") {
			err.statusCode = 400;
		}

		if (!err.statusCode) {
			err.statusCode = 500;
		}

		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};
