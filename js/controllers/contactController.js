function contactController($scope, vcRecaptchaService) {
    recaptchaId = null;
    $scope.setRecaptchaId = function (widgetId) {
        console.log(widgetId);
        recaptchaId = widgetId;
    };

    $scope.submit = function () {
        console.log('TBD API PUSH');

        if (!vcRecaptchaService.getResponse(recaptchaId)) {
            $scope.od_captcha = null;
            vcRecaptchaService.reload(recaptchaId);
            alert('Por favor, completa el captcha.');
        } else {
            var data = {
                recaptcha: vcRecaptchaService.getResponse(recaptchaId)
            }
        }
    };
}
