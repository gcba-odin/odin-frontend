function controllerHome($scope, $location, $sce, $filter, $rootScope, rest, DatasetListService, usSpinnerService) {
    usSpinnerService.spin('spinner');
    sessionStorage.removeItem('query');
    sessionStorage.removeItem('activeCategory');

    localStorage.removeItem('currentCategory');
    sessionStorage.removeItem('tagsAutocomplete');
    sessionStorage.removeItem('orgsAutocomplete');
    sessionStorage.removeItem('formatsAutocomplete');
    sessionStorage.removeItem('selectedTags');
    sessionStorage.removeItem('selectedOrgs');
    sessionStorage.removeItem('selectedFormats');

    $rootScope.header = "Odin";
    $rootScope.isDatasetView = false;
    $rootScope.isHome = true;
    $rootScope.showLoadingLatest = true;
    $rootScope.showLoadingStarred = true;
    $rootScope.showLoadingPopular = true;

    $rootScope.countQuery ++;
    DatasetListService.getDatasetsCount($scope.params, function(result) {
        $scope.countDatasets = result.data.count;
        $rootScope.countQuery --;
        if($rootScope.countQuery == 0) { usSpinnerService.stop('spinner'); }
    });

    $scope.getHtml = function(html) {
        return $sce.trustAsHtml(html);
    };

    $scope.goToUrl = function(url) {
        $filter('slug')(this.item.name);
        window.location = "/dataset/" + $filter('slug')(this.item.id);
    };
}
