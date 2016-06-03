(function() {
    var app = angular.module('odin.filters', []);
	app.filter('removeSpaces', [function() {
	    return function(string) {
	        if (!angular.isString(string)) {
	            return string;
	        }
	        return string.replace(/[\s]/g, '_').toLowerCase();
	    };
	}])


});