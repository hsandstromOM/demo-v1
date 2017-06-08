const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const sendHtml = require('send-data/html');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const apiRoutes = require('./routes/api');
const redirectRoutes = require('./routes/redirects');
const prerender = require('prerender-node');
const gzippo = require('gzippo');
const cors = require('cors');
const bodyParser = require('body-parser');


// Bring in express and create an instance of the router - to be used w/ middleware
const app = express();
const router = new express.Router();
const mg = require('nodemailer-mailgun-transport');
const nodemailer = require ('nodemailer');
const mandrillTransport = require('nodemailer-mandrill-transport');
const jsonParser = bodyParser.json()

const obj = mandrillTransport({
  auth: {
    apiKey: '0SZWw1_FBFk7Cv_7h9W14A'
  }
});

const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  maxAge: '1d',
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

app.use(helmet());
app.use(compression(`${__dirname}/www`));

var smtpTransport = nodemailer.createTransport(obj);

app.post('/api/send', jsonParser, function(req, res){
  var text = req.body;
  console.log("something");
  var mailOptions = {
    // to: req.query.to,
    // subject: req.query.subject,
    // text: req.query.text

    from: 'do-not-reply@citibot.com',
    to: "hosea@obviouslee.com",
    subject: 'Citibot Newsletter Signup',
    text: '\n\nEmail: ' + text.email

  };

  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error);
      res.end("error");
    }else{
     console.log("Message sent: " + response.message);
      res.end("sent");
    }
  });
});

// Set the port
app.set('port', process.env.PORT || 5000);

// Listen for requests
const server = app.listen(app.get('port'), function() {
	const port = server.address().port;
	console.info(`Magic happens on port ${port}`);
});

// Set the static asset directory
app.use(gzippo.staticGzip(`${__dirname}/www`));
app.use(express.static(`${__dirname}/www`, options));
app.use(cors());
app.use(prerender).set('prerenderServiceUrl', 'https://demo-v1-om.herokuapp.com/').set('prerenderToken', process.env.PRERENDER_TOKEN);
app.use(bodyParser.json());       // to support JSON-encoded bodies

const forceSsl = function(req, res, next) {
	if (req.headers['x-forwarded-proto'] !== 'https') {
		return res.redirect(['https://', req.get('Host'), req.url].join(''));
	}
	return next();
};

if (app.get('env') === 'production') {
	app.use(forceSsl);
} else if (app.get('env') !== 'production') {
	// Use a nice logger in development
	const logger = require('morgan');
	app.use(logger('dev'));
}

function render(req, res, template) {
	const layout = fs.readFileSync(`${__dirname}/templates/layout.html`, 'utf-8');

	sendHtml(req, res, ejs.render(layout, {
		body: template,
	}));
}

function handleAppPage(req, res) {
	var requestUrl = req.url;
	if (requestUrl === '/') requestUrl = '/layout.html';
	const page = fs.readFileSync(`${__dirname}/templates/layout.html`, 'utf-8');
	render(req, res, page);
}

// Tell the app to use any middle ware on the router
app.use(router);

// Load in routes
app.use('/api', apiRoutes);
app.use(redirectRoutes);


// NOTE: SHOULD ALWAYS BE LAST LINE OF FILE
app.get('*', handleAppPage);
