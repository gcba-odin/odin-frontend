(function() {
    var app = angular.module('store-directives-dataset', []);



   app.directive("resultResources", function() {
        return {
            restrict: "E",
            templateUrl: "directives/datasets/result-resources.html",

            controller: function($scope) {

            },
            controllerAs: "resources"
        };
    });


    app.directive("tagsDataset", function() {
        return {
            restrict: "E",
            templateUrl: "directives/dataset/tags-datasets.html",

            controller: function($scope) {

            },
            controllerAs: "tags"
        };
    });

    app.directive("aditionalInfoDataset", function() {
        return {
            restrict: "E",
            templateUrl: "directives/dataset/aditional-info-dataset.html",

            controller: function($scope) {

            },
            controllerAs: "aditionalinfo"
        };
    });

    app.directive("organizationsDataset", function() {
        return {
            restrict: "E",
            templateUrl: "directives/dataset/organizations-dataset.html",

            controller: function($scope) {

            },
            controllerAs: "organizations"
        };
    });

        app.directive("socialsDataset", function() {
        return {
            restrict: "E",
            templateUrl: "directives/dataset/socials-dataset.html",

            controller: function($scope) {

            },
            controllerAs: "socials"
        };
    });


})();