import logger from "./logger.js";

module.exports = {
	database: 'transportadora',
	username: '',
	password: '',
	params: {
		dialect: 'sqlite',
		storage: 'transportadora.sqlite',
		logging: (sql) => {
			logger.info(`[${new Date()}] ${sql}`);
		},
		define: {
			underscored: true
		}
	}
}