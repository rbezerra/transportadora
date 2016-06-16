describe("Routes: Cidades", () => {
	const Cidades = app.db.models.Cidades;
	let fakeCidade;
	beforeEach(done => {
		Cidades
			.destroy({where: {}})
			.then(() => Cidades.bulkCreate([{
				nome: "São Luís",
				UF: "MA",
				taxa: 5
			},{	
				nome: "Santa Inês",
				UF: "MA",
				taxa: 8
			}], {returning: true}))
			.then(() => Cidades.findAll({}))
			.then(cidades => {
				fakeCidade = cidades[0];
				done();
			});

	});
	describe("GET /cidades", () => {
		describe("status 200", () => {
			it("retorna uma lista de cidades", done => {
				request
					.get("/cidades")
					.expect(200)
					.end((err, res) => {
						expect(res.body).to.have.length(2);
						expect(res.body[0].nome).to.eql("São Luís");
						expect(res.body[1].nome).to.eql("Santa Inês");
						done(err);
					});
			});
		});
	});
	describe("POST /cidades", () => {
		describe("status 200", () => {
			it("cria uma nova cidade", done => {
				request
					.post("/cidades")
					.send({
						nome: "Zé Doca",
						UF: "MA",
						taxa: 12
					})
					.expect(200)
					.end((err, res) => {
						expect(res.body.nome).to.eql("Zé Doca");
						expect(res.body.UF).to.eql("MA");
						expect(res.body.taxa).to.eql(12);
						done(err);
					})

			});
		});
	});
	describe("GET /cidades/:codigo_cidade", () => {
		describe("status 200", () => {
			it("retorna uma cidade", done => {
				request
					.get(`/cidades/${fakeCidade.codigo_cidade}`)
					.expect(200)
					.end((err, res) => {
						expect(res.body).to.be.an('object');
						expect(res.body.nome).to.eql('São Luís');
						done(err);
					})
			});
		});
		describe("status 404", () => {
			it("lança erro quando a cidade não existe", done => {
				request
					.get('/cidades/0')
					.expect(404)
					.end((err, res) => done(err));
			});
		});
	});
	describe("PUT /cidades/:codigo_cidade", () => {
		describe("status 204", () => {
			it("atualiza uma cidade", done => {
				request
					.put(`/cidades/${fakeCidade.codigo_cidade}`)
					.send({
						taxa: 15
					})
					.expect(204)
					.end((err, res) => done(err));
			});
		});
	});
	describe("DELETE /cidades/:codigo_cidade", () => {
		describe("status 204", () => {
			it("remove uma cidade", done => {
				request
					.delete(`/cidades/${fakeCidade.codigo_cidade}`)
					.expect(204)
					.end((err, res) => done(err));
			});
		});
	});
});