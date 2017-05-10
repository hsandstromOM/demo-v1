
const palmetto = require('palmettoflow-nodejs');
const emailSvc = require('./emailSvc')();

module.exports = function() {
	const ee = palmetto();
	emailSvc(ee);
	return ee;
};
