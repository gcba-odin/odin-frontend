angular.module('store-directives-dataset')
.directive("organizationsDataset", function() {
    return {
        restrict: "E",
        templateUrl: "directives/dataset/organizations-dataset.html",

        controller: function($scope) {
        
        },
        controllerAs: "organizations"
    };
});
