function DatasetPopularController($scope, $location, rest, $rootScope, $sce) {
    // Flash.clear();
    $scope.modelName = "Category";
    $scope.type = "categories";
    $scope.showCategories = true;
    $scope.categories = rest().get({
        type: $scope.type,
        params: "orderBy=createdAt&sort=DESC"
    }, function() {
        $rootScope.showLoadingPopular = false;
        $scope.showCategories = false;
    }, function(error) {
        $rootScope.showLoadingPopular = false;
    });
}
