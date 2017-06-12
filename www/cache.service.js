angular
    .module('app')
    .factory('CacheService', CacheService);

function CacheService($cacheFactory) {
    return $cacheFactory('AppCache');
}
