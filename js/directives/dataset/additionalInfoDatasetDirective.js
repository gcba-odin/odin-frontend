angular.module('store-directives-dataset')
.directive("aditionalInfoDataset", function() {
    return {
        restrict: "E",
        templateUrl: "directives/dataset/aditional-info-dataset.html",

        controller: function($scope) {

        },
        controllerAs: "aditionalinfo"
    };
});