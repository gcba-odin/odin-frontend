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
                        }
                    });
                }
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


    app.directive("tagsResult", function(LocationSearchService) {
        return {
            restrict: "E",
            templateUrl: "directives/datasets/tags-results.html",
            scope: {},
            controller: function($scope, rest) {
                var filterName = 'tags.name';
                $scope.limitTags = 0;
                $scope.tags = [];
                $scope.resultTags = [];
                $scope.loadTags = function(limit) {
                    $scope.limitTags += limit;
                    $scope.resultTags = rest().get({
                        type: "tags",
                        params: "orderBy=name&sort=ASC&limit=5&skip=" + $scope.limitTags
                    }, function() {
                        for (var i = 0; i < $scope.resultTags.data.length; i++) {
                            var tag = $scope.resultTags.data[i];
                            tag.active = LocationSearchService.isActive(filterName, tag.name);
                            $scope.tags.push(tag);
                        }
                    });

                }
                $scope.loadTags(0);
                $scope.selectTag = function(tag) {
                    if(tag.active) {
                        LocationSearchService.removeFilterValue(filterName, tag.name);
                    } else {
                        LocationSearchService.addFilterValue(filterName, tag.name);
                    }
                };
                $scope.removeAll = function() {
                    LocationSearchService.deleteFilter(filterName);
                };
            },
            controllerAs: "tags"
        };
    });

    app.directive("formatsResult", function(LocationSearchService) {
        return {
            restrict: "E",
            templateUrl: "directives/datasets/formats-results.html",
            scope: {},
            controller: function($scope, rest) {
                var filterName = 'files.type';
                $scope.limitFormats = 0;
                $scope.filetypes = [];
                $scope.resultFormats = [];
                $scope.loadFormats = function(limit) {
                    $scope.limitFormats += limit;
                    $scope.resultFormats = rest().get({
                        type: "filetypes",
                        params: "orderBy=name&sort=ASC&limit=5&skip=" + $scope.limitFormats
                    }, function() {
                        for (var i = 0; i < $scope.resultFormats.data.length; i++) {
                            var filetype = $scope.resultFormats.data[i];
                            filetype.active = LocationSearchService.isActive(filterName, filetype.id);
                            $scope.filetypes.push(filetype);
                        }
                    });
                    $scope.datasetCount = {};
                }
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
            scope: {},
            controller: function($scope) {
                var filterName = 'orderBy';
                $scope.orderings = [
                    {
                        name: 'Nombre',
                        property: 'name',
                        sort: 'ASC'
                    }, {
                        name: 'Fecha de publicación',
                        property: 'createdAt',
                        sort: 'DESC'
                    }, {
                        name: 'Más descargados',
                        property: '',
                        sort: 'DESC'
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