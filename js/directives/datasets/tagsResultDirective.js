angular.module('store-directives-datasets')
.directive("tagsResult", function($filter, LocationSearchService) {
    return {
        restrict: "E",
        templateUrl: "directives/datasets/tags-results.html",
        scope: {},
        controller: function($scope, rest) {
            var filterName = 'tags.name';
            $scope.limitTags = 0;
            $scope.tags = [];
            $scope.resultTags = [];
            $scope.lessThanLimit;
            
            $scope.loadTags = function(limit) {
                $scope.limitTags += limit;
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
                    $scope.lessThanLimit = $scope.resultTags.data.length < limit;
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
                if(tag.active) {
                    LocationSearchService.removeFilterValue(filterName, tag.slug);
                } else {
                    LocationSearchService.addFilterValue(filterName, tag.slug);
                }
            };
            $scope.removeAll = function() {
                LocationSearchService.deleteFilter(filterName);
            };
        },
        controllerAs: "tags"
    };
});