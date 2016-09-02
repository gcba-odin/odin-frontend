function DatasetStarredController($scope, $location, rest, $rootScope, $sce) {
    // Flash.clear();
    $scope.modelName = "Dataset";
    $scope.type = "datasets";

    $scope.starredDataset = rest().get({
        type: $scope.type,
        params: "orderBy=updatedAt&sort=DESC&limit=4&starred=true"
    }, function(result) {
        result.data.forEach(function(dataset) {
            dataset.fileTypes = [];
            $scope.filesResults = rest().get({
                type: 'files',
                params: 'include=tags&dataset=' + dataset.id
            }, function(result) {
                $scope.files = result.data.filter(function(file) {
                    //TODO: status filter should be handled in the api
                    // with AND condition
                    return file.status.name === 'Publicado';
                });
                $scope.files.forEach(function(element) {
                    rest().findOne({
                        id: element.type.id,
                        type: 'filetypes'
                    }, function(resultFileType) {
                        if (dataset.fileTypes.indexOf(resultFileType) === -1) {
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