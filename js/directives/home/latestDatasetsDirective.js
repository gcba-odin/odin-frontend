angular.module('odin')
.directive("latestDatasets", function() {
    return {
        restrict: "E",
        templateUrl: "directives/home/datasets-latest.html",
        controller:DatasetLatestController,
        /*controller: function($scope, datasetF) {
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
        },*/
        controllerAs: "datasets"
    };
});
