"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		match: [/.+@.+\..+/, "Adresse courriel invalide"],
	},
	username: {
		type: String,
		required: true,
		match: [/^.{3,50}$/],
		unique: true,
	},
	password: {
		type: String,
		required: true,
		match: [/^.{6,}$/],
	},
	isValet: {
		type: Boolean,
		default: false,
	},
	price: {
		type: Number,
		default: 0,
		validate: {
			validator: function (v) {
				return v >= 0;
			},
			message: (props) => `${props.value} n'est pas un nombre valide`,
		},
		set: function (v) {
			return parseFloat(v.toFixed(2));
		},
	},
	voiture: {
		type: Schema.Types.ObjectId,
		ref: "Voiture",
		default: null,
	},
});

module.exports = mongoose.model("User", userSchema);
