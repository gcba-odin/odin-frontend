var app = angular.module('odin.datasetControllers', []);

app.factory('model', function($resource) {
    return $resource();
});

function DatasetLatestController($scope, $location, rest, $rootScope, $sce) {
    // Flash.clear();
    $scope.modelName = "Dataset";
    $scope.type = "datasets";

    $scope.latestDataset = rest().get({
        type: $scope.type,
        params: "orderBy=updatedAt&sort=DESC&limit=4&include=tags&status.name=Publicado"
    });

    $scope.url = function(id)
    {
        return $rootScope.url + '/datasets/' + id + '/download'
    };
}

function DatasetStarredController($scope, $location, rest, $rootScope, $sce) {
    // Flash.clear();
    $scope.modelName = "Dataset";
    $scope.type = "datasets";

    $scope.starredDataset = rest().get({
        type: $scope.type,
        params: "orderBy=updatedAt&sort=DESC&limit=4&starred=true&include=tags&status.name=Publicado"
    });

    $scope.url = function(id)
    {
        return $rootScope.url + '/datasets/' + id + '/download'
    };
}

function DatasetPopularController($scope, $location, rest, $rootScope, $sce) {
    // Flash.clear();
    $scope.modelName = "Category";
    $scope.type = "categories";
    $scope.showCategories = true;
    $scope.categories = rest().get({
        type: $scope.type,
        params: "orderBy=createdAt&sort=DESC"
    }, function() {
        $scope.showCategories = false;
    });
}

function SocialNetworkController($scope, $location, rest, $rootScope, $sce) {
    // Flash.clear();
    $scope.modelName = "Category";
    $scope.type = "categories";
    $scope.showCategories = true;
    $scope.categories = rest().get({
        type: $scope.type,
        params: "orderBy=createdAt&sort=DESC"
    }, function() {
        $scope.showCategories = false;
    });
}

function DatasetController( $scope, $location, rest, $rootScope, $sce, $routeParams, LocationSearchService, $httpParamSerializer)
{
    LocationSearchService.init();
    $scope.type = "datasets";
    $scope.params = $.extend({
        dataset: $routeParams.id
    }, LocationSearchService.searchParams());

    $scope.limit = 10;

    $scope.params = $.extend({
        dataset: $routeParams.id,
        // status: 'qWRhpRV'
    }, LocationSearchService.searchParams());

    $scope.info = rest().findOne({
        id: $routeParams.id,
        type: $scope.type,
        params: 'include=tags,categories'
    }, function(result) {
        $rootScope.header = $scope.info.name;

        var tags = [];

        for (var i = 0; i < $scope.info.tags.length; i++) {
            tags.push({
                name: $scope.info.tags[i].name,
                url: $scope.info.tags[i].id,
                selected: false
            })
        }

        $scope.tags = tags;
        $scope.fileTypes = {};

        $scope.filesResults = rest()[
            $scope.params.query ? 'search' : 'get'
        ]({
            type: 'files',
            params: $httpParamSerializer($scope.params)
        }, function (result){
            $scope.files = $scope.filesResults.data.filter(function(file){
                //TODO: status filter should be handled in the api
                // with AND condition
                return file.status.name === 'Publicado';
            });
            $scope.files.forEach(function (element) {
                rest().findOne({
                    id: element.type.id,
                    type: 'filetypes'
                }, function (resultFileType) {
                    $scope.fileTypes[element.type] = resultFileType.name;
                });
            });

            $scope.info.additional_info = [];

            angular.forEach($scope.info.optionals, function(val, key) {
                $scope.info.additional_info.push({
                    clave: key,
                    valor: val
                });
            });

            for (obj in $scope.files) {
                if (!!$scope.files[obj]) {

                    $scope.files[obj].resources = rest().resources({
                        id: $scope.files[obj].id,
                        type: 'files'
                    });
                    $scope.files[obj].contents = rest().contents({
                        id: $scope.files[obj].id,
                        type: 'files',
                        params: 'limit=' + $scope.limit
                    });

                }
            }
        });
    });

    $scope.paging = function(event, page, pageSize, total, resource) {
        var skip = (page - 1) * $scope.limit;
        //$scope.q = "&skip=" + skip + "&limit=" + $scope.limit;
        resource.contents = rest().contents({
            id: resource.id,
            type: 'files',
            params: "skip=" + skip + "&limit=" + $scope.limit
        });
    };

    $scope.toggleDropdown = function(event)
    {
        if ($(event.target).next().hasClass('dataset-additional-info-table-inactive'))
        {
            $(event.target).next().addClass('dataset-additional-info-table-active');
            $(event.target).next().removeClass('dataset-additional-info-table-inactive');
            $(event.target).addClass('dataset-additional-info-active');
        }
        else
        {
            $(event.target).next().addClass('dataset-additional-info-table-inactive');
            $(event.target).next().removeClass('dataset-additional-info-table-active');
            $(event.target).removeClass('dataset-additional-info-active');
        }
    };

    $scope.getHtml = function(html) {
        return $sce.trustAsHtml(html);
    };

    $scope.disqusConfig = {
        disqus_shortname: 'badataodin',
        disqus_identifier: $routeParams.id,
        disqus_url: $location.absUrl()
    };
}

function DatasetListController($scope, $location, rest, $rootScope, $sce, $routeParams, LocationSearchService, $httpParamSerializer) {
    LocationSearchService.init();
    $scope.params = $.extend({
        sort: 'ASC',
        include: ['files', 'tags', 'categories'].join(),
        limit: 20,
        skip: 0,
        'status.name': 'Publicado'
    }, LocationSearchService.searchParams());
    $scope.modelName = "Dataset";
    $rootScope.header = "Datasets List";
    $scope.downloads = [];
    $scope.datasets = [];
    $scope.resultDatasetsSearch = [];
    $scope.showLoading = true;

    $scope.loadResults = function(limit) {
        $scope.showLoading = true;
        if (limit) {
            $scope.params.skip += limit;
        } else {
            $scope.params.skip = 0;
        }
        $scope.resultDatasetsSearch = rest()[
            $scope.params.query ? 'search' : 'get'
        ]({
            type: 'datasets',
            params: $httpParamSerializer($scope.params)
        }, function(result) {
            $scope.datasets = $scope.resultDatasetsSearch.data.map(function(dataset) {
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

                dataset.url_api = $scope.resultDatasetsSearch.links.all;

                return dataset;
            })
            .filter(function(dataset) {
                return dataset.status.name === 'Publicado';
            })
            .sort(downloadsDesc);

            $scope.showLoading = false;
            $scope.count = $scope.datasets.length;
        });
    };

    if ($scope.params.orderBy === 'downloads') {
        delete $scope.params.orderBy;
        $scope.downloadsResults = rest().statistics({
            type: 'datasets'
        }, function() {
            var items = $scope.downloadsResults.data.items;
            $.each(items, function(key, value){
                if (key.indexOf('download') >= 0 && value.resource === 'Dataset') {
                    $scope.downloads.push({
                        dataset: value.item,
                        downloads: value.count.GET
                    });
                }
            });
            $scope.loadResults(0);
        });
    } else {
        $scope.loadResults(0);
    }

    $scope.view = function(model) {
        var url = '/datasets/' + model.id + "/view";
        $location.path(url);
    };
    $scope.getHtml = function(html) {
        return $sce.trustAsHtml(html);
    };
    function downloadsDesc(a, b){
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