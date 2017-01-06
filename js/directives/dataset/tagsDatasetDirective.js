angular.module('store-directives-dataset')
.directive("tagsDataset", function() {
    return {
        restrict: "E",
        templateUrl: "directives/dataset/tags-datasets.html",

        controller: function($scope) {
        
        },
        controllerAs: "tags"
    };
});
