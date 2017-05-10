module.exports = {
	url: '/contact',
	template: require('raw!templates/contact/contact-view.html'),
	controller: ContactController,
	controllerAs: 'contactCtrl'
}

function ContactController(contentful, $window, $state, $http, $timeout) {
	var vm = this;
	$window.scrollTo(0, 0);
	vm.showConfirmationLayer = false;
	vm.showErrorLayer = false;

	contentful.entries('content_type=contactUs&include=3').then(function(res) {
		vm.sideBarData = res.data.items[0];
		vm.contactFormSubjects = vm.sideBarData.fields.contactFormSubjects;
		if (vm.sideBarData.fields.pageTitleSeo) {
			document.title = vm.sideBarData.fields.pageTitleSeo;
		}
		if (vm.sideBarData.fields.pageSpecificMetaDescriptionSeo) {
			var meta = document.getElementsByTagName("meta");
			for (var i = 0; i < meta.length; i++) {
				if (meta[i].name.toLowerCase() === "description") {
					meta[i].content = vm.sideBarData.fields.pageSpecificMetaDescriptionSeo;
				}
			}
		}
	});

	vm.submitForm = function(formValid) {
		if (formValid) {
			var postUrl = "/api/email";
			var reason = getRecipient(vm.contactForm.reason);
			var obj = {
				fromName: vm.contactForm.firstName + ' ' + vm.contactForm.lastName,
				fromEmail: vm.contactForm.email,
				fromCompany: vm.contactForm.company,
				toName: reason.recipientName,
				toEmail: reason.recipientEmail,
				subject: reason.title,
				emailBody: vm.contactForm.extraInfo
			};

			// FAKE FORM POST FOR DEVELOPMENT
			// console.log('valid, emailing ' + obj.toEmail)
			// vm.showConfirmationLayer = true;
			// $timeout(function(){
			//   vm.contactForm = '';
			//   vm.showConfirmationLayer = false;
			// }, 5000);

			$http.post(postUrl, obj).then(function success(res) {
				console.log('success: ', res);
				vm.showConfirmationLayer = true;
				$timeout(function() {
					vm.contactForm = '';
					vm.showConfirmationLayer = false;
				}, 5000);
			}, function error(err) {
				console.log('error: ', err)
				window.glob = err;
				vm.showErrorLayer = true;
				$timeout(function() {
					vm.contactForm = '';
					vm.showErrorLayer = false;
				}, 5000);
			});
		} else {
			console.log("form invalid");
		}
	};

	function getRecipient(reason) {
		switch (reason) {
			case vm.contactFormSubjects[0].fields.title:
				return vm.contactFormSubjects[0].fields;
			case vm.contactFormSubjects[1].fields.title:
				return vm.contactFormSubjects[1].fields;
			case vm.contactFormSubjects[2].fields.title:
				return vm.contactFormSubjects[2].fields;
			case vm.contactFormSubjects[3].fields.title:
				return vm.contactFormSubjects[3].fields;
			case vm.contactFormSubjects[4].fields.title:
				return vm.contactFormSubjects[4].fields;
			case vm.contactFormSubjects[5].fields.title:
				return vm.contactFormSubjects[5].fields;
			case vm.contactFormSubjects[6].fields.title:
				return vm.contactFormSubjects[6].fields;
			default:
				return {
					recipientName: 'Inquiries',
					recipientEmail: 'info@charlestonparksconservancy.org',
					title: reason
				};
		}
	}
	// Set margin bottom for navShortView
	window.addEventListener('scroll', setMargin);
	setMargin();

	function setMargin() {
		var navShortView = document.getElementsByClassName("navShortView")[0].clientHeight + 30;
		var pageId = document.getElementById("contactPage");
		if (navShortView && pageId) pageId.setAttribute("style", "padding-bottom:" + navShortView + "px;");
	};
}
