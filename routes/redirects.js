
const express = require('express');
const redirect = require('express-redirect');
const router = new express.Router();

redirect(router);

// Redirects to home page
router.redirect('/login/', '/', 301);
router.redirect('/home/', '/', 301);
router.redirect('/store/cart/*', '/', 301);

// Redirects to about page
router.redirect('/who_we_are/', '/about', 301);
router.redirect('/who_we_are/history', '/about', 301);
router.redirect('/who_we_are/mission', '/about', 301);
router.redirect('/who_we_are/partnerships/*', '/about', 301);
router.redirect('/who_we_are/reports/*', '/about', 301);
router.redirect('/who_we_are/mission', '/about', 301);

// Redirects to Team page
router.redirect('/who_we_are/view_board_member/*', '/team', 301);
router.redirect('/who_we_are/view_board_member/jim_fields', '/team', 301);

// Redirects to volunteer page
router.redirect('/volunteer/*', '/volunteer', 301);
router.redirect('/community/about_park_angels/*', '/volunteer', 301);
router.redirect('/join/', '/volunteer', 301);

// Redirects to the staff page
router.redirect('/who_we_are/view_staff_member/ashley_wyndham', '/staff', 301);

// Redirects to careers page
router.redirect('/who_we_are/career_opportunities/*', '/careers', 301);
router.redirect('/images/uploads/pa/main/DevelopmentSpecificInternJobDescription%20(1).pdf', '/careers', 301);

// Redirects to programs page
router.redirect('/programs/*', '/programs', 301);
router.redirect('/educate/', '/programs', 301);
router.redirect('/educate/classes/*', '/programs', 301);
router.redirect('/educate/classes', '/programs', 301);
router.redirect('/educate/tutorials/', '/programs', 301);

// Redirects to ParkFinder
router.redirect('/our_parks/*', '/parkFinder', 301);

// Redirects to Calendar
router.redirect('/events/*', '/calendar', 301);
router.redirect('/events/view_event/*', '/calendar', 301);

// Redirects to news
router.redirect('/blogs/*', '/news', 301);
router.redirect('/news/*', '/news', 301);
router.redirect('/educate/resources/', '/news', 301);
router.redirect('/educate/resource_archive/category/*', '/news', 301);

// Redirects to Park Angels
router.redirect('/community/*', '/parkAngels', 301);
router.redirect('/community', '/parkAngels', 301);

// Redirect to contact
router.redirect('/contact/*', '/contact', 301);
router.redirect('/media_kit/', '/contact', 301);

// Specific page redirects
router.redirect('/programs/view_park/park_renovation_projects/colonial_lake_renovation', '/renovationDetail/5BNPMq84Uw6KIYm4ieeUGs/colonial-lake-renovation', 301);
router.redirect('/programs/view_park/park_renovation_projects/hampton_park', '/renovationDetail/2xo8WSHgkgu28sgoGkKkoC/', 301);
router.redirect('/view_park/marion_square/', '/parkDetail/67qsumQypGWugaMSO88MSU/marion-square', 301);

// Board member redirects
router.redirect('/who_we_are/view_board_member/darla_moore/*', '/board/darla-moore', 301);
router.redirect('/who_we_are/view_board_member/darla_moore', '/board/darla-moore', 301);
router.redirect('/who_we_are/view_board_member/sandra_deering', '/board/sandra-deering', 301);
router.redirect('/who_we_are/view_board_member/mariana_hay', '/board/mariana-hay', 301);
router.redirect('/who_we_are/view_board_member/charles_mclendon', '/board/charles-mclendon', 301);
router.redirect('/who_we_are/view_board_member/jenny_k._messner', '/board/jenny-k-messner', 301);
router.redirect('/who_we_are/view_board_member/scott_parker', '/board/w-scott-parker', 301);
router.redirect('/who_we_are/view_board_member/thomas_j._tj_parsell', '/board/thomas-j-parsell-jr', 301);
router.redirect('/who_we_are/view_board_member/pamela_m._pearce', '/board/pamela-m-pearce', 301);
router.redirect('/who_we_are/view_board_member/m._anthony_mcalister_jr', '/board/m-anthony-mcalister-jr', 301);

// Staff member specific redirect
router.redirect('/who_we_are/view_staff_member/harry_lesesne/*', '/staff/harry-lesesne', 301);
router.redirect('/who_we_are/view_staff_member/harry_lesesne', '/staff/harry-lesesne', 301);
router.redirect('/who_we_are/view_staff_member/amy_carter', '/staff/amy-carter', 301);
router.redirect('/who_we_are/view_staff_member/kellen_goodell', '/staff/kellen-goodell', 301);
router.redirect('/who_we_are/view_staff_member/jim_martin', '/staff/jim-martin', 301);
router.redirect('/who_we_are/view_staff_member/kmary_neves_richards', '/staff/neves-richards', 301);
router.redirect('/who_we_are/view_staff_member/leslie_wade', '/staff/leslie-wade', 301);
router.redirect('/who_we_are/view_staff_member/paul_wentz', '/staff/paul-wentz', 301);

// Redirect for specifc parks
router.use('/view_park/*', function(req, res) {
	res.statusCode = 301;
	const arr = req.originalUrl.split('/');
	const id = arr[2];
	const name = arr[3];
	if (name && id) {
		res.setHeader('Location', `/parkDetail/${id}/${name}`);
	} else {
		res.setHeader('Location', '/parkDetail//');
	}
	res.end();
});


// router.set('/view_park/*', function(req, res) {

// });

// End of 301 Redirects

module.exports = router;
