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

        $scope.filesResults = rest().get({
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
            for (obj in $scope.files) {
                if (!!$scope.files[obj]) {
                    $scope.files[obj].resources = rest().resources({
                        id: $scope.files[obj].id,
                        type: 'files'
                    });
                }
            }
        });

        //TODO: this code below isn't working with the updated api
        // $scope.info.additional_info = [];
        // for (obj in $scope.info) {
        //     if (obj.indexOf("optional") != -1) {
        //         if (!!$scope.info[obj]) {
        //             var valores = $scope.info[obj].split("|");
        //             $scope.info.additional_info.push({
        //                 clave: valores[0],
        //                 valor: valores[1],
        //             });
        //         }
        //     }
        // }
    });

    $scope.toggleDropdown = function ( event )
                {
                    if ($(event.target).next().hasClass('dataset-additional-info-table-inactive'))
                    {
                        $(event.target).next().addClass( 'dataset-additional-info-table-active');
                        $( event.target ).next().removeClass( 'dataset-additional-info-table-inactive' );
                        $( event.target ).addClass('dataset-additional-info-active');
                    }
                    else
                    {
                        $(event.target).next().addClass('dataset-additional-info-table-inactive');
                        $( event.target ).next().removeClass( 'dataset-additional-info-table-active' );
                        $( event.target ).removeClass('dataset-additional-info-active');
                    }
                };

    $scope.getHtml = function(html) {
        return $sce.trustAsHtml(html);
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
        skip: 0
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
        $scope.resultDatasetsSearch = rest().get({
            type: $scope.type,
            params: $httpParamSerializer($scope.params)
        }, function(result) {
            for (var i = 0; i < $scope.resultDatasetsSearch.data.length; i++) {
                var dataset = $scope.resultDatasetsSearch.data[i];
                //TODO: this code below isn't working with the updated api
                // dataset.additional_info = [];
                // for (obj in $scope.resultDatasetsSearch.data[i]) {
                //     if (obj.indexOf("optional") != -1) {
                //         if (!!$scope.resultDatasetsSearch.data[i][obj]) {
                //             var valores = $scope.resultDatasetsSearch.data[i][obj].split("|");
                //             dataset.additional_info.push({
                //                 clave: valores[0],
                //                 valor: valores[1],
                //             });
                //         }
                //     }
                // }
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