function DatasetLatestController($scope, $location, rest, $rootScope, $sce) {
    // Flash.clear();
    $scope.modelName = "Dataset";
    $scope.type = "datasets";

    $scope.latestDataset = rest().get({
        type: $scope.type,
        params: "orderBy=updatedAt&sort=DESC&limit=4",
    }, function(result) {
        result.data.forEach(function(dataset) {
            dataset.fileTypes = [];
            dataset.fileTypesNames = [];
            $scope.filesResults = rest().get({
                type: 'files',
                params: 'include=tags&dataset=' + dataset.id
            }, function(result) {
              console.log(result.data);
                $scope.files = result.data;
                $scope.files.forEach(function(element) {
                    rest().findOne({
                        id: element.type.id,
                        type: 'filetypes'
                    }, function(resultFileType) {
                        if (dataset.fileTypesNames.indexOf(resultFileType.name) === -1) {
                            dataset.fileTypesNames.push(resultFileType.name);
                            dataset.fileTypes.push(resultFileType);
                        }
                    });
                });
            });
        });
    });

    $scope.url = function(id) {
        return $rootScope.url + '/datasets/' + id + '/download'
    };
}
