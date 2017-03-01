function DatasetPopularController($scope, $location, rest, $rootScope, $sce, usSpinnerService) {
    usSpinnerService.spin('spinner');
    $rootScope.countQuery ++;    
    $scope.showPopularCategories = false;
    $scope.statistics = {};
    $scope.porcentual = {};
    $scope.totalStatistics = 0;
    $scope.letterLimit = 4;
    $scope.hideCategoriesSidebar = function () {
        $rootScope.showBackdrop = false;
        $rootScope.showCategoriesSidebar = false;
    };
    
    $scope.popularCategories = angular.copy($scope.popCats);
    
    var loadPorcentual = function (categories) {
        for (var i = 0; i < categories.length; i++) {
            categories[i]['porcentaje'] = 0;
        }
        categories.forEach(function (element) {
            $scope.statistics[element.id] = 0;
            $scope.porcentual[element.id] = 0;
        });

        rest().statistics({
            type: "datasets",
            params: "groupBy=category&action=download"
        }, function (statistics) {
            for (element in statistics.data) {
                var cat = statistics.data[element];
                $scope.statistics[element] = cat.count.GET;
                $scope.totalStatistics += cat.count.GET;
            }
            for (element in statistics.data) {
                for (var i = 0; i < categories.length; i++) {
                    if (categories[i].id == element) {
                        categories[i]['porcentaje'] = $scope.statistics[element] * 100 / $scope.totalStatistics;
                    }
                }
            }
            categories.sort(function (a, b) {
                return b['porcentaje'] - a['porcentaje'];
            });

            $scope.showPopularCategories = true;
            $rootScope.countQuery --;
            if($rootScope.countQuery == 0) { usSpinnerService.stop('spinner'); }
        }, function (error) {
            $scope.showPopularCategories = true;
            $rootScope.countQuery --;
            if($rootScope.countQuery == 0) { usSpinnerService.stop('spinner'); }
        });
    };
    
    loadPorcentual($scope.popularCategories);
}
