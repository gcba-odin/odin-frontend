(function() {
    var app = angular.module('store-directives', ["store-directives-home", "store-directives-dataset", "store-directives-datasets"]);

    app.directive('autocomplete', function() {
      var index = -1;
      return {
        restrict: 'E',
        scope: {
          searchParam: '=ngModel',
          suggestions: '=data',
          onType: '=onType',
          onSelect: '=onSelect',
          autocompleteRequired: '=',
          noAutoSort: '=noAutoSort'
        },
        controller: ['$scope', function($scope){
          // the index of the suggestions that's currently selected
          $scope.selectedIndex = -1;

          $scope.initLock = true;

          // set new index
          $scope.setIndex = function(i){
            $scope.selectedIndex = parseInt(i);
          };

          this.setIndex = function(i){
            $scope.setIndex(i);
            $scope.$apply();
          };

          $scope.getIndex = function(i){
            return $scope.selectedIndex;
          };

          // watches if the parameter filter should be changed
          var watching = true;

          // autocompleting drop down on/off
          $scope.completing = false;

          // starts autocompleting on typing in something
          $scope.$watch('searchParam', function(newValue, oldValue){

            if (oldValue === newValue || (!oldValue && $scope.initLock)) {
              return;
            }

            if(watching && typeof $scope.searchParam !== 'undefined' && $scope.searchParam !== null) {
              $scope.completing = true;
              $scope.searchFilter = $scope.searchParam;
              $scope.selectedIndex = -1;
            }

            // function thats passed to on-type attribute gets executed
            if($scope.onType)
              $scope.onType($scope.searchParam);
          });

          // for hovering over suggestions
          this.preSelect = function(suggestion){

            watching = false;

            // this line determines if it is shown
            // in the input field before it's selected:
            $scope.searchParam = suggestion;

            $scope.$apply();
            watching = true;

          };

          $scope.preSelect = this.preSelect;

          this.preSelectOff = function(){
            watching = true;
          };

          $scope.preSelectOff = this.preSelectOff;

          // selecting a suggestion with RIGHT ARROW or ENTER
          $scope.select = function(suggestion){
            if(suggestion){
              $scope.searchParam = suggestion;
              $scope.searchFilter = suggestion;
              if($scope.onSelect)
                $scope.onSelect(suggestion);
            }
            watching = false;
            $scope.completing = false;
            setTimeout(function(){watching = true;},1000);
            $scope.setIndex(-1);
          };


        }],
        link: function(scope, element, attrs){
          setTimeout(function() {
            scope.initLock = false;
            scope.$apply();
          }, 250);

          var attr = '';

          // Default atts
          scope.attrs = {
            "placeholder": "start typing...",
            "class": "",
            "id": "",
            "inputclass": "",
            "inputid": ""
          };

          for (var a in attrs) {
            attr = a.replace('attr', '').toLowerCase();
            // add attribute overriding defaults
            // and preventing duplication
            if (a.indexOf('attr') === 0) {
              scope.attrs[attr] = attrs[a];
            }
          }

          if (attrs.clickActivation) {
            element[0].onclick = function(e){
              if(!scope.searchParam){
                setTimeout(function() {
                  scope.completing = true;
                  scope.$apply();
                }, 200);
              }
            };
          }

          var key = {left: 37, up: 38, right: 39, down: 40 , enter: 13, esc: 27, tab: 9};

          document.addEventListener("keydown", function(e){
            var keycode = e.keyCode || e.which;

            switch (keycode){
              case key.esc:
                // disable suggestions on escape
                scope.select();
                scope.setIndex(-1);
                scope.$apply();
                e.preventDefault();
            }
          }, true);

          document.addEventListener("blur", function(e){
            // disable suggestions on blur
            // we do a timeout to prevent hiding it before a click event is registered
            setTimeout(function() {
              scope.select();
              scope.setIndex(-1);
              scope.$apply();
            }, 150);
          }, true);

          element[0].addEventListener("keydown",function (e){
            var keycode = e.keyCode || e.which;

            var l = angular.element(this).find('li').length;

            // this allows submitting forms by pressing Enter in the autocompleted field
            if(!scope.completing || l == 0) return;

            // implementation of the up and down movement in the list of suggestions
            switch (keycode){
              case key.up:

                index = scope.getIndex()-1;
                if(index<-1){
                  index = l-1;
                } else if (index >= l ){
                  index = -1;
                  scope.setIndex(index);
                  scope.preSelectOff();
                  break;
                }
                scope.setIndex(index);

                if(index!==-1)
                  scope.preSelect(angular.element(angular.element(this).find('li')[index]).text());

                scope.$apply();

                break;
              case key.down:
                index = scope.getIndex()+1;
                if(index<-1){
                  index = l-1;
                } else if (index >= l ){
                  index = -1;
                  scope.setIndex(index);
                  scope.preSelectOff();
                  scope.$apply();
                  break;
                }
                scope.setIndex(index);

                if(index!==-1)
                  scope.preSelect(angular.element(angular.element(this).find('li')[index]).text());

                break;
              case key.left:
                break;
              case key.right:
              case key.enter:
              case key.tab:

                index = scope.getIndex();
                // scope.preSelectOff();
                if(index !== -1) {
                  scope.select(angular.element(angular.element(this).find('li')[index]).text());
                  if(keycode == key.enter) {
                    e.preventDefault();
                  }
                } else {
                  if(keycode == key.enter) {
                    scope.select();
                  }
                }
                scope.setIndex(-1);
                scope.$apply();

                break;
              case key.esc:
                // disable suggestions on escape
                scope.select();
                scope.setIndex(-1);
                scope.$apply();
                e.preventDefault();
                break;
              default:
                return;
            }

          });
        },
        templateUrl: 'directives/main/autocomplete.html',
      };
    });

    app.directive('suggestion', function(){
      return {
        restrict: 'A',
        require: '^autocomplete', // ^look for controller on parents element
        link: function(scope, element, attrs, autoCtrl){
          element.bind('mouseenter', function() {
            autoCtrl.preSelect(attrs.val);
            autoCtrl.setIndex(attrs.index);
          });

          element.bind('mouseleave', function() {
            autoCtrl.preSelectOff();
          });
        }
      };
    });

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
                        var color_fill = '#fff';

                        if (!!attrs.currentcolor && attrs.currentcolor  !== undefined && attrs.currentcolor  !== "null") {
                            color_fill = attrs.currentcolor;
                        } 
                        
                        $element.find("path").css("fill", color_fill);
                        $element.find("rect").css("fill", color_fill);
                        $element.find("polygon").css("fill", color_fill);
                        $element.find("circle").css("fill", color_fill);
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
