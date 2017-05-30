angular.module('odin')
.directive("datasetCategories", function() {
    return {
        restrict: "E",
        templateUrl: "directives/dataset-general/dataset-categories.html",
        scope: {
            category: '=info'
        },
        controller: function($scope, $rootScope, $filter) {
            $scope.url_api = $rootScope.url;
            $scope.category = $filter('searchCategory')($scope.category);
        }
    };
});
