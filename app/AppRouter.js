(function(){
	'use strict'
	
	angular.module('CoP').config(routeFunction);
	
	routeFunction.$inject = ['$routeProvider'];
	
	function routeFunction($routeProvider){
		$routeProvider.when('/home',{
			template : '<system-home></system-home>'
		}).when('/top',{
			template : '<top-results></top-results>'
		}).otherwise({
			redirectTo : '/home'
		});
	}
})();