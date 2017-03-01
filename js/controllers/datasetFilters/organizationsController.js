angular.module('odin.controllers')
.controller('OrganizationsController', OrganizationsController);

function OrganizationsController($rootScope, $scope, $routeParams, LocationSearchService, DatasetListService, rest, $filter) {
    var filterName = 'files.organization';
    var orgsAutocomplete;

    $scope.selectedOrgs = JSON.parse(sessionStorage.getItem('selectedOrgs'));
    $scope.orgsNames = [];

    $scope.organizations = [];
    $scope.resultOrganizations = [];
    // $scope.organizationsCount = {}

    $scope.currentColor = sessionStorage.getItem('currentColor') || '';

    $scope.collapsed = true;

    $scope.toggleCollapse = function() {
        $scope.collapsed = !$scope.collapsed;
    };

    if (!$.isArray($scope.selectedOrgs)) {
      $scope.selectedOrgs = [];
    }

    $scope.loadOrganizations = function() {
        $scope.resultOrganizations = rest().get({
            type: "organizations",
            params: "orderBy=name&sort=ASC"
        }, function() {
            for (var i = 0; i < $scope.resultOrganizations.data.length; i++) {
                var organization = $scope.resultOrganizations.data[i];
                organization.active = LocationSearchService.isActive(filterName, organization.id);
                $scope.organizations.push(organization);
                // $scope.loadOrganizationCount(organization.id);
                $scope.orgsNames.push(organization.name);
            }
            orgsAutocomplete = JSON.parse(sessionStorage.getItem('orgsAutocomplete'));
            if (orgsAutocomplete) {
              $scope.orgsNames=orgsAutocomplete.sort();
            } else {
              orgsAutocomplete =  $scope.orgsNames.sort();
            }
            // if ($filter('filter')($scope.organizations, {active: true})[0]!==undefined) {
            if ($filter('filter')($scope.selectedOrgs, {active: true})[0]!==undefined) {
              $scope.collapsed=false;
            }
        });
    };

    // $scope.loadOrganizationCount = function(organizationId){
    //     $scope.organizationsCount[organizationId] = 0;
    //     $scope.params = {
    //         condition: 'AND',
    //         include: ['files', 'tags', 'categories'].join(),
    //         'files.organization': organizationId,
    //         'categories.slug': $routeParams['categories.slug'],
    //     };
    //
    //     DatasetListService.getDatasetsCount($scope.params, function(result) {
    //         $scope.organizationsCount[organizationId] = result.data.count;
    //     });
    // };

    $scope.loadOrganizations(0);

    $scope.selectOrganization = function(organization) {
        $rootScope.showFiltersMenu = false;
        $rootScope.showBackdrop = false;
        if(organization.active) {
            organization.active = false;
            $scope.selectedOrgs.splice($scope.selectedOrgs.indexOf(organization.name),1);
            orgsAutocomplete.push(organization.name);
            LocationSearchService.removeFilterValue(filterName, organization.id);
        } else {
            organization.active = true;
            $scope.selectedOrgs.push(organization);
            orgsAutocomplete.splice(orgsAutocomplete.indexOf(organization.name),1);
            LocationSearchService.addFilterValue(filterName, organization.id);
        }
        sessionStorage.setItem('orgsAutocomplete',JSON.stringify(orgsAutocomplete));
        sessionStorage.setItem('selectedOrgs', JSON.stringify($scope.selectedOrgs));
    };

    $scope.removeAll = function() {
        LocationSearchService.deleteFilter(filterName);
    };

    $scope.orgTypedSelected = function(orgSelected){
      orgSelected=$scope.organizations.filter(function(organization){
        return organization.name == orgSelected;
      });
      $scope.selectOrganization(orgSelected[0]);
      $scope.orgsNames.splice($scope.orgsNames.indexOf(orgSelected[0].name),1);
    };

}
