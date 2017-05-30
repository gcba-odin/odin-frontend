angular.module('odin')
.directive("tagsResult", function() {
    return {
        restrict: "E",
        templateUrl: "directives/datasets/tags-results.html",
        scope: {},
        controller: 'TagsController'
    };
});
