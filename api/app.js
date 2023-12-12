"use strict";

const express = require("express");
const mongoose = require("mongoose");
let hateoasLinker = require("express-hateoas-links");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const historiqueRoutes = require("./routes/historique");
const dbRoutes = require("./routes/db");
const config = require("./config");
const cors = require("cors");

const app = express();
const PORT = config.PORT;
const MONGO_URL = config.MONGO_URL;

// parse application/json
app.use(express.json());

// remplace le res.json standard avec la nouvelle version
// qui prend en charge les liens HATEOAS
app.use(hateoasLinker);
//app.use(cors);

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"OPTIONS, GET, POST, PUT, PATCH, DELETE"
	);
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
});

app.use("/auth", authRoutes);
app.use(cors(), userRoutes);
app.use(cors(), historiqueRoutes);
app.use("/db", dbRoutes);
// Utilisation des routes en tant que middleware

mongoose
	.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		app.listen(PORT, () => {
			console.log("Node.js est à l'écoute sur le port %s ", MONGO_URL);
		});
	})
	.catch((err) => console.log(err));

module.exports = app;