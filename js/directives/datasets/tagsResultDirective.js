angular.module('store-directives-datasets')
.directive("tagsResult", function() {
    return {
        restrict: "E",
        templateUrl: "directives/datasets/tags-results.html",
        scope: {},
        controller: 'TagsController'
    };
});