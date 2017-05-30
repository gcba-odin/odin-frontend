angular.module('odin')
.directive("subcategoriesResult", function() {
    return {
        restrict: "E",
        templateUrl: "directives/dataset-list/subcategories-results.html",
        scope: {},
        controller: 'SubcategoriesController'
    };
});
