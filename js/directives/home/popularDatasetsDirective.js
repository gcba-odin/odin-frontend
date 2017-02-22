angular.module('store-directives-home')
.directive("popularDatasets", function() {
    return {
        scope: {
            popCats: '=info'
        },
        restrict: "E",
        templateUrl: "directives/home/popular-datasets.html",
        controller: DatasetPopularController,
        controllerAs: "populardatasets"
    };
});