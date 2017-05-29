angular.module('odin')
.directive("categoriesGrid", function() {
    return {
        restrict: "E",
        templateUrl: "directives/home/categories-grid.html",
        controller:CategoryListController,
        controllerAs: "category"
    };
});
