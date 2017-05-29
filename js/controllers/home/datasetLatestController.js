function DatasetLatestController($scope, $location, rest, $rootScope, $sce, usSpinnerService) {
    // Flash.clear();
    $scope.modelName = "Dataset";
    $scope.type = "datasets";

    $scope.latestDataset = rest().get({
        type: $scope.type,
        params: "fields=id,name,slug,description&orderBy=updatedAt&sort=DESC&limit=4",
    }, function (result) {
        result.data.forEach(function (dataset) {
            dataset.fileTypes = [];
            dataset.fileTypesNames = [];
            $scope.filesResults = rest().getFiletypes({
                type: 'datasets',
                id: dataset.id
            }, function (result) {
                $scope.ftypes = result.data;
                $scope.ftypes.forEach(function (element) {
                    if (!!element.id) {
                        dataset.fileTypes.push(element.id);
                    }
                });

            }, function (error) {
            });
        });
        $rootScope.showLoadingLatest = false;
    }, function (error) {
        $rootScope.showLoadingLatest = false;
    });

    $scope.url = function (id) {
        return $rootScope.url + '/datasets/' + id + '/download'
    };
}
