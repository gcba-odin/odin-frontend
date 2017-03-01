angular.module('store-directives-dataset')
.directive("socialsDataset", function($location) {
    return {
        restrict: "E",
        templateUrl: "directives/dataset/socials-dataset.html",
        scope: {
            dataset: '='
        },
        controller: SocialsController,
        controllerAs: "socials"
    };
});
