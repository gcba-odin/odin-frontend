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
                            organization.active = LocationSearchService.isActive('organizations', organization.name);
                            $scope.organizations.push(organization);
                        }
                    });
                }
                $scope.loadOrganizations(0);
                $scope.selectOrganization = function(organization) {
                    if(organization.active) {
                        LocationSearchService.removeFilterValue('organizations', organization.name);
                    } else {
                        LocationSearchService.addFilterValue('organizations', organization.name);
                    }
                };
                $scope.removeAll = function() {
                    LocationSearchService.deleteFilter('organizations');
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
                            tag.active = LocationSearchService.isActive('tags', tag.name);
                            $scope.tags.push(tag);
                        }
                    });

                }
                $scope.loadTags(0);
                $scope.selectTag = function(tag) {
                    if(tag.active) {
                        LocationSearchService.removeFilterValue('tags', tag.name);
                    } else {
                        LocationSearchService.addFilterValue('tags', tag.name);
                    }
                };
                $scope.removeAll = function() {
                    LocationSearchService.deleteFilter('tags');
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
                            filetype.active = LocationSearchService.isActive('filetypes', filetype.name);
                            $scope.filetypes.push(filetype);
                        }
                    });
                    $scope.datasetCount = {};
                }
                $scope.loadFormats(0);
                $scope.selectFiletype = function(filetype) {
                    if(filetype.active) {
                        LocationSearchService.removeFilterValue('filetypes', filetype.name);
                    } else {
                        LocationSearchService.addFilterValue('filetypes', filetype.name);
                    }
                };
                $scope.removeAll = function() {
                    LocationSearchService.deleteFilter('filetypes');
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
                $scope.orderings = [
                    {
                        name: 'Nombre',
                        property: 'name'
                    }, {
                        name: 'Fecha de publicación',
                        property: 'createdAt'
                    }, {
                        name: 'Más visitados',
                        property: 'GoogleAnalytics'
                    }
                ].map(function(order) {
                    order.active = LocationSearchService.isActive('order', order.property);
                    return order;
                });
                $scope.selectOrder = function(order) {
                    if(order.active) {
                        LocationSearchService.deleteFilter('order');
                    } else {
                        LocationSearchService.setFilter('order', order.property);
                    }
                };
                $scope.removeAll = function() {
                    LocationSearchService.deleteFilter('order');
                };
            },
            controllerAs: "licences"
        };
    });
})();