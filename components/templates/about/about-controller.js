module.exports = {
	url: '/about',
	template: require('raw!templates/about/about-view.html'),
	controller: AboutController,
	controllerAs: 'aboutCtrl'
}

function AboutController(contentful, $window) {
	var vm = this;

	$window.scrollTo(0, 0);

	contentful.entries('content_type=aboutUs').then(function(res) {
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
	// Set margin bottom for navShortView
	window.addEventListener('scroll', setMargin);
	setMargin();

	function setMargin() {
		var navShortView = document.getElementsByClassName("navShortView")[0].clientHeight + 50;
		var pageId = document.getElementById("aboutPage");
		if (navShortView && pageId) pageId.setAttribute("style", "padding-bottom:" + navShortView + "px;");
	};
}
