var h = require('hyperscript')

module.exports = function () {
  return h('div', {
      'style': 'width: 0; height: 100px; border-left: 50px solid red; border-right: 50px solid red; border-bottom: 35px solid transparent;'
    })
}