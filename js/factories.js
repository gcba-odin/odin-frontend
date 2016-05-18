(function() {
    var app = angular.module('store-factories', []);
    app.factory("datasetF", function($http) {

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
            getDataset:function (success,error){   
				var dataset = $http.get('dataset.json');
		        if(success)
		           dataset.success(success);
		        if(error)
		           dataset.error(error);
            },
            showDataset:function (){
            	return service.res;
            },
            getSocial: function() {
                if (!!service.res.socials) {
                    return service.res.socials;
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
            getOrganizations: function() {
                if (!!service.res.organizations) {
                    return service.res.organizations;
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
            },
            getInfo:function (){
            	return {
            		slug:service.res.slug,
            		name:service.res.name,
            		description:service.res.description,
            		organizations:service.res.organizations,
            		category:service.res.category,
            		followers:service.res.followers,
            		licence:service.res.licence}

            }

        }
        return service;
    })


    app.factory("datasetsF", function($http) {

        var datasetRest = {}

        var service = {
            res: [],
            initialDataset: function() {
                service.res = datasetRest
            },
            setDataset: function(dataset) {
                service.res = dataset;
            },
            getDataset:function (success,error){   
				var dataset = $http.get('datasets.json');
		        if(success)
		           dataset.success(success);
		        if(error)
		           dataset.error(error);
            },

            showDatasets:function (){
            	return service.res.datasets;
            },
            getResources: function() {
                if (!!service.res.resources) {
                    return service.res.resources;
                } else {
                    return false
                }
            },
            countResults: function() {
                if (!!service.res) {
                    return service.res.length;
                } else {
                    return false
                }
            },
            getOrganizations: function() {
                if (!!service.res.organizations) {
                    return service.res.organizations;
                } else {
                    return false
                }
            },
            getGroups: function() {
                if (!!service.res.groups) {
                    return service.res.groups;
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
            getFormats: function() {
                if (!!service.res.formats) {
                    return service.res.formats;
                } else {
                    return false
                }
            },
            getLicences: function() {
                if (!!service.res.licences) {
                    return service.res.licences;
                } else {
                    return false
                }
            }

        }
        return service;
    })


})();