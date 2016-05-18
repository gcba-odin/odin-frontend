(function() {
    var app = angular.module('store-controllers', []);

    function controllerHome($scope, datasetF) {


    }

    function controllerDataset($scope, datasetF, $routeParams) {
        console.log($routeParams);

        var datasetRest = {
            name: "Zonas recolección residuos sólidos secos",
            description: "Zonas asignadas a cada cooperativa de recuperadores urbanos para recolectar los residuos sólidos secos.",
            organization: "Dg De Reciclado",
            followers: 100,
            groups: [],
            category: "category",
            activity: [],
            social: [{
                twitter: "urltwitter"
            }, {
                facebook: "urlfacebook"
            }, {
                gplus: "urlgmail"
            }, ],
            licence: [{
                name: "Creative Commons Attribution"
            }, {
                facebook: "urlfacebook"
            }, {
                url: "http://opendefinition.org/okd/"
            }],
            resources: [{
                name: "Zonas recolección residuos sólidos secos",
                description: "Zonas asignadas a cada cooperativa de recuperadores urbanos para recolectar...",
                explore: [{
                    type: "preview",
                    url: "url de preview"
                }, {
                    type: "download",
                    url: "url de download"
                }]

            }, {
                name: "Zonas recolección residuos sólidos secos dos",
                description: "Zonas asignadas a cada cooperativa de recuperadores urbanos para recolectar...",
                explore: [{
                    type: "info",
                    url: "url de info"
                }, {
                    type: "goto",
                    url: "url de recurso"
                }]

            }],
            tags: [{
                    name: "Higiene y Seguridad",
                    url: "#/dataset?tags=Higiene+y+Seguridad"
                }, {
                    name: "Zona",
                    url: "#/dataset?tags=Zona"
                }, {
                    name: "Barrios",
                    url: "#/dataset?tags=Barrios"
                }

            ],
            aditionalInformation: [{
                autor: "Ministerio de Ambiente y Espacio Público - DG de Reciclado"
            }, {
                maintainer: "Ministerio de Modernización - Agencia de Sistemas de Información - Unidad de Sistemas de Información Geográfica"
            }, {
                lastUpdate: "6 de Mayo de 2016, 4:23 (UTC-02:00)"
            }, {
                created: "23 de Febrero de 2016, 17:01 (UTC-02:00)"
            }, {
                frecuency: "Eventual"
            }, ]
        }

        datasetF.getDataset(datasetRest);

        console.log(datasetF.getSocial());

    }

})();