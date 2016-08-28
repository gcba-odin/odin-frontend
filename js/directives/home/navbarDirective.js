angular.module('store-directives-home')
.directive("navbar", function($rootScope) {
    return {
        restrict: "E",
        templateUrl: "directives/main/navbar.html",
        controller: function($scope) {
          $rootScope.showCategoriesSidebar = false;
          $scope.toggleCategoriesSidebar = function() {
            $rootScope.showNavbarSearch = false;
            $rootScope.showOptionsMenu = false;
            $rootScope.showCategoriesSidebar = !$rootScope.showCategoriesSidebar;
            $rootScope.showBackdrop = $rootScope.showCategoriesSidebar;
          };
          $rootScope.showNavbarSearch = false;
          $scope.toggleNavbarSearch = function() {
            $rootScope.showNavbarSearch = !$rootScope.showNavbarSearch;
          };
          $rootScope.showOptionsMenu = false;
          $scope.toggleOptionsMenu = function() {
            $rootScope.showCategoriesSidebar = false;
            $rootScope.showNavbarSearch = false;
            $rootScope.showOptionsMenu = !$rootScope.showOptionsMenu;
            $rootScope.showBackdrop = $rootScope.showOptionsMenu;
          };
        }
    };
});