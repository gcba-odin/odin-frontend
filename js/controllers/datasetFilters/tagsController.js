angular.module('odin.controllers')
.controller('TagsController', TagsController);

function TagsController($rootScope, $scope, $filter, rest, LocationSearchService, $routeParams) {
    var filterName = 'tags.slug';
    const limit = 5;
    var tagsAutocomplete;

    $scope.limitTags = 0;
    $scope.tags = [];
    $scope.resultTags = [];
    $scope.lessThanLimit;
    $scope.selectedTags = JSON.parse(sessionStorage.getItem('selectedTags'));
    $scope.tagNames = [];
    $scope.collapsed = true;
    $scope.loadAutocompleteTags=true;
    $scope.toggleCollapse = function() {
        $scope.collapsed = !$scope.collapsed;
    };
    if (!$.isArray($scope.selectedTags)) {
      $scope.selectedTags = [];
    }
    // $scope.loadTags = function(skip) {
    //     $scope.limitTags += skip;
    //     $scope.resultTags = rest().get({
    //         type: "tags",
    //         params: "orderBy=name&sort=ASC&limit=5&skip=" + $scope.limitTags
    //     }, function() {
    //         for (var i = 0; i < $scope.resultTags.data.length; i++) {
    //             var tag = $scope.resultTags.data[i];
    //             tag.slug = $filter('slug')(tag.name);
    //             tag.active = LocationSearchService.isActive(filterName, tag.slug);
    //             $scope.tags.push(tag);
    //             $scope.tagNames.push(tag.name);
    //         }
    //
    //         if ($scope.tags.filter(tag=>tag.active)[0]!==undefined) {
    //           $scope.collapsed=false;
    //         }
    //         $scope.lessThanLimit = $scope.resultTags.data.length < Math.max(skip, limit);
    //     });
    // };
    $scope.loadTags = function() {
        $scope.resultTags = rest().get({
            type: "tags",
            params: "fields=name,slug,id"
        }, function() {
            for (var i = 0; i < $scope.resultTags.data.length; i++) {
                var tag = $scope.resultTags.data[i];
                tag.slug = $filter('slug')(tag.name);
                tag.active = LocationSearchService.isActive(filterName, tag.slug);
                $scope.tags.push(tag);
                $scope.tagNames.push(tag.name);
            }
            tagsAutocomplete = JSON.parse(sessionStorage.getItem('tagsAutocomplete'));
            if (tagsAutocomplete) {
              $scope.tagNames=tagsAutocomplete;
            } else {
              tagsAutocomplete =  $scope.tagNames;
            }
            if ($scope.tags.filter(tag=>tag.active)[0]!==undefined) {
              $scope.collapsed=false;
            }
            // $scope.lessThanLimit = $scope.resultTags.data.length < Math.max(skip, limit);
        });
    };

    // $scope.showLess = function(limit) {
    //     var countTags = $scope.tags.length;
    //     var minCount = Math.min(countTags, limit);
    //     $scope.tags.splice(minCount, countTags - minCount);
    //     $scope.limitTags = 0;
    //     $scope.lessThanLimit = false;
    // };

    $scope.loadTags(0);
    $scope.selectTag = function(tag) {
        $rootScope.showFiltersMenu = false;
        $rootScope.showBackdrop = false;
        debugger;
        if(tag.active) {
            $scope.selectedTags.splice($scope.selectedTags.indexOf(tag.name),1);
            tagsAutocomplete.push(tag)
            LocationSearchService.removeFilterValue(filterName, tag.slug);
        } else {
            tag.active = true;
            $scope.selectedTags.push(tag);
            tagsAutocomplete.splice(tagsAutocomplete.indexOf(tag.name),1);
            LocationSearchService.addFilterValue(filterName, tag.slug);
        }
        sessionStorage.setItem('tagsAutocomplete',JSON.stringify(tagsAutocomplete));
        sessionStorage.setItem('selectedTags', JSON.stringify($scope.selectedTags));
    };
    $scope.removeAll = function() {
        LocationSearchService.deleteFilter(filterName);
        sessionStorage.removeItem('selectedTags');
    };

    var currentColor;
    var category = rest().get({
      type: 'categories',
      params: 'slug='+$routeParams['categories.slug']+"&match=exact"
    }, function(resp) {
      if (resp.data[0]) {
        $scope.currentCategory = resp.data[0];
        if ($scope.currentCategory.color !== null && $scope.currentCategory.color !== undefined) {
            $scope.currentColor = $scope.currentCategory.color ;
            sessionStorage.setItem('currentColor', $scope.currentColor);
        }
      } else {
        $scope.currentColor = sessionStorage.getItem('currentColor');
      }
    });

    $scope.tagTypedSelected = function(tagSelected){
      tagSelected=$scope.tags.filter(function(tag){
        return tag.name == tagSelected;
      });
      $scope.selectTag(tagSelected[0]);
      $scope.tagNames.splice($scope.tagNames.indexOf(tagSelected[0].name),1);
    }

}
