function contactController($scope, $http, vcRecaptchaService) {
    recaptchaId = null;
    $scope.setRecaptchaId = function (widgetId) {
        console.log(widgetId);
        recaptchaId = widgetId;
    };

    $scope.submit = function () {
        if (!vcRecaptchaService.getResponse(recaptchaId)) {
            $scope.od_captcha = null;
            vcRecaptchaService.reload(recaptchaId);
            alert('Por favor, completa el captcha.');
        } else {
          // TBD: send email by ODINApi

        }
    }

}
