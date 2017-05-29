angular.module('odin')
.directive("organizationsResult", function() {
    return {
        restrict: "E",
        templateUrl: "directives/datasets/organizations-results.html",
        scope: {},
        controller: 'OrganizationsController'
    };
});
