(function(){
	'use strict';

	angular
	.module('myapp')
	.factory('computadorAPI',computadorAPI);

	computadorAPI.$inject = ['$http'];

	function computadorAPI($http){
		var _listar  = function(){
			return $http.get('http://localhost:3000/computadores/');
		};

		return{
			listar:_listar
		}
	}
})()
