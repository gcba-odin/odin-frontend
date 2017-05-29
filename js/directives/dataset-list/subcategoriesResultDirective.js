angular.module('odin')
.directive("subcategoriesResult", function() {
    return {
        restrict: "E",
        templateUrl: "directives/datasets/subcategories-results.html",
        scope: {},
        controller: 'SubcategoriesController'
    };
});
