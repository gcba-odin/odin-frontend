angular.module('store-directives-datasets')
.directive("resultDatasets", function() {
    return {
        restrict: "E",
        templateUrl: "directives/datasets/result-datasets.html",
        controller: function($scope, $window, $location, rest) {
            $scope.stats = {};
            $scope.views = {};

            $window.gapi.analytics.ready(function() {
                var CLIENT_ID = '150875399082-m0hsppbuvldrgojekv33v2d1tb3ohg0b.apps.googleusercontent.com';
                $window.gapi.analytics.auth.authorize({
                    container: 'gapi-auth',
                    clientid: CLIENT_ID
                });
                $window.gapi.analytics.auth.on('success', function(response) {
                    // Google Analytics API get pageviews
                    var VIEW_ID = '37919956';
                    queryReports();
                });
            });

            rest().statistics({
                type: 'datasets'
            }, function(results) {
                $.each(results.data.items, function(key, value) {
                    if (key.indexOf('download') >= 0 && value.resource === 'Dataset') {
                        $scope.stats[value.item] = { downloads: value.count.GET ? value.count.GET : 0 };
                    }
                    if (key.indexOf('download') === -1 && key.indexOf('publish') === -1 && value.resource === 'Dataset') {
                        // $scope.views[value.item] = { views: value.count.GET ? value.count.GET : 0 };
                        console.log('dataset ' + key);
                        $scope.views[value.item] = queryReports(key);
                    }
                });
            });

            $scope.toggleDropdown = function(event)
            {
                if ($(event.target).next().hasClass('dataset-additional-info-table-inactive'))
                {
                    $(event.target).next().addClass('dataset-additional-info-table-active');
                    $(event.target).next().removeClass('dataset-additional-info-table-inactive');
                    $(event.target).addClass('dataset-additional-info-active');
                }
                else
                {
                    $(event.target).next().addClass('dataset-additional-info-table-inactive');
                    $(event.target).next().removeClass('dataset-additional-info-table-active');
                    $(event.target).removeClass('dataset-additional-info-active');
                }
            };

            function queryReports(key) {
                if (!key) {
                    key = $location.path();
                    // key = '/dataset/dataset-3';

                }

                // var CLIENT_ID = '150875399082-m0hsppbuvldrgojekv33v2d1tb3ohg0b.apps.googleusercontent.com';

                $window.gapi.client.request({
                    path: '/v4/reports:batchGet',
                    root: 'https://analyticsreporting.googleapis.com/',
                    method: 'POST',
                    body: {
                        reportRequests: [{
                            viewId: '37919956',
                            dateRanges: [{
                                startDate: '2015-01-01',
                                endDate: 'today'
                            }],
                            metrics: [{
                                expression: 'ga:pageviews'
                            }],
                            dimensionFilterClauses: [{
                                filters: [{
                                    operator: 'EXACT',
                                    dimensionName: 'ga:pagePath',
                                    expressions: [key]
                                }]
                            }]
                        }]

                    }
                }).then(displayResults, console.error.bind(console));

                function displayResults(response) {
                    var formattedJson = JSON.stringify(response.result, null, 2);
                    $scope.pageviewCount = formattedJson;
                    console.log('pgcount!:' + formattedJson);
                    // console.log('devuuelvo json');
                    return formattedJson;
                }
            };


        },
        controllerAs: "dataset"
    };
});
