(function() {
    var app = angular.module('store-factories', []);

<<<<<<< HEAD
   app.factory('rest', ['$resource', '$location','$rootScope','ngProgressFactory', function($resource, $location,$rootScope,ngProgressFactory) {
        $rootScope.progressbar = ngProgressFactory.createInstance();
       return function($url) {
            $rootScope.progressbar.start();
           // var token=$rootScope.globals.currentUser.token;
            var token = "token";

            $url = ( $url == null ) ? $rootScope.url + '/:type' : $url;

            return $resource($url, {type: ''}, {
                get: {
                    url: $url + "?:params",
                    method: 'GET',
                    headers: { 'Authorization': 'JWT '+token},
                    transformResponse: function (data){
                        $rootScope.progressbar.complete();
                        return angular.fromJson(data);
                    },
                    interceptor: {responseError: handError}
                },
                count: {
                    url: $url + "/count",
                    method: 'GET',
                    headers: { 'Authorization': 'JWT ' + token},
                    transformResponse: function (data){
                        $rootScope.progressbar.complete();
                        return angular.fromJson(data);
                    },
                    interceptor: {responseError: handError}
                },
                getArray: {
                    url: $url + "/:id/:asociate",
                    method: 'GET',
                    headers: { 'Authorization': 'JWT ' + token},
                    transformResponse: function (data){
                        $rootScope.progressbar.complete();
                        var json= JSON.parse(data);
                        return json.data;
                    },
                    isArray: true,
                    interceptor: {responseError: handError}
                },
                findOne: {
                    url: $url + "/:id?:params",
                    method: 'GET',
                    headers: { 'Authorization': 'JWT ' + token},
                    transformResponse: function (data){
                        if(data){
=======
    app.factory('rest', ['$resource', '$location', '$rootScope', 'ngProgressFactory', function($resource, $location, $rootScope, ngProgressFactory) {
            $rootScope.progressbar = ngProgressFactory.createInstance();
            return function($url) {
                $rootScope.progressbar.start();
                // var token=$rootScope.globals.currentUser.token;
                var token = "token";
                $url = ($url == null) ? $rootScope.url + '/:type' : $url;
                return $resource($url, {type: ''}, {
                    update: {method: 'PUT'},
                    get: {
                        url: $url + "?:params",
                        method: 'GET',
                        headers: {'Authorization': 'JWT ' + token},
                        transformResponse: function(data) {
                            $rootScope.progressbar.complete();
                            return angular.fromJson(data);
                        },
                        interceptor: {responseError: handError}
                    },
                    count: {
                        url: $url + "/count",
                        method: 'GET',
                        headers: {'Authorization': 'JWT ' + token},
                        transformResponse: function(data) {
>>>>>>> 26652dc0b62f68e995e2149400fc56d377b3b011
                            $rootScope.progressbar.complete();
                            return angular.fromJson(data);
                        },
                        interceptor: {responseError: handError}
                    },
                    resources: {
                        url: $url + "/:id/resources?:params",
                        method: 'GET',
                        headers: {
                            'Authorization': 'JWT ' + token
                        },
                        transformResponse: function(data) {
                            $rootScope.progressbar.complete();
                            return angular.fromJson(data);
                        },
                        interceptor: {
                            responseError: handError
                        }
                    },
<<<<<<< HEAD
                    interceptor: {responseError: handError}
                },
                'save': {
                      url: $url,
                      method: 'POST',
                      headers: { 'Authorization': 'JWT ' + token },
                      interceptor: {responseError: handError},
                      transformResponse: function (data){
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
=======
                    getArray: {
                        url: $url + "/:id/:asociate",
                        method: 'GET',
                        headers: {'Authorization': 'JWT ' + token},
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
                        headers: {'Authorization': 'JWT ' + token},
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
                        headers: {'Authorization': 'JWT ' + token},
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
                        headers: {'Authorization': 'JWT ' + token, 'Content-Type': undefined},
                        transformRequest: function(data, headersGetter) {
                            // Here we set the Content-Type header to null.
                            var headers = headersGetter();
                            headers['Content-Type'] = undefined;

                            // And here begins the logic which could be used somewhere else
                            // as noted above.
                            if (data == undefined) {
                                return data;
                            }
>>>>>>> 26652dc0b62f68e995e2149400fc56d377b3b011

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

<<<<<<< HEAD
                        addToFd(data, []);

                        return fd;
                      },
                      interceptor: {responseError: handError},
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
=======
                            addToFd(data, []);

                            return fd;
                        },
                        interceptor: {responseError: handError},
                    },
                    'delete': {
                        url: $url + "/:id",
                        method: 'DELETE',
                        headers: {'Authorization': 'JWT ' + token},
                        interceptor: {responseError: handError},
                        transformResponse: function(data) {
                            $rootScope.progressbar.complete();
                            return angular.fromJson(data);
                        }
                    },
                    'update': {
                        url: $url + "/:id",
                        method: 'PATCH',
                        headers: {'Authorization': 'JWT ' + token},
                        interceptor: {responseError: handError},
                        transformResponse: function(data) {
                            if (data) {

                                $rootScope.progressbar.complete();
                                return angular.fromJson(data);
                            } else {
>>>>>>> 26652dc0b62f68e995e2149400fc56d377b3b011
                                $rootScope.progressbar.complete();
                            }
                        }
                    }
<<<<<<< HEAD
            });
        }
=======
                });
            }
>>>>>>> 26652dc0b62f68e995e2149400fc56d377b3b011


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
})();



