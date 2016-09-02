function DatasetLatestController($scope, $location, rest, $rootScope, $sce) {
    // Flash.clear();
    $scope.modelName = "Dataset";
    $scope.type = "datasets";

    $scope.latestDataset = rest().get({
        type: $scope.type,
        params: "orderBy=updatedAt&sort=DESC&limit=4"
    });

    $scope.url = function(id) {
        return $rootScope.url + '/datasets/' + id + '/download'
    };
}
