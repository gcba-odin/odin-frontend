(function() {
    var app = angular.module('store-directives', []);


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



    app.directive("tagDataset", function() {
        return {
            restrict: "E",
            templateUrl: "/directives/home/tags-datasets.html",
            controller: function($scope) {

                var items = [{
                    url: "#/dataset/zonas-recoleccion-residuos-solidos-secos",
                    name: "Higiene y Seguridad",
                }, {
                    url: "#/dataset/zonas-recoleccion-residuos-solidos-secos",
                    name: "Visitas a la web del GCBA",
                }]

                this.items = items;



            },
            controllerAs: "datasets"
        };
    });

})();