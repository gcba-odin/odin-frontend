angular.module('odin')

.controller('controllerHome', controllerHome);

function controllerHome($scope, $location, $sce, $filter, $rootScope, rest, DatasetListService, usSpinnerService) {
    sessionStorage.removeItem('query');
    sessionStorage.removeItem('activeCategory');

    localStorage.removeItem('currentCategory');

    $rootScope.header = "Odin";
    $rootScope.isDatasetView = false;
    $rootScope.isHome = true;
    $rootScope.showLoadingLatest = true;
    $rootScope.showLoadingStarred = true;

    if(!!sessionStorage.getItem('countDatasets')) {
      $rootScope.countDatasets = sessionStorage.getItem('countDatasets');
    } else {
      DatasetListService.getDatasetsCount($scope.params, function (result) {
          $rootScope.countDatasets = result.data.count;
          sessionStorage.setItem('countDatasets', result.data.count);
      });
    }

    $scope.getHtml = function (html) {
        return $sce.trustAsHtml(html);
    };

    $scope.goToUrl = function (url) {
        $filter('slug')(this.item.name);
        window.location = "/dataset/" + $filter('slug')(this.item.id);
    };
}

function arrangeCategories(){
    var container = $('#categoriesgrid-container').width();
    if (container > 0) {

      var items = $('.arrange-item');
      var cant = items.length;

      // Obtains max categs that fit the container
      var max = Math.trunc(container/items.outerWidth(true));

      var limit = Math.trunc(max/2);
      // Only if max < categ quantity => rearrange
      if (cant>max) {
        debugger;
        var combinations = [];
        // 1) Obtains all the combinations
        for (var i = max; i >= limit; i--) {
          var remainder;
          var combination = [];
          var first = true;
          do {
            if (first) {
              remainder = cant - i;
              first=false;
            } else {
              remainder = remainder - i;
            }
              combination.push(i)
            if (remainder > 0 && remainder < i) {
                combination.push(remainder)
            }
          } while (remainder != 0 && remainder >= i);

          // 2) Save the combination if last item != 1
          if (combination[combination.length-1]!=1) {
            combinations.push(combination);
          }
        }

        var remainderIndex=[];

        // 3) Calculate remainder and save remainder/index
        for (var i = 0; i < combinations.length; i++) {
          combinations[i].reverse(); // magic
          debugger;
          var total;
          for (var x = 0; x < combinations[i].length; x++) {
            if (x == 0) {
              total = combinations[i][0];
            } else {
              total -= combinations[i][x];
            }
          }
          var result = [];
          result.push(total);        // Save Remainder
          result.push(i);            // Save Index
          remainderIndex.push(result)   // Save Combination
        }

        // 4) Take highest positive value and index
        var max, maxAcum, index;
        max = remainderIndex[0][0];
        index = remainderIndex[0][1];
        for (var i = 1; i < remainderIndex.length; i++) {
          if (remainderIndex[i][0] == 0 || remainderIndex[i][0] > max ) {
            max = remainderIndex[i][0];
            index = i;
          }
        }

        // 5) Arrange categories
        var selected = combinations[index].reverse()
        var item;
        var index=[];
        var $blocker = $('<div />');
        var $lineBreak = $('<br/>')

        for (var i = 0; i < selected.length-1; i++) {
          var indexItem =(selected[i]);
          if (item === undefined) {
            item = indexItem - 1;
            $blocker.appendTo(items[item].parentElement)
          } else {
            item = item + indexItem;
          }

          index.push(items[item]);
          $lineBreak.appendTo(items[item].parentElement)

        }
      }
    }
}
