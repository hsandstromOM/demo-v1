var h = require('hyperscript')

module.exports = function () {
  return h('.div#volunteerModal', [
      h('.div', {
        'style':"text-align:center;display:block;float:left; width: 100%; background-image:url('img/blueLeaf.png');background-size:cover;padding:20px; color: white;"
      }, [
        h('p.tk-clarendon-wide', 'Become a Park Angel:', {
          'style': "font-size: 25px; letter-spacing: 2px, padding: 1px; margin-top: -6px;",
        }),
        h('p.tk-clarendon-wide', 'VOLUNTEER', {
          'style': "font-size: 30px;letter-spacing:2px;height:33px;",
        }),
        h('img', {
          'data-ng-click':'cancel()',
          'style':'float:right; padding:2px; margin-top:-65px;padding-right:8px; color:white; padding-left:8px',
          'src':'img/X_box.png',

        }),
      ]),
      h('div', [
        h('iframe', {
          'src': '//charlestonparksconservancy.force.com/volunteers/GW_Volunteers__VolunteersSignup',
          'frameborder': 0,
          'scrolling': false,
          'height': 750,
          'width': 650,
          'style': 'background-color:white;'
        })
      ])
   ])
}
