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
		if (!email || email.trim === "") {
			res.status(400).json({
				email: true,
				message: "Le champ email est vide.",
			});
		} else if (!password || password.trim === "") {
			res.status(400).json({
				password: true,
				message: "le champ password est vide.",
			});
		}

		let user = await User.findOne({ email }).populate("voiture");
		if (!user) {
			res
				.status(400)
				.json({ email: false, message: "Aucun utilisateur avec ce email." });
		}
		let valide = await bcrypt.compare(password, user.password);
		if (!valide) {
			res
				.status(400)
				.json({ password: false, message: "Mot de passe est invalide" });
		}

		const token = await jwt.sign(
			{
				user: {
					username: user.username,
					email: user.email,
					id: user.id,
					isValet: user.isValet,
					voiture: user.voiture,
				},
			},
			config.SECRET_JWT,
			//TODO : changer la date d'expiration.
			{ expiresIn: "4h" }
		);

		res.status(200).json({ jwt: token, email: true, password: true });
	} catch (err) {
		next(err);
	}
};

exports.signup = async (req, res, next) => {
	const { email, username, password, confirmPassword } = req.body;

	try {
		//TODO : Will need to change this validation.
		let message = "Les érreurs suivantes sont présentes";

		if (!email) {
			message += "\r le champ email est invalide";
		}
		if (!username) {
			message += "\r le username est invalide";
		}
		if (!password) {
			message += "\r le mot de passe est invalide ";
		}

		if (!email || !username || !password || !confirmPassword) {
			return res.status(400).json(message);
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

		const user = new User({
			email,
			username,
			password: hashed,
		});
		console.log(user);
		user.save();
		res.status(200).json(user);
	} catch (err) {
		console.log(username + " cause problème");
		next(err);
	}
};
