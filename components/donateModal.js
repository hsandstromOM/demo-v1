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
        }, 'Become a Park Angel:'),
        h('h3.tk-clarendon-wide', {
          'style':'color:white'
        }, 'DONATE'),
        h('img', {
        'data-ng-click':'closeDonateModal()',
        'style':'float:right; padding:2px; margin-top:-75px;padding-right:8px; color:white; padding-left:8px;',
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
            h('.modalRow', {
              'style': 'display:flex; justify-content: space-between; width: 100%;float:left;clear:both;'
            }, [
              h('.donateOption', {
                'style': '',
                'data-ng-click': 'donateLevel(25)'
              }, '$25'),
              h('.donateOption', {
                'style': '',
                'data-ng-click': 'donateLevel(50)'
              }, '$50'),
              h('.donateOption', {
                'style': '',
                'data-ng-click': 'donateLevel(75)'
              }, '$75'),
              h('.donateOption', {
                'style': 'cursor: pointer',
                'data-ng-click': 'donateLevel(100)'
              }, '$100')
            ])
          ]),
          h('.donateInputRow', {
            'style': 'display:block; width: 100%;float:left;clear:both;margin-top:20px; color: #5d635a'
          }, [
            h('input.donateInput.col-md-12.donateOption', {
              'id': 'donateInput',
              'type': 'text',
              'data-ng-model': 'donation',
              'placeholder': '$ OTHER AMOUNT',
              'style': 'line-height: 40px;margin-top:20px; width:100%;'
            }),
            h('.donateButton.orangeBack', {
              'style': 'display:block;width:30%;clear:both;margin:0 auto;color:white; text-align: center; line-height: 40px;margin-bottom:40px;',
             'data-ng-click': 'setAmt()'
            }, 'DONATE')
          ])
        ]),
        h('.row', [

          h('.orLine.col-md-4.col-xs-offset-1.col-xs-4', {
            'style': 'border-top:1px solid #5d635a;margin-top:25px;'
          }),
          h('.orDivider.col-md-2.col-xs-2', {
            'style': 'text-align: center;line-height: 50px;'
          }, 'or'),
          h('.orLine.col-md-4.col-xs-4', {
            'style': 'border-top:1px solid #5d635a;margin-top:25px; padding-bottom:30px;'
          })

        ]),

        h('.otherWaysToDonate', {
          'style': 'display:block;color:#5d635a;float:left:clear:both;text-align:center;margin:0 auto; width:80%;margin-bottom:10px;'
        }, [

          h('p.tk-futura-pt p.pinkText', 'INTERESTED IN OTHER WAYS TO DONATE?'),
          h('p.tk-futura-pt p.pinkText', 'Explore personal, creative and enduring donation options. Honorary and memorial gifts. Matching gifts. Gifts of stock. Sponsorship.'),
          h('.donateButton', {
            'data-ng-click': "route()",
            'style': 'display:block; margin: 0 auto; width:40%;background-color: #f58d76;color:white; text-align: center; line-height: 50px; opacity: 0.6',
          }, 'LEARN MORE'),
          h('.donateButton', {
            'title': 'close',
            'data-ng-click':'closeDonateModal()',
            'aria-hidden': 'true',
            'span': 'hide',
            'style': 'display:block; font-size:12px; margin: 0 auto; width:80%; background-color: transparent; cursor:pointer; color:#F08A74; text-align: center; line-height: 50px;',
          }, 'Cancel')
        ])
      ])
    ])
  ])
}
