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
            }).when("/datasets", {
                templateUrl: "datasets.html",
                controller: controllerDatasets
            }).otherwise({
                redirectTo: '/'
            });
 
    });

    function controllerHome($scope, datasetF,$location) {
	    $scope.search = function() {
			$location.url('/datasets?q='+$scope.term);
		}

    }

    function controllerDataset($scope, datasetF, $routeParams) {
    	$scope.loading=false;
		datasetF.getDataset(function(data){
			datasetF.setDataset(data);
			$scope.loading=true;
			$scope.info=datasetF.getInfo();
		});
    }

    function controllerDatasets($scope, datasetsF, $routeParams,$location) {
    	$scope.loading=false;
		datasetsF.getDataset(function(data){
			datasetsF.setDataset(data);
			$scope.loading=true;
			$scope.countResults=datasetsF.countResults();
		});
		$scope.search = function() {
			$location.url('/datasets?q='+$scope.term);
		}
    }

})();