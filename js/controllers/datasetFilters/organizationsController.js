angular.module('odin.controllers')
.controller('OrganizationsController', OrganizationsController);

function OrganizationsController($rootScope, $scope, $routeParams, LocationSearchService, DatasetListService, rest, $filter) {
    var filterName = 'files.organization';
    var limit = 5;
    $scope.limitOrganizations = 0;
    $scope.organizations = [];
    $scope.resultOrganizations = [];
    $scope.lessThanLimit;
    $scope.organizationsCount = {}
    
    $scope.currentColor = sessionStorage.getItem('currentColor') || '';

    $scope.collapsed = true;
    $scope.toggleCollapse = function() {
        $scope.collapsed = !$scope.collapsed;
    };

    $scope.loadOrganizations = function(skip) {
        $scope.limitOrganizations += skip;
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
            if ($filter('filter')($scope.organizations, {active: true})[0]!==undefined) {
              $scope.collapsed=false;
            }
            $scope.lessThanLimit = $scope.resultOrganizations.data.length < Math.max(skip, limit);
        });
    };

    $scope.loadOrganizationCount = function(organizationId){
        $scope.organizationsCount[organizationId] = 0;
        $scope.params = {
            condition: 'AND',
            include: ['files', 'tags', 'categories'].join(),
            'files.organization': organizationId,
            'categories.slug': $routeParams['categories.slug'],
        };

        DatasetListService.getDatasetsCount($scope.params, function(result) {
            $scope.organizationsCount[organizationId] = result.data.count;
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
