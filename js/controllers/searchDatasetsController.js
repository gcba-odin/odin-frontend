function SearchDatasetsController ($scope, $element, $rootScope, $location, LocationSearchService) {
    $scope.query = sessionStorage.getItem('query') || '';
    $scope.search = function() {
        if ($scope.query) {
            sessionStorage.setItem('query', $scope.query);
            
            $rootScope.showNavbarSearch = false;
            //$rootScope.query = sessionStorage.getItem('query') || '';
            LocationSearchService.deleteFilter('categories.slug');
            LocationSearchService.deleteFilter('orderBy');
            LocationSearchService.deleteFilter('sort');
            LocationSearchService.deleteFilter('tags.slug');
            LocationSearchService.deleteFilter('files.type');
            LocationSearchService.deleteFilter('files.organization');
            $location.path('datasets').search('query', $scope.query);

        } else {
            sessionStorage.removeItem('query');
            $rootScope.query = "";
            LocationSearchService.deleteFilter('query');
        }
    };
    $scope.$watch('isActive', function(isActive){
      isActive && $($element).find('input').focus();
    });

}
