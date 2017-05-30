module.exports = {
	url: '/about',
	template: require('raw!templates/about/about-view.html'),
	controller: AboutController,
	controllerAs: 'aboutCtrl'
}

function AboutController($scope, $state, store, contentful, $window) {
	var vm = this;

	$window.scrollTo(0, 0);

	contentful.entries('content_type=aboutPage').then(function(res) {
		vm.contentfulData = res.data.items[0];
		if (vm.contentfulData.fields.pageTitleSeo) {
			document.title = vm.contentfulData.fields.pageTitleSeo;
		}
		if (vm.contentfulData.fields.pageSpecificMetaDescriptionSeo) {
			var meta = document.getElementsByTagName("meta");
			for (var i = 0; i < meta.length; i++) {
				if (meta[i].name.toLowerCase() === "description") {
					meta[i].content = vm.contentfulData.fields.pageSpecificMetaDescriptionSeo;
				}
			}
		}
	});
}
