import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import logger from "./logger.js";

module.exports = app => {
	app.set("port", 3000);
	app.set("json spaces", 4);
	app.use(morgan("common", {
		stream: {
			write: (message) => {
				logger.info(message);
			}
		}
	}));
	app.use(helmet());
	app.use(bodyParser.json());
	app.use((req, res, next) => {
		delete req.body.id;
		next();
	});
	app.use('/public', express.static("public/app/dist"));
}