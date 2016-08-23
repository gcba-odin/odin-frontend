angular.module('store-directives-dataset')
.directive("socialsDataset", function($location) {
    return {
        restrict: "E",
        templateUrl: "directives/dataset/socials-dataset.html",
        scope: {
            dataset: '='
        },
        controller: function($scope) {
            $scope.shareUrl = $location.absUrl();
            $scope.collapsed = true;
            $scope.toggleCollapse = function() {
                $scope.collapsed = !$scope.collapsed;
            };
        },
        controllerAs: "socials"
    };
});