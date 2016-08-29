angular.module('store-directives-datasets')
.directive("orderResult", function() {
    return {
        restrict: "E",
        templateUrl: "directives/datasets/order-results.html",
        scope: {
            filesView: '='
        },
        controller: OrderingsController,
        controllerAs: "licences"
    };
});
