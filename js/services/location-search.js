angular.module('store-factories')
.service('LocationSearchService', function($location) {
  var locationSearch = {};
  return {
    init: function() {
      locationSearch = $location.search();
      $.each(locationSearch, function(filter, value) {
        var values = value.split(',');
        locationSearch[filter] = values.length === 1 ? values[0] : values;
      });
    },
    isActive: function(filter, value) {
      return locationSearch[filter] === value;
    },
    setFilter: function(filter, value) {
      if(locationSearch[filter] === value) return;
      locationSearch[filter] = value;
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
      if($.inArray(value, filterValues)) return;
      filterValues.push(value);
      $location.search(filter, filterValues.join());
    },
    removeFilterValue: function(filter, value) {
      //TODO: implement
    }
  };
});
