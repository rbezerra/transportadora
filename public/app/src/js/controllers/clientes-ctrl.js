'use strict';

angular.module('RDash')
	.controller('ClientesCtrl', ClientesCtrl);

ClientesCtrl.$inject = ['Clientes', 'SweetAlert'];

function ClientesCtrl(Clientes, SweetAlert){
	var vm = this;

	vm.paginaAtual = 0;
	vm.tamanhoPagina = 3;
	vm.clienteFormulario = {};
	vm.lista = [];
	vm.op = "Adicionar";
	vm.carregarCliente = carregarCliente;
	vm.resetForm = resetForm;
	vm.saveCliente = saveCliente;
	vm.removerCliente = removerCliente;
	vm.qtdPaginas = qtdPaginas;

	carregarClientes();

	function carregarCliente(cliente){
		vm.op = "Editar";
		vm.clienteFormulario = cliente;
	}

	function resetForm(){
		vm.op = "Adicionar";
		vm.clienteFormulario = {};
		vm.formCliente.$setPristine();
	}

	function saveCliente(){
		if(vm.op==='Adicionar'){
			Clientes.save(vm.clienteFormulario, function(){
				carregarClientes();
				resetForm();
				SweetAlert.success("Cliente Adicionado");
			});
		}else{
			Clientes.update(vm.clienteFormulario, function(){
				carregarClientes();
				resetForm();
				SweetAlert.success("Cliente Atualizado");

			})
		}	
	}

	function removerCliente(cliente){
		SweetAlert.swal({
		   title: "Tem Certeza?",
		   text: "Depois de removido, você não terá mais acesso ao cliente!",
		   type: "warning",
		   showCancelButton: true,
		   cancelButtonText: "Cancelar",
		   confirmButtonColor: "#DD6B55",
		   confirmButtonText: "Sim",
		   closeOnConfirm: false}, 
			function(isConfirm){
				if(isConfirm){
				   Clientes.delete(cliente, function(){
					carregarClientes();
					resetForm();
					SweetAlert.success("Cliente Removido");
				   });
				}else{
					SweetAlert.swal({
						title:"Operação Cancelada",
						type:"warning"
					});
				}
		});	
	}

	function carregarClientes(){
		Clientes.query(function(data){
			vm.lista = data;
		});
	}

	function qtdPaginas(){
		return Math.ceil(vm.lista.length/vm.tamanhoPagina);
	}

}