(function() {
    var app = angular.module('store-directives-dataset', []);

<<<<<<< HEAD


   app.directive("resultResources", function() {
        return {
            restrict: "E",
            templateUrl: "directives/datasets/result-resources.html",

=======
    app.directive("resourcesDataset", function() {
        return {
            restrict: "E",
            templateUrl: "directives/dataset/resources-datasets.html",
>>>>>>> 26652dc0b62f68e995e2149400fc56d377b3b011
            controller: function($scope) {
                $scope.toggleDropdown = function(event)
                {
                    if ($(event.target).next().hasClass('dataset-additional-info-table-inactive'))
                    {
                        $(event.target).next().addClass('dataset-additional-info-table-active');
                        $(event.target).next().removeClass('dataset-additional-info-table-inactive');
                        $(event.target).addClass('dataset-additional-info-active');
                    }
                    else
                    {
                        $(event.target).next().addClass('dataset-additional-info-table-inactive');
                        $(event.target).next().removeClass('dataset-additional-info-table-active');
                        $(event.target).removeClass('dataset-additional-info-active');
                    }
                };

                $scope.type_resource = 'charts';
                $scope.toogleTypeResource = function(type, obj) {
                    obj.type_resource = type;
                }

                $scope.toogleTypeChart = function(type, obj) {
                    obj.type_chart = type;
                };

                $scope.center = {
                    lat: -34.603722,
                    lng: -58.381592,
                    zoom: 13
                };
            },
            controllerAs: "resources"
        };
    });


    app.directive("tagsDataset", function() {
        return {
            restrict: "E",
            templateUrl: "directives/dataset/tags-datasets.html",
<<<<<<< HEAD

=======
>>>>>>> 26652dc0b62f68e995e2149400fc56d377b3b011
            controller: function($scope) {

            },
            controllerAs: "tags"
        };
    });

    app.directive("aditionalInfoDataset", function() {
        return {
            restrict: "E",
            templateUrl: "directives/dataset/aditional-info-dataset.html",
<<<<<<< HEAD

=======
>>>>>>> 26652dc0b62f68e995e2149400fc56d377b3b011
            controller: function($scope) {

            },
            controllerAs: "aditionalinfo"
        };
    });

    app.directive("organizationsDataset", function() {
        return {
            restrict: "E",
            templateUrl: "directives/dataset/organizations-dataset.html",
<<<<<<< HEAD

=======
>>>>>>> 26652dc0b62f68e995e2149400fc56d377b3b011
            controller: function($scope) {

            },
            controllerAs: "organizations"
        };
    });

    app.directive("socialsDataset", function() {
        return {
            restrict: "E",
            templateUrl: "directives/dataset/socials-dataset.html",
<<<<<<< HEAD

=======
>>>>>>> 26652dc0b62f68e995e2149400fc56d377b3b011
            controller: function($scope) {

            },
            controllerAs: "socials"
        };
    });

    app.filter('trustUrl', ['$sce', function($sce) {
            return function(url) {
                return $sce.trustAsResourceUrl(url);
            };
        }])

})();