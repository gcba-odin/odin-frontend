var app = angular.module('odin.datasetControllers', []);

app.factory('model', function($resource) {
    return $resource();
});

function DatasetController($scope, $location, rest, $rootScope, $sce, $routeParams, LocationSearchService, $httpParamSerializer, $filter) {
    LocationSearchService.init();
    $rootScope.isDatasetView = true;
    $scope.activeCategories = [];
    $scope.type = "datasets";
    $scope.params = {
        slug: $routeParams.id,
        include: 'tags,categories'
    };

    rest().get({
        type: $scope.type,
        params: $httpParamSerializer($scope.params)
    }, function(result) {
        result.data.forEach(function(element) {
            //Because default server search is "contains"
            //In consequence, one slug could be cointaned by another when looking up
            if (element.slug == $routeParams.id) {
                $scope.info = element;
            }
        });
        $scope.info.categories.forEach(function(category) {
            $scope.activeCategories.push(category.name);
        });
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

        $scope.loadResults();
    });

    $scope.loadResults = function(limit) {
        $scope.params = $.extend({
            dataset: $scope.info.id,
            include: 'tags',
            limit: 10,
            skip: 0
        }, LocationSearchService.searchParams());

        if (limit) {
            $scope.params.skip += limit;
        } else {
            $scope.params.skip = 0;
        }

        $scope.filesResults = rest()[
            $scope.params.query ? 'search' : 'get'
        ]({
            type: 'files',
            params: $httpParamSerializer($scope.params)
        }, function(result) {
            $scope.countResources = result.meta.count;
            $scope.files = $scope.filesResults.data;
            $scope.files.forEach(function(element) {
                rest().findOne({
                    id: element.type.id,
                    type: 'filetypes'
                }, function(resultFileType) {
                    $scope.fileTypes[element.type.id] = resultFileType.name;
                });

                element.additional_info = []

                angular.forEach(element.optionals, function(val, key) {
                    element.additional_info.push({
                        clave: key,
                        valor: val
                    });
                });

                element.resources = rest().resources({
                    id: element.id,
                    type: 'files'
                }, function() {
                    if (!!element.resources.data) {
                        angular.forEach(element.resources.data.maps, function(maps) {
                            if (!!maps.basemap) {
                                maps.base = rest().findOne({
                                    type: 'basemaps',
                                    id: maps.basemap.id
                                }, function() {

                                    maps.geoData = {
                                        data: maps.geojson,
                                        onEachFeature: function(feature, layer) {
                                            if (feature.properties) {
                                                var html = '';
                                                angular.forEach(feature.properties, function(value, key) {
                                                    html += '<strong>' + key + '</strong>: ' + value + '<br><br>';
                                                });
                                                if (html != '') {
                                                    layer.bindPopup(html);
                                                }
                                            }
                                        }
                                    }
                                    maps.tile = {
                                        url: maps.base.url
                                    }
                                });
                            }
                        });

                        for (charts in element.resources.data.charts) {
                            if ((!!element.resources.data.charts[charts]) && (!!element.resources.data.charts[charts].data)) {
                                element.resources.data.charts[charts].series = [
                                    []
                                ];
                                if (!!element.resources.data.charts[charts].dataSeries) {
                                    if (element.resources.data.charts[charts].dataType == 'qualitative') {
                                        element.resources.data.charts[charts].series[0] = element.resources.data.charts[charts].dataSeries;
                                    } else {
                                        element.resources.data.charts[charts].series[0].push(element.resources.data.charts[charts].dataSeries[1]);
                                    }
                                }
                                element.resources.data.charts[charts].dataChart = {
                                    data: [element.resources.data.charts[charts].data.data]
                                }

                                var getRandomColor = function() {

                                    var letters = '0123456789ABCDEF'.split('');
                                    var color = '#';
                                    for (var i = 0; i < 6; i++) {
                                        color += letters[Math.floor(Math.random() * 16)];
                                    }
                                    return color;

                                }

                                element.resources.data.charts[charts].colors = [];
                                if (element.resources.data.charts[charts].type != 'line') {
                                    element.resources.data.charts[charts].colors[0] = {
                                        backgroundColor: []
                                    };
                                    angular.forEach(element.resources.data.charts[charts].data.data, function(element_chart) {
                                        element.resources.data.charts[charts].colors[0].backgroundColor.push(getRandomColor());
                                    });
                                }
                            }
                        }
                    }
                });

                if (element.type.api) {
                    element.contents = rest().contents({
                        id: element.id,
                        type: 'files',
                        params: 'limit=' + $scope.params.limit
                    });
                }

                  if (element.layout == true) {
                    $scope.layout = true;
                    $scope.layout_url = element.url;
                  }

            });

            $scope.info.additional_info = [];

            angular.forEach($scope.info.optionals, function(val, key) {
                $scope.info.additional_info.push({
                    clave: key,
                    valor: val
                });
            });
        });
    }

    $scope.paging = function(event, page, pageSize, total, resource) {
        var skip = (page - 1) * $scope.params.limit;
        //$scope.q = "&skip=" + skip + "&limit=" + $scope.limit;
        resource.contents = rest().contents({
            id: resource.id,
            type: 'files',
            params: "skip=" + skip + "&limit=" + $scope.params.limit
        });
    };

    $scope.pagingAll = function(event, page, pageSize, total) {
        var skip = (page - 1) * $scope.params.limit;
        $scope.loadResults(skip);
    };

    $scope.toggleDropdown = function(event) {
        if ($(event.target).next().hasClass('dataset-additional-info-table-inactive')) {
            $(event.target).next().addClass('dataset-additional-info-table-active');
            $(event.target).next().removeClass('dataset-additional-info-table-inactive');
            $(event.target).addClass('dataset-additional-info-active');
        } else {
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

    $scope.scroll = 0;
    $scope.loading = 'Cargando..';

    $scope.getNavStyle = function(scroll) {
        if (scroll > 100)
            return 'pdf-controls fixed';
        else
            return 'pdf-controls';
    }

    $scope.onError = function(error) {
        // console.log(error);
    }

    $scope.onLoad = function() {
        $scope.loading = '';
    }

    $scope.onProgress = function(progress) {
        // console.log(progress);
    }
}
