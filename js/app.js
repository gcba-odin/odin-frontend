(function() {
    var app = angular.module('odin', ["ngRoute", "config-odin","ngResource","ngProgress","odin.controllers","store-directives", "store-factories"]);
    app.config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home.html",
                controller: controllerHome
            })
            .when("/dataset/:id", {
                templateUrl: "views/dataset.html",
                controller: DatasetController
            }).when("/datasets", {
                templateUrl: "views/datasets.html",
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

 

})();