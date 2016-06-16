describe("Routes: Clientes", () => {
	const Clientes = app.db.models.Clientes;
	let fakeCliente;
	beforeEach(done => {
		Clientes
			.destroy({where: {}})
			.then(() => Clientes.bulkCreate([{
				nome: "Zé das Couves",
				endereco: "Feira do Zé",
				telefone: 999999999
			},{
				nome: "João das Neves",
				endereco: "sabi dinada",
				telefone: 888888888
			}], {returning: true}))
			.then(() => Clientes.findAll({}))
			.then(clientes => {
				fakeCliente = clientes[0];
				done();
			});

	});
	describe("GET /clientes", () => {
		describe("status 200", () => {
			it("retorna uma lista de clientes", done => {
				request
					.get("/clientes")
					.expect(200)
					.end((err, res) => {
						expect(res.body).to.have.length(2);
						expect(res.body[0].nome).to.eql("Zé das Couves");
						expect(res.body[1].nome).to.eql("João das Neves");
						done(err);
					});
			});
		});
	});
	describe("POST /clientes", () => {
		describe("status 200", () => {
			it("cria um novo cliente", done => {
				request
					.post("/clientes")
					.send({
						nome: "Jax das Motocas",
						endereco: "Charming",
						telefone: 9999999666
					})
					.expect(200)
					.end((err, res) => {
						expect(res.body.nome).to.eql("Jax das Motocas");
						expect(res.body.endereco).to.eql("Charming");
						expect(res.body.telefone).to.eql(9999999666);
						done(err);
					})

			});
		});
	});
	describe("GET /clientes/:codigo_cliente", () => {
		describe("status 200", () => {
			it("retorna um cliente", done => {
				request
					.get(`/clientes/${fakeCliente.codigo_cliente}`)
					.expect(200)
					.end((err, res) => {
						expect(res.body).to.be.an('object');
						expect(res.body.nome).to.eql('Zé das Couves');
						done(err);
					})
			});
		});
		describe("status 404", () => {
			it("lança erro quando o cliente não existe", done => {
				request
					.get('/clientes/0')
					.expect(404)
					.end((err, res) => done(err));
			});
		});
	});
	describe("PUT /clientes/:codigo_cliente", () => {
		describe("status 204", () => {
			it("atualiza um cliente", done => {
				request
					.put(`/clientes/${fakeCliente.codigo_cliente}`)
					.send({
						endereco: "CEASA"
					})
					.expect(204)
					.end((err, res) => done(err));
			});
		});
	});
	describe("DELETE /clientes/:codigo_cliente", () => {
		describe("status 204", () => {
			it("remove um cliente", done => {
				request
					.delete(`/clientes/${fakeCliente.codigo_cliente}`)
					.expect(204)
					.end((err, res) => done(err));
			});
		});
	});
});