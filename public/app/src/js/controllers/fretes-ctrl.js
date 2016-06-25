'use strict';

angular.module('RDash')
	.controller('FretesCtrl', FretesCtrl);

FretesCtrl.$inject = ['Fretes', 'Cidades', 'Clientes', 'SweetAlert'];

function FretesCtrl(Fretes, Cidades, Clientes, SweetAlert){
	var vm = this;

	vm.paginaAtual = 0;
	vm.tamanhoPagina = 3;
	vm.freteFormulario = {};
	vm.lista = [];
	vm.op = "Adicionar";
	vm.carregarFrete = carregarFrete;
	vm.resetForm = resetForm;
	vm.saveFrete = saveFrete;
	vm.removerFrete = removerFrete;
	vm.qtdPaginas = qtdPaginas;

	carregarFretes();
	carregarCidades();
	carregarClientes();
	

	function carregarFrete(frete){
		vm.op = "Editar";
		console.log(frete);
		vm.freteFormulario = frete;
		vm.freteFormulario.unidade = mudaUnidade(vm.freteFormulario.peso);
		vm.freteFormulario.peso = formataPeso(vm.freteFormulario.peso, vm.freteFormulario.unidade);
		vm.freteFormulario.cidade_codigo_cidade = frete.cidade_codigo_cidade;
		vm.freteFormulario.cliente_codigo_cliente = frete.cliente_codigo_cliente;
		vm.freteFormulario.cidade = frete.Cidade;
		vm.freteFormulario.cliente = frete.Cliente;

	}

	function resetForm(){
		vm.op = "Adicionar";
		vm.freteFormulario = {};
		vm.formFrete.$setPristine();
	}

	function saveFrete(){
		atualizaPeso(vm.freteFormulario);
		vm.freteFormulario.cidade_codigo_cidade = vm.freteFormulario.cidade.codigo_cidade;
		vm.freteFormulario.cliente_codigo_cliente = vm.freteFormulario.cliente.codigo_cliente;
		if(vm.op==='Adicionar'){
			Fretes.save(vm.freteFormulario, function(){
				carregarFretes();
				resetForm();
				SweetAlert.success("Frete Adicionado");
			}, function(error){
				console.log(error);
				SweetAlert.swal(JSON.stringify(error.data.msg));
			});
		}else{
			Fretes.update(vm.freteFormulario, function(){
				carregarFretes();
				resetForm();
				SweetAlert.success("Frete Atualizado");

			}, function(error){
				console.log(error);
				SweetAlert.swal(JSON.stringify(error.data.msg));
			});
		}	
	}

	function removerFrete(frete){
		SweetAlert.swal({
		   title: "Tem Certeza?",
		   text: "Depois de removido, você não terá mais acesso às informações do frete!",
		   type: "warning",
		   showCancelButton: true,
		   cancelButtonText: "Cancelar",
		   confirmButtonColor: "#DD6B55",
		   confirmButtonText: "Sim",
		   closeOnConfirm: false}, 
			function(isConfirm){
				if(isConfirm){
				   Fretes.delete(frete, function(){
					carregarFretes();
					resetForm();
					SweetAlert.success("Frete Removido");
				   });
				}else{
					SweetAlert.swal({
						title:"Operação Cancelada",
						type:"warning"
					});
				}
		});	
	}

	function carregarFretes(){
		Fretes.query(function(data){
			vm.lista = data;
		});
	}

	function carregarClientes(){
		Clientes.query(function(data){
			vm.clientes = data;
		})
	}

	function carregarCidades(){
		Cidades.query(function(data){
			vm.cidades = data;
		})
	}

	function qtdPaginas(){
		return Math.ceil(vm.lista.length/vm.tamanhoPagina);
	}

	function mudaUnidade(peso){
		if(peso<1000) return 'g';
		else if(peso >=1000 && peso < 1000000) return 'kg';
		else return 't';
	}

	function formataPeso(peso, unidade){
		console.log(peso, unidade);
		switch(unidade){
			case 'g': return peso; break;
			case 'kg': return peso/1000; break;
			case 't': return peso/1000000; break;
		}
	}

	function atualizaPeso(freteFormulario){
		switch(freteFormulario.unidade){
			case 'g':  break;
			case 'kg': {
				freteFormulario.peso = freteFormulario.peso*1000;
				break;
			}
			case 't':{
				freteFormulario.peso = freteFormulario.peso*1000000; break;
			} 
		}
	}


}