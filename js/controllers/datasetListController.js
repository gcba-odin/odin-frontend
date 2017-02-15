function DatasetListController($scope, $location, rest, $rootScope, $sce, $routeParams, DatasetListService, configs, $anchorScroll) {
    $rootScope.isDatasetView = true;
    sessionStorage.removeItem('activeCategory');
    localStorage.removeItem('currentCategory');

    // get limit config
        $scope.limit = 20;

        $scope.params = {
            sort: 'ASC',
            include: ['files', 'tags', 'categories'].join(),
            limit: 5,
            skip: 0,
            'categories.slug': $routeParams['categories.slug'],
        };

        var category = rest().get({
          type: 'categories',
          params: 'slug='+$routeParams['categories.slug']+"&match=exact"
        }, function(resp) {
            if(!!resp.data[0]) {
                sessionStorage.removeItem('query');
                $scope.currentCategory = resp.data[0];
                localStorage.setItem('currentCategory',resp.data[0].name);
            } 
        });


          $scope.modelName = "Dataset";
          $rootScope.header = "Datasets List";
          $scope.downloads = [];
          $scope.datasets = [];
          $scope.resultDatasetsSearch = [];
          $scope.showLoading = true;
          $scope.url_api = $rootScope.url;
          $scope.page = 1;

          $scope.countDatasets=-1;
          DatasetListService.getDatasetsCount(null, function(result) {
              $scope.countDatasets = result.data.count;
          });

          $scope.loadResults = function(skip) {
              $scope.showLoading = true;
              $scope.params.skip = skip;

              DatasetListService.getDatasets($scope.params, function(datasets) {
                  $scope.datasets = datasets.map(function(dataset) {
                      if ($scope.downloads.length) {
                          var downloadsCount = $scope.downloads
                              .filter(function(download) {
                                  return download.dataset === dataset.id;
                              })
                              .map(function(download) {
                                  return download.downloads;
                              });
                          dataset.downloads = downloadsCount.length ? downloadsCount[0] : 0;
                      }

                      dataset.additional_info = [];
                      angular.forEach(dataset.optionals, function(val, key) {
                          dataset.additional_info.push({
                              clave: key,
                              valor: val
                          });
                      });

                      dataset.fileTypes = [];
                      $scope.filesResults = rest().get({
                          type: 'files',
                          params: 'include=tags&dataset=' + dataset.id
                      }, function(result) {
                          $scope.files = result.data;
                          $scope.files.forEach(function(element) {
                              if(!!element.type && !!element.type.id) { 
                                rest().findOne({
                                    id: element.type.id,
                                    type: 'filetypes'
                                }, function(resultFileType) {
                                    var resultFileTypeName = resultFileType.name;
                                    if (dataset.fileTypes.indexOf(resultFileTypeName) === -1) {
                                        dataset.fileTypes.push(resultFileTypeName);
                                    }
                                });
                            }
                          });
                      });
                      $scope.showLoading = false;                      
                      return dataset;
                  });
                  $scope.showLoading = false; 
              });
              $anchorScroll('pagingDatasets');
          };

          DatasetListService.getDownloadResults($scope.params, function(downloads) {
              $scope.downloads = downloads;
              $scope.loadResults(0);
          });

          $scope.view = function(model) {
              var url = '/datasets/' + model.id + "/view";
              $location.path(url);
          };
          $scope.getHtml = function(html) {
              return $sce.trustAsHtml(html);
          };


          $scope.paging = function(event, page, pageSize, total) {
              var skip = (page - 1) * $scope.params.limit;
              $scope.page = page;
              $scope.loadResults(skip);
          };

          function downloadsDesc(a, b) {
              // sort DESC
              if (a.downloads < b.downloads) {
                  return 1;
              }
              if (a.downloads > b.downloads) {
                  return -1;
              }
              // a must be equal to b
              return 0;
          }
}
