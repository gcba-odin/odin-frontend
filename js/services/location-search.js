angular.module('store-factories')
.service('LocationSearchService', function($location) {
  var locationSearch = {};
  return {
    init: function() {
      locationSearch = $location.search();
      $.each(locationSearch, function(filter, value) {
        var values = $.isArray(value) ? value : [value];
        locationSearch[filter] = values;
      });
    },
    isActive: function(filter, value) {
      return $.inArray(value, locationSearch[filter]) !== -1;
    },
    setFilter: function(filter, value) {
      var filterValues = locationSearch[filter];
      if(filterValues === [value]) return;
      filterValues = [value];
      $location.search(filter, filterValues);
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
      $location.search(filter, filterValues);
    },
    removeFilterValue: function(filter, value) {
      var filterValues = locationSearch[filter];
      filterValues = filterValues.filter(function(valueInArray){
        return valueInArray !== value;
      });
      $location.search(filter, filterValues);
    },
    searchParams: function() {
      return locationSearch;
    }
  };
});
