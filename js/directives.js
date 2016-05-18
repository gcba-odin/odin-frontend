(function() {
    var app = angular.module('store-directives', []);

	app.filter('urlEncode', [function() {
  		return window.encodeURIComponent;
	}]);
	app.filter('capitalize', function() {
	    return function(input) {
	      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
	    }
	});


	app.filter('truncString', function() {
	    return function(input) {
		 var  add =  '...';
		 var  max=26;
		 var str=input;
		   return (typeof str === 'string' && str.length > max ? str.substring(0,max)+add : str);
	    }
	});



    app.directive("datasetsCategories", function() {
        return {
            restrict: "E",
            templateUrl: "/directives/home/datasets-categories.html",
            controller: function($scope, $route, $routeParams) {

                var items = [{
                    image: "/images/catalogo_completo.png",
                    name: "Catálogo completo de dataset"
                }, {
                    image: "/images/actividad_economica.png",
                    name: "Actividad económica"
                }, {
                    image: "/images/administracion.png",
                    name: "Administración pública y normativa"
                }, {
                    image: "/images/cultura_y_recreacion.png",
                    name: "Cultura y recreación"
                }, {
                    image: "/images/educacion.png",
                    name: "Educación"
                }, {
                    image: "/images/infraestructura.png",
                    name: "Infraestructura"
                }, {
                    image: "/images/transporte.png",
                    name: "Movilidad y transporte"
                }, {
                    image: "/images/urbanismo.png",
                    name: "Urbanísmo y territorio"
                }, {
                    image: "/images/medioambiente.png",
                    name: "Medio Ambiente"
                }, {
                    image: "/images/salud.png",
                    name: "Salud y servicios sociales"
                }, {
                    image: "/images/seguridad.png",
                    name: "Seguridad"
                }]

                this.items = items;


            },
            controllerAs: "category"
        };
    });




    app.directive("latestDatasets", function() {
        return {
            restrict: "E",
            templateUrl: "/directives/home/datasets-latest.html",
            controller: function($scope, datasetF) {
                var items = [{
                    url: "#/dataset/zonas-recoleccion-residuos-solidos-secos",
                    name: "Catálogo completo de dataset",
                    description: "Zonas asignadas a cada cooperativa de recuperadores urbanos para recolectar los residuos sólidos secos."
                }, {
                    url: "#/dataset/zonas-recoleccion-residuos-solidos-secos",
                    name: "Visitas a la web del GCBA",
                    description: "Información sobre el análisis del trafico de visitas de la web del Gobierno de la Ciudad de Buenos Aires. Visitantes, ubicación, páginas visitadas y búsquedas realizadas"
                }]

                this.items = items;
                this.goToUrl = function(url) {
                    window.location = url;
                };
            },
            controllerAs: "datasets"
        };
    });


    app.directive("popularDatasets", function() {
        return {
            restrict: "E",
            templateUrl: "/directives/home/popular-datasets.html",
            controller: function($scope) {

                var items = [{
                    url: "#/dataset/zonas-recoleccion-residuos-solidos-secos",
                    name: "Catálogo completo de dataset",
                    description: "Zonas asignadas a cada cooperativa de recuperadores urbanos para recolectar los residuos sólidos secos."
                }, {
                    url: "#/dataset/zonas-recoleccion-residuos-solidos-secos",
                    name: "Visitas a la web del GCBA",
                    description: "Información sobre el análisis del trafico de visitas de la web del Gobierno de la Ciudad de Buenos Aires. Visitantes, ubicación, páginas visitadas y búsquedas realizadas"
                }]

                this.items = items;

                this.goToUrl = function(url) {
                    window.location = url;
                };

            },
            controllerAs: "datasets"
        };
    });





    app.directive("resourcesDataset", function() {
        return {
            restrict: "E",
            templateUrl: "/directives/dataset/resources-datasets.html",
      
            controller: function($scope,datasetF) {
       		var data={};

	          $scope.$watch('loading', function (val) {
	          	if(val){
	          		data=datasetF.getResources();
	          		$scope.resources=data;

	          	}
	          });
            },
            controllerAs: "resources"
        };
    });


    app.directive("tagsDataset", function() {
        return {
            restrict: "E",
            templateUrl: "/directives/dataset/tags-datasets.html",
      
            controller: function($scope,datasetF) {
       		var data={};

	          $scope.$watch('loading', function (val) {
	          	if(val){
	          		data=datasetF.getTags();
	          		$scope.tags=data;
	          	}
	          });
            },
            controllerAs: "tags"
        };
    });

    app.directive("aditionalInfoDataset", function() {
        return {
            restrict: "E",
            templateUrl: "/directives/dataset/aditional-info-dataset.html",
      
            controller: function($scope,datasetF) {
       		var data={};

	          $scope.$watch('loading', function (val) {
	          	if(val){
	          		data=datasetF.getAditionalInformation();
	          		$scope.aditionalinfo=data;
	          	}
	          });
            },
            controllerAs: "aditionalinfo"
        };
    });

    app.directive("organizationsDataset", function() {
        return {
            restrict: "E",
            templateUrl: "/directives/dataset/organizations-dataset.html",
      
            controller: function($scope,datasetF) {
       		var data={};

	          $scope.$watch('loading', function (val) {
	          	if(val){
	          		data=datasetF.getOrganizations();
	          		$scope.organizations=data;
	          	}
	          });
            },
            controllerAs: "organizations"
        };
    });

        app.directive("socialsDataset", function() {
        return {
            restrict: "E",
            templateUrl: "/directives/dataset/socials-dataset.html",
      
            controller: function($scope,datasetF) {
       		var data={};

	          $scope.$watch('loading', function (val) {
	          	if(val){
	          		data=datasetF.getSocial();
	          		$scope.socials=data;
	          	}
	          });
            },
            controllerAs: "socials"
        };
    });


})();