angular.module('odin.controllers')
.controller('TagsController', TagsController);

function TagsController($rootScope, $scope, $filter, rest, LocationSearchService, $routeParams) {
    var filterName = 'tags.slug';
    var limit = 5;
    $scope.limitTags = 0;
    $scope.tags = [];
    $scope.resultTags = [];
    $scope.lessThanLimit;
    
    $scope.currentColor = sessionStorage.getItem('currentColor') || '';

    $scope.collapsed = true;
    $scope.toggleCollapse = function() {
        $scope.collapsed = !$scope.collapsed;
    };
    $scope.loadTags = function(skip) {
        $scope.limitTags += skip;
        $scope.resultTags = rest().get({
            type: "tags",
            params: "orderBy=name&sort=ASC&limit=5&skip=" + $scope.limitTags
        }, function() {
            for (var i = 0; i < $scope.resultTags.data.length; i++) {
                var tag = $scope.resultTags.data[i];
                tag.slug = $filter('slug')(tag.name);
                tag.active = LocationSearchService.isActive(filterName, tag.slug);
                $scope.tags.push(tag);
            }
            if ($filter('filter')($scope.tags, {active: true})[0] !== undefined) {
              $scope.collapsed=false;
            }
            $scope.lessThanLimit = $scope.resultTags.data.length < Math.max(skip, limit);
        });

    };

    $scope.showLess = function(limit) {
        var countTags = $scope.tags.length;
        var minCount = Math.min(countTags, limit);
        $scope.tags.splice(minCount, countTags - minCount);
        $scope.limitTags = 0;
        $scope.lessThanLimit = false;
    };

    $scope.loadTags(0);
    $scope.selectTag = function(tag) {
        $rootScope.showFiltersMenu = false;
        $rootScope.showBackdrop = false;
        if(tag.active) {
            LocationSearchService.removeFilterValue(filterName, tag.slug);
        } else {
            LocationSearchService.addFilterValue(filterName, tag.slug);
        }
    };
    $scope.removeAll = function() {
        LocationSearchService.deleteFilter(filterName);
    };

}
