(function() {
    var app = angular.module('odin', ["ngRoute", "odin.config", "ngResource", "ngProgress", "odin.controllers", "store-directives", "store-factories", "chart.js", "leaflet-directive", "bw.paging", "ngCookies", "authentication-service", "ngRoute.middleware"]);

    app.config(function($routeProvider, $locationProvider, $httpProvider, AuthenticationServiceProvider, $middlewareProvider) {

        $routeProvider
                .when("/", {
                    templateUrl: "views/home.html",
                    controller: controllerHome,
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

        $locationProvider.html5Mode(true);
        $auth = AuthenticationServiceProvider.$get('AuthenticationService');

        $middlewareProvider.map({
            /** Let everyone through */
            'everyone': ['$cookieStore', '$rootScope', '$http', function everyoneMiddleware($cookieStore, $rootScope, $http) {
                    $rootScope.globals = $cookieStore.get('globals') || {};
                    if ($rootScope.globals.currentUser) {
                        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.globals.currentUser.token; // jshint ignore:line
                        this.next();
                    } else {
                        //$http.defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI5OWFmYzU3ZmRiYzA0YzZjYjJkZDRiYTU2OTBlNDM0NiJ9.Uo0I98Fu3BX8XlOgSnIvfeFx2Z_LdqM8WNT4hSMdDDM';
                        $auth.Login($auth.Consumer, function(response) {
                            if (!response.code) {
                                $auth.SetCredentials(response.data);
                                this.next();
                            }
                        }.bind(this));
                    }

                }],
        });

        $middlewareProvider.global('everyone');
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

    function controllerHome($scope, $location, $sce, $filter, $rootScope) {
        $rootScope.header = "Odin";

        $scope.getHtml = function(html) {
            return $sce.trustAsHtml(html);
        };

        $scope.goToUrl = function(url) {
            $filter('slug')(this.item.name);
            window.location = "/dataset/" + $filter('slug')(this.item.id);
        };
    }

    app.run(run);

    function run($rootScope, $location, $http, EnvironmentConfig, BaseHTML5, $cookieStore, AuthenticationService) {
        $rootScope.url = EnvironmentConfig.api;
        $rootScope.absUrl = $location.absUrl();
        $rootScope.baseHtml5 = BaseHTML5.url;
    }
})();