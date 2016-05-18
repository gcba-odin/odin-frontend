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

   app.directive("organizationsResult", function() {
        return {
            restrict: "E",
            templateUrl: "/directives/datasets/organizations-results.html",
      
            controller: function($scope,datasetsF) {
            var data={};

              $scope.$watch('loading', function (val) {
                if(val){
                    data=datasetsF.getOrganizations();
                    $scope.organizations=data;
                }
              });
            },
            controllerAs: "organizations"
        };
    });

   app.directive("groupsResult", function() {
        return {
            restrict: "E",
            templateUrl: "/directives/datasets/groups-results.html",
            controller: function($scope,datasetsF) {
            var data={};

              $scope.$watch('loading', function (val) {
                if(val){
                    data=datasetsF.getGroups();
                    $scope.groups=data;
                }
              });
            },
            controllerAs: "groups"
        };
    });

    app.directive("tagsResult", function() {
        return {
            restrict: "E",
            templateUrl: "/directives/datasets/tags-results.html",
            controller: function($scope,datasetsF) {
            var data={};

              $scope.$watch('loading', function (val) {
                if(val){
                    data=datasetsF.getTags();
                    $scope.tags=data;
                }
              });
            },
            controllerAs: "tags"
        };
    });

    app.directive("formatsResult", function() {
        return {
            restrict: "E",
            templateUrl: "/directives/datasets/formats-results.html",
            controller: function($scope,datasetsF) {
            var data={};

              $scope.$watch('loading', function (val) {
                if(val){
                    data=datasetsF.getFormats();
                    $scope.formats=data;
                }
              });
            },
            controllerAs: "formats"
        };
    });

        app.directive("licencesResult", function() {
        return {
            restrict: "E",
            templateUrl: "/directives/datasets/licences-results.html",
            controller: function($scope,datasetsF) {
            var data={};

              $scope.$watch('loading', function (val) {
                if(val){
                    data=datasetsF.getFormats();
                    $scope.licences=data;
                }
              });
            },
            controllerAs: "licences"
        };
    });


})();