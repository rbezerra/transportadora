'use strict';

angular.module('RDash')
	.controller('CidadesCtrl', CidadesCtrl);

CidadesCtrl.$inject = ['Cidades', 'SweetAlert', 'Estados'];

function CidadesCtrl(Cidades, SweetAlert, Estados){
	var vm = this;

	vm.paginaAtual = 0;
	vm.tamanhoPagina = 3;
	vm.cidadeFormulario = {};
	vm.lista = [];
	vm.op = "Adicionar";
	vm.carregarCidade = carregarCidade;
	vm.resetForm = resetForm;
	vm.saveCidade = saveCidade;
	vm.removerCidade = removerCidade;
	vm.qtdPaginas = qtdPaginas;

	carregarCidades();
	carregarEstados();
	
	function carregarCidade(cidade){
		vm.op = "Editar";
		vm.cidadeFormulario = cidade;
	}

	function resetForm(){
		vm.op = "Adicionar";
		vm.cidadeFormulario = {};
		vm.formCidade.$setPristine();
	}

	function saveCidade(){
		if(vm.op==='Adicionar'){
			Cidades.save(vm.cidadeFormulario, function(){
				carregarCidades();
				resetForm();
				SweetAlert.success("Cidade Adicionada");
			});
		}else{
			Cidades.update(vm.cidadeFormulario, function(){
				carregarCidades();
				resetForm();
				SweetAlert.success("Cidade Atualizada");

			});
		}	
	}

	function removerCidade(cidade){
		SweetAlert.swal({
		   title: "Tem Certeza?",
		   text: "Depois de removida, você não terá mais acesso à cidade!",
		   type: "warning",
		   showCancelButton: true,
		   cancelButtonText: "Cancelar",
		   confirmButtonColor: "#DD6B55",
		   confirmButtonText: "Sim",
		   closeOnConfirm: false}, 
			function(isConfirm){
				if(isConfirm){
				   Cidades.delete(cidade, function(){
					carregarCidades();
					resetForm();
					SweetAlert.success("Cidade Removida");
				   });
				}else{
					SweetAlert.swal({
						title:"Operação Cancelada",
						type:"warning"
					});
				}
		});	
	}

	function carregarCidades(){
		Cidades.query(function(data){
			vm.lista = data;
		});
	}

	function carregarEstados(){
		vm.estados = Estados;
	}

	function qtdPaginas(){
		return Math.ceil(vm.lista.length/vm.tamanhoPagina);
	}
}