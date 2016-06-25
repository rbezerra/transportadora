'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                controller: 'MasterCtrl',
                templateUrl: 'templates/dashboard.html',
                cache: false
            })
            .state('tables', {
                url: '/tables',
                templateUrl: 'templates/tables.html'
            })
            .state('clientes', {
                url: '/clientes',
                templateUrl: 'templates/clientes.html',
                controller: 'ClientesCtrl as clientes',
                cache: false

            })
            .state('cidades', {
                url: '/cidades',
                templateUrl: 'templates/cidades.html',
                controller: 'CidadesCtrl as cidades',
                cache: false

            })
            .state('fretes', {
                url: '/fretes',
                templateUrl: 'templates/fretes.html',
                controller: 'FretesCtrl as fretes',
                cache: false

            });
    }
]);