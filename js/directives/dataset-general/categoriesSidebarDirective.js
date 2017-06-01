angular.module('odin')
.directive("categoriesSidebar", function() {
    return {
        restrict: "E",
        templateUrl: "directives/dataset-general/categories-sidebar.html",
        controller: CategoryListController
    };
});
