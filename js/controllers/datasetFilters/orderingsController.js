angular.module('odin.controllers')
.controller('OrderingsController', OrderingsController);

function OrderingsController ($scope, $rootScope, LocationSearchService, rest, $routeParams) {
    LocationSearchService.init();
    var filterName = 'orderBy';
    
    $scope.currentColor = sessionStorage.getItem('currentColor') || '';
    
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
            property: 'updatedAt',
            sort: 'DESC',
            filesOnly: true
        }
    ].map(function(order) {
        order.active = LocationSearchService.isActive(filterName, order.property);
        return order;
    });
    $scope.selectOrder = function(order) {
        $rootScope.showFiltersMenu = false;
        $rootScope.showBackdrop = false;
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


    $scope.collapsed = false;
    $scope.toggleCollapse = function() {
        $scope.collapsed = !$scope.collapsed;
    };

}
