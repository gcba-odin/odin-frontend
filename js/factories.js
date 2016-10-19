var app = angular.module('store-factories', []);

app.factory('configs', function(rest) {
        return {
            findKey: function(scope, callback) {
                var configs = rest().get({
                    type: 'configs',
                    params: 'key=' + scope.config_key
                }, function(){
                    callback(configs);
                });

                //return configs;
            },
            statuses: function(scope) {
                var configs = rest().get({
                    type: 'configs'
                }, function() {
                    scope.statuses = {
                        default: '',
                        published: '',
                        unpublished: ''
                    };
                    angular.forEach(configs.data, function(element) {
                        if (element.key == 'defaultStatus') {
                            scope.statuses.default = element.value;
                        } else if (element.key == 'publishedStatus') {
                            scope.statuses.published = element.value;
                        } else if (element.key == 'unpublishedStatus') {
                            scope.statuses.unpublished = element.value;
                        }
                    });
                });
            },
        }
    });
