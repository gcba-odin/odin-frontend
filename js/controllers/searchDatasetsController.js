function SearchDatasetsController($scope, $element, $rootScope, $location, LocationSearchService, $sce) {
    $rootScope.query = sessionStorage.getItem('query') || '';
    $scope.coverSrc = $sce.trustAsResourceUrl('https://www.youtube.com/embed/zUOnny7_iAo')
    $scope.coverType = 'video'

    $scope.search = function() {
        $rootScope.query = $scope.query;
        sessionStorage.removeItem('activeCategory');
        localStorage.removeItem('currentCategory');
        sessionStorage.removeItem('currentColor');
        if ($rootScope.query) {
            sessionStorage.setItem('query', $rootScope.query);

            $rootScope.showNavbarSearch = false;
            //$rootScope.query = sessionStorage.getItem('query') || '';
            LocationSearchService.deleteFilter('categories.slug');
            LocationSearchService.deleteFilter('orderBy');
            LocationSearchService.deleteFilter('sort');
            LocationSearchService.deleteFilter('tags.slug');
            LocationSearchService.deleteFilter('files.type');
            LocationSearchService.deleteFilter('files.organization');
            $location.path('datasets').search('query', $rootScope.query);

        } else {
            sessionStorage.removeItem('query');
            $rootScope.query = "";
            LocationSearchService.deleteFilter('query');
        }
    };
    $scope.$watch('isActive', function(isActive) {
        isActive && $($element).find('input').focus();
    });
    $scope.changeCover = function(src, type) {
        $scope.coverType = type;
        $scope.coverSrc = $sce.trustAsResourceUrl(src);
    }
}
