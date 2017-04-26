function DatasetPopularController($scope, $location, rest, $rootScope, $sce, usSpinnerService) {
    // usSpinnerService.spin('spinner');
    // $rootScope.countQuery ++;
    $scope.showPopularCategories = false;
    $scope.totalStatistics = 0;
    $scope.letterLimit = 4;
    $scope.hideCategoriesSidebar = function () {
        $rootScope.showBackdrop = false;
        $rootScope.showCategoriesSidebar = false;
    };

    $scope.popularCategories = angular.copy($scope.popCats);

    var loadPorcentual = function (categories) {
        rest().statistics({
            type: "datasets",
            params: "groupBy=category&action=download"
        }, function (statistics) {

        // TODO: recieve total from API
            for (element in statistics.data) {
                $scope.totalStatistics += statistics.data[element].count.GET;
            }

            for (var i = 0; i < categories.length; i++) {
              if (!!statistics.data[categories[i].id]) {
                categories[i]['porcentaje'] = statistics.data[categories[i].id].count.GET * 100 / $scope.totalStatistics;
              }
            }

            categories.sort(function (a, b) {
                return b['porcentaje'] - a['porcentaje'];
            });

            $scope.showPopularCategories = true;
            // $rootScope.countQuery --;
            // if($rootScope.countQuery == 0) { usSpinnerService.stop('spinner'); }
        }, function (error) {
            $scope.showPopularCategories = true;
            // $rootScope.countQuery --;
            // if($rootScope.countQuery == 0) { usSpinnerService.stop('spinner'); }
        });
    };

    loadPorcentual($scope.popularCategories);
}
