(function() {
    var app = angular.module('odin', ["ngRoute", "store-directives", "store-factories"]);
    app.config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "home.html",
                controller: controllerHome
            })
            .when("/dataset/:name", {
                templateUrl: "dataset.html",
                controller: controllerDataset
            }).otherwise({
                redirectTo: '/'
            });

    });

    function controllerHome($scope, datasetF) {


    }

    function controllerDataset($scope, datasetF, $routeParams) {
    	$scope.loading=false;
		datasetF.getDataset(function(data){
			datasetF.setDataset(data);
			$scope.loading=true;
			$scope.info=datasetF.getInfo();
		});
    }


})();