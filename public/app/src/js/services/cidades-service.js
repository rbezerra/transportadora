'use strict'

angular.module('RDash')
	.factory('Cidades', Cidades);

Cidades.$inject = ['$resource'];

function Cidades($resource){
	return $resource('/cidades/:codigo_cidade', {codigo_cidade: '@codigo_cidade'}, {
		update: {
			method: 'PUT'
		}
	});
}