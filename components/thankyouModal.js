var h = require('hyperscript')

module.exports = function () {
  return h('.div', [
    h('.donateModal', {
      'style': 'width: 100%; margin: 0 auto; '
    }, [
      h('.modalHeader', {
        'style':'text-align:center;margin-top:100px;display:block;float:left; width: 100%;background-color:#F08A74;padding:10px;'
      }, [
        h('h3.tk-clarendon-wide', {
          'style':'color:white; font-weight:400;'
        }, 'Thank you for your donation!'),
        h('h3.tk-clarendon-wide', {
          'style':'color:white'
        }, "")
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
            'style':'color:#f48c75; text-align:center'
          }, "You will receive your confirmation via email.")
        ]),
        h('div.space'),
      ])
    ])
  ])
}
