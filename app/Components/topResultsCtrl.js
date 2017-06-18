(function(){
	'use strict'
	angular.module('topResults').component('topResults',
			{
		    templateUrl :  'Templates/TopResultsTemplate.html',
		    controller :   topResults,
		    controllerAs : 'aTopResults'
			});
	topResults.$inject = ['$scope','$rootScope'];
	function topResults($scope, $rootScope){	 
	    var aTopResults = this;
	
		var sortable = [];
		for (var jsPackage in $rootScope.packageTrack) {
		    sortable.push([jsPackage, $rootScope.packageTrack[jsPackage]]);
		};

		var anArray = sortable.sort(function(a, b) {
		    return b[1] - a[1];
		});
		
		aTopResults.detailArray = anArray.slice(0,10);
	}
}
)();