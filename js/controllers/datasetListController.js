function DatasetListController($scope, $location, rest, $rootScope, $sce, $routeParams, DatasetListService) {
    $rootScope.isDatasetView = true;
    $scope.params = {
        sort: 'ASC',
        include: ['files', 'tags', 'categories'].join(),
        limit: 10,
        skip: 0,
        'categories.slug': $routeParams['categories.slug'],
    };
    $scope.modelName = "Dataset";
    $rootScope.header = "Datasets List";
    $scope.downloads = [];
    $scope.datasets = [];
    $scope.resultDatasetsSearch = [];
    $scope.showLoading = true;
    $scope.url_api = $rootScope.url;

    DatasetListService.getDatasetsCount(null, function(result) {
        $scope.countDatasets = result.data.count;
    });

    $scope.loadResults = function(limit) {
        $scope.showLoading = true;
        if (limit) {
            $scope.params.skip += limit;
        } else {
            $scope.params.skip = 0;
        }
        DatasetListService.getDatasets($scope.params, function(datasets) {
            $scope.datasets = datasets.map(function(dataset) {
                if ($scope.downloads.length) {
                    var downloadsCount = $scope.downloads
                        .filter(function(download) {
                            return download.dataset === dataset.id;
                        })
                        .map(function(download) {
                            return download.downloads;
                        });
                    dataset.downloads = downloadsCount.length ? downloadsCount[0] : 0;
                }

                dataset.additional_info = [];
                angular.forEach(dataset.optionals, function(val, key) {
                    dataset.additional_info.push({
                        clave: key,
                        valor: val
                    });
                });

                dataset.fileTypes = [];
                $scope.filesResults = rest().get({
                    type: 'files',
                    params: 'include=tags&dataset=' + dataset.id
                }, function(result) {
                    $scope.files = result.data;
                    $scope.files.forEach(function(element) {
                        rest().findOne({
                            id: element.type.id,
                            type: 'filetypes'
                        }, function(resultFileType) {
                            var resultFileTypeName = resultFileType.name;
                            if (dataset.fileTypes.indexOf(resultFileTypeName) === -1) {
                                dataset.fileTypes.push(resultFileTypeName);
                            }
                        });
                    });
                });

                return dataset;
            });
            $scope.showLoading = false;
            $scope.count = $scope.datasets.length;
        });
    };

    DatasetListService.getDownloadResults($scope.params, function(downloads) {
        $scope.downloads = downloads;
        $scope.loadResults(0);
    });

    $scope.view = function(model) {
        var url = '/datasets/' + model.id + "/view";
        $location.path(url);
    };
    $scope.getHtml = function(html) {
        return $sce.trustAsHtml(html);
    };

    $scope.paging = function(event, page, pageSize, total) {
        var skip = (page - 1) * $scope.params.limit;
        $scope.loadResults(skip);
    };

    function downloadsDesc(a, b) {
        // sort DESC
        if (a.downloads < b.downloads) {
            return 1;
        }
        if (a.downloads > b.downloads) {
            return -1;
        }
        // a must be equal to b
        return 0;
    }
}