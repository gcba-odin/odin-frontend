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

    app.directive("organizationsResult", function() {
        return {
            restrict: "E",
            templateUrl: "directives/datasets/organizations-results.html",
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
                            $scope.organizations.push($scope.resultOrganizations.data[i])
                        }
                    });
                }
                $scope.loadOrganizations(0);
            },
            controllerAs: "organizations"
        };
    });


    app.directive("tagsResult", function() {
        return {
            restrict: "E",
            templateUrl: "directives/datasets/tags-results.html",
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
                            $scope.tags.push($scope.resultTags.data[i])
                        }
                    });

                }
                $scope.loadTags(0);
            },
            controllerAs: "tags"
        };
    });

    app.directive("formatsResult", function() {
        return {
            restrict: "E",
            templateUrl: "directives/datasets/formats-results.html",
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
                            $scope.filetypes.push($scope.resultFormats.data[i]);
                        }
                    });
                    $scope.datasetCount = {};
                }
                $scope.loadFormats(0);
            },
            controllerAs: "formats"
        };
    });

    app.directive("orderResult", function(LocationSearchService) {
        return {
            restrict: "E",
            templateUrl: "directives/datasets/order-results.html",
            controller: function($scope) {
                $scope.orderings = [
                    {
                        name: 'Nombre',
                        property: 'name',
                        active: LocationSearchService.isActive('order', 'name')
                    }, {
                        name: 'Fecha de publicación',
                        property: 'createdAt',
                        active: LocationSearchService.isActive('order', 'createdAt')
                    }, {
                        name: 'Más visitados',
                        property: 'GoogleAnalytics',
                        active: LocationSearchService.isActive('order', 'GoogleAnalytics')
                    }
                ];
                $scope.selectOrder = function(order) {
                    if(order.active) {
                        LocationSearchService.deleteFilter('order');
                    } else {
                        LocationSearchService.setFilter('order', order.property);
                    }
                };
            },
            controllerAs: "licences"
        };
    });
})();