'use strict';

angular.module('RDash').filter('startFrom', startFrom);

function startFrom(){
	return function(input, start){
		start = +start;
		return input.slice(start);
	}
}