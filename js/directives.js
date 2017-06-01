(function() {
    var app = angular.module('store-directives', []); //"store-directives-home", "store-directives-dataset", "store-directives-datasets"

    app.directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if (event.which === 13) {
                    scope.$apply(function() {
                        scope.$eval(attrs.ngEnter, {
                            'event': event
                        });
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

                // Get the SVG tag, ignore the rest
                var $svg = jQuery(scope.svgImg);

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
                var color_fill = '#fff';

                if (!!attrs.currentcolor && attrs.currentcolor !== undefined && attrs.currentcolor !== "null") {
                    color_fill = attrs.currentcolor;
                }

                $element.find("path").css("fill", color_fill);
                $element.find("rect").css("fill", color_fill);
                $element.find("polygon").css("fill", color_fill);
                $element.find("circle").css("fill", color_fill);
            }
        };
    });

    app.directive('brandingData', function() {
        return {
            restrict: 'E',
            templateUrl: 'directives/branding-data.html',
        };
    });

    app.directive('searchBar', function() {
        return {
            restrict: 'E',
            templateUrl: 'directives/search-bar.html',
            controller: SearchDatasetsController
        };
    });

    app.directive('searchBarHome', function() {
        return {
            restrict: 'E',
            templateUrl: 'directives/search-bar-home.html',
            controller: SearchDatasetsController
        }
    });


    app.directive('footerBar', function() {
        return {
            restrict: 'E',
            templateUrl: 'directives/footer-bar.html',
        };
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
                return slug(input, {
                    lower: true
                });
            }
        };
    });

    app.filter('searchCategory', function() {
        return function(input) {
            var result = [];
            if (!!input) {
                if (!!sessionStorage.getItem('categories')) {
                    var categories = JSON.parse(sessionStorage.getItem('categories'));

                    angular.forEach(categories, function(element) {
                        if (element.id == input) {
                            result.push(element);
                        }
                    });

                    return result[0];
                } else {
                    return {};
                }

            } else {
                return {};
            }

        };
    });

    app.filter('searchFiletype', function() {
        return function(input) {
            var result = [];
            if (!!input) {
                if (!!sessionStorage.getItem('filetypes')) {
                    var filetypes = JSON.parse(sessionStorage.getItem('filetypes'));

                    angular.forEach(filetypes, function(element) {
                        if (element.id == input) {
                            result.push(element);
                        }
                    });

                    return result[0];
                } else {
                    return {};
                }

            } else {
                return {};
            }

        };
    });

    app.filter("sanitize", ['$sce', function($sce) {
        return function(htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        }
    }]);
})();
