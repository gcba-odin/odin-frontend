angular.module('store-directives-datasets')
.directive("subcategoriesResult", function() {
    return {
        restrict: "E",
        templateUrl: "directives/datasets/subcategories-results.html",
        scope: {},
        controller: 'SubcategoriesController'
    };
});