describe('tela de cidades', function(){	
	beforeEach(function(){
		browser.get('http://localhost:3000/public/#/cidades');
	});

	it('deve listar pelo menos uma cidade ao iniciar', function(){
		element.all(by.repeater("cidade in cidades.lista")).count().then(function(count){
			expect(count).toBeGreaterThan(1);
		});
		
	});

	it('deve adicionar cidade ao clicar em enviar', function(){
		var nome = element(by.model("cidades.cidadeFormulario.nome"));
		var UF = element(by.model("cidades.cidadeFormulario.UF"));
		var selectUF = UF.element(by.css('.ui-select-search'));
		var taxa = element(by.model("cidades.cidadeFormulario.taxa"));
		var botaoEnviar = element(by.id("botaoEnviar"));


		nome.sendKeys("Bonito");
		UF.click();
		selectUF.sendKeys("MS");
		taxa.sendKeys(12);
		botaoEnviar.click().then(function(){
			//expect
		});
		

	});

	it('deve editar cidade ao clicar no botão de edição', function(){

	});

	it('deve remover cidade ao clicar no botão de remover', function(){

	});
})