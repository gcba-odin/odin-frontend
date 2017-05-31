angular.module('odin')

.directive('categoryPercent', function() {
    return {
        restrict: 'A',
        scope: {
            categoryPercent: '='
        },
        replace: true,
        link: function postlink(scope, element, attrs) {
            scope.$watch("categoryPercent", function(newVal, oldVal) {
                var $element = $(element);
                var color = '#fdd306';
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
})

.directive('carousel', function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/home/carousel.html',
        controller: SearchDatasetsController,
        link: function() {
            $('.owl-carousel').owlCarousel({
                 loop: true,
                margin: 25,


                autoplay: true,
                 autoplayTimeout: 3000,
                 autoplayHoverPause: true,
                // nav:true,
                 merge:true,
                video: true,
                lazyLoad: true,
                //items: 2,
                //center:true,
                //navText: ['anterior', 'siguiente'],
                dots: true,
                nav:false,
                responsive: {
                    0: {
                        items: 2
                    },
                    600: {
                        items: 2
                    },
                    1000: {
                        items: 2
                    }
                }
            });
        }
    };
})

.directive('threeDots', function($compile) {
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
})

.directive('auxiliarBar', function() {
    return {
        restrict: 'E',
        templateUrl: 'directives/home/auxiliar-bar.html',
        controller: function() {
            sessionStorage.removeItem('currentColor');
            sessionStorage.removeItem('activeCategory');
        }
    };
});
