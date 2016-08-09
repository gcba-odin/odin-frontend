var app = angular.module('odin.categoryControllers', []);

app.factory('model', function($resource) {
    return $resource();
});


function chunk(arr, size) {
  var newArr = [];
  for (var i=0; i<arr.length; i+=size) {
    newArr.push(arr.slice(i, i+size));
  }
  return newArr;
}

function CategoryListController($scope, $location, rest, $rootScope, $routeParams) {
    $scope.activeCategory = $routeParams['categories.name'];
    $scope.modelName = "Category";
    $scope.type = "categories";
    $scope.showCategories = true;
    rest().get({
        type: $scope.type,
        params: "orderBy=createdAt&sort=DESC"
    }, function(categories) {
        $scope.categories = categories;
        $scope.chunkedCategories = chunk($scope.categories.data,3);
        $scope.showCategories = false;
    });
            
}
