angular.module('odin')
.directive("navbarSearch", function($rootScope) {
    return {
        restrict: "E",
        scope: {
          "isActive": "="
        },
        templateUrl: "directives/main/navbar-search.html",
        controller: SearchDatasetsController
    };
});
