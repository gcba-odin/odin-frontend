angular.module('store-directives')
.directive("backdrop", function($rootScope) {
    return {
        restrict: "E",
        templateUrl: "directives/main/backdrop.html",
        controller: function($scope) {
          $rootScope.showBackdrop = false;
          $scope.hideBackdrop = function() {
            $rootScope.showBackdrop = false;
            $rootScope.showCategoriesSidebar = false;
          };
        }
    };
});