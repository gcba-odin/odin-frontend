function DatasetPopularController($scope, $location, rest, $rootScope, $sce, usSpinnerService) {
    usSpinnerService.spin('spinner');
    $rootScope.countQuery ++;
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
        $rootScope.countQuery --;
        if($rootScope.countQuery == 0) { usSpinnerService.stop('spinner'); }
    }, function(error) {
        $rootScope.showLoadingPopular = false;
        $rootScope.countQuery --;
        if($rootScope.countQuery == 0) { usSpinnerService.stop('spinner'); }
    });
}
