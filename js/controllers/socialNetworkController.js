function SocialNetworkController($scope, $location, rest, $rootScope, $sce, $routeParams, usSpinnerService) {
    usSpinnerService.spin('spinner');
    $rootScope.countQuery ++;
    // Flash.clear();
    $scope.modelName = "Category";
    $scope.type = "categories";
    $scope.showCategories = true;
    $scope.active = false;

    $scope.categories = rest().get({
        type: $scope.type,
        params: "orderBy=createdAt&sort=DESC"
    }, function() {
        $scope.showCategories = false;
        $rootScope.countQuery --;
        if($rootScope.countQuery == 0) { usSpinnerService.stop('spinner'); }
    }, function(error) {
        $rootScope.countQuery --;
        if($rootScope.countQuery == 0) { usSpinnerService.stop('spinner'); }
    });


}
