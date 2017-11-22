(function(){
	'use strict';

	angular
	.module('myapp')
	.controller('computadorController', computadorController);

	computadorController.$inject=['computadorAPI','$scope'];

	function computadorController(computadorAPI,$scope){
		$scope.computadores = [];

		$scope.listar = function(){
			computadorAPI.listar().success(function(data){
				$scope.computadores = data;
			});
		}
	}
})();
