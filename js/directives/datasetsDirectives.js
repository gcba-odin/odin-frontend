(function() {
    var app = angular.module('store-directives-datasets', []);



   app.directive("resultDataset", function() {
        return {
            restrict: "E",
            templateUrl: "/directives/datasets/result-datasets.html",
      
            controller: function($scope,datasetsF) {
            var data={};

              $scope.$watch('loading', function (val) {
                if(val){
                    data=datasetsF.showDatasets();
                    $scope.results=data;
                }
              });
            },
            controllerAs: "results"
        };
    });

})();