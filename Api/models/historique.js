"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historiqueSchema = new Schema(
	{
		price: {
			type: Number,
			required: [true, "prix est requis"],
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
		isPaid: {
			type: Boolean,
			default: false,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Utilisateur valide requis."],
		},
		valetId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Valet valide requis."],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Historique", historiqueSchema);
