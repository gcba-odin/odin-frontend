var app = angular.module('odin.categoryControllers', []);

app.factory('model', function($resource) {
    return $resource();
});

function CategoryListController($scope, $location, rest, $rootScope, $routeParams, $httpParamSerializer) {
    $scope.activeCategory = $routeParams['categories.slug'];
    $scope.url_api = $rootScope.url;
    $scope.activeCategory = $.isArray($scope.activeCategory) ? $scope.activeCategory[0] : $routeParams['categories.slug'];
    $scope.modelName = "Category";
    $scope.type = "categories";
    $scope.showCategories = true;
    $scope.statistics = {};
    $scope.porcentual = {};
    $scope.totalStatistics = 0;
    $scope.hideCategoriesSidebar = function() {
        $rootScope.showBackdrop = false;
        $rootScope.showCategoriesSidebar = false;
    };

    $scope.setBackColor = function (color) {
      if (color && color !== 'null') {
        $scope.categoryBackground = {'background': color};
      } else {
        $scope.categoryBackground ={'background':'#E5E5E5'};
        color ='#E5E5E5';
      }
    };


    rest().get({
        type: $scope.type,
        params: "orderBy=createdAt&sort=DESC"
    }, function(categories) {
        $scope.categories = categories.data;
        $scope.showCategories = false;

        $scope.categories.forEach(function(element) {
            $scope.statistics[element.id] = 0;
            $scope.porcentual[element.id] = 0;
        });

        rest().statistics({
            type: "datasets",
            params: "groupBy=category&action=download"
        }, function(statistics) {
            for (element in statistics.data) {
                var cat = statistics.data[element];
                $scope.statistics[element] = cat.count.GET;
                $scope.totalStatistics += cat.count.GET;
            }

            for (element in statistics.data) {
                $scope.porcentual[element] = $scope.statistics[element] * 100 / $scope.totalStatistics;;
            }
        });
    });
}
