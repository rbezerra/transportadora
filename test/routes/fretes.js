describe("Routes: Fretes", () => {
	const Fretes = app.db.models.Fretes;
	const Cidades = app.db.models.Cidades;
	const Clientes = app.db.models.Clientes;
	let fakeFrete;
	let fakeCliente;
	let fakeCidade;
	beforeEach(done => {
		Clientes
			.destroy({where: {}})
			.then(() => Clientes.create({
				nome: "Zé das Couves",
				endereco: "Feira do Zé",
				telefone: 999999999
			}))
			.then(cliente => {
				fakeCliente = cliente.dataValues;
			})
			.then(() => Cidades.create({
				nome: "São Luís",
				UF: "MA",
				taxa: 5
			}))
			.then(cidade => {
				fakeCidade = cidade.dataValues;
			})
			.then(() => {
				Fretes.destroy({where: {}})
				.then(() => Fretes.bulkCreate([{
					"descricao": "tablet",
			        "peso": "150",
			        "valor": 349,
			        "cidade_codigo_cidade": fakeCidade.codigo_cidade,
			        "cliente_codigo_cliente": fakeCliente.codigo_cliente,
				},{
					"descricao": "chaveiro",
			        "peso": "10",
			        "valor": 2,
			        "cidade_codigo_cidade": fakeCidade.codigo_cidade,
			        "cliente_codigo_cliente": fakeCliente.codigo_cliente,
				}]))
				.then(() => Fretes.findAll({}))
				.then(fretes => {
					fakeFrete = fretes[0];
					done();
				});
			});
	});
	describe("GET /fretes", () => {
		describe("status 200", () => {
			it("retorna um lista de fretes", done => {
				request
					.get("/fretes")
					.expect(200)
					.end((err, res) => {
						expect(res.body).to.have.length(2);
						expect(res.body[0].descricao).to.eql("tablet");
						expect(res.body[1].descricao).to.eql("chaveiro");
						done(err);
					});
			});
		});
	});
	describe("POST /fretes", () => {
		describe("status 200", () => {
			it("cria um nova frete", done => {
				request
					.post("/fretes")
					.send({
						"descricao": "mochila",
				        "peso": 300,
				        "valor": 100,
				        "cidade_codigo_cidade": fakeCidade.codigo_cidade,
				        "cliente_codigo_cliente": fakeCliente.codigo_cliente,
					})
					.expect(200)
					.end((err, res) => {
						expect(res.body.descricao).to.eql("mochila");
						expect(res.body.peso).to.eql(300);
						expect(res.body.valor).to.eql(100);
						done(err);
					})
			});
		});
	});
	describe("GET /fretes/:codigo_frete", () => {
		describe("status 200", () => {
			it("retorna um frete", done => {
				request
					.get(`/fretes/${fakeFrete.codigo_frete}`)
					.expect(200)
					.end((err, res) => {
						expect(res.body).to.be.an('object');
						expect(res.body.descricao).to.eql('tablet');
						done(err);
					})
			});
		});
		describe("status 404", () => {
			it("lança erro quando a frete não existe", done => {
				request
					.get('/fretes/0')
					.expect(404)
					.end((err, res) => done(err));
			});
		});
	});
	describe("PUT /fretes/:codigo_frete", () => {
		describe("status 204", () => {
			it("atualiza um frete", done => {
				request
					.put(`/fretes/${fakeFrete.codigo_frete}`)
					.send({
						valor: "500"
					})
					.expect(204)
					.end((err, res) => done(err));
			});
		});
	});
	describe("DELETE /fretes/:codigo_frete", () => {
		describe("status 204", () => {
			it("remove um frete", done => {
				request
					.delete(`/fretes/${fakeFrete.codigo_frete}`)
					.expect(204)
					.end((err, res) => done(err));
			});
		});
	});
});