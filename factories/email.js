var newEvent = require('palmettoflow-event').newEvent
var _ = require('underscore')

var transportEmail = function ($http) {
  return {
  	send: function (obj) {
      var ne = newEvent('email', 'send', obj, {})
      return $http.post('/api', ne).then(function (result) {
        return result
      })
    }
  }
}

module.exports = transportEmail;
