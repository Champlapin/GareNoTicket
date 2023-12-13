"use strict";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/user");
const Facture = require('../models/facture');
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
		else {
			let user = await User.findOne({ email }).populate("voiture");
			if (!user) {
				return res
					.status(400)
					.json({ email: false, message: "Aucun utilisateur avec ce email." });
			}
			let valide = await bcrypt.compare(password, user.password);
			if (!valide) {
				return res
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
						price : user.price
					},
					voiture: user.voiture,
				},
				config.SECRET_JWT,
				//TODO : changer la date d'expiration.
				{ expiresIn: "4h" }
			);
	
			return	res.status(200).json({ jwt: token, email: true, password: true });
		}
	} catch (err) {
		next(err);
	}
};

exports.signup = async (req, res, next) => {
	const { email, username, password, confirmPassword } = req.body;

	try {

			let existeDeja = await User.findOne({ email });
	
			if (existeDeja) {
				return res
					.status(400)
					.json({ emailUnique: "utilisateur avec cet email existe deja" });
			}
			
		if (password !== confirmPassword) {
			return res.status(400).json({ passwordMatch: "The passwords do not match" });
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
		await user.save();
		

		res.status(200).json(user);
	} catch (err) {
		console.log(username + " cause problème");
		next(err);
	}
};