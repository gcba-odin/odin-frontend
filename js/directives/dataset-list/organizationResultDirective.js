angular.module('odin')
.directive("organizationsResult", function() {
    return {
        restrict: "E",
        templateUrl: "directives/dataset-list/organizations-results.html",
        scope: {},
        controller: 'OrganizationsController'
    };
});
