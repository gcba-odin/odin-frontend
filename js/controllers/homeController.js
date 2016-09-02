function controllerHome($scope, $location, $sce, $filter, $rootScope, rest, DatasetListService) {
    $rootScope.header = "Odin";
    $rootScope.isDatasetView = false;
    $scope.type = "datasets";
    $scope.params = {
        limit: 20
    };

    rest().get({
        type: $scope.type
    }, function(result) {
        $scope.params.limit = result.meta.limit * result.meta.pages;
        DatasetListService.getDatasets($scope.params, function(datasets) {
            $scope.countDatasets = datasets.length;
        });
    });

    $scope.getHtml = function(html) {
        return $sce.trustAsHtml(html);
    };

    $scope.goToUrl = function(url) {
        $filter('slug')(this.item.name);
        window.location = "/dataset/" + $filter('slug')(this.item.id);
    };
}