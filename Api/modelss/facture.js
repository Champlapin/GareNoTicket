"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const factureSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Utilisateur valide requis."],
		},
		price: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Facture", factureSchema);
