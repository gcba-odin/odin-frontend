function controllerHome($scope, $location, $sce, $filter, $rootScope, rest, DatasetListService) {
    $rootScope.header = "Odin";
    $rootScope.isDatasetView = false;

    DatasetListService.getDatasetsCount($scope.params, function(result) {
        $scope.countDatasets = result.data.count;
    });

    $scope.getHtml = function(html) {
        return $sce.trustAsHtml(html);
    };

    $scope.goToUrl = function(url) {
        $filter('slug')(this.item.name);
        window.location = "/dataset/" + $filter('slug')(this.item.id);
    };
}