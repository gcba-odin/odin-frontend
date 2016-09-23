angular.module('store-factories')
.service('DatasetListService', function($httpParamSerializer, LocationSearchService, rest) {
  return {
    getDatasets: function(params, cb) {
      LocationSearchService.init();
      var params = $.extend(LocationSearchService.searchParams(), params);
      if (params.orderBy === 'downloads') {
        delete params.orderBy;
      }
      return rest()[
            params.query ? 'search' : 'get'
        ]({
            type: 'datasets',
            params: $httpParamSerializer(params)
        }, function(result) {
            return cb(result.data);
        });
    },
    getDatasetsCount: function(params, cb) {
      LocationSearchService.init();
      var params = $.extend(LocationSearchService.searchParams(), params);
      if (params.orderBy === 'downloads') {
        delete params.orderBy;
      }
      return rest()[
            'count'
        ]({
            type: 'datasets',
            params: $httpParamSerializer(params)
        }, function(result) {
            return cb(result);
        });
    },

    getDownloadResults: function(params, cb){
        LocationSearchService.init();
        var params = $.extend(LocationSearchService.searchParams(), params);
        
        var downloads = [];
        if (params.orderBy === 'downloads') {
            rest().statistics({
                type: 'datasets'
            }, function(downloadsResults) {
                var items = downloadsResults.data.items;
                $.each(items, function(key, value) {
                    if (key.indexOf('download') >= 0 && value.resource === 'Dataset') {
                        downloads.push({
                            dataset: value.item,
                            downloads: value.count.GET
                        });
                    }
                });
                cb(downloads);
            });
        } else {
            cb(downloads);
        }
    }
  };
});
