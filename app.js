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
        'mailchimp',
        'ngMap',
        'ui.bootstrap',
        'angularUtils.directives.dirPagination',
        'stripe.checkout',
        'hc.marked',
        'slugifier',
        '720kb.socialshare',
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
                // .state('site.404', require('./components/templates/404/404-controller'))
                .state('site.home', require('./components/templates/home/home-controller'))
                // .state('site.about', require('./components/templates/about/about-controller'))
                // .state('site.calendar', require('./components/templates/calendar/calendar-controller'))
                // .state('site.careers', require('./components/templates/careers/careers-controller'))
                // .state('site.contact', require('./components/templates/contact/contact-controller'))
                // .state('site.news-home', require('./components/templates/news-home/news-home-controller'))
                // .state('site.news-detail', require('./components/templates/news-detail/news-detail-controller'))
                // .state('site.park-detail', require('./components/templates/park-detail/park-detail-controller'))
                // .state('site.perennial', require('./components/templates/perennial/perennial-controller'))
                // .state('site.plant-list-detail', require('./components/templates/plant-list-detail/plant-list-detail-controller'))
                // .state('site.park-angel-list', require('./components/templates/park-angel/park-angel-list-controller'))
                // .state('site.park-angel-detail', require('./components/templates/park-angel/park-angel-member-controller'))
                // .state('site.park-finder', require('./components/templates/park-finder/park-finder-controller'))
                // .state('site.park-bench', require('./components/templates/park-bench/park-bench-controller'))
                // .state('site.programs', require('./components/templates/programs/programs-controller'))
                // .state('site.renovation-detail', require('./components/templates/renovation-detail/renovation-detail-controller'))
                // .state('site.volunteer', require('./components/templates/volunteer/volunteer-controller'))
                // .state('site.conservancy', require('./components/templates/conservancy/conservancy-controller'))
                // .state('site.donate', require('./components/templates/donate/donate-controller'))
                // .state('site.board-list', require('./components/templates/board/board-list-controller'))
                // .state('site.staff-list', require('./components/templates/staff/staff-list-controller'))
                // .state('site.staff-member', require('./components/templates/staff/staff-member-controller'))
                // .state('site.board-member', require('./components/templates/board/board-member-controller'))
                // .state('site.privacy-policy', require('./components/templates/privacy-policy/privacy-policy-controller'));
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false,
            });
        },
    ])
    .directive('navFooter', require('./components/directives/footer.js'))
    .directive('navHeader', require('./components/directives/header.js'))
    // .directive('volunteerbtn', require('./components/directives/volunteer-btn.js'))
    // .directive('dynamicscroll', require('./components/dynamicScroll.js'))
    // .factory('emailSvc', ['$http', require('./factories/email')])
    // .filter('nameDescriptionFilter', require('./filters/nameDescription.js'))
    // .filter('eventFilter', require('./filters/event.js'))
    // .filter('locationFilter', require('./filters/location.js'))
    // .filter('parkFinderLocationFilter', require('./filters/locationFinder.js'))
    // .filter('dayFilter', require('./filters/day.js'))
    // .filter('amenityBasketballCourtFilter', require('./filters/amenityBasketballCourt.js'))
    // .filter('amenityCommunityCenterFilter', require('./filters/amenityCommunityCenter.js'))
    // .filter('amenityDogParkFilter', require('./filters/amenityDogPark.js'))
    // .filter('amenityPlaygroundFilter', require('./filters/amenityPlayground.js'))
    // .filter('amenityPoolFilter', require('./filters/amenityPool.js'))
    // .filter('amenityRecFilter', require('./filters/amenityRec.js'))
    // .filter('amenityTennisFilter', require('./filters/amenityTennis.js'))
    // .filter('amenityWalkRunFilter', require('./filters/amenityWalkRun.js'))
    // .filter('amenityWifiFilter', require('./filters/amenityWifi.js'))
    // .filter('conservancyFilter', require('./filters/conservancy.js'))
