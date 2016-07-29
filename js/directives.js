(function() {
  var app = angular.module( 'store-directives', [ "store-directives-home", "store-directives-dataset", "store-directives-datasets" ] );

    app.directive('brandingData', function() {
      return {
        restrict: 'E',
        templateUrl: 'directives/main/branding-data.html',
      };
  });

  app.directive('searchBar', function() {
      return {
        restrict: 'E',
        templateUrl: 'directives/main/search-bar.html',
        controller:function (rest,$scope){
         rest().count({
              type: "datasets"
          },function (resp){
            $scope.countDatasets=resp.data.count;
          });

          rest().count({
              type: "files"
          },function (resp){
            $scope.countFiles=resp.data.count;
          });
        }
      };
    });

    app.directive('searchBarHome', function() {
      return {
        restrict: 'E',
        templateUrl: 'directives/main/search-bar-home.html',
        controller:function (rest,$scope){
         rest().count({
              type: "datasets"
          },function (resp){
            $scope.countDatasets=resp.data.count;
          });

          rest().count({
              type: "files"
          },function (resp){
            $scope.countFiles=resp.data.count;
          });
        }
      };
    });

    app.directive('auxiliarBar', function () {
      return {
        restrict: 'E',
        templateUrl: 'directives/home/auxiliar-bar.html',
      };
    });

    app.directive('footerBar', function() {
      return {
        restrict: 'E',
        templateUrl: 'directives/main/footer-bar.html',
      };
    });

    app.filter('returnFormat', function() {
        return function(input) {
          var extension=input.split('.').pop();
          if(extension=="jpg" || extension== "png"){
            return "img";
          }else{
            return extension;
          }
        }
    });

    app.filter('urlEncode', [function() {
        return window.encodeURIComponent;
    }] );

    app.filter('capitalize', function() {
        return function(input) {
          return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        }
    });

    app.filter('truncString', function() {
        return function(input) {
         var  add =  '...';
         var  max=26;
         var str=input;
           return (typeof str === 'string' && str.length > max ? str.substring(0,max)+add : str);
        }
    });

    app.filter('slug', function () {
        return function (input) {
          if (input) {
            var value=normalize(input);
        return value.toLowerCase().replace(/-+/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
          }
        };
    });

    app.filter("sanitize", ['$sce', function($sce) {
      return function(htmlCode){
        return $sce.trustAsHtml(htmlCode);
      }
    }]);


    var normalize = (function() {
      var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
          to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
          mapping = {};

      for(var i = 0, j = from.length; i < j; i++ )
          mapping[ from.charAt( i ) ] = to.charAt( i );

      return function(str) {
        var ret = [];

          for(var i = 0, j = str.length; i < j; i++) {
              var c = str.charAt(i);
              if(mapping.hasOwnProperty(str.charAt(i)))
                  ret.push(mapping[c]);
              else
                  ret.push(c);
          }
          return ret.join('');
      }

})();
})();