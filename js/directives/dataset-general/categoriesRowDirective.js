angular.module('odin')
.directive("categoriesRow", function() {
    return {
        restrict: "E",
        templateUrl: "directives/main/categories-row.html",
        controller:CategoryListController,
        controllerAs: "category"
    };
});
