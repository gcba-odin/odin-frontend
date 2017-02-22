function DatasetLatestController($scope, $location, rest, $rootScope, $sce, usSpinnerService) {
    usSpinnerService.spin('spinner');
    $rootScope.countQuery ++;
    // Flash.clear();
    $scope.modelName = "Dataset";
    $scope.type = "datasets";

    $scope.latestDataset = rest().get({
        type: $scope.type,
        params: "orderBy=updatedAt&sort=DESC&limit=4",
    }, function(result) {
        result.data.forEach(function(dataset) {
            $rootScope.countQuery ++;
            dataset.fileTypes = [];
            dataset.fileTypesNames = [];
            $scope.filesResults = rest().get({
                type: 'files',
                params: 'include=tags&dataset=' + dataset.id
            }, function(result) {
                $scope.files = result.data;
                $scope.files.forEach(function(element) {
                    //console.log(element.type);
                    if (dataset.fileTypes.indexOf(element.type.id) === -1) {
                        dataset.fileTypes.push(element.type.id);
                    }
//                    if(!!element.type && element.type.id) {
//                        $rootScope.countQuery ++;
//                        rest().findOne({
//                            id: element.type.id,
//                            type: 'filetypes'
//                        }, function(resultFileType) {
//                            if (dataset.fileTypesNames.indexOf(resultFileType.name) === -1) {
//                                dataset.fileTypesNames.push(resultFileType.name);
//                                dataset.fileTypes.push(resultFileType);
//                            }
//                            $rootScope.countQuery --;
//                            if($rootScope.countQuery == 0) { usSpinnerService.stop('spinner'); }
//                        }, function(error) {
//                            $rootScope.countQuery --;
//                            if($rootScope.countQuery == 0) { usSpinnerService.stop('spinner'); }
//                        });
//                    }
                });
                $rootScope.countQuery --;
                if($rootScope.countQuery == 0) { usSpinnerService.stop('spinner'); }
            }, function(error) {
                $rootScope.countQuery --;
                if($rootScope.countQuery == 0) { usSpinnerService.stop('spinner'); }
            });
        });
        $rootScope.showLoadingLatest = false;
        $rootScope.countQuery --;
        if($rootScope.countQuery == 0) { usSpinnerService.stop('spinner'); }
    }, function(error) {
        $rootScope.showLoadingLatest = false;
        $rootScope.countQuery --;
        if($rootScope.countQuery == 0) { usSpinnerService.stop('spinner'); }
    });
   
    $scope.url = function(id) {
        return $rootScope.url + '/datasets/' + id + '/download'
    };
}
