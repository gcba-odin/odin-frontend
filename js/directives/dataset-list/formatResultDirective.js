angular.module('odin')
.directive("formatsResult", function() {
    return {
        restrict: "E",
        templateUrl: "directives/dataset-list/formats-results.html",
        scope: {},
        controller: 'FiletypesController'
    };
});
