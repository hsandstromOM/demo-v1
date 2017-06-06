
const express = require('express');
const router = new express.Router();
const mg = require('nodemailer-mailgun-transport');
const nodemailer = require ('nodemailer');

router.post('/email', function(req, res) {
	const auth = {
		auth: {
			api_key: process.env.MAILGUN_USER,
			domain: process.env.MAILGUN_PASS
		}
	}

	let transporter = nodemailer.createTransport(mg(auth));

	let email = {
		from: 'contact@example.com',
		to: req.body.toEmail,
		'h:Reply-To': req.body.fromEmail,
		subject: req.body.subject,
		text: req.body.emailBody,
		html: `<p>This email was sent to you through the Example website by:</p><p><b>Name: </b>${req.body.fromName}<br><b>Company: </b>${req.body.fromCompany}<br><b>Email: </b>${req.body.fromEmail}</p><h3>${req.body.emailBody}</h3>`,
	};

	console.log('email is  \n', email);


	// Send mail with defined transport object
	transporter.sendMail(email, function(error, info) {
		if (error) {
			console.log(error);
			// Send a sad little error back to the client
			return res.send(404, {
				message: 'Could not send your email :(',
				error,
				email
			});
		} else {
			// Send a happy little response back to the client
			return res.send(200, {
				status: 'Message sent: ' + JSON.stringify(info) + ' :)',
				email,
				_sendDate: new Date()
			});
		};
	});

});


module.exports = router;
