angular.module('store-directives-datasets')
.directive("organizationsResult", function() {
    return {
        restrict: "E",
        templateUrl: "directives/datasets/organizations-results.html",
        scope: {},
        controller: 'OrganizationsController'
    };
});