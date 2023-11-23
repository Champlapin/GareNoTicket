"use strict";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/user");
const saltRounds = 10;

exports.login = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		//TODO : Confirmer avec le prof.
		//TODO : mettre dans un JWT
		let user = await User.findOne({ email });
		let valide = await bcrypt.compare(password, user.password);

		if (!valide) {
			res.status(400).json("Mot de passe ou email invalide");
		}
		res.status(200).json(user);
	} catch (err) {
		next(err);
	}
};

exports.signup = async (req, res, next) => {
	const { email, username, password, confirmPassword } = req.body;

	try {
		//TODO : Will need to change this validation.
		if (!email || !username || !password || !confirmPassword) {
			return res.status(400).json({ message: "All fields are required." });
		}

		let existeDeja = await User.findOne({ email });

		if (existeDeja) {
			return res
				.status(400)
				.json({ message: "utilisateur avec cet email existe deja" });
		}

		//TODO : valider le username et le email.

		if (password !== confirmPassword) {
			return res.status(400).json({ message: "The passwords do not match" });
		}

		//TODO : Hasher le mot de passe.
		let hashed;
		hashed = await bcrypt.hash(password, saltRounds).catch((err) => {
			console.error(err);
		});

		const user =new User({
			email,
			username,
			password: hashed,
		});
		user.save();
		res.status(200).json(user);
	} catch (err) {
		console.log(username + " cause problème");
		next(err);
	}
};
