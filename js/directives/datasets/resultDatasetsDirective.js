angular.module('store-directives-datasets')
.directive("resultDatasets", function() {
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