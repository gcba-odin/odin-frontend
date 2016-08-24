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
                    return dataset.status.name === 'Publicado';
                })
                .filter(function(dataset) {
                    // Filter datasets that have unpublished files of filtered types
                    return !params['files.type'] || dataset.files
                        .filter(function(file) {
                            return LocationSearchService.isActive('files.type', file.type) || params['files.type'] === file.type;
                        })
                        .filter(function(file) {
                            return file.status === 'qWRhpRV';
                        })
                        .length;
                })
                .filter(function(dataset) {
                    // Filter datasets that have unpublished files of filtered types
                    return !params['files.organization'] || dataset.files
                        .filter(function(file) {
                            return LocationSearchService.isActive('files.organization', file.organization) || params['files.organization'] === file.organization;
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
