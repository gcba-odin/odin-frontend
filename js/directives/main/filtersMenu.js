angular.module('store-directives')
.directive("filtersMenu", function($rootScope) {
    return {
        restrict: "E",
        templateUrl: "directives/main/filters-menu.html",
        controller: function($scope) {
          $scope.filterGroups = {};
          $scope.toggleFilterGroup = function(filterGroup) {
            $scope.filterGroups[filterGroup] = !$scope.filterGroups[filterGroup];
          };
          $scope.closeFilterMenu = function() {
            $rootScope.showFilterMenu = false;
          };
        }
    };
});