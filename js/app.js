(function() {
    var app = angular.module('odin', [
        "ngRoute",
        "odin.config",
        "odin.version",
        "ngResource",
        "ngProgress",
        "odin.controllers",
        "store-directives",
        "store-factories",
        "chart.js",
        "leaflet-directive",
        "bw.paging",
        "ngCookies",
        "authentication-service",
        "ngRoute.middleware",
        "angularUtils.directives.dirDisqus",
        "720kb.socialshare",
        "pdf",
        "ngtweet",
        "matchMedia",
        "hm.readmore",
        "vcRecaptcha",
        "angularSpinner"
    ]);
    app.config(function($routeProvider, $locationProvider, $httpProvider, AuthenticationServiceProvider, $middlewareProvider, ChartJsProvider,vcRecaptchaServiceProvider, usSpinnerConfigProvider) {

        $locationProvider.html5Mode(true);

        vcRecaptchaServiceProvider.setDefaults({
            key: '6LcBhAkUAAAAANjrhmqwe62Y61sUKkwYncA-bpaT',
            theme: 'light',
            //            stoken: '--- YOUR GENERATED SECURE TOKEN ---',
            //            size: '---- compact or normal ----',
            //            type: '---- audio or image ----'
        });

        usSpinnerConfigProvider.setDefaults({
            lines: 10,
            length: 40,
            width: 20,
            radius: 49,
            scale: 0.35,
            corners: 1,
            color: '#19c3e3' //Odin: '#ff386a' // MarcaBA: '#19c3e3'
            ,
            opacity: 0.3,
            rotate: 5,
            direction: 1,
            speed: 1,
            trail: 63,
            fps: 20,
            zIndex: 2e9,
            className: 'spinner',
            top: '50%',
            left: '50%',
            shadow: false,
            hwaccel: false,
            position: 'fixed' // Element positioning
        });

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
            }).when("/tyc", {
                templateUrl: "views/terms_and_conditions.html",
                controller: termsAndConditionsController
            }).when("/contact", {
                templateUrl: "views/contact.html",
                controller: contactController
            }).when("/layout/:id/preview", {
                templateUrl: "views/layout.html",
                controller: LayoutController
            }).otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
        $auth = AuthenticationServiceProvider.$get('AuthenticationService');

        ChartJsProvider.setOptions({
            tooltips: {
                callbacks: {
                    title: function(tooltipItem, data) {
                        return data.labels[tooltipItem[0].index];
                    },
                    label: function(tooltipItem, data) {
                        var label = 'Cantidad';
                        if (!!data.datasets[tooltipItem.datasetIndex][0] && data.datasets[tooltipItem.datasetIndex][0] != '') {
                            label = data.datasets[tooltipItem.datasetIndex][0];
                        }
                        return label + ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    }
                }
            }
        });

        $middlewareProvider.map({
            /** Let everyone through */
            'everyone': ['$cookieStore', '$rootScope', '$http', function everyoneMiddleware($cookieStore, $rootScope, $http) {
                $rootScope.globals = $cookieStore.get('globals') || {};
                if ($rootScope.globals.currentUser) {
                    $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.globals.currentUser.token; // jshint ignore:line
                    this.next();
                } else {
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

    app.run(run);


    function run($rootScope, $location, $http, $window, EnvironmentConfig, BaseHTML5, screenSize, odin_version) {
        $rootScope.url = EnvironmentConfig.api;
        $rootScope.odin_version = EnvironmentConfig.odin_version;
        $rootScope.absUrl = $location.absUrl();
        $rootScope.baseHtml5 = BaseHTML5.url;
        $rootScope.odin_version = odin_version;
        $rootScope.query = "";
        $rootScope.countQuery = 0;
        $rootScope.countFilter = 0;
        $rootScope.isHome = false;
        screenSize.rules = {
            any: '(max-width: 1025px)'
        };
        $rootScope.isMobile = screenSize.on('any', function(match) {
            $rootScope.isMobile = match;
        });

        $rootScope.$on('$routeChangeSuccess', function() {
            $window.ga('send', 'pageview', $location.path());
            window.scrollTo(0, 0);
        });
    }
})();
