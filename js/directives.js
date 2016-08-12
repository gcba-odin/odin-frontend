(function() {
  var app = angular.module( 'store-directives', [ "store-directives-home", "store-directives-dataset", "store-directives-datasets" ] );

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
                  height: 100, wrap: 'letter'
                });
            }
        );
      }
    };
  });

  app.directive('ngEnter', function() {
      return function(scope, element, attrs) {
          element.bind("keydown keypress", function(event) {
              if(event.which === 13) {
                  scope.$apply(function(){
                      scope.$eval(attrs.ngEnter, {'event': event});
                  });

                  event.preventDefault();
              }
          });
      };
  });

  app.directive('svgImg', function($rootScope){
    return {
      restrict: 'A',
      scope: {
        svgImg: '='
      },
      link: function(scope, element, attrs) {
        var $element = jQuery(element);
        var attributes = $element.prop("attributes");

        $.get($rootScope.url + '/categories/' + scope.svgImg + '/image', function(data) {
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
        }, 'xml');
      }
    };
  });

  app.directive('svgHoverColor', function(){
    return {
      restrict: 'A',
      scope: {
        svgHoverColor: '='
      },
      link: function(scope, element, attrs) {
        var $element = $(element);
        $element.mouseenter(function() {
            $(this).find("path, polygon, circle, rect").attr("fill", "#" + scope.svgHoverColor);
            $(this).find("path, polygon, circle, rect").attr("stroke", "#" + scope.svgHoverColor);
            $(this).find("h4").css("color", "#" + scope.svgHoverColor);
         });
        $element.mouseleave(function() {
            $(this).find("path, polygon, circle, rect").attr("fill", "#FF386A");
            $(this).find("path, polygon, circle, rect").attr("stroke", "#FF386A");
            $(this).find("h4").css("color", "#FF386A");
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

  app.directive('searchBar', function() {
      return {
        restrict: 'E',
        templateUrl: 'directives/main/search-bar.html',
        controller:function ($scope, $location, LocationSearchService){
          $scope.search = function() {
            if ($scope.query) {
              $location.path('datasets').search('query', $scope.query);
            } else {
              LocationSearchService.deleteFilter('query');
            }
          };
        }
      };
    });

    app.directive('searchBarHome', function() {
      return {
        restrict: 'E',
        templateUrl: 'directives/main/search-bar-home.html',
        controller:function ($scope, $location, LocationSearchService){
          $scope.search = function() {
            if ($scope.query) {
              $location.path('datasets').search('query', $scope.query);
            } else {
              LocationSearchService.deleteFilter('query');
            }
          };
        }
      };
    });

    app.directive('auxiliarBar', function () {
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
          var extension=input.split('.').pop();
          if(extension=="jpg" || extension== "png"){
            return "img";
          }else{
            return extension;
          }
        }
    });

    app.filter('urlEncode', [function() {
        return window.encodeURIComponent;
    }] );

    app.filter('capitalize', function() {
        return function(input) {
          return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        }
    });

    app.filter('truncString', function() {
        return function(input) {
         var  add =  '...';
         var  max=26;
         var str=input;
           return (typeof str === 'string' && str.length > max ? str.substring(0,max)+add : str);
        }
    });

    app.filter('slug', function () {
        return function (input) {
          if (input) {
            var value=normalize(input);
        return value.toLowerCase().replace(/-+/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
          }
        };
    });

    app.filter("sanitize", ['$sce', function($sce) {
      return function(htmlCode){
        return $sce.trustAsHtml(htmlCode);
      }
    }]);


    var normalize = (function() {
      var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
          to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
          mapping = {};

      for(var i = 0, j = from.length; i < j; i++ )
          mapping[ from.charAt( i ) ] = to.charAt( i );

      return function(str) {
        var ret = [];

          for(var i = 0, j = str.length; i < j; i++) {
              var c = str.charAt(i);
              if(mapping.hasOwnProperty(str.charAt(i)))
                  ret.push(mapping[c]);
              else
                  ret.push(c);
          }
          return ret.join('');
      }

})();
})();