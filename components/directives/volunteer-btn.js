module.exports = function() {
    return {
        restrict: 'EA',
        replace: true,
        template: require('raw!templates/partials/volunteer-btn.html'),
        controller: controller
    }
}

function controller($scope) {

}
