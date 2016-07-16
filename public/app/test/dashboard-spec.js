describe('dashboard do sistema de transportadora', function(){

	beforeEach(function(){
		browser.get('http://localhost:3000/public');	
	});

	it('deve direcionar para a tela de cidades ao clicar em cidades', function(){
		element(by.uiSref('cidades')).click();
		expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/public/#/cidades");
	});

	it('deve direcionar para a tela de clientes ao clicar em clientes', function(){
		element(by.uiSref('clientes')).click();
		expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/public/#/clientes");
	});

	it('deve direcionar para a tela de fretes ao clicar em fretes', function(){
		element(by.uiSref('fretes')).click();
		expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/public/#/fretes");
	});
});