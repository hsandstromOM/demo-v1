var h = require('hyperscript')

module.exports = function () {
  return h('.div', [
    h('.donateModal', {
      'style': 'width: 100%; margin: 0 auto; '
    }, [
      h('.confirmHeader', {
        'style':'text-align:center;margin-top:100px;display:block;float:left; width: 100%;background-color:rgb(113, 138, 80);padding:10px;'
      }, [
        h('h3.tk-clarendon-wide', {
          'style':'color:white; font-weight:400;'
        }, 'Thank you for your interest!'),
        h('h3.tk-clarendon-wide', {
          'style':'color:white'
        }, ""),
        h('img', {
          'data-ng-click':'cancel()',
          'style':'float:right; padding:2px; margin-top:-45px;padding-right:8px; color:white; padding-left:8px',
          'src':'img/X_box.png',
        }),
      ]),
      h('.modalBody', {
        'style': 'display:block;float:left;padding:20px;width:100%;background-color:white;'
      }, [
        h('.modalDonateForm', {
          'style': 'display:block; margin: 0 auto; width: 70%;'
        }, [
          h('.modalRowWrap', {
            'style': 'display:block; width: 100%; float:left; clear:both;'
          }, [

          ]),
        ]),
        h('div.space'),
        h('.row', [
          h('p', {
            'style':'color:rgb(113, 138, 80); text-align:center'
          }, "Thank you for being interested in the Charleston Parks Conservacy. Someone will get back to you shortly. Have a lovely day.")
        ]),
        h('div.space'),
      ])
    ])
  ])
}
