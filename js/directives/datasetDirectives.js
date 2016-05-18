(function() {
    var app = angular.module('store-directives-dataset', []);



   app.directive("resourcesDataset", function() {
        return {
            restrict: "E",
            templateUrl: "/directives/dataset/resources-datasets.html",
      
            controller: function($scope,datasetF) {
            var data={};

              $scope.$watch('loading', function (val) {
                if(val){
                    data=datasetF.getResources();
                    $scope.resources=data;

                }
              });
            },
            controllerAs: "resources"
        };
    });


    app.directive("tagsDataset", function() {
        return {
            restrict: "E",
            templateUrl: "/directives/dataset/tags-datasets.html",
      
            controller: function($scope,datasetF) {
            var data={};

              $scope.$watch('loading', function (val) {
                if(val){
                    data=datasetF.getTags();
                    $scope.tags=data;
                }
              });
            },
            controllerAs: "tags"
        };
    });

    app.directive("aditionalInfoDataset", function() {
        return {
            restrict: "E",
            templateUrl: "/directives/dataset/aditional-info-dataset.html",
      
            controller: function($scope,datasetF) {
            var data={};

              $scope.$watch('loading', function (val) {
                if(val){
                    data=datasetF.getAditionalInformation();
                    $scope.aditionalinfo=data;
                }
              });
            },
            controllerAs: "aditionalinfo"
        };
    });

    app.directive("organizationsDataset", function() {
        return {
            restrict: "E",
            templateUrl: "/directives/dataset/organizations-dataset.html",
      
            controller: function($scope,datasetF) {
            var data={};

              $scope.$watch('loading', function (val) {
                if(val){
                    data=datasetF.getOrganizations();
                    $scope.organizations=data;
                }
              });
            },
            controllerAs: "organizations"
        };
    });

        app.directive("socialsDataset", function() {
        return {
            restrict: "E",
            templateUrl: "/directives/dataset/socials-dataset.html",
      
            controller: function($scope,datasetF) {
            var data={};

              $scope.$watch('loading', function (val) {
                if(val){
                    data=datasetF.getSocial();
                    $scope.socials=data;
                }
              });
            },
            controllerAs: "socials"
        };
    });


})();