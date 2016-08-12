var app = angular.module('odin.categoryControllers', []);

app.factory('model', function($resource) {
    return $resource();
});


function chunk(arr, size) {
    var newArr = [];
    for (var i = 0; i < arr.length; i += size) {
        newArr.push(arr.slice(i, i + size));
    }
    return newArr;
}

function getPorcentualStatistics(dic) {
    // console.log(dic[0]);
    for (var key in dic) {
        console.log(dic[key]);
        // console.log(dic[key]);
    }
}

function CategoryListController($scope, $location, rest, $rootScope, $routeParams) {
    $scope.activeCategory = $routeParams['categories.name'];
    $scope.activeCategory = $.isArray($scope.activeCategory) ? $scope.activeCategory[0] : $scope.activeCategory;
    $scope.modelName = "Category";
    $scope.type = "categories";
    $scope.showCategories = true;
    $scope.statistics = {};
    $scope.porcentual = {};
    $scope.totalStatistics = 0;

    rest().get({
        type: $scope.type,
        params: "orderBy=createdAt&sort=DESC"
    }, function(categories) {
        $scope.categories = categories;
        $scope.chunkedCategories = chunk($scope.categories.data, 3);
        $scope.showCategories = false;
        $scope.categories.data.forEach(function(element) {
            $scope.statistics[element.id] = 0;
        });

        rest().statistics({
            type: "datasets",
            params: "groupBy=category"
        }, function(statistics) {
            for (element in statistics.data) {
                var cat = statistics.data[element];
                $scope.statistics[element] = cat.count.GET;
            }

            Object.keys($scope.statistics).forEach(function(key) {
                $scope.totalStatistics += $scope.statistics[key];
            });

            Object.keys($scope.statistics).forEach(function(key) {
                $scope.porcentual[key] = $scope.statistics[key] * 100 / $scope.totalStatistics;
            });
        });
    });
}