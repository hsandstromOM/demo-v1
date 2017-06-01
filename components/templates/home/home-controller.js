module.exports = {
	url: '/',
	template: require('raw!templates/home/home-view.html'),
	controller: HomeController,
	controllerAs: 'homeCtrl',
};

// @ngInject
function HomeController($scope, $state, store, $window, contentful) {
	var vm = this;
  $window.scrollTo(0, 0);

	contentful.entries('content_type=homePage').then(function(res) {
		console.log(res);
		$scope.home = res.data.items[0];
	});
	contentful.entries('content_type=homePage').then(function(res) {
		var seoData = res.data.items[0];
		if (seoData.fields.seoTitle) {
			document.title = seoData.fields.seoTitle;
		}
		if (seoData.fields.seoDescription) {
			var meta = document.getElementsByTagName("meta");
			for (var i = 0; i < meta.length; i++) {
				if (meta[i].name.toLowerCase() === "description") {
					meta[i].content = seoData.fields.seoDescription;
				}
			}
		}
		if (seoData.fields.seoKeywords) {
			var meta = document.getElementsByTagName("meta");
			for (var i = 0; i < meta.length; i++) {
				if (meta[i].name.toLowerCase() === "keywords") {
					meta[i].content = seoData.fields.seoKeywords;
				}
			}
		}
	});
	vm.allProducts = [];
	vm.detailHref = 'product';

	contentful.entries('content_type=products').then(function(res) {
		console.log(res);
		var entries = res.data
		entries.items.forEach(function(entry) {
				vm.allProducts.push(entry)
		});
	});
}
