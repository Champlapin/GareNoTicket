"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const voitureSchema = new Schema(
	{
		marque: {
			type: String,
			match: [/^.[a-zA-z\s]{1,50}$/],
		},
		modele: {
			type: String,
			match: [/^.[a-zA-z\s]{0,50}$/],
		},
		couleur: {
			type: String,
			match: [/^.[a-zA-z\s]{3,50}$/],
		},
		plaque: {
			type: String,
			match: [/^.{6}$/],
			unique: true,
		},
		valet: {
			type: Schema.Types.ObjectId,
			ref: "User",
			default: null,
		},
		isParked: {
			type: Boolean,
			default: false,
		},
		isMoving: {
			type: Boolean,
			default: false,
		},
		latitude: {
			type: Number,
			default: 0,
		},
		longitude: {
			type: Number,
			default: 0,
		},
		timeToLeave: {
			type: Date,
			default: Date.now(),
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Voiture", voitureSchema);
