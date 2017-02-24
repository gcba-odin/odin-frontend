var app = angular.module('odin.categoryControllers', []);

app.factory('model', function ($resource) {
    return $resource();
});

function CategoryListController($scope, $location, rest, $rootScope, $routeParams, $httpParamSerializer, $log, usSpinnerService) {

    usSpinnerService.spin('spinner');
    $rootScope.countQuery++;
    $rootScope.countQuery++;

    var cache = false;
    var cacheFilt = false;


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

    var totalCategories = 0;
    var totalFiletypes = 0;

    $scope.$watch(function () {
        if (!!sessionStorage.getItem('categories')) {
            return sessionStorage.getItem('categories');
        }

    }, function (val) {
        if (!!val && !cache && val.length > 0) {
            var arrayCats = JSON.parse(val);
            if (arrayCats.length == totalCategories) {
                $rootScope.dataCategories = JSON.parse(val);
                $rootScope.countQuery--;
                if ($rootScope.countQuery == 0) {
                    usSpinnerService.stop('spinner');
                }
            }
        }
    });

    $scope.$watch(function () {
        if (!!sessionStorage.getItem('filetypes')) {
            return sessionStorage.getItem('filetypes');
        }

    }, function (val) {
        if (!!val && !cacheFilt && val.length > 0) {
            var arrayFilt = JSON.parse(val);
            if (arrayFilt.length == totalFiletypes) {
                $rootScope.dataFiletypes = JSON.parse(val);
                $rootScope.countQuery--;
                if ($rootScope.countQuery == 0) {
                    usSpinnerService.stop('spinner');
                }
            }
        }
    });

    $rootScope.showCategories = true;

    if (!!sessionStorage.getItem('categories')) {
        cache = true;
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
            params: "parent=null&orderBy=name&sort=ASC"
        }, function (categories) {
            totalCategories = categories.meta.count;
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

    if (!!sessionStorage.getItem('filetypes')) {
        $rootScope.dataFiletypes = JSON.parse(sessionStorage.getItem('filetypes'));
        cacheFilt = true;
        $rootScope.countQuery--;
        if ($rootScope.countQuery == 0) {
            usSpinnerService.stop('spinner');
        }
    } else {
        rest().get({
            type: 'filetypes'
        }, function (filetypes) {
            totalFiletypes = filetypes.meta.count;
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
