(function() {
    var app = angular.module('config-odin',[]);
    app.run(run);
    function run($rootScope, $location, $http) {
    	$rootScope.url='http://137.135.84.77:3000';
    	$rootScope.absUrl=$location.absUrl()

    }
})(); 
