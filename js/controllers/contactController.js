function contactController($scope, $http, vcRecaptchaService, EnvironmentConfig,  $rootScope, Alertify) {
    $rootScope.isHome = true;
    recaptchaId = null;
    $scope.setRecaptchaId = function (widgetId) {
        recaptchaId = widgetId;
    };

    $scope.submit = function () {
        if (!vcRecaptchaService.getResponse(recaptchaId)) {
            $scope.od_captcha = null;
            vcRecaptchaService.reload(recaptchaId);
            Alertify.alert('Por favor, completa el captcha.');
        } else {
          var token=$rootScope.globals.currentUser.token;
          var formData = $("#contactForm").serialize();
          $.ajax({
            headers: {
                'Authorization': 'Bearer ' + token
            },
            type: 'POST',
            url:  EnvironmentConfig.api + '/email/send',
            data: formData
          }).done(function(response) {
            showMsg(true);
          }).fail(function(data) {
            showMsg(data);
          });
        }
    }

    function showMsg(result) {
      if (result) {
        Alertify.alert('El mensaje ha sido enviado correctamente');
      } else {
        Alertify.alert('El mensaje no ha sido enviado, intente nuevamente más tarde');
      }
      document.location.href="/";
    }

}
