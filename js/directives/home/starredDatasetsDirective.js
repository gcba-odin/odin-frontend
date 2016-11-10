angular.module('store-directives-home')
.directive("starredDatasets", function() {
    return {
        restrict: "E",
        templateUrl: "directives/home/starred-datasets.html",
        controller: DatasetStarredController,
        controllerAs: "starreddatasets"
    };
});