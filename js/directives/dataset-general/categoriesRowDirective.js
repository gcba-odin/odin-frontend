angular.module('odin')
.directive("categoriesRow", function() {
    return {
        restrict: "E",
        templateUrl: "directives/dataset-general/categories-row.html",
        controller:CategoryListController,
        controllerAs: "category"
    };
});
