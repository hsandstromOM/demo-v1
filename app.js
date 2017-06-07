const ee = require('./services');
const moment = window.moment;
const underscore = window.underscore;
angular.module('app', [
        'ngResource',
        'ngSanitize',
        'ui.router',
        'angular-storage',
        'angular-jwt',
        'angucomplete-alt',
        'contentful',
        'ui.bootstrap',
        'angularUtils.directives.dirPagination',
        'hc.marked',
        'slugifier',
        '720kb.socialshare'
    ])
    .constant('ee', ee)
    .constant('moment', moment)
    .constant('underscore', underscore)
    .config(['$urlRouterProvider', '$stateProvider', 'contentfulProvider', '$locationProvider', '$compileProvider',
        function($urlRouterProvider, $stateProvider, contentfulProvider, $locationProvider, $compileProvider) {
            // Performance improvement/cleaner markup
            // https://medium.com/swlh/improving-angular-performance-with-1-line-of-code-a1fb814a6476
            $compileProvider.debugInfoEnabled(false);
            // Contentful configs
            contentfulProvider.setOptions({
                space: 'b93rrsa5anm6',
                accessToken: '9cac4721c786eeb0f90a61b46d3a0a4d6d32635552a087b9e50b38d2fcfa5b00',
            });
            $urlRouterProvider.otherwise('/*');
            $stateProvider
                .state('site', require('./components/layout'))
                .state('site.404', require('./components/templates/404/404-controller'))
                .state('site.home', require('./components/templates/home/home-controller'))
                // .state('site.about', require('./components/templates/about/about-controller'))
                .state('site.contact', require('./components/templates/contact/contact-controller'))
                // .state('site.services', require('./components/templates/services/services-controller'))
                // .state('site.board-list', require('./components/templates/board/board-list-controller'))
                // .state('site.board-member', require('./components/templates/board/board-member-controller'))
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false,
            });
        },
    ])
    .directive('navFooter', require('./components/directives/footer.js'))
    .directive('navHeader', require('./components/directives/header.js'))
