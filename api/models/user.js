"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		email: {
			//TODO : N'est pas déjà utilisé ; Pas plus de 50 caractères.
			type: String,
			required: true,
			unique: true,
			match: [/.+@.+\..+/, "Adresse courriel invalide"],
		},
		username: {
			type: String,
			required: true,
			match: [/^[a-zA-Z0-9_\s]{3,50}$/]
			//TODO: Ajouter la validation
		},
		password: {
			type: String,
			required: true,
		},
		isValet: {
			type: Boolean,
			default: false,
		},
		price: {
			type: Number,
			default: 0,
		},
		voiture: {
			type: Schema.Types.ObjectId,
			ref: "Voiture",
			default: null,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
