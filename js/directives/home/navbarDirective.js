angular.module('store-directives-home')
.directive("navbar", function($rootScope) {
    return {
        restrict: "E",
        templateUrl: "directives/main/navbar.html",
        controller: function($scope) {
          $rootScope.showCategoriesSidebar = false;
          $scope.toggleCategoriesSidebar = function() {
            $rootScope.showCategoriesSidebar = !$rootScope.showCategoriesSidebar;
            $rootScope.showBackdrop = !$rootScope.showBackdrop;
          };
          $rootScope.showNavbarSearch = false;
          $scope.toggleNavbarSearch = function() {
            $rootScope.showNavbarSearch = !$rootScope.showNavbarSearch;
          };
          $rootScope.showOptionsMenu = false;
          $scope.toggleOptionsMenu = function() {
            $rootScope.showOptionsMenu = !$rootScope.showOptionsMenu;
            $rootScope.showBackdrop = !$rootScope.showBackdrop;
          };
        }
    };
});