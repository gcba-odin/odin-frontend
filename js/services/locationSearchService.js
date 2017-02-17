angular.module('store-factories')
.service('LocationSearchService', function($location, $window, $filter) {
  var locationSearch = {};
  return {
    init: function() {
      locationSearch = $location.search();
      $.each(locationSearch, function(filter, value) {
        var values = $.isArray(value) ? value : value.split(',');
        locationSearch[filter] = values;
      });
    },
    isActive: function(filter, value) {
      return $.inArray(value, locationSearch[filter]) !== -1;
    },
    isSet: function(filter) {
      var filterValues = locationSearch[filter];
      return $.isArray(filterValues) ? filterValues.length : !!filterValues;
    },
    setFilter: function(filter, value) {
      var filterValues = locationSearch[filter];
      if(filterValues === [value]) return;
      filterValues = [value];
      $location.search(filter, value);
    },
    deleteFilter: function(filter) {
      if(!locationSearch[filter]) return;
      delete locationSearch[filter];
      $location.search(filter, null);
    },
    addFilterValue: function(filter, value) {
      var filterValues = locationSearch[filter] || [];
      locationSearch[filter] = filterValues;
      if(this.isActive(filter, value)) return;
      filterValues.push(value);
      $location.search(filter, filterValues.join());
    },
    removeFilterValue: function(filter, value) {
      var filterValues = locationSearch[filter];
      if(!!filterValues) {
        filterValues = filterValues.filter(function(valueInArray){
          return valueInArray !== value;
        });
        $location.search(filter, filterValues);
    }
    },
    searchParams: function() {
      var searchParams = angular.copy(locationSearch);
      $.each(searchParams, function(key, value) {
        if (value.length > 0) {
          if ($.isArray(value)) {
            searchParams[key] = value.map(function(slug){
              return slug;
            }).join();
          } else {
            searchParams[key] = value;
          }
        }
      });
      return searchParams;
    }
  };
});
