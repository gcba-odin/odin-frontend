(function() {
    var app = angular.module('config-odin',[]);
    app.run(run);
    function run($rootScope, $location, $http) {
        $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
            $rootScope.actualUrl=current.$$route.originalPath;
            $rootScope.url='http://137.135.84.77:3000';
        });
    }
})(); 
