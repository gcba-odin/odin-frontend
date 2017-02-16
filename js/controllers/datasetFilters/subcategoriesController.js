angular.module('odin.controllers')
    .controller('SubcategoriesController', SubcategoriesController);

function SubcategoriesController($rootScope, $scope, $routeParams, $filter, rest, LocationSearchService) {
    var filterName = 'subcategories.slug';
    var limit = 5;
    $scope.limitSubcategories = 0;
    $scope.subcategories = [];
    $scope.resultSubcategories = [];
    $scope.lessThanLimit;

    var categorySlug = $routeParams["categories.slug"];

    $scope.loadSubcategories = function (skip) {
        $scope.limitSubcategories += skip;
        $scope.resultSubcategories = rest().get({
            type: "categories",
            params: "include=subcategories&parent=null&condition=AND&slug=" + categorySlug + "&orderBy=name&sort=ASC&limit=" + limit + "&skip=" + $scope.limitSubcategories+"&match=exact"
        }, function () {
            var subcategories = $scope.resultSubcategories.data[0].subcategories;
            for (var i = 0; i < subcategories.length; i++) {
                var subcategory = subcategories[i];
                subcategory.slug = $filter('slug')(subcategory.name);
                subcategory.active = LocationSearchService.isActive(filterName, subcategory.slug);
                $scope.subcategories.push(subcategory);
            }
            $scope.lessThanLimit = subcategories.length < Math.max(skip, limit);
            //console.log(subcategories.length, skip);
            $scope.resultSubcategoriesLength = subcategories.length;
        });

    };

    $scope.loadSubcategories(0);

    $scope.showLess = function (limit) {
        var countSubcategories = $scope.subcategories.length;
        var minCount = Math.min(countSubcategories, limit);
        $scope.subcategories.splice(minCount, countSubcategories - minCount);
        $scope.limitSubcategories = 0;
        $scope.lessThanLimit = false;
    };

    $scope.selectSubcategory = function (subcategory) {
        $rootScope.showFiltersMenu = false;
        $rootScope.showBackdrop = false;
        if (subcategory.active) {
            LocationSearchService.removeFilterValue(filterName, subcategory.slug);
        } else {
            LocationSearchService.addFilterValue(filterName, subcategory.slug);
        }
    };

    $scope.removeAll = function () {
        LocationSearchService.deleteFilter(filterName);
    };
}
