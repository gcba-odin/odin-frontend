(function() {
    var app = angular.module('config-odin', []);
    app.run(run);

    function run($rootScope, $location, $http) {
        $rootScope.url = 'http://localhost:3000';
        $rootScope.absUrl = $location.absUrl()

    }
})();