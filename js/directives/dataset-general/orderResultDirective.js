angular.module('odin')
.directive("orderResult", function() {
    return {
        restrict: "E",
        templateUrl: "directives/dataset-general/order-results.html",
        scope: {
            filesView: '=',
            collapse: '='
        },
        controller: 'OrderingsController'
    };
});
