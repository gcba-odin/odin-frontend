angular.module('store-directives-datasets')
.directive("orderResult", function(LocationSearchService) {
    return {
        restrict: "E",
        templateUrl: "directives/datasets/order-results.html",
        scope: {
            filesView: '='
        },
        controller: function($scope) {
            var filterName = 'orderBy';
            $scope.orderings = [
                {
                    name: 'Nombre',
                    property: 'name',
                    sort: 'ASC'
                }, {
                    name: 'Fecha de publicación',
                    property: 'publishedAt',
                    sort: 'DESC'
                }, {
                    name: 'Más descargados',
                    property: 'downloads',
                    sort: null,
                    datasetsOnly: true
                }, {
                    name: 'Última actualización',
                    property: 'updateDate',
                    sort: 'DESC',
                    filesOnly: true
                }
            ].map(function(order) {
                order.active = LocationSearchService.isActive(filterName, order.property);
                return order;
            });
            $scope.selectOrder = function(order) {
                if(order.active) {
                    LocationSearchService.deleteFilter(filterName);
                    LocationSearchService.deleteFilter('sort');
                } else {
                    LocationSearchService.setFilter(filterName, order.property);
                    LocationSearchService.setFilter('sort', order.sort);
                }
            };
            $scope.removeAll = function() {
                LocationSearchService.deleteFilter(filterName);
                LocationSearchService.deleteFilter('sort');
            };
        },
        controllerAs: "licences"
    };
});
