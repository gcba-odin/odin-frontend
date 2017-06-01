angular.module('odin')
.directive("starredDatasets", function() {
    return {
        restrict: "E",
        templateUrl: "directives/home/starred-datasets.html",
        controller: DatasetStarredController,
        controllerAs: "starreddatasets"
    };
});
