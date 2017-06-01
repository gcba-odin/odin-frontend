(function() {
    var app = angular.module('authentication-service', []);
    app.provider('AuthenticationServiceProvider', function() {
        this.$get = function(AuthenticationService) {
            return AuthenticationService;
        };
    });
    app.factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout'];
    function AuthenticationService($http, $cookieStore, $rootScope, $timeout, $scope) {
        var service = {};
        service.Consumer = {
            consumer: 'frontend',
            consumerId: '7fb5addf-5263-4a28-91dd-8f9bbc44ab16'
        };
        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;
        return service;
        function Login(Consumer, callback) {
            /* Use this for real authenticationa
             ----------------------------------------------*/
            $http.post($rootScope.url + '/clients/tokens', Consumer,{
              headers: {
                'Cache-Control': 'max-age=604800'
              }
            })
                    .success(function(response) {
                        callback(response);
                    })
                    .error(function(response) {
                        alert(response.message);
                    })
                    .catch(function(error) {
                        throw error;
                    });
        }

        function SetCredentials(token) {
            $rootScope.globals = {
                currentUser: {
                    token: token
                }
            };
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + token; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            //$http.defaults.headers.common.Authorization = 'Basic';
        }
    }

})();
