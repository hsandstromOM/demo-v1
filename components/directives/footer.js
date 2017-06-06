module.exports = function() {
    return {
        restrict: 'EA',
        replace: true,
        template: require('raw!templates/footer.html'),
        controller: controller
    }
}

function controller($scope, $state, store, $window, contentful) {
  var vm = this;

  // contentful.entries('content_type=footer').then(function(res) {
	// 	console.log(res);
	// 	$scope.footer = res.data.items[0];
	// });



}
