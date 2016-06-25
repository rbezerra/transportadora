'use strict'

angular.module('RDash')
	.factory('Clientes', Clientes);

Clientes.$inject = ['$resource'];

function Clientes($resource){
	return $resource('/clientes/:codigo_cliente', {codigo_cliente: '@codigo_cliente'}, {
		update: {
			method: 'PUT'
		}
	});
}