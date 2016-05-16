(function() {
    var app = angular.module('store-factories', []);
    app.factory("datasetF", function($http) {


   var obj = {content:null};

    $http.get('dataset.json').success(function(data) {
        // you can do some processing here
        obj.content = data;
    });    
	console.log();
  //  return obj;  



        var datasetRest = {
            name: "",
            description: "",
            organization: "",
            followers: [],
            groups: [],
            activity: [],
            social: [],
            licence: [],
            resources: [],
            tags: [],
            aditionalInformation: []
        }


        var service = {
            res: [],
            initialDataset: function() {
                service.res = datasetRest
            },
            setDataset: function(dataset) {
                service.res = dataset;
            },
            getSocial: function() {
                if (!!service.res.social) {
                    return service.res.social;
                } else {
                    return false
                }
            },
            getLicence: function() {
                if (!!service.res.licence) {
                    return service.res.licence;
                } else {
                    return false
                }
            },
            getResources: function() {
                if (service.res.resources.length) {
                    return service.res.resources;
                } else {
                    return false
                }
            },
            getTags: function() {
                if (!!service.res.tags) {
                    return service.res.tags;
                } else {
                    return false
                }
            },
            getAditionalInformation: function() {
                if (!!service.res.aditionalInformation) {
                    return service.res.aditionalInformation;
                } else {
                    return false
                }
            }

        }
        return service;
    })


})();