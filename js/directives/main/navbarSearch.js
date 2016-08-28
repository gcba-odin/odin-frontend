angular.module('store-directives')
.directive("navbarSearch", function($rootScope) {
    return {
        restrict: "E",
        templateUrl: "directives/main/navbar-search.html",
        controller: SearchDatasetsController
    };
});