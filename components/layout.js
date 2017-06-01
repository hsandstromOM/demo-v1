module.exports = {
	url: '',
	template: require('raw!templates/layout.html'),
	controller: SiteController,
	abstract: true
}

function SiteController($scope, $rootScope, $state, contentful) {

	var stateName = $state.current.name.split('.');
	$rootScope.currentPage = stateName.length > 1 ? stateName[1] : 'splash';

	$rootScope.$on('$stateChangeSuccess', function(e, newState, oldState) {
		var stateName = newState.name.split('.');
		$rootScope.currentPage = stateName.length > 1 ? stateName[1] : 'splash';
	});
}
