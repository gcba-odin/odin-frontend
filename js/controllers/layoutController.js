angular.module('odin')

.controller('LayoutController', LayoutController);

function LayoutController($scope, $location, rest, $rootScope, $sce, $routeParams, LocationSearchService) {
    PDFJS.workerSrc = $rootScope.baseHtml5 + 'plugins/pdf/pdf.worker.js';
    LocationSearchService.init();
    $rootScope.layout_preview = true;
    $rootScope.header = "Guía de datos";
    $scope.type = "files";

    var layout = rest().get({
        type: $scope.type,
        id: $routeParams.id,
    }, function(result) {
        $scope.resource = result.data[0];
    });

    $scope.getHtml = function(html) {
        return $sce.trustAsHtml(html);
    };

    $scope.scroll = 0;
    $scope.loading = 'Cargando..';

    $scope.getNavStyle = function(scroll) {
        if (scroll > 100)
            return 'pdf-controls fixed';
        else
            return 'pdf-controls';
    }

    $scope.onError = function(error) {
        // console.log(error);
    }

    $scope.onLoad = function() {
        $scope.loading = '';
    }

    $scope.onProgress = function(progress) {
        // console.log(progress);
    }
}
