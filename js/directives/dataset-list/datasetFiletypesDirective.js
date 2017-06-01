angular.module('odin')
.directive("datasetFiletypes", function() {
    return {
        restrict: "E",
        templateUrl: "directives/dataset-list/dataset-filetypes.html",
        scope: {
            fileType: '=info',
            divLi: '=infoLi',
            divClass: '@infoClass'
        },
        controller: function($scope, $filter, $rootScope) {
            $scope.fileType = $filter('searchFiletype')($scope.fileType);
            $scope.custom_defaults = $rootScope.custom_defaults;
        }
    };
});
