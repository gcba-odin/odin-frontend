(function() {
    var app = angular.module('odin', [
        "ngRoute",
        "odin.config",
        "odin.version",
        "odin.customdefaults",
        "ngResource",
        "ngProgress",
        "odin.controllers",
        "store-directives",
        "store-factories",
        "chart.js",
        // "leaflet-directive",
        // "bw.paging",
        "ngCookies",
        "authentication-service",
        "ngRoute.middleware",
        // "angularUtils.directives.dirDisqus",
        // "720kb.socialshare",
        // "pdf",
        // "ngtweet",
        "matchMedia",
        // "hm.readmore",
        "vcRecaptcha",
        "angularSpinner",
        // "Alertify",
        "oc.lazyLoad",
        "ngSanitize"
    ]);
    app.config(function($routeProvider, $locationProvider, $httpProvider, AuthenticationServiceProvider, $middlewareProvider, vcRecaptchaServiceProvider, ChartJsProvider, usSpinnerConfigProvider, $ocLazyLoadProvider) {
        $locationProvider.html5Mode(true);

        $ocLazyLoadProvider.config({
            // debug:  true,
            // events: true,
            modules: [{
              name:"lazy-home",
              files: [
                "lazy-home.min.js"
              ],
            },
            {
              name:"lazy-contact",
              files: [
                "lazy-contact.min.js"
              ],
            },
            {
              name:"lazy-layout",
              files: [
                "lazy-layout.min.js"
              ],
            }
            ,
            {
              name:"lazy-layout",
              files: [
                "lazy-layout.min.js"
              ],
            },
            {
              name:"lazy-dataset-list",
              files: [
                "lazy-dataset-list.min.js"
              ],
            },
            {
              name:"lazy-dataset",
              files: [
                "lazy-dataset.min.js"
              ],
            }
          ]
        });

        vcRecaptchaServiceProvider.setDefaults({
            key: '6LcBhAkUAAAAANjrhmqwe62Y61sUKkwYncA-bpaT',
            theme: 'light'
        });

        usSpinnerConfigProvider.setDefaults({
            lines: 0,
            length: 40,
            width: 20,
            radius: 49,
            scale: 0.30,
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
                  controller: 'controllerHome',
                  resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                      return $ocLazyLoad.load('lazy-home').then(
                          function(){
                             return $ocLazyLoad.load('bundle-home.min.js');
                          }
                      );
                    }]
                  }
              })
            .when("/dataset/:id", {
                templateUrl: "views/dataset.html",
                controller: 'DatasetController',
                resolve: {
                  loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load(['lazy-dataset', 'lazy-layout']).then(
                        function(){
                           return $ocLazyLoad.load('bundle-dataset.min.js');
                        }
                    );
                  }]
                }
            })
            .when("/datasets", {
                templateUrl: "views/datasets.html",
                controller: 'DatasetListController',
                resolve: {
                  loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('lazy-dataset-list').then(
                        function(){
                           return $ocLazyLoad.load('bundle-dataset-list.min.js');
                        }
                    );
                  }]
                }
            })
            // .when("/resource/:id", {
            //     templateUrl: "views/resource.html",
            //     controller: FileListController
            // })
            .when("/tyc", {
                templateUrl: "views/terms_and_conditions.html"
            })
            .when("/contact", {
                templateUrl: "views/contact.html",
                controller: 'ContactController',
                resolve: {
                  loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('lazy-contact').then(
                        function(){
                           return $ocLazyLoad.load('bundle-contact.min.js');
                        }
                    );
                  }]
                }
            })
            .when("/layout/:id/preview", {
                templateUrl: "views/layout.html",
                controller: 'LayoutController',
                resolve: {
                  loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('lazy-layout').then(
                        function(){
                           return $ocLazyLoad.load('bundle-layout.min.js');
                        }
                    );
                  }]
                }
            })
            .when("/dataset-request", {
                templateUrl: "views/dataset-request.html",
                controller: 'DatasetRequestController',
                resolve: {
                  loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load('lazy-contact').then(
                        function(){
                           return $ocLazyLoad.load('bundle-dataset-request.min.js');
                        }
                    );
                  }]
                }
            })
            .otherwise({
                redirectTo: '/'
            });

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
    app.controller('OdinGirlController', OdinGirlController);
    app.run(run);


    function run($rootScope, $location, $http, $window, EnvironmentConfig, BaseHTML5, odin_version, customdefaults, screenSize) {
        $rootScope.url = EnvironmentConfig.api;
        // $rootScope.odin_version = EnvironmentConfig.odin_version;
        $rootScope.absUrl = $location.absUrl();
        $rootScope.baseHtml5 = BaseHTML5.url;
        $rootScope.odin_version = odin_version;
        $rootScope.custom_defaults = customdefaults;
        $rootScope.query = "";
        $rootScope.countQuery = 0;
        $rootScope.countFilter = 0;
        $rootScope.isHome = false;
        $rootScope.dataCategories = [];
        $rootScope.dataFiletypes = [];
        $rootScope.dataTags = [];
        $rootScope.dataOrgs = [];
        screenSize.rules = {
            any: '(max-width: 767px)'
        };
        $rootScope.isMobile = screenSize.on('any', function(match) {
            $rootScope.isMobile = match;
        });

        $rootScope.$on('$routeChangeSuccess', function() {
            $window.ga('send', 'pageview', $location.path());
            window.scrollTo(0, 0);
        });

    }


    function OdinGirlController($scope) {
        $scope.hideGirl = false;
        $scope.hideOdinGirl = function () {
            $scope.hideGirl = !$scope.hideGirl;
        };
    }
    ;
})();
