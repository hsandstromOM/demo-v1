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
	// contentful.entries('content_type=servicesPage').then(function(res) {
	// 	console.log(res);
	// 	$scope.services = res.data.items[0];
	// });

	vm.allProducts = [];
	vm.detailHref = 'product';

	contentful.entries('content_type=products').then(function(res) {
		console.log(res);
		var entries = res.data
		entries.items.forEach(function(entry) {
				vm.allProducts.push(entry)
		});
	});


	// vm.allMembers = [];
	//
	// contentful.entries('content_type=teamMember').then(function(res) {
	// 	console.log(res);
	// 	var entries = res.data
	// 	entries.items.forEach(function(entry) {
	// 			vm.allMembers.push(entry)
	// 	});
	// });
//
// 	var angle = 0;
// 	vm.galleryspin = function(sign) {
// 	spinner = document.querySelector("#spinner");
// 	if (!sign) { angle = angle + 45; } else { angle = angle - 45; }
// 	spinner.setAttribute("style","-webkit-transform: rotateY("+ angle +"deg); -moz-transform: rotateY("+ angle +"deg); transform: rotateY("+ angle +"deg);");
// 	}
// 	$("#AboutButton").click(function() {
//     $('html,body').animate({
//         scrollTop: $(".about-page").offset().top},
//         'slow');
// });
//   $("#PortfolioButton").click(function() {
//     $('html,body').animate({
//         scrollTop: $(".portfolio").offset().top},
//         'slow');
// 			});
}
