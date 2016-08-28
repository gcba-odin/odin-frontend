function controllerHome($scope, $location, $sce, $filter, $rootScope) {
    $rootScope.header = "Odin";
    $rootScope.isDatasetView = false;

    $scope.getHtml = function(html) {
        return $sce.trustAsHtml(html);
    };

    $scope.goToUrl = function(url) {
        $filter('slug')(this.item.name);
        window.location = "/dataset/" + $filter('slug')(this.item.id);
    };
}
