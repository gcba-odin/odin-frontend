var app = angular.module( 'odin.datasetControllers', [] );

app.factory('model', function($resource) {
    return $resource();
});

function DatasetLatestController($scope, $location, rest, $rootScope, $sce) {
    // Flash.clear();
    $scope.modelName = "Dataset";
    $scope.type = "datasets";

    $scope.latestDataset = rest().get({
        type: $scope.type,
        params: "orderBy=updatedAt&sort=DESC&limit=4&include=tags"
    });

    $scope.url = function ( id )
    {
        return $rootScope.url + '/datasets/' + id + '/download'
    };
}

function DatasetStarredController($scope, $location, rest, $rootScope, $sce) {
    // Flash.clear();
    $scope.modelName = "Dataset";
    $scope.type = "datasets";

    $scope.starredDataset = rest().get({
        type: $scope.type,
        params: "orderBy=updatedAt&sort=DESC&limit=4&starred=true&include=tags"
    });

    $scope.url = function ( id )
    {
        return $rootScope.url + '/datasets/' + id + '/download'
    };
}

function DatasetPopularController($scope, $location, rest, $rootScope, $sce) {
    // Flash.clear();
    $scope.modelName = "Category";
    $scope.type = "categories";
    $scope.showCategories = true;
    $scope.categories = rest().get({
        type: $scope.type,
        params: "orderBy=createdAt&sort=DESC"
    }, function() {
        $scope.showCategories = false;
    });
}

function SocialNetworkController($scope, $location, rest, $rootScope, $sce) {
    // Flash.clear();
    $scope.modelName = "Category";
    $scope.type = "categories";
    $scope.showCategories = true;
    $scope.categories = rest().get({
        type: $scope.type,
        params: "orderBy=createdAt&sort=DESC"
    }, function() {
        $scope.showCategories = false;
    });
}

function DatasetController($scope, $location, rest, $rootScope, $sce, $routeParams) {
    $scope.type = "datasets";

    $scope.info = rest().findOne({
        id: $routeParams.id,
        type: $scope.type,
        params: "include=tags,files,categories"
    }, function() {
        $rootScope.header = $scope.info.name;

        var tags = [];

        for (var i = 0; i < $scope.info.tags.length; i++) {
            tags.push({
                name: $scope.info.tags[i].name,
                url: $scope.info.tags[i].id,
                selected: false
            })
        }

        $scope.tags = tags;
    });


    $scope.getHtml = function(html) {
        return $sce.trustAsHtml(html);
    };
}

function DatasetListController($scope, $location, rest, $rootScope, $sce, $routeParams) {
    //Flash.clear();
    $scope.modelName = "Dataset";
    $scope.type = "datasets";
    $rootScope.header = "Datasets List";

    $scope.sorting = "ASC";
    $scope.term = $routeParams.q;

    var query = "";

    if (!!$routeParams.q) {
        query += '&where={"name":{"contains":"' + $routeParams.q + '"}}';
    }

    $scope.tagsSelected = [];
    $scope.organizationsSelected = [];
    $scope.formatsSelected = [];
    $scope.statusSelected = [];
    $scope.datasets = [];

    $scope.limitResults = 0;
    $scope.resultDatasetsSearch = [];
    $scope.showLoading = true;

    $scope.loadResults = function(limit) {
        $scope.showLoading = true;
        if (limit) {
            $scope.limitResults += limit;
        } else {
            $scope.limitResults = 0;
            $scope.datasets = [];
        }
        $scope.resultDatasetsSearch = rest().get({
            type: $scope.type,
            params: "sort=" + $scope.sorting + "&include=files,tags,categories&limit=20&skip=" + $scope.limitResults + query
        }, function(result) {
            for (var i = 0; i < $scope.resultDatasetsSearch.data.length; i++) {
                $scope.datasets.push($scope.resultDatasetsSearch.data[i])
            }
            $scope.showLoading = false;
            $scope.count = result.meta.count;
        });
    }

    var findInArray = function(id, modelSelected) {
        var returnArray = false;
        for (var i = 0; i < modelSelected.length; i++) {
            if (modelSelected[i].id == id) {
                returnArray = i + 1;
            }
        }
        return returnArray;
    }

    $scope.addFilterSearch = function(id, name, model, index, modelSelected) {
        var finArrayIndex = findInArray(id, modelSelected);
        if (!finArrayIndex) {
            modelSelected.push({
                id: id,
                name: name,
                model: model
            });
            model.selected = true;
        } else {
            modelSelected.splice(finArrayIndex - 1, 1);
            model.selected = false;
        }
    }
    $scope.deleteFilterSelected = function(index, elementFilter, modelSelected) {
        elementFilter.selected = false;
        console.log(index);
        console.log(modelSelected)
        modelSelected.splice(index, 1);
    }
    $scope.view = function(model) {
        var url = '/' + $scope.type + '/' + model.id + "/view";
        $location.path(url);
    }
    $scope.getHtml = function(html) {
        return $sce.trustAsHtml(html);
    };
    $scope.search = function() {
        $location.url('/datasets?q=' + $scope.term);
    }

    $scope.loadResults(0);
}