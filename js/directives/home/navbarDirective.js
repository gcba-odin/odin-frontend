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
          }
        }
    };
});