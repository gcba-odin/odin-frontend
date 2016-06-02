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


    app.factory("datasetsF", function($http,$rootScope) {

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

   app.factory("categoriesF", function($http,$rootScope) {

        var datasetRest = {}

        var service = {
            res: [],
            getDataset:function (success,error){   
                var categories = $http.get('datasets.json');
                if(success)
                   categories.success(success);
                if(error)
                   categories.error(error);
            }

        }
        return service;
    })



   app.factory('rest', ['$resource', '$location','$rootScope','ngProgressFactory', function($resource, $location,$rootScope,ngProgressFactory) {
        $rootScope.progressbar = ngProgressFactory.createInstance();
       return function($url) {
            $rootScope.progressbar.start();
           // var token=$rootScope.globals.currentUser.token;
            var token="token";
            $url = ($url == null) ? $rootScope.url+'/:type' : $url;
            return $resource($url, {type: ''}, {
                update: { method:'PUT' },
                get : {
                    url: $url+"?:params",
                    method: 'GET',
                    headers: { 'Authorization': 'JWT '+token},
                    transformResponse:function (data){
                        $rootScope.progressbar.complete();
                        return angular.fromJson(data);
                    },
                    interceptor: {responseError: handError}
                },
                getArray : {
                    url: $url+"/:id/:asociate",
                    method: 'GET',
                    headers: { 'Authorization': 'JWT '+token},
                    transformResponse:function (data){
                        $rootScope.progressbar.complete();
                        var json= JSON.parse(data);
                        return json.data;
                    },
                    isArray: true,
                    interceptor: {responseError: handError}
                },
                findOne : {
                    url: $url+"/:id?:params",
                    method: 'GET',
                    headers: { 'Authorization': 'JWT '+token},
                    transformResponse:function (data){
                        if(data){
                            $rootScope.progressbar.complete();
                            var json= JSON.parse(data)
                            return angular.fromJson(json.data);
                        }else{
                            $rootScope.progressbar.complete();
                        }
                    },
                    interceptor: {responseError: handError}
                }, 
                'save': {  
                      url: $url,
                      method: 'POST',
                      headers: { 'Authorization': 'JWT '+token },
                      interceptor: {responseError: handError},
                      transformResponse:function (data){
                            if(data){
                                    $rootScope.progressbar.complete();
                                    return angular.fromJson(data);
                            }else{
                                $rootScope.progressbar.complete();
                            }
                        }
                    }, 
                'saveWithData': {  
                      url: $url,
                      method: 'POST',
                      headers: { 'Authorization': 'JWT '+token ,'Content-Type':undefined},
                      transformRequest: function(data, headersGetter) {
                        // Here we set the Content-Type header to null.
                        var headers = headersGetter();
                        headers['Content-Type'] = undefined;

                        // And here begins the logic which could be used somewhere else
                        // as noted above.
                        if (data == undefined) {
                          return data;
                        }

                        var fd = new FormData();

                        var createKey = function(_keys_, currentKey) {
                          var keys = angular.copy(_keys_);
                          keys.push(currentKey);
                          formKey = keys.shift()

                          if (keys.length) {
                            formKey += "[" + keys.join("][") + "]"
                          }

                          return formKey;
                        }

                        var addToFd = function(object, keys) {
                          angular.forEach(object, function(value, key) {
                            var formKey = createKey(keys, key);

                            if (value instanceof File) {
                              fd.append(formKey, value);
                            } else if (value instanceof FileList) {
                              if (value.length == 1) {
                                fd.append(formKey, value[0]);
                              } else {
                                angular.forEach(value, function(file, index) {
                                  fd.append(formKey + '[' + index + ']', file);
                                });
                              }
                            } else if (value && (typeof value == 'object' || typeof value == 'array')) {
                              var _keys = angular.copy(keys);
                              _keys.push(key)
                              addToFd(value, _keys);
                            } else {
                              fd.append(formKey, value);
                            }
                          });
                        }

                        addToFd(data, []);

                        return fd;
                      },
                      interceptor: {responseError: handError},
                      transformResponse:function (data){
                          console.log(data);
                        }
                    }, 
                'delete': {  
                      url: $url+"/:id",
                      method: 'DELETE',
                      headers: { 'Authorization': 'JWT '+token },
                      interceptor: {responseError: handError},
                      transformResponse:function (data){
                        $rootScope.progressbar.complete();
                        return angular.fromJson(data);
                        }
                    }, 
                'update': {  
                      url: $url+"/:id",
                      method: 'PATCH',
                      headers: { 'Authorization': 'JWT '+token },
                      interceptor: {responseError: handError},
                      transformResponse:function (data){
                            if(data){

                                    $rootScope.progressbar.complete();
                                    return angular.fromJson(data);
                            }else{
                                $rootScope.progressbar.complete();
                            }
                        }
                    }
            });
        } 


        function handError(e){
            params=JSON.stringify(e.data) || " "
            if(!!e.data){
                if(e.data.code=="E_VALIDATION"){
                    params=validationErrors(e.data);
                }
            }
                                    $rootScope.progressbar.complete();

           //alert(" Route: <a target='_blank' href='"+e.config.url+"'>"+e.config.url+"</a> <br>"+params);
        }

        function validationErrors(data){
            var data=data.data;
            var returntext="";
            for (d in data){
                    console.log(data[d]);

                for (r in data[d]){
                    returntext="<b>SERVER VALIDATIONS: </b> <br><p>Rule: "+data[d][r].rule+" <br>Message:"+data[d][r].message+" </p>";
                }
            }

            return returntext
        }
    }]);
})();



