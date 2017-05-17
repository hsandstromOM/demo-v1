module.exports = {
    url: '/team',
    template: require('raw!templates/list-view.html'),
    controller: BoardListController,
    controllerAs: 'listCtrl',
}

function BoardListController ($scope, $state, store, contentful, $window, $uibModal, Slug) {
    var vm = this;
    $window.scrollTo(0, 0);
    vm.allMembers = [];
    vm.detailHref = 'team-member';
    // var allQuery = "content_type=teamPage";
    // var pageQuery = "content_type=teamPage";
    // var contactDetails = "content_type=contactUs";



  	contentful.entries('content_type=teamMember').then(function(res) {
  		console.log(res);
  		var entries = res.data
  		entries.items.forEach(function(entry) {
  				vm.allMembers.push(entry)
  		});
  	});

    // var getContenfulData = function () {
        // contentful.entries(pageQuery).then(function(res) {
        //     vm.contentfulData = res.data.items[0]
        //     if (vm.contentfulData.fields.pageTitleSeo) {
        //         document.title = vm.contentfulData.fields.pageTitleSeo
        //     }
        //     if (vm.contentfulData.fields.pageSpecificMetaDescriptionSeo) {
        //         var meta = document.getElementsByTagName("meta");
        //         for (var i = 0; i < meta.length; i++) {
        //             if (meta[i].name.toLowerCase() === "description") {
        //                 meta[i].content = vm.contentfulData.fields.pageSpecificMetaDescriptionSeo
        //             }
        //         }
        //     }
        // })
        // contentful.entries(allQuery)
        //     .then(function(res) {
        //         var entries = res.data
        //         entries.items.forEach(function(entry) {
        //             vm.allMembers.push(entry)
        //         });
        //     });
            // contentful.entries(contactDetails).then(function(res) {
            //     vm.contentfulContactData = res.data.items[0]
            //     if (vm.contentfulContactData.fields.address) {
            //         address = vm.contentfulContactData.fields.address
            //     }
            //     if (vm.contentfulContactData.fields.cityStateAndZipCode) {
            //         cityStateAndZipCode = vm.contentfulContactData.fields.cityStateAndZipCode
            //     }
            //     if (vm.contentfulContactData.fields.phoneNumber) {
            //         phoneNumber = vm.contentfulContactData.fields.phoneNumber
            //     }
            // })

    // }



    // vm.animationsEnabled = true;
    // vm.open = function() {
    //     var modalInstance = $uibModal.open({
    //         animation: vm.animationsEnabled,
    //         template: require('raw!templates/volunteer/volunteer-modal-view.html'),
    //         controller: 'ModalInstanceCtrl',
    //     }).rendered.then(function(modal) {
    //         var element = document.querySelector('.forVolunteer'),
    //             rect = element.getBoundingClientRect(),
    //             modal = document.querySelector('.modal-dialog');
    //
    //         modal.style.margin = 0;
    //         modal.style.width = rect.width + 'px';
    //         modal.style.top = rect.top + 1000 + 'px';
    //         modal.style.left = rect.left + 0 + 'px';
    //     });
    // }

    // getContenfulData();

    // window.addEventListener('scroll', setMargin);
    // setMargin();

    // function setMargin() {
    //     var navShortView = document.getElementsByClassName("navShortView")[0].clientHeight + 30;
    //     var pageId = document.getElementById("listView");
    //     if (navShortView && pageId) pageId.setAttribute("style", "padding-bottom:" + navShortView + "px;");
    // };
}
