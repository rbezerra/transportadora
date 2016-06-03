module.exports = app => {
	app.listen(app.get('port'), () => console.log(`Transportadora - porta ${app.get("port")}`));	

}