function SocialNetworkController($scope, $location, rest, $rootScope, $sce, $routeParams) {
    // Flash.clear();
    $scope.modelName = "Category";
    $scope.type = "categories";
    $scope.showCategories = true;
    $scope.categories = rest().get({
        type: $scope.type,
        params: "orderBy=createdAt&sort=DESC"
    }, function() {
        $scope.showCategories = false;
    });

    if ($routeParams['categories.slug']!== undefined) {
      var currentColor;
      var category = rest().get({
        type: 'categories',
        params: 'slug='+$routeParams['categories.slug']
      }, function(resp) {
        if (resp.data[0]) {
          $scope.currentCategory = resp.data[0];
          if ($scope.currentCategory.color !== null && $scope.currentCategory.color !== undefined) {
              $scope.currentColor = $scope.currentCategory.color ;
              sessionStorage.setItem('currentColor', $scope.currentColor);
          }
        }else{
          $scope.currentColor = sessionStorage.getItem('currentColor');
        }
      });
    }

}
