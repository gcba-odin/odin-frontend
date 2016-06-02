(function() {
    var app = angular.module('odin', ["ngRoute", "config-odin","ngResource","ngProgress","odin.controllers","store-directives", "store-factories"]);
    app.config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "home.html",
                controller: controllerHome
            })
            .when("/dataset/:id", {
                templateUrl: "dataset.html",
                controller: DatasetController
            }).when("/datasets", {
                templateUrl: "datasets.html",
                controller: DatasetListController
            }).otherwise({
                redirectTo: '/'
            });
 
    });



    function controllerHome($scope,$location,$sce,$filter) {


        $scope.search = function() {
    		$location.url('/datasets?q='+$scope.term);
    	}
        $scope.getHtml = function(html){
            return $sce.trustAsHtml(html);
        };
        $scope.goToUrl = function(url) {
            $filter('slug')(this.item.name);
            window.location = "#/dataset/"+$filter('slug')(this.item.id);
        };
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