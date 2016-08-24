angular.module('store-factories')
.service('DatasetListService', function($httpParamSerializer, LocationSearchService, rest) {
  LocationSearchService.init();
  return {
    getDatasets: function(params, cb) {
      var params = $.extend(LocationSearchService.searchParams(), params);
      return rest()[
            params.query ? 'search' : 'get'
        ]({
            type: 'datasets',
            params: $httpParamSerializer(params)
        }, function(result) {
            var datasets = result.data
                .filter(function(dataset) {
                    return dataset.status.name === 'Publicado';
                })
                .filter(function(dataset) {
                    // Filter datasets that have unpublished files of filtered types
                    return !LocationSearchService.isSet('files.type') || dataset.files
                        .filter(function(file) {
                            return LocationSearchService.isActive('files.type', file.type);
                        })
                        .filter(function(file) {
                            return file.status === 'qWRhpRV';
                        })
                        .length;
                })
                .filter(function(dataset) {
                    // Filter datasets that have unpublished files of filtered types
                    return !LocationSearchService.isSet('files.organization') || dataset.files
                        .filter(function(file) {
                            return LocationSearchService.isActive('files.organization', file.organization);
                        })
                        .filter(function(file) {
                            return file.status === 'qWRhpRV';
                        })
                        .length;
                });
            return cb(datasets);
        });
    }
  };
});
