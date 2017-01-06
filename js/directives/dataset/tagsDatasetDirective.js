angular.module('store-directives-dataset')
.directive("tagsDataset", function() {
    return {
        restrict: "E",
        templateUrl: "directives/dataset/tags-datasets.html",

        controller: function($scope) {
          $scope.collapsed = true;
          $scope.toggleCollapse = function() {
              $scope.collapsed = !$scope.collapsed;
          };
        },
        controllerAs: "tags"
    };
});
