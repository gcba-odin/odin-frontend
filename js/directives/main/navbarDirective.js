angular.module('odin')
.directive("navbar", function($rootScope) {
    return {
        restrict: "E",
        templateUrl: "directives/main/navbar.html",
        controller: function($scope) {
          $rootScope.showCategoriesSidebar = false;
          $scope.toggleCategoriesSidebar = function() {
            $rootScope.showNavbarSearch = false;
            $rootScope.showFiltersMenu = false;
            $rootScope.showCategoriesSidebar = !$rootScope.showCategoriesSidebar;
            $rootScope.showBackdrop = $rootScope.showCategoriesSidebar;
          };
          $rootScope.showNavbarSearch = false;
          $scope.toggleNavbarSearch = function() {
            $rootScope.showNavbarSearch = !$rootScope.showNavbarSearch;
          };
          $rootScope.showFiltersMenu = false;
          $scope.toggleFiltersMenu = function() {
            $rootScope.showCategoriesSidebar = false;
            $rootScope.showNavbarSearch = false;
            $rootScope.showFiltersMenu = !$rootScope.showFiltersMenu;
            $rootScope.showBackdrop = $rootScope.showFiltersMenu;
          };
        }
    };
});
