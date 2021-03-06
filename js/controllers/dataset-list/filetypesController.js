angular.module('odin.controllers')
.controller('FiletypesController', FiletypesController);

function FiletypesController($filter, $routeParams, $rootScope, $scope, rest, LocationSearchService, DatasetListService) {
    var filterName = 'files.type';
    var formatsAutocomplete;

    $scope.custom_defaults = $rootScope.custom_defaults;

    var filetypes_cache = JSON.parse(sessionStorage.getItem('filetypes'));

    if(LocationSearchService.isSet(filterName) == 0) {
        sessionStorage.removeItem('selectedFormats');
        sessionStorage.removeItem('formatsAutocomplete');
    }

    $scope.filetypes = [];
    $scope.resultFormats = [];
    $scope.lessThanLimit;
    $scope.fileTypesCount = {};


    $scope.formatNames = [];

    $scope.collapsed = true;
    $scope.toggleCollapse = function() {
        $scope.collapsed = !$scope.collapsed;
    };
    if(!!sessionStorage.getItem('selectedFormats')) {
        $scope.selectedFormats = JSON.parse(sessionStorage.getItem('selectedFormats'));
    } else {
        $scope.selectedFormats = [];
    }
//    if (!$.isArray($scope.selectedFormats)) {
//      $scope.selectedFormats = [];
//    }

    $scope.currentColor = sessionStorage.getItem('currentColor') || '';

    $scope.loadFormats = function() {
//        $scope.resultFormats = rest().get({
//            type: "filetypes",
//            params: "orderBy=name&sort=ASC&limit=1000"
//        }, function() {
            for (var i = 0; i < filetypes_cache.length; i++) {
                var filetype = filetypes_cache[i];
                filetype.active = LocationSearchService.isActive(filterName, filetype.id);
                //filetype.slug = filetype.slug;
                $scope.filetypes.push(filetype);
                // $scope.loadFileTypeCount(filetype.id);
                $scope.formatNames.push(filetype.name);
            }
            formatsAutocomplete = JSON.parse(sessionStorage.getItem('formatsAutocomplete'));
            if (formatsAutocomplete) {
              $scope.formatNames=formatsAutocomplete.sort();
            } else {
              formatsAutocomplete =  $scope.formatNames.sort();
            }
            if ($filter('filter')($scope.filetypes, {active: true})[0]!==undefined) {
              $scope.collapsed=false;
            }
//        });
        $scope.datasetCount = {};
    };

    //This won't scale. TODO: Change to /count
    // $scope.loadFileTypeCount = function(fileTypeId){
    //     $scope.fileTypesCount[fileTypeId] = 0;
    //     $scope.params = {
    //         condition: 'AND',
    //         include: ['files', 'tags', 'categories'].join(),
    //         'files.type': fileTypeId,
    //         'categories.slug': $routeParams['categories.slug']
    //     };
    //     DatasetListService.getDatasetsCount($scope.params, function(result) {
    //         $scope.fileTypesCount[fileTypeId] = result.data.count;
    //     });
    // };

    $scope.loadFormats(0);
    $scope.selectFiletype = function(filetype) {
        $rootScope.showFiltersMenu = false;
        $rootScope.showBackdrop = false;
        if(filetype.active) {
            filetype.active = false;
            $scope.selectedFormats.splice($scope.selectedFormats.indexOf(filetype.name),1);
            formatsAutocomplete.push(filetype.name);
            LocationSearchService.removeFilterValue(filterName, filetype.id);
        } else {
            filetype.active = true;
            $scope.selectedFormats.push(filetype);
            formatsAutocomplete.splice(formatsAutocomplete.indexOf(filetype.name),1);
            LocationSearchService.addFilterValue(filterName, filetype.id);
        }
        sessionStorage.setItem('formatsAutocomplete',JSON.stringify(formatsAutocomplete));
        sessionStorage.setItem('selectedFormats', JSON.stringify($scope.selectedFormats));
    };

    $scope.formatTypedSelected = function(formatSelected){
      formatSelected=$scope.filetypes.filter(function(format){
        return format.name == formatSelected;
      });
      $scope.selectFiletype(formatSelected[0]);
      $scope.formatNames.splice($scope.formatNames.indexOf(formatSelected[0].name),1);
    };

    $scope.removeAll = function() {
        LocationSearchService.deleteFilter(filterName);
    };

}
