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
        params: "orderBy=updatedAt&sort=DESC&limit=4&include=tags"
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
        params: "orderBy=updatedAt&sort=DESC&limit=4&starred=true&include=tags"
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
        status: 'qWRhpRV'
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
            $scope.files = $scope.filesResults.data;
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
    $scope.modelName = "Dataset";
    $scope.type = "datasets";
    $rootScope.header = "Datasets List";
    $scope.params = $.extend({
        sort: 'ASC',
        include: ['files', 'tags', 'categories'].join(),
        limit: 20,
        skip: 0,
        status: 'qWRhpRV'
    }, LocationSearchService.searchParams());

    $scope.datasets = [];
    $scope.resultDatasetsSearch = [];
    $scope.showLoading = true;

    $scope.loadResults = function(limit) {
        $scope.showLoading = true;
        if (limit) {
            $scope.params.skip += limit;
        } else {
            $scope.params.skip = 0;
            $scope.datasets = [];
        }
        $scope.resultDatasetsSearch = rest()[
            $scope.params.query ? 'search' : 'get'
        ]({
            type: $scope.type,
            params: $httpParamSerializer($scope.params)
        }, function(result) {
            for (var i = 0; i < $scope.resultDatasetsSearch.data.length; i++) {
                var dataset = $scope.resultDatasetsSearch.data[i];

                dataset.additional_info = [];

                angular.forEach($scope.resultDatasetsSearch.data[i].optionals, function(val, key) {
                    dataset.additional_info.push({
                        clave: key,
                        valor: val
                    });
                });
                dataset.url_api = $scope.resultDatasetsSearch.links.all;
                $scope.datasets.push(dataset);
            }
            $scope.showLoading = false;
            $scope.count = result.meta.count;
        });
    };
    $scope.view = function(model) {
        var url = '/' + $scope.type + '/' + model.id + "/view";
        $location.path(url);
    };
    $scope.getHtml = function(html) {
        return $sce.trustAsHtml(html);
    };
    $scope.loadResults(0);
}