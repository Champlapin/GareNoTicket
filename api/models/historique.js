"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historiqueSchema = new Schema(
	{
		price: {
			type: Number,
			default: 0,
			validate: {
				validator: function (v) {
					return v > 0;
				},
				message: (props) => `${props.value} n'est pas un nombre valide`,
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
