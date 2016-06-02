var app = angular.module('odin.datasetControllers', []);

app.factory('model', function($resource) {
    return $resource();
});

 
function DatasetLatestController($scope, $location, rest, $rootScope,$sce) {

   // Flash.clear();
    $scope.modelName = "Dataset";
    $scope.type = "datasets";

    $scope.latestDataset= rest().get({
        type: $scope.type ,params:"sort=updatedAt DESC&limit=3"
    });

   
}

function DatasetPopularController($scope, $location, rest, $rootScope,$sce) {

   // Flash.clear();
    $scope.modelName = "Dataset";
    $scope.type = "datasets";

    $scope.popularDataset= rest().get({
        type: $scope.type ,params:"sort=updatedAt DESC&limit=3"
    });


}

function DatasetController($scope, $location, rest, $rootScope,$sce,$routeParams) {
    $scope.type = "datasets";

    $scope.info = rest().findOne({
        id: $routeParams.id,
        type: $scope.type,
        params:"include=tags,files"
    },function (){
        var tags=[];
        for (var i = 0; i < $scope.info.tags.length; i++) {
            tags.push({name:$scope.info.tags[i].name,url:$scope.info.tags[i].id})
        }
        $scope.tags=tags;
    }); 


    $scope.getHtml = function(html){
        return $sce.trustAsHtml(html);
    };
}



function DatasetListController($scope, $location, rest, $rootScope,$sce) {

    //Flash.clear();
    $scope.modelName = "Dataset";
    $scope.type = "datasets";

    $scope.sorting="name asc";


    $scope.limitResults=0;
    $scope.datasets=[];
    $scope.resultDatasets=[];

    $scope.loadResults = function(limit) {
        $scope.limitResults+=limit; 
        $scope.resultDatasets = rest().get({
            type: $scope.type ,params:"sort="+$scope.sorting+"&include=files,tags&limit=20&skip="+$scope.limitResults
        },function (){
            for (var i = 0; i < $scope.resultDatasets.data.length; i++) {
                $scope.datasets.push($scope.resultDatasets.data[i])
            }
        });
    }


    $scope.view = function(model) {
        var url = '/'+$scope.type+'/' + model.id + "/view";
        $location.path(url);
    }
    $scope.getHtml = function(html){
        return $sce.trustAsHtml(html);
    };

    $scope.loadResults(0);
}