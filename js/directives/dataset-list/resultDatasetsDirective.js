angular.module('odin')
    .directive("resultDatasets", function() {
        return {
            restrict: "E",
            templateUrl: "directives/datasets/result-datasets.html",
            controller: function($scope, $window, $location, rest) {
                $scope.stats = {};
                $scope.views = {};

                // rest().statistics({
                //     type: 'datasets'
                // }, function(results) {
                //     $.each(results.data.items, function(key, value) {
                //         if (key.indexOf('download') >= 0 && value.resource === 'Dataset') {
                //             $scope.stats[value.item] = {
                //                 downloads: value.count.GET ? value.count.GET : 0
                //             };
                //         }
                //
                //         if (key.indexOf('download') === -1 && key.indexOf('publish') === -1 && value.resource === 'Dataset') {
                //             $scope.views[value.item] = { views: value.count.GET ? value.count.GET : 0 };
                //         }
                //     });
                // });

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

            },
            controllerAs: "dataset"
        };
    });
