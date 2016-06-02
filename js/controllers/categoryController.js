var app = angular.module('odin.categoryControllers', []);

app.factory('model', function($resource) {
    return $resource();
});

 
function CategoryListController($scope, $location, rest, $rootScope) {

   // Flash.clear();
    $scope.modelName = "Category";
    $scope.type = "categories";

    $scope.categories= rest().get({
        type: $scope.type ,params:"sort=createdAt DESC"
    });

}


