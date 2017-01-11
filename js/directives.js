(function() {
    var app = angular.module('store-directives', ["store-directives-home", "store-directives-dataset", "store-directives-datasets"]);

    app.directive('threeDots', function($compile) {
        // http://stackoverflow.com/questions/17417607/angular-ng-bind-html-and-directive-within-it
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var ensureCompileRunsOnce = scope.$watch(
                        function(scope) {
                            // watch the 'compile' expression for changes
                            return scope.$eval(attrs.threeDots);
                        },
                        function(value) {
                            // when the 'compile' expression changes
                            // assign it into the current DOM
                            element.html(value);

                            // compile the new DOM and link it to the current
                            // scope.
                            // NOTE: we only compile .childNodes so that
                            // we don't get into infinite loop compiling ourselves
                            $compile(element.contents())(scope);
                            ensureCompileRunsOnce();
                            $(element).dotdotdot({
                                height: 100,
                                wrap: 'letter'
                            });
                        }
                );
            }
        };
    });




    app.directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if (event.which === 13) {
                    scope.$apply(function() {
                        scope.$eval(attrs.ngEnter, {'event': event});
                    });

                    event.preventDefault();
                }
            });
        };
    });

    app.directive('svgImg', function($rootScope, $cookieStore) {
        return {
            restrict: 'A',
            scope: {
                svgImg: '='
            },
            link: function(scope, element, attrs) {
                var $element = jQuery(element);
                var attributes = $element.prop("attributes");

                var token_auth = $cookieStore.get('globals').currentUser.token;

                $.ajax({
                    headers: {
                        'Authorization': 'Bearer ' + token_auth,
                        //'x-admin-authorization': token,
                    },
                    type: 'GET',
                    dataType: 'xml',
                    url: scope.svgImg,
                    success: function(data) {
                        // Get the SVG tag, ignore the rest
                        var $svg = jQuery(data).find('svg');

                        // Remove any invalid XML tags
                        $svg = $svg.removeAttr('xmlns:a');

                        // Loop through IMG attributes and apply on SVG
                        $.each(attributes, function() {
                            $svg.attr(this.name, this.value);
                        });

                        // Replace IMG with SVG
                        $element.append($svg);

                        // Removes opacity
                        $element.find("g[opacity='0.75']").css("opacity", 0);

                        if (!!attrs.currentcolor && attrs.currentcolor  !== undefined && attrs.currentcolor  !== "null") {
                          $element.find("path").css("fill", attrs.currentcolor);
                          $element.find("rect").css("fill", attrs.currentcolor);
                          $element.find("polygon").css("fill", attrs.currentcolor);
                          $element.find("circle").css("fill", attrs.currentcolor);
                        }
                    },
                    error: function(data){
                      $element.parent().find(".colorText").css("display", "block");
                      $element.parent().find(".popular-datasets-list-item-icon").css("display", "none");
                    }
                  });
            }
        };
    });



    app.directive('brandingData', function() {
        return {
            restrict: 'E',
            templateUrl: 'directives/main/branding-data.html',
        };
    });

    app.directive('categoryPercent', function() {
        return {
            restrict: 'A',
            scope: {
                categoryPercent: '='
            },
            replace: true,
            link: function postlink(scope, element, attrs) {
                scope.$watch("categoryPercent", function(newVal, oldVal) {
                    var $element = $(element);
                    var color='#fdd306';
                    if (attrs.currentcolor !== 'null') {
                      color = attrs.currentcolor;
                    }
                    // linear-gradient(to right, #a0d8ef 46%,#feffff 46%,#feffff 99%);
                    $element.css({
                        // background: "linear-gradient(to right, " + color + " 0%, " + color + " " + scope.categoryPercent + "%, #F6F6F6 " + scope.categoryPercent + "%, #F6F6F6 100%)"
                        background: "linear-gradient(to right, " + color + " 0%, " + color + " " + scope.categoryPercent + "%, #F6F6F6 " + scope.categoryPercent + "%, #F6F6F6 100%)"
                    });
                });
            }
        };
    });

    app.directive('searchBar', function() {
        return {
            restrict: 'E',
            templateUrl: 'directives/main/search-bar.html',
            controller: SearchDatasetsController
        };
    });

    app.directive('searchBarHome', function() {
        return {
            restrict: 'E',
            templateUrl: 'directives/main/search-bar-home.html',
            controller: SearchDatasetsController
        };
    });

    app.directive('auxiliarBar', function() {
        return {
            restrict: 'E',
            templateUrl: 'directives/home/auxiliar-bar.html',
            controller: function() {
                sessionStorage.removeItem('currentColor');
                sessionStorage.removeItem('activeCategory');
            }
        };
    });

    app.directive('footerBar', function() {
        return {
            restrict: 'E',
            templateUrl: 'directives/main/footer-bar.html',
        };
    });

    app.filter('returnFormat', function() {
        return function(input) {
            var extension = input.split('.').pop();
            if (extension == "jpg" || extension == "png") {
                return "img";
            } else {
                return extension;
            }
        }
    });

    app.filter('urlEncode', [function() {
            return window.encodeURIComponent;
        }]);

    app.filter('capitalize', function() {
        return function(input) {
            return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        }
    });

    app.filter('truncString', function() {
        return function(input) {
            var add = '...';
            var max = 26;
            var str = input;
            return (typeof str === 'string' && str.length > max ? str.substring(0, max) + add : str);
        }
    });

    app.filter('slug', function() {
        return function(input) {
            if (input) {
                return slug(input, {lower: true});
            }
        };
    });

    app.filter("sanitize", ['$sce', function($sce) {
            return function(htmlCode) {
                return $sce.trustAsHtml(htmlCode);
            }
        }]);
})();
