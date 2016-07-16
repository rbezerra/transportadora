import express from "express";
import consign from "consign";

const app = express();
//mudança para o build
consign({verbose: false})
	.include("./libs/config.js")
	.then("db.js")
	.then("./libs/middlewares.js")
	.then("routes")
	.then("./libs/boot.js")
	.into(app);

module.exports = app;