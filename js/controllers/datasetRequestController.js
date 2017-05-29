angular.module('odin')

.controller('DatasetRequestController', DatasetRequestController);

function DatasetRequestController($scope, $rootScope, $timeout, vcRecaptchaService, Alertify, usSpinnerService, rest, $location) {
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

    $timeout(function(){
      usSpinnerService.spin('spinner');
      arrangeCategories();
      usSpinnerService.stop('spinner');
    });
}
;

function arrangeCategories(){
    var container = $('#categoriesgrid-container').width();
    debugger;
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
