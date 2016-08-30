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
                        scope.$eval(attrs.ngEnter, { 'event': event });
                    });

                    event.preventDefault();
                }
            });
        };
    });

    app.directive('svgImg', function($rootScope) {
        return {
            restrict: 'A',
            scope: {
                svgImg: '='
            },
            link: function(scope, element, attrs) {
                var $element = jQuery(element);
                var attributes = $element.prop("attributes");

                $.get(scope.svgImg, function(data) {
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
                }, 'xml');
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
                    var color = $element.css("color");
                    $element.css({
                        background: "linear-gradient(to right, " + color + " 0%, " + color + " " + scope.categoryPercent + "%, #999999 " + scope.categoryPercent + "%, #999999 100%)"
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
                var value = normalize(input);
                return value.toLowerCase().replace(/-+/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            }
        };
    });

    app.filter('unslug', function() {
        return function(slug) {
            return slug.replace(/\-/g,' ');
        };
    })

    app.filter("sanitize", ['$sce', function($sce) {
        return function(htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        }
    }]);


    var normalize = (function() {
        var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
            to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
            mapping = {};

        for (var i = 0, j = from.length; i < j; i++)
            mapping[from.charAt(i)] = to.charAt(i);

        return function(str) {
            var ret = [];

            for (var i = 0, j = str.length; i < j; i++) {
                var c = str.charAt(i);
                if (mapping.hasOwnProperty(str.charAt(i)))
                    ret.push(mapping[c]);
                else
                    ret.push(c);
            }
            return ret.join('');
        }

    })();
})();
