angular.module('odin')
.directive("tagsResult", function() {
    return {
        restrict: "E",
        templateUrl: "directives/dataset-list/tags-results.html",
        scope: {},
        controller: 'TagsController'
    };
});
