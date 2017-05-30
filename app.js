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
        'stripe.checkout',
        'hc.marked',
        'slugifier',
        '720kb.socialshare'
    ])
    .constant('ee', ee)
    .constant('moment', moment)
    .constant('underscore', underscore)
    .config(['$urlRouterProvider', '$stateProvider', 'contentfulProvider', 'StripeCheckoutProvider', '$locationProvider', '$compileProvider',
        function($urlRouterProvider, $stateProvider, contentfulProvider, StripeCheckoutProvider, $locationProvider, $compileProvider) {
            // Performance improvement/cleaner markup
            // https://medium.com/swlh/improving-angular-performance-with-1-line-of-code-a1fb814a6476
            $compileProvider.debugInfoEnabled(false);
            // Stripe confits
            StripeCheckoutProvider.defaults({
                key: 'pk_live_t4DRLFoNpmoWASIiR1ljn7Qs', //STRIPE KEY
            });
            // Contentful configs
            contentfulProvider.setOptions({
                space: 't2wg3bafv0z8',
                accessToken: '4ea268c4881b7dd9851ab42d784589b65ad86b5c60c82582972a57504b5f8e0d',
            });
            $urlRouterProvider.otherwise('/*');
            $stateProvider
                .state('site', require('./components/layout'))
                .state('site.home', require('./components/templates/home/home-controller'))
                .state('site.about', require('./components/templates/about/about-controller'))
                .state('site.contact', require('./components/templates/contact/contact-controller'))
                .state('site.services', require('./components/templates/services/services-controller'))
                .state('site.board-list', require('./components/templates/board/board-list-controller'))
                .state('site.board-member', require('./components/templates/board/board-member-controller'))
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false,
            });
        },
    ])
    .directive('navFooter', require('./components/directives/footer.js'))
    .directive('navHeader', require('./components/directives/header.js'))
