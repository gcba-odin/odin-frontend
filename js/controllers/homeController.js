function controllerHome($scope, $location, $sce, $filter, $rootScope, rest, DatasetListService, usSpinnerService) {
    usSpinnerService.spin('spinner');
    sessionStorage.removeItem('query');
    sessionStorage.removeItem('activeCategory');

    localStorage.removeItem('currentCategory');

    $rootScope.header = "Odin";
    $rootScope.isDatasetView = false;
    $rootScope.isHome = true;
    $rootScope.showLoadingLatest = true;
    $rootScope.showLoadingStarred = true;

    $rootScope.countQuery++;
    DatasetListService.getDatasetsCount($scope.params, function (result) {
        $rootScope.countDatasets = result.data.count;
        $rootScope.countQuery--;
        if ($rootScope.countQuery == 0) {
            usSpinnerService.stop('spinner');
        }
    });

    $scope.getHtml = function (html) {
        return $sce.trustAsHtml(html);
    };

    $scope.goToUrl = function (url) {
        $filter('slug')(this.item.name);
        window.location = "/dataset/" + $filter('slug')(this.item.id);
    };
}

function ProposeController($scope, $rootScope, vcRecaptchaService) {
    $rootScope.isHome = false;

    $scope.activeCategory = [];
    $scope.categories = JSON.parse(sessionStorage.getItem('categories')) || [];
    $rootScope.dataCategories = $scope.categories;

    recaptchaId = null;
    $scope.setRecaptchaId = function (widgetId) {
        recaptchaId = widgetId;
    };

    $scope.send = function () {
        if($scope.activeCategory.length == 0) {
            alert('Por favor, seleccioná al menos una categoría.');
        } else if (!vcRecaptchaService.getResponse(recaptchaId)) {
            $scope.od_captcha = null;
            vcRecaptchaService.reload(recaptchaId);
            alert('Por favor, completa el captcha.');
        } else {
            alert('Al Gobierno Abierto lo construimos todos, ¡Gracias por tu sugerencia!');
        }
    };

    $scope.toogleActive = function (slug) {
        if ($scope.activeCategory.indexOf(slug) === -1) {
            $scope.activeCategory.push(slug);
        } else {
            $scope.activeCategory.splice($scope.activeCategory.indexOf(slug), 1);
        }
    };
}
;
