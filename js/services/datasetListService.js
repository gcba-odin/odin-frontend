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
            var datasets = result.data
                .filter(function(dataset) {
                    // Filter datasets that have unpublished files of filtered types
                    var filesTypeFilterIsSet = $.isArray(params['files.type']) ? !!params['files.type'].length : !!params['files.type'];
                    return !filesTypeFilterIsSet || dataset.files
                        .filter(function(file) {
                            return LocationSearchService.isActive('files.type', file.type) || params['files.type'] === file.type;
                        })
                        .length;
                })
                .filter(function(dataset) {
                    // Filter datasets that have unpublished files of filtered organizations
                    var filesOrganizationFilterIsSet = $.isArray(params['files.organization']) ? !!params['files.organization'].length : !!params['files.organization'];
                    return !filesOrganizationFilterIsSet || dataset.files
                        .filter(function(file) {
                            return LocationSearchService.isActive('files.organization', file.organization) || params['files.organization'] === file.organization;
                        })
                        .length;
                });
            return cb(datasets);
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
