angular.module('odin.controllers')
.controller('OrganizationsController', OrganizationsController);

function OrganizationsController($rootScope, $scope, $routeParams, LocationSearchService, DatasetListService, rest) {
    var filterName = 'files.organization';
    $scope.limitOrganizations = 0;
    $scope.organizations = [];
    $scope.resultOrganizations = [];
    $scope.lessThanLimit;
    $scope.organizationsCount = {}
    $scope.loadOrganizations = function(limit) {
        $scope.limitOrganizations += limit;
        $scope.resultOrganizations = rest().get({
            type: "organizations",
            params: "orderBy=name&sort=ASC&limit=5&skip=" + $scope.limitOrganizations
        }, function() {
            for (var i = 0; i < $scope.resultOrganizations.data.length; i++) {
                var organization = $scope.resultOrganizations.data[i];
                organization.active = LocationSearchService.isActive(filterName, organization.id);
                $scope.organizations.push(organization);
                $scope.loadOrganizationCount(organization.id);
            }
            $scope.lessThanLimit = $scope.resultOrganizations.data.length < limit;
        });
    };

    //This won't scale. TODO: Change to /count
    $scope.loadOrganizationCount = function(organizationId){
        $scope.organizationsCount[organizationId] = 0;
        $scope.params = {
            include: ['files', 'tags', 'categories'].join(),
            'files.organization': organizationId,
            'categories.name': $routeParams['categories.name'],// This is the only filter that accepts slug name :(
        };
        DatasetListService.getDatasets($scope.params, function(results) {
            $scope.organizationsCount[organizationId] = results.length;
        });
    };

    $scope.showLess = function(limit) {
        var countOrganizations = $scope.organizations.length;
        var minCount = Math.min(countOrganizations, limit);
        $scope.organizations.splice(minCount, countOrganizations - minCount);
        $scope.limitOrganizations = 0;
        $scope.lessThanLimit = false;
    };

    $scope.loadOrganizations(0);
    $scope.selectOrganization = function(organization) {
        $rootScope.showFiltersMenu = false;
        $rootScope.showBackdrop = false;
        if(organization.active) {
            LocationSearchService.removeFilterValue(filterName, organization.id);
        } else {
            LocationSearchService.addFilterValue(filterName, organization.id);
        }
    };
    $scope.removeAll = function() {
        LocationSearchService.deleteFilter(filterName);
    };
}