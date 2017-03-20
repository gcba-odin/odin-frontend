var app = angular.module('odin.categoryControllers', []);

app.factory('model', function ($resource) {
    return $resource();
});

function CategoryListController($scope, $location, rest, $rootScope, $routeParams, $httpParamSerializer, $log, $timeout, usSpinnerService) {
    usSpinnerService.spin('spinner');
    $rootScope.countQuery = $rootScope.countQuery + 4;

    var cache = {
        categories: {
            cache: false,
            total: 0
        },
        filetypes: {
            cache: false,
            total: 0
        },
        tags: {
            cache: false,
            total: 0
        },
        organizations: {
            cache: false,
            total: 0
        }
    };

    if ($routeParams['categories.slug']) {
        var activeCategory = $routeParams['categories.slug'];
        sessionStorage.setItem('activeCategory', activeCategory);
        checkFilters(activeCategory);
        sessionStorage.setItem('selectedCategory', $routeParams['categories.slug']);
    }

    $scope.activeCategory = sessionStorage.getItem('activeCategory');
    $scope.url_api = $rootScope.url;
    $scope.activeCategory = $.isArray($scope.activeCategory) ? $scope.activeCategory[0] : sessionStorage.getItem('activeCategory');

    $scope.modelName = "Category";
    $scope.type = "categories";
    $scope.showCategories = true;
    $scope.statistics = {};
    $scope.porcentual = {};
    $scope.totalStatistics = 0;
    $scope.letterLimit = 4;

    $scope.hideCategoriesSidebar = function () {
        $rootScope.showBackdrop = false;
        $rootScope.showCategoriesSidebar = false;
    };

    //Categories cache
    $scope.$watch(function () {
        if (!!sessionStorage.getItem('categories')) {
            return sessionStorage.getItem('categories');
        }

    }, function (val) {
        if (!!val && !cache.categories.cache && val.length > 0) {
            var arrayCats = JSON.parse(val);
            if (arrayCats.length == cache.categories.total) {
                $rootScope.dataCategories = JSON.parse(val);
                $rootScope.countQuery--;
                if ($rootScope.countQuery == 0) {
                    usSpinnerService.stop('spinner');
                }
            }
        }
    });

    //Filetypes cache
    $scope.$watch(function () {
        if (!!sessionStorage.getItem('filetypes')) {
            return sessionStorage.getItem('filetypes');
        }

    }, function (val) {
        if (!!val && !cache.filetypes.cache && val.length > 0) {
            var arrayFilt = JSON.parse(val);
            if (arrayFilt.length == cache.filetypes.total) {
                $rootScope.dataFiletypes = JSON.parse(val);
                $rootScope.countQuery--;
                if ($rootScope.countQuery == 0) {
                    usSpinnerService.stop('spinner');
                }
            }
        }
    });

    //Tags cache
    $scope.$watch(function () {
        if (!!sessionStorage.getItem('tags')) {
            return sessionStorage.getItem('tags');
        }

    }, function (val) {
        if (!!val && !cache.tags.cache && val.length > 0) {
            var arrayTag = JSON.parse(val);
            if (arrayTag.length == cache.tags.total) {
                $rootScope.dataTags = JSON.parse(val);
                $rootScope.countQuery--;
                if ($rootScope.countQuery == 0) {
                    usSpinnerService.stop('spinner');
                }
            }
        }
    });

    //Organizations cache
    $scope.$watch(function () {
        if (!!sessionStorage.getItem('organizations')) {
            return sessionStorage.getItem('organizations');
        }

    }, function (val) {
        if (!!val && !cache.organizations.cache && val.length > 0) {
            var arrayOrg = JSON.parse(val);
            if (arrayOrg.length == cache.organizations.total) {
                $rootScope.dataOrgs = JSON.parse(val);
                $rootScope.countQuery--;
                if ($rootScope.countQuery == 0) {
                    usSpinnerService.stop('spinner');
                }
            }
        }
    });

    $rootScope.showCategories = true;
    //Categories cache
    if (!!sessionStorage.getItem('categories')) {
        cache.categories.cache = true;
        $scope.categories = JSON.parse(sessionStorage.getItem('categories'));
        $rootScope.dataCategories = $scope.categories;
        $rootScope.showCategories = false;
        $rootScope.countQuery--;
        if ($rootScope.countQuery == 0) {
            usSpinnerService.stop('spinner');
        }
    } else {
        rest().get({
            type: $scope.type,
            params: "parent=null&orderBy=name&sort=ASC&fields=id,active,color,name,slug"
        }, function (categories) {
            cache.categories.total = categories.meta.count;
            //$scope.categories = categories.data;
            var cats = [];
            sessionStorage.setItem('categories', JSON.stringify(cats));
            angular.forEach(categories.data, function (element) {
                var info = {
                    id: element.id,
                    active: element.active,
                    color: element.color,
                    name: element.name,
                    slug: element.slug,
                    image: ''
                };


                rest().image({
                    type: 'categories',
                    id: element.id
                }, function (resp) {
                    info.image = resp.svg;
                    cats.push(info);
                    sessionStorage.setItem('categories', JSON.stringify(cats));
                }, function (error) {
                    cats.push(info);
                    sessionStorage.setItem('categories', JSON.stringify(cats));
                });


            });

            $scope.categories = cats;

            $rootScope.showCategories = false;
        }, function (error) {
            $rootScope.countQuery--;
            if ($rootScope.countQuery == 0) {
                usSpinnerService.stop('spinner');
            }
        });
    }
    ;
    //Filetypes cache
    if (!!sessionStorage.getItem('filetypes')) {
        $rootScope.dataFiletypes = JSON.parse(sessionStorage.getItem('filetypes'));
        cache.filetypes.cache = true;
        $rootScope.countQuery--;
        if ($rootScope.countQuery == 0) {
            usSpinnerService.stop('spinner');
        }
    } else {
        rest().get({
            type: 'filetypes',
            params: 'orderBy=name&limit=1000&fields=id,api,mimetype,name,slug'
        }, function (filetypes) {
            cache.filetypes.total = filetypes.meta.count;
            var fils = [];
            sessionStorage.setItem('filetypes', JSON.stringify(fils));
            angular.forEach(filetypes.data, function (element) {
                var info = {
                    id: element.id,
                    api: element.api,
                    mimetype: element.mimetype,
                    name: element.name,
                    slug: element.slug
                };

                fils.push(info);
                sessionStorage.setItem('filetypes', JSON.stringify(fils));

            });
        }, function (error) {
            $rootScope.countQuery--;
            if ($rootScope.countQuery == 0) {
                usSpinnerService.stop('spinner');
            }
        });
    }
    ;

    //Tags cache
    if (!!sessionStorage.getItem('tags')) {
        $rootScope.dataTags = JSON.parse(sessionStorage.getItem('tags'));
        cache.tags.cache = true;
        $rootScope.countQuery--;
        if ($rootScope.countQuery == 0) {
            usSpinnerService.stop('spinner');
        }
    } else {
        rest().get({
            type: 'tags',
            params: 'orderBy=name&limit=1000&fields=id,name,slug'
        }, function (tags) {
            cache.tags.total = tags.meta.count;
            var tgs = [];
            sessionStorage.setItem('tags', JSON.stringify(tgs));
            angular.forEach(tags.data, function (element) {
                var info = {
                    id: element.id,
                    name: element.name,
                    slug: element.slug
                };

                tgs.push(info);
                sessionStorage.setItem('tags', JSON.stringify(tgs));

            });
        }, function (error) {
            $rootScope.countQuery--;
            if ($rootScope.countQuery == 0) {
                usSpinnerService.stop('spinner');
            }
        });
    }
    ;

    //Organizations cache
    if (!!sessionStorage.getItem('organizations')) {
        $rootScope.dataOrgs = JSON.parse(sessionStorage.getItem('organizations'));
        cache.organizations.cache = true;
        $rootScope.countQuery--;
        if ($rootScope.countQuery == 0) {
            usSpinnerService.stop('spinner');
        }
    } else {
        rest().get({
            type: 'organizations',
            params: 'orderBy=name&sort=ASC&limit=1000&fields=id,name,slug'
        }, function (organizations) {
            cache.organizations.total = organizations.meta.count;
            var tgs = [];
            sessionStorage.setItem('organizations', JSON.stringify(tgs));
            angular.forEach(organizations.data, function (element) {
                var info = {
                    id: element.id,
                    name: element.name,
                    slug: element.slug
                };

                tgs.push(info);
                sessionStorage.setItem('organizations', JSON.stringify(tgs));

            });
        }, function (error) {
            $rootScope.countQuery--;
            if ($rootScope.countQuery == 0) {
                usSpinnerService.stop('spinner');
            }
        });
    }
    ;

    $timeout(function(){
      usSpinnerService.spin('spinner');
      arrangeCategories();
      usSpinnerService.stop('spinner');
    });
}


function checkFilters(activeCategory){
  activeCategory = $.isArray(activeCategory) ? activeCategory[0] : sessionStorage.getItem('activeCategory');
  var selected = sessionStorage.getItem('selectedCategory');
  if (selected && activeCategory != selected) {
    clearFilters();
  }
}
function clearFilters(){
  sessionStorage.removeItem('tagsAutocomplete');
  sessionStorage.removeItem('orgsAutocomplete');
  sessionStorage.removeItem('formatsAutocomplete');
  sessionStorage.removeItem('selectedTags');
  sessionStorage.removeItem('selectedOrgs');
  sessionStorage.removeItem('selectedFormats');
}

function arrangeCategories(){
    var container = $('#categoriesgrid-container').width();
    if (container > 0) {
      var items = $('.arrange-item');
      var cant = items.length;

      // Obtains max categs that fit the container
      var max = Math.trunc(container/items.outerWidth(true));
      var limit = Math.trunc(max/2);
      // Only if max < categ quantity => rearrange
      if (cant>max) {
        var combinations = [];
        // 1) Obtains all the combinations
        for (var i = max; i >= limit; i--) {
          var remainder;
          var combination = [];
          var first = true;
          do {
            if (first) {
              remainder = cant - i;
              first=false;
            } else {
              remainder = remainder - i;
            }
              combination.push(i)
            if (remainder > 0 && remainder < i) {
                combination.push(remainder)
            }
          } while (remainder != 0 && remainder >= i);

          // 2) Save the combination if last item != 1
          if (combination[combination.length-1]!=1) {
            combinations.push(combination);
          }
        }

        var remainderIndex=[];

        // 3) Calculate remainder and save remainder/index
        for (var i = 0; i < combinations.length; i++) {
          combinations[i].reverse(); // magic
          var total;
          for (var x = 0; x < combinations[i].length; x++) {
            if (x == 0) {
              total = combinations[i][0];
            } else {
              total -= combinations[i][x];
            }
          }
          var result = [];
          result.push(total);        // Save Remainder
          result.push(i);            // Save Index
          remainderIndex.push(result)// Save Combination
        }

        // 4) Take highest positive value and index
        var max, maxAcum, index;
        max = remainderIndex[0][0];
        index = remainderIndex[0][1];
        for (var i = 1; i < remainderIndex.length; i++) {
          if (remainderIndex[i][0] == 0 || remainderIndex[i][0] > max ) {
            max = remainderIndex[i][0];
            index = i;
          }
        }

        // 5) Arrange categories
        var selected = combinations[index].reverse()
        var item;
        var index=[];
        var $blocker = $('<div />');
        var $lineBreak = $('<br/>')

        for (var i = 0; i < selected.length-1; i++) {
          var indexItem =(selected[i]);
          if (item === undefined) {
            item = indexItem - 1;
            $blocker.appendTo(items[item].parentElement)
          } else {
            item = item + indexItem;
          }

          index.push(items[item]);
          $lineBreak.appendTo(items[item].parentElement)

        }
      }
    }
}
