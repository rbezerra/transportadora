'use strict';
angular.module('RDash').filter('peso', peso);

function peso(){
		return function(input){
			if(input < 1000) return input+" g";
			else if(input >= 1000 && input < 1000000 ) return (input/1000)+" Kg";
			else return(input/1000000)+ " t";
		}
}