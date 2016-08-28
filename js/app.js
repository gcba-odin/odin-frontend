(function() {
    var app = angular.module('odin', [
        "ngRoute",
        "odin.config",
        "ngResource",
        "ngProgress",
        "odin.controllers",
        "store-directives",
        "store-factories",
        "chart.js",
        "leaflet-directive",
        "bw.paging",
        "angularUtils.directives.dirDisqus",
        "720kb.socialshare",
        "pdf",
        "ngtweet"
    ]);
    app.config(function($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $routeProvider
                .when("/", {
                    templateUrl: "views/home.html",
                    controller: controllerHome
                })
                .when("/dataset/:id", {
                    templateUrl: "views/dataset.html",
                    controller: DatasetController
                }).when("/datasets", {
            templateUrl: "views/datasets.html",
            controller: DatasetListController
        }).when("/resource/:id", {
            templateUrl: "views/resource.html",
            controller: FileListController
        }).otherwise({
            redirectTo: '/'
        });
    });

    app.factory('Page', function() {
        var title = 'default';
        return {
            title: function() {
                return title;
            },
            setTitle: function(newTitle) {
                title = newTitle
            }
        };
    });

    app.run(run);

    function run($rootScope, $location, $http, EnvironmentConfig, BaseHTML5) {
        $rootScope.url = EnvironmentConfig.api;
        $rootScope.absUrl = $location.absUrl();
        $rootScope.baseHtml5 = BaseHTML5.url;
        $rootScope.isMobile = isMobile;
    }
})();
