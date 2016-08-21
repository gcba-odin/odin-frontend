(function() {
    var app = angular.module('store-directives-datasets', ['angularMoment']);

    app.directive("resultDatasets", function() {
        return {
            restrict: "E",
            templateUrl: "directives/datasets/result-datasets.html",
            controller: function($scope, rest) {
                $scope.stats = {};

                rest().get({
                    type: "datasets",
                    params: "include=files,tags,categories"
                }, function(datasets) {
                    angular.forEach(datasets.data, function(element)
                    {
                        rest().get({
                            type: "statistics",
                            params: "resource=Dataset&endpoint=" + element['id'] + "/download&match=ENDS&condition=AND"
                        }, function(result) {
                            $scope.stats[element['id']] = {downloads: (result.meta.count ? result.meta.count : 0)};
                        });
                    });
                });

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
            },
            controllerAs: "dataset"
        };
    });

    app.directive("organizationsResult", function(LocationSearchService) {
        return {
            restrict: "E",
            templateUrl: "directives/datasets/organizations-results.html",
            scope: {},
            controller: function($scope, rest) {
                var filterName = 'files.organization';
                $scope.limitOrganizations = 0;
                $scope.organizations = [];
                $scope.resultOrganizations = [];
                $scope.lessThanLimit;
                $scope.organizationsCount = {}
                $scope.loadOrganizations = function(limit) {
                    $scope.limitOrganizations += limit;
                    $scope.resultOrganizations = rest().get({
                        type: "organizations",
                        params: "orderBy=name&sort=ASC&limit=5&skip=" + $scope.limitOrganizations
                    }, function() {
                        for (var i = 0; i < $scope.resultOrganizations.data.length; i++) {
                            var organization = $scope.resultOrganizations.data[i];
                            organization.active = LocationSearchService.isActive(filterName, organization.id);
                            $scope.organizations.push(organization);
                            $scope.organizationsCount[organization.id] = 0;    
                            $scope.loadOrganizationCount(organization.id);
                        }
                        $scope.lessThanLimit = $scope.resultOrganizations.data.length < limit;
                    });
                };

                //This won't scale. TODO: Change to /count
                $scope.loadOrganizationCount = function(organizationId){
                    rest().get({
                        type: "datasets",
                        params: "include=files&status.name=Publicado&files.organization=" + organizationId
                    }, function(results) {
                        $scope.organizationsCount[organizationId] = results.meta.count;
                    });                    
                };

                $scope.showLess = function(limit) {
                    var countOrganizations = $scope.organizations.length;
                    var minCount = Math.min(countOrganizations, limit);
                    $scope.organizations.splice(minCount, countOrganizations - minCount);
                    $scope.limitOrganizations = 0;
                    $scope.lessThanLimit = false;
                };

                $scope.loadOrganizations(0);
                $scope.selectOrganization = function(organization) {
                    if(organization.active) {
                        LocationSearchService.removeFilterValue(filterName, organization.id);
                    } else {
                        LocationSearchService.addFilterValue(filterName, organization.id);
                    }
                };
                $scope.removeAll = function() {
                    LocationSearchService.deleteFilter(filterName);
                };
            },
            controllerAs: "organizations"
        };
    });


    app.directive("tagsResult", function($filter, LocationSearchService) {
        return {
            restrict: "E",
            templateUrl: "directives/datasets/tags-results.html",
            scope: {},
            controller: function($scope, rest) {
                var filterName = 'tags.name';
                $scope.limitTags = 0;
                $scope.tags = [];
                $scope.resultTags = [];
                $scope.lessThanLimit;
                
                $scope.loadTags = function(limit) {
                    $scope.limitTags += limit;
                    $scope.resultTags = rest().get({
                        type: "tags",
                        params: "orderBy=name&sort=ASC&limit=5&skip=" + $scope.limitTags
                    }, function() {
                        for (var i = 0; i < $scope.resultTags.data.length; i++) {
                            var tag = $scope.resultTags.data[i];
                            tag.slug = $filter('slug')(tag.name);
                            tag.active = LocationSearchService.isActive(filterName, tag.slug);
                            $scope.tags.push(tag);
                        }
                        $scope.lessThanLimit = $scope.resultTags.data.length < limit;
                    });

                };

                $scope.showLess = function(limit) {
                    var countTags = $scope.tags.length;
                    var minCount = Math.min(countTags, limit);
                    $scope.tags.splice(minCount, countTags - minCount);
                    $scope.limitTags = 0;
                    $scope.lessThanLimit = false;
                };

                $scope.loadTags(0);
                $scope.selectTag = function(tag) {
                    if(tag.active) {
                        LocationSearchService.removeFilterValue(filterName, tag.slug);
                    } else {
                        LocationSearchService.addFilterValue(filterName, tag.slug);
                    }
                };
                $scope.removeAll = function() {
                    LocationSearchService.deleteFilter(filterName);
                };
            },
            controllerAs: "tags"
        };
    });

    app.directive("formatsResult", function($filter, LocationSearchService) {
        return {
            restrict: "E",
            templateUrl: "directives/datasets/formats-results.html",
            scope: {},
            controller: function($scope, rest) {
                var filterName = 'files.type';
                $scope.limitFormats = 0;
                $scope.filetypes = [];
                $scope.resultFormats = [];
                $scope.lessThanLimit;
                $scope.fileTypesCount = {};
                $scope.loadFormats = function(limit) {
                    $scope.limitFormats += limit;
                    $scope.resultFormats = rest().get({
                        type: "filetypes",
                        params: "orderBy=name&sort=ASC&limit=5&skip=" + $scope.limitFormats
                    }, function() {
                        for (var i = 0; i < $scope.resultFormats.data.length; i++) {
                            var filetype = $scope.resultFormats.data[i];
                            filetype.active = LocationSearchService.isActive(filterName, filetype.id);
                            filetype.slug = $filter('slug')(filetype.name);
                            $scope.filetypes.push(filetype);
                            $scope.loadFileTypeCount(filetype.id);
                        }
                        $scope.lessThanLimit = $scope.resultFormats.data.length < limit;
                    });
                    $scope.datasetCount = {};
                };

                //This won't scale. TODO: Change to /count
                $scope.loadFileTypeCount = function(fileTypeId){
                    rest().get({
                        type: "datasets",
                        params: "include=files&files.type=" + fileTypeId
                    }, function(results) {
                        var count = results.data
                            .filter(function(dataset) {
                                return dataset.status.name === 'Publicado';
                            })
                            .filter(function(dataset) {
                                return dataset.files.filter(function(file) {
                                    return file.status === 'qWRhpRV'
                                        && file.type === fileTypeId;
                                })
                                .length;
                            }).length;
                        $scope.fileTypesCount[fileTypeId] = count || 0;
                    });
                };

                $scope.showLess = function(limit) {
                    var countFormats = $scope.filetypes.length;
                    var minCount = Math.min(countFormats, limit);
                    $scope.filetypes.splice(minCount, countFormats - minCount);
                    $scope.limitFormats = 0;
                    $scope.lessThanLimit = false;
                };

                $scope.loadFormats(0);
                $scope.selectFiletype = function(filetype) {
                    if(filetype.active) {
                        LocationSearchService.removeFilterValue(filterName, filetype.id);
                    } else {
                        LocationSearchService.addFilterValue(filterName, filetype.id);
                    }
                };
                $scope.removeAll = function() {
                    LocationSearchService.deleteFilter(filterName);
                };
            },
            controllerAs: "formats"
        };
    });

    app.directive("orderResult", function(LocationSearchService) {
        return {
            restrict: "E",
            templateUrl: "directives/datasets/order-results.html",
            scope: {
                filesView: '='
            },
            controller: function($scope) {
                var filterName = 'orderBy';
                $scope.orderings = [
                    {
                        name: 'Nombre',
                        property: 'name',
                        sort: 'ASC'
                    }, {
                        name: 'Fecha de publicación',
                        property: 'publishedAt',
                        sort: 'DESC'
                    }, {
                        name: 'Más descargados',
                        property: 'downloads',
                        sort: null,
                        datasetsOnly: true
                    }, {
                        name: 'Última actualización',
                        property: 'updateDate',
                        sort: 'DESC',
                        filesOnly: true
                    }
                ].map(function(order) {
                    order.active = LocationSearchService.isActive(filterName, order.property);
                    return order;
                });
                $scope.selectOrder = function(order) {
                    if(order.active) {
                        LocationSearchService.deleteFilter(filterName);
                        LocationSearchService.deleteFilter('sort');
                    } else {
                        LocationSearchService.setFilter(filterName, order.property);
                        LocationSearchService.setFilter('sort', order.sort);
                    }
                };
                $scope.removeAll = function() {
                    LocationSearchService.deleteFilter(filterName);
                    LocationSearchService.deleteFilter('sort');
                };
            },
            controllerAs: "licences"
        };
    });
})();