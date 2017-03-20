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

function ProposeController($scope, $rootScope, vcRecaptchaService, Alertify, rest, $location) {
    $rootScope.isHome = false;

    $scope.activeCategory = [];
    $scope.categories = JSON.parse(sessionStorage.getItem('categories')) || [];
    $rootScope.dataCategories = $scope.categories;
    var categories_send = [];

    recaptchaId = null;
    $scope.setRecaptchaId = function (widgetId) {
        recaptchaId = widgetId;
    };

    $scope.send = function () {
        if ($scope.activeCategory.length == 0) {
            Alertify.alert('Por favor, seleccioná al menos una categoría.');
        } else if (!vcRecaptchaService.getResponse(recaptchaId)) {
            $scope.od_captcha = null;
            vcRecaptchaService.reload(recaptchaId);
            Alertify.alert('Por favor, completa el captcha.');
        } else if (!$scope.about || $scope.about == '' || !$scope.description || $scope.description == ''){
            Alertify.alert('Hay campos sin completar.');
        } else {
            var data = {
                about: $scope.about,
                description: $scope.description,
                email: $scope.email,
                categories: categories_send
            };

            rest().save({
                type: 'datasetrequests'
            }, data, function (resp) {
                Alertify.alert('Al Gobierno Abierto lo construimos todos, ¡Gracias por tu sugerencia!');
                $location.path('/');
            }, function (error) {
                Alertify.alert('Hubo un error al procesar la sugerencia. Intentalo más tarde.');
            });
        }
    };

    $scope.toogleActive = function (slug, id) {
        if ($scope.activeCategory.indexOf(slug) === -1) {
            $scope.activeCategory.push(slug);
            categories_send.push(id);
        } else {
            $scope.activeCategory.splice($scope.activeCategory.indexOf(slug), 1);
            categories_send.splice(categories_send.indexOf(id), 1);
        }
    };
}
;

function OdinGirlController($scope) {
    $scope.hideGirl = false;
    $scope.hideOdinGirl = function () {
        $scope.hideGirl = !$scope.hideGirl;
    };
}
;