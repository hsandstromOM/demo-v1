var h = require('hyperscript')

module.exports = function () {
  return {
      restrict: 'A',
      link: function(scope, element, attrs) {
           var container = document.getElementById('parkList')
           scope.$watch('scrollToPark', function(newVal, oldVal) {
               if (newVal && newVal !== oldVal) {
                 console.log('newVal', newVal)
                var scrollTo = parkList.children[newVal]
                scrollTo.scrollIntoView( true );
               }
          });
      }
    };
}
