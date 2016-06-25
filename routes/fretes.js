import logger from "../libs/logger.js";

module.exports = app => {
	const Fretes = app.db.models.Fretes;
	const Cidades = app.db.models.Cidades;
	const Clientes = app.db.models.Clientes;

	app.route("/fretes")
		.get((req, res) => {
			Fretes
				.findAll({
					include: [{model: Cidades},{model: Clientes}]
				})
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg: error.message});
				});
		})
		.post((req, res) => {
			Fretes.create(req.body)
				.then(result => res.json(result))
				.catch(error => {
					logger.error(`[${new Date()}] ${error.message}`);
					res.status(412).json({msg: error.message});
				});
		});

	app.route("/fretes/:codigo_frete")
		.get((req, res) => {
			Fretes.findOne({
					where: req.params,
					include: [{model: Cidades}, {model: Clientes}]
				})
				.then(result => {
					if(result){
						res.json(result);
					}else{
						res.sendStatus(404);
					}
				})
				.catch(error => {
					res.status(412).json({msg: error.message});
					logger.error(`[${new Date()}] ${error.message}`);
				});
		})
		.put((req, res) => {
			Fretes.update(req.body, {where: req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					logger.error(`[${new Date()}] ${error.message}`);
					res.status(412).json({msg: error.message});
				});
		})
		.delete((req, res) => {
			Fretes.destroy({where: req.params})
				.then(result => res.sendStatus(204))
				.catch(error => {
					logger.error(`[${new Date()}] ${error.message}`);
					res.status(412).json({msg: error.message});
				});
		});
}