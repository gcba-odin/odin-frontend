angular.module('store-directives-dataset')
.directive("organizationsDataset", function() {
    return {
        restrict: "E",
        templateUrl: "directives/dataset/organizations-dataset.html",

        controller: function($scope) {
          $scope.collapsed = true;
          $scope.toggleCollapse = function() {
              $scope.collapsed = !$scope.collapsed;
          };
        },
        controllerAs: "organizations"
    };
});
