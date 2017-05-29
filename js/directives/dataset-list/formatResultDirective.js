angular.module('odin')
.directive("formatsResult", function() {
    return {
        restrict: "E",
        templateUrl: "directives/datasets/formats-results.html",
        scope: {},
        controller: 'FiletypesController'
    };
});
