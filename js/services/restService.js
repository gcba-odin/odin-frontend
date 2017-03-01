angular.module('store-factories')
.factory('rest', ['$resource', '$location', '$rootScope', 'ngProgressFactory', function($resource, $location, $rootScope, ngProgressFactory) {
    $rootScope.progressbar = ngProgressFactory.createInstance();
    return function($url) {
        $rootScope.progressbar.start();
        var token=$rootScope.globals.currentUser.token;
        //var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI5OWFmYzU3ZmRiYzA0YzZjYjJkZDRiYTU2OTBlNDM0NiJ9.Uo0I98Fu3BX8XlOgSnIvfeFx2Z_LdqM8WNT4hSMdDDM";
        $url = ($url == null) ? $rootScope.url + '/:type' : $url;
        return $resource($url, {type: ''}, {
            get: {
                url: $url + "?:params",
                method: 'GET',
                headers: {'Authorization': 'Bearer ' + token},
                transformResponse: function(data) {
                    $rootScope.progressbar.complete();
                    return angular.fromJson(data);
                },
                interceptor: {responseError: handError}
            },
            search: {
                url: $url + "/search?:params",
                method: 'GET',
                // headers: {'Authorization': 'JWT ' + token},
                transformResponse: function(data) {
                    $rootScope.progressbar.complete();
                    return angular.fromJson(data);
                },
                interceptor: {responseError: handError}
            },
            statistics: {
                url: $url + "/statistics?:params",
                method: 'GET',
                // headers: {'Authorization': 'Bearer ' + token},
                transformResponse: function(data) {
                    $rootScope.progressbar.complete();
                    return angular.fromJson(data);
                },
                interceptor: {responseError: handError}
            },
            count: {
                url: $url + "/count?:params",
                method: 'GET',
                headers: {'Authorization': 'Bearer ' + token},
                transformResponse: function(data) {
                    $rootScope.progressbar.complete();
                    return angular.fromJson(data);
                },
                interceptor: {responseError: handError}
            },
            image: {
                url: $url + "/:id/image",
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/xml'
                },
                transformResponse: function(data) {
                    $rootScope.progressbar.complete();
                    //console.log({svg: data});
                    return {svg: data};
                },
                interceptor: {responseError: handError}
            },
            contents: {
                url: $url + "/:id/contents?:params",
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                transformResponse: function(data) {
                    $rootScope.progressbar.complete();
                    return angular.fromJson(data);
                },
                interceptor: {
                    responseError: handError
                }
            },
            resources: {
                url: $url + "/:id/resources?:params",
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                transformResponse: function(data) {
                    $rootScope.progressbar.complete();
                    return angular.fromJson(data);
                },
                interceptor: {
                    responseError: handError
                }
            },
            getArray: {
                url: $url + "/:id/:asociate",
                method: 'GET',
                headers: {'Authorization': 'Bearer ' + token},
                transformResponse: function(data) {
                    $rootScope.progressbar.complete();
                    var json = JSON.parse(data);
                    return json.data;
                },
                isArray: true,
                interceptor: {responseError: handError}
            },
            findOne: {
                url: $url + "/:id?:params",
                method: 'GET',
                headers: {'Authorization': 'Bearer ' + token},
                transformResponse: function(data) {
                    if (data) {
                        $rootScope.progressbar.complete();
                        var json = JSON.parse(data)
                        return angular.fromJson(json.data);
                    } else {
                        $rootScope.progressbar.complete();
                    }
                },
                interceptor: {responseError: handError}
            },
            'save': {
                url: $url,
                method: 'POST',
                headers: {'Authorization': 'Bearer ' + token},
                interceptor: {responseError: handError},
                transformResponse: function(data) {
                    if (data) {
                        $rootScope.progressbar.complete();
                        return angular.fromJson(data);
                    } else {
                        $rootScope.progressbar.complete();
                    }
                }
            },
            'saveWithData': {
                url: $url,
                method: 'POST',
                headers: {'Authorization': 'Bearer ' + token, 'Content-Type': undefined},
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
            },
            'delete': {
                url: $url + "/:id",
                method: 'DELETE',
                headers: {'Authorization': 'Bearer ' + token},
                interceptor: {responseError: handError},
                transformResponse: function(data) {
                    $rootScope.progressbar.complete();
                    return angular.fromJson(data);
                }
            },
            'update': {
                url: $url + "/:id",
                method: 'PATCH',
                headers: {'Authorization': 'Bearer ' + token},
                interceptor: {responseError: handError},
                transformResponse: function(data) {
                    if (data) {

                        $rootScope.progressbar.complete();
                        return angular.fromJson(data);
                    } else {
                        $rootScope.progressbar.complete();
                    }
                }
            }
        });
    }


    function handError(e) {
        params = JSON.stringify(e.data) || " "
        if (!!e.data) {
            if (e.data.code == "E_VALIDATION") {
                params = validationErrors(e.data);
            }
        }
        $rootScope.progressbar.complete();

        //alert(" Route: <a target='_blank' href='"+e.config.url+"'>"+e.config.url+"</a> <br>"+params);
    }

    function validationErrors(data) {
        var data = data.data;
        var returntext = "";
        for (d in data) {
            for (r in data[d]) {
                returntext = "<b>SERVER VALIDATIONS: </b> <br><p>Rule: " + data[d][r].rule + " <br>Message:" + data[d][r].message + " </p>";
            }
        }

        return returntext
    }
}]);