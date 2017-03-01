angular.module('store-directives-datasets')
.directive("datasetFiletypes", function() {
    return {
        restrict: "E",
        templateUrl: "directives/datasets/dataset-filetypes.html",
        scope: {
            fileType: '=info',
            divLi: '=infoLi',
            divClass: '@infoClass'
        },
        controller: function($scope, $filter) {
            $scope.fileType = $filter('searchFiletype')($scope.fileType);
        }
    };
});
