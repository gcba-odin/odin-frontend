function SearchDatasetsController ($scope, $location, LocationSearchService) {
    $scope.search = function() {
        if ($scope.query) {
            $location.path('datasets').search('query', $scope.query);
        } else {
            LocationSearchService.deleteFilter('query');
        }
    };
    $scope.$watch("ngShow", function(val){console.log('ngShow', val)});
}