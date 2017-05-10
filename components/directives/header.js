module.exports = function() {
    return {
        restrict: 'EA',
        replace: true,
        template: require('raw!templates/header.html'),
        controller: controller
    }
}

function controller($scope) {
    $scope.toggleDropdown = {
        show: false
    }
}
