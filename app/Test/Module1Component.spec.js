'use strict'

describe('Module1Component',function(){
	
	beforeEach(angular.mock.module('CoP'));
	var $httpBackend, $componentController, $rootScope, aCtrl;
	
	beforeEach(inject(function(_$httpBackend_, $componentController, $rootScope){
		$httpBackend = _$httpBackend_;
		
		$httpBackend.expectGET('https://api.github.com/search/repositories?q=tetris+language:javascript&is=public&sort=stars&order=desc')
        .respond({data:{
        	  "total_count": 2149,
        	  "incomplete_results": false,
        	  "items": [
        	    {
        	      "id": 76954504,
        	      "name": "react-tetris",
        	      "full_name": "chvin/react-tetris",
        	      "owner": {
        	        "login": "chvin",
        	        "id": 5383506,
        	        "avatar_url": "https://avatars1.githubusercontent.com/u/5383506?v=3",
        	        "gravatar_id": "",
        	        "url": "https://api.github.com/users/chvin",
        	        "html_url": "https://github.com/chvin",
        	        "followers_url": "https://api.github.com/users/chvin/followers",
        	        "following_url": "https://api.github.com/users/chvin/following{/other_user}",
        	        "gists_url": "https://api.github.com/users/chvin/gists{/gist_id}",
        	        "starred_url": "https://api.github.com/users/chvin/starred{/owner}{/repo}",
        	        "subscriptions_url": "https://api.github.com/users/chvin/subscriptions",
        	        "organizations_url": "https://api.github.com/users/chvin/orgs",
        	        "repos_url": "https://api.github.com/users/chvin/repos",
        	        "events_url": "https://api.github.com/users/chvin/events{/privacy}",
        	        "received_events_url": "https://api.github.com/users/chvin/received_events",
        	        "type": "User",
        	        "site_admin": false
        	      }}]}});
		
		aCtrl = $componentController('systemHome');
	}));
	
	
	it('Search repository by keywords "tetris" ', function() {
	      expect(aCtrl.details).not.toBeDefined();
	      aCtrl.aQuery = 'tetris';
	      aCtrl.mySubmitFunction();
	      $httpBackend.flush();
	      aCtrl.myResponseFunction({data:{
        	  "total_count": 2149,
        	  "incomplete_results": false,
        	  "items": [
        	    {
        	      "id": 76954504,
        	      "name": "react-tetris",
        	      "full_name": "chvin/react-tetris",
        	      "owner": {
        	        "login": "chvin",
        	        "id": 5383506,
        	        "avatar_url": "https://avatars1.githubusercontent.com/u/5383506?v=3",
        	        "gravatar_id": "",
        	        "url": "https://api.github.com/users/chvin",
        	        "html_url": "https://github.com/chvin",
        	        "followers_url": "https://api.github.com/users/chvin/followers",
        	        "following_url": "https://api.github.com/users/chvin/following{/other_user}",
        	        "gists_url": "https://api.github.com/users/chvin/gists{/gist_id}",
        	        "starred_url": "https://api.github.com/users/chvin/starred{/owner}{/repo}",
        	        "subscriptions_url": "https://api.github.com/users/chvin/subscriptions",
        	        "organizations_url": "https://api.github.com/users/chvin/orgs",
        	        "repos_url": "https://api.github.com/users/chvin/repos",
        	        "events_url": "https://api.github.com/users/chvin/events{/privacy}",
        	        "received_events_url": "https://api.github.com/users/chvin/received_events",
        	        "type": "User",
        	        "site_admin": false
        	      }}]}});
	      expect(aCtrl.details).toEqual([
	    	  {
      	      "id": 76954504,
      	      "name": "react-tetris",
      	      "full_name": "chvin/react-tetris",
      	      "owner": {
      	        "login": "chvin",
      	        "id": 5383506,
      	        "avatar_url": "https://avatars1.githubusercontent.com/u/5383506?v=3",
      	        "gravatar_id": "",
      	        "url": "https://api.github.com/users/chvin",
      	        "html_url": "https://github.com/chvin",
      	        "followers_url": "https://api.github.com/users/chvin/followers",
      	        "following_url": "https://api.github.com/users/chvin/following{/other_user}",
      	        "gists_url": "https://api.github.com/users/chvin/gists{/gist_id}",
      	        "starred_url": "https://api.github.com/users/chvin/starred{/owner}{/repo}",
      	        "subscriptions_url": "https://api.github.com/users/chvin/subscriptions",
      	        "organizations_url": "https://api.github.com/users/chvin/orgs",
      	        "repos_url": "https://api.github.com/users/chvin/repos",
      	        "events_url": "https://api.github.com/users/chvin/events{/privacy}",
      	        "received_events_url": "https://api.github.com/users/chvin/received_events",
      	        "type": "User",
      	        "site_admin": false
      	      }}]);
	    });
	
	
	it('Parse a package.json file', function() {
	      
		//expect(aCtrl.details).not.toBeDefined();
	    var anDummyResponse = {data:{
	    	    "name" : "defined",
	    	    "version" : "1.0.0",
	    	    "description" : "return the first argument that is `!== undefined`",
	    	    "main" : "index.js",
	    	    "directories" : {
	    	        "example" : "example",
	    	        "test" : "test"
	    	    },
	    	    "dependencies" : {},
	    	    "devDependencies" : {
	    	        "tape" : "~3.5.0"
	    	    },
	    	    "scripts" : {
	    	        "test" : "tape test/*.js"
	    	    },
	    	    "testling" : {
	    	        "files" : "test/*.js",
	    	        "browsers" : {
	    	            "ie" : [ 6, 7, 8, 9 ],
	    	            "ff" : [ 3.5, 10, 15.0 ],
	    	            "chrome" : [ 10, 22 ],
	    	            "safari" : [ 5.1 ],
	    	            "opera" : [ 12 ]
	    	        }
	    	    },
	    	    "repository" : {
	    	        "type" : "git",
	    	        "url" : "git://github.com/substack/defined.git"
	    	    },
	    	    "homepage" : "https://github.com/substack/defined",
	    	    "keywords" : [
	    	        "undefined",
	    	        "short-circuit",
	    	        "||",
	    	        "or",
	    	        "//",
	    	        "defined-or"
	    	    ],
	    	    "author" : {
	    	        "name" : "James Halliday",
	    	        "email" : "mail@substack.net",
	    	        "url" : "http://substack.net"
	    	    },
	    	    "license" : "MIT"
	    	}}; 
	    
	    
	    aCtrl.myPackageContentResponseFunction(anDummyResponse);
	    expect(aCtrl.packageTrack).toEqual({tape:1});
	    });
	
	
	

	
	
	it('Import repository with a valid package.json file', function() {
		 var anDummyResponse = {data:{
	    	    "name" : "defined",
	    	    "version" : "1.0.0",
	    	    "description" : "return the first argument that is `!== undefined`",
	    	    "main" : "index.js",
	    	    "directories" : {
	    	        "example" : "example",
	    	        "test" : "test"
	    	    },
	    	    "dependencies" : {},
	    	    "devDependencies" : {
	    	        
	    	    },
	    	    "scripts" : {
	    	        "test" : "tape test/*.js"
	    	    },
	    	    "testling" : {
	    	        "files" : "test/*.js",
	    	        "browsers" : {
	    	            "ie" : [ 6, 7, 8, 9 ],
	    	            "ff" : [ 3.5, 10, 15.0 ],
	    	            "chrome" : [ 10, 22 ],
	    	            "safari" : [ 5.1 ],
	    	            "opera" : [ 12 ]
	    	        }
	    	    },
	    	    "repository" : {
	    	        "type" : "git",
	    	        "url" : "git://github.com/substack/defined.git"
	    	    },
	    	    "homepage" : "https://github.com/substack/defined",
	    	    "keywords" : [
	    	        "undefined",
	    	        "short-circuit",
	    	        "||",
	    	        "or",
	    	        "//",
	    	        "defined-or"
	    	    ],
	    	    "author" : {
	    	        "name" : "James Halliday",
	    	        "email" : "mail@substack.net",
	    	        "url" : "http://substack.net"
	    	    },
	    	    "license" : "MIT"
	    	}}; 
	    
	    
	    aCtrl.myPackageContentResponseFunction(anDummyResponse);
	    expect(aCtrl.packageTrack).toEqual({});
	});
});
