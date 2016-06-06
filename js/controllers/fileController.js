var app = angular.module('odin.fileControllers', []);

app.factory('model', function($resource) {
    return $resource();
});


function FileListController($scope, $location, rest, $rootScope, $sce,$routeParams) {

    // Flash.clear();
    $scope.modelName = "File";
    $scope.type = "files";

  $scope.file = rest().findOne({
        id: $routeParams.id,
        type: $scope.type,
    }, function() {
        $rootScope.header = $scope.file.name; 
    });
    $scope.getHtml = function(html) {
        return $sce.trustAsHtml(html);
    };

}

