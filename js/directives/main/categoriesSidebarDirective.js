angular.module('odin')
.directive("categoriesSidebar", function() {
    return {
        restrict: "E",
        templateUrl: "directives/main/categories-sidebar.html",
        controller: CategoryListController
    };
});
