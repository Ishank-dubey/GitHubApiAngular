(function(){
	'use strict'
	angular.module('systemHome').component('systemHome',
			{
		    templateUrl :  'Templates/Module1Template.html',
		    controller :   Module1Component,
		    controllerAs : 'aM1Ctrl'
			});
	Module1Component.$inject = ['$scope','$http','$rootScope', '$timeout','$location'];
	function Module1Component($scope, $http, $rootScope, $timeout,$location){
		
		var aM1Ctrl = this;
		aM1Ctrl.hidden = true;
		aM1Ctrl.minWarning = true;
		
		if(document && document.getElementById("queryT"))
		document.getElementById("queryT").focus();
		
		aM1Ctrl.mySubmitFunction =function(){
			
			aM1Ctrl.oldDate = aM1Ctrl.oldDate || new Date();
			
			
			if((!aM1Ctrl.aQueryFinal) || (aM1Ctrl.aQueryFinal!=aM1Ctrl.aQuery) || 
					((aM1Ctrl.aQueryFinal && aM1Ctrl.aQueryFinal==aM1Ctrl.aQuery) && (new Date()-aM1Ctrl.oldDate)/1000>60))
			{
			aM1Ctrl.hidden = false;
			aM1Ctrl.message = 'Fetching the List...';	
			aM1Ctrl.minWarning = true;	
			aM1Ctrl.aQueryFinal = aM1Ctrl.aQuery;
			var aUrl = "https://api.github.com/search/repositories?q="+aM1Ctrl.aQueryFinal+"+language:javascript&is=public&sort=stars&order=desc";	
			 $http.get(aUrl)
		    .then(aM1Ctrl.myResponseFunction);
			 aM1Ctrl.oldDate = new Date();
			 }else{
				 aM1Ctrl.minWarning = false;
				 $timeout(function(){aM1Ctrl.minWarning = true;},500);
			 }
		};
		
		aM1Ctrl.myResponseFunction = function(response){
		   aM1Ctrl.hidden = true;
		   if(response && response.data && response.data.items)
		   aM1Ctrl.details = response.data.items;
		};
		
		aM1Ctrl.importFunction = function(index){
			aM1Ctrl.details[index].imported = true;
			aM1Ctrl.details = aM1Ctrl.details;
			
			aM1Ctrl.hidden = false;
			aM1Ctrl.message = 'Importing..';
			
			if(aM1Ctrl.details[index] && aM1Ctrl.details[index].hasOwnProperty( "contents_url")){
				var aContentUrl = aM1Ctrl.details[index]["contents_url"].replace("{+path}",'');
				$http.get(aContentUrl)
			    .then(aM1Ctrl.myContentResponseFunction);
			}
		};
		
		aM1Ctrl.myContentResponseFunction = function(contentResponse){
			var anIndex=0,length, packageUrl='';
			
			for(anIndex=0,length=contentResponse.data.length;anIndex<length;anIndex++){
				if(contentResponse.data[anIndex].hasOwnProperty("name") && 
						contentResponse.data[anIndex]["name"].toLowerCase()=="package.json"){
				
				packageUrl = contentResponse.data[anIndex]["download_url"];	
				$http.get(packageUrl)
			    .then(aM1Ctrl.myPackageContentResponseFunction);
				break;
				}
			}
			
			if(!packageUrl){
				aM1Ctrl.message = 'Could not find the details...';
				$timeout(function(){aM1Ctrl.hidden = true;}, 2000);
				
			}
			
		};
		
		aM1Ctrl.myPackageContentResponseFunction = function(packContent){
			aM1Ctrl.hidden = true;
			
			aM1Ctrl.packageTrack = aM1Ctrl.packageTrack || {};
			
			if(packContent.data.hasOwnProperty("dependencies")){
			var dependencyArrays = 	Object.keys(packContent.data["dependencies"]);
			var anIndex,length;
			for(anIndex=0,length=dependencyArrays.length;anIndex<length;anIndex++){
			        if(aM1Ctrl.packageTrack.hasOwnProperty(dependencyArrays[anIndex])){
			            var aCount = parseInt(aM1Ctrl.packageTrack[dependencyArrays[anIndex]]);
			            
			            aM1Ctrl.packageTrack[dependencyArrays[anIndex]] = ++aCount;
			            
			            	
			        }else{
			        	aM1Ctrl.packageTrack[dependencyArrays[anIndex]] = 1;
			        }	
			}
			}
			if(packContent.data.hasOwnProperty("devDependencies")){
			
				var devDependencyArrays = Object.keys(packContent.data["devDependencies"]);
				var anIndex,length;
				for(anIndex=0,length=devDependencyArrays.length;anIndex<length;anIndex++){
				        if(aM1Ctrl.packageTrack.hasOwnProperty(devDependencyArrays[anIndex])){
				            var aCount = parseInt(aM1Ctrl.packageTrack[devDependencyArrays[anIndex]]);
				            
				            aM1Ctrl.packageTrack[devDependencyArrays[anIndex]] = ++aCount;
				            
				            	
				        }else{
				        	aM1Ctrl.packageTrack[devDependencyArrays[anIndex]] = 1;
				        }	
				}
			}
			$rootScope.packageTrack = aM1Ctrl.packageTrack;
		}
		
		aM1Ctrl.navigateToTopresultsPage = function(){
			$location.path("/top");
		}
		 
		 
	}
}
)();