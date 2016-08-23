(function() {
    var app = angular.module('store-directives-dataset', []);

    app.filter('trustUrl', ['$sce', function($sce) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    }])

})();