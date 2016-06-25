'use strict'

angular.module('RDash')
	.factory('Fretes', Fretes);

Fretes.$inject = ['$resource'];

function Fretes($resource){
	return $resource('/fretes/:codigo_frete', {codigo_frete: '@codigo_frete'}, {
		update: {
			method: 'PUT'
		}
	});
}