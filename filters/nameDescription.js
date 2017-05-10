module.exports = function () {
  return function(items, filter) {
    var namesDescriptionFiltered = [];
    if (filter === false) {
      angular.forEach(items, function(item) {
        namesDescriptionFiltered.push(item);
      });
    } else {
        var searchVal = filter.toLowerCase();
        angular.forEach(items, function(item) {
            var parkNameVal = item.fields.parkName.toLowerCase();
            if(item.fields.description) {
                var parkDesVal = item.fields.description.toLowerCase();
            }
            if(parkNameVal.indexOf(searchVal) !== -1) {
                namesDescriptionFiltered.push(item)
            } else if (parkDesVal && parkDesVal.indexOf(searchVal) !== -1) {
                namesDescriptionFiltered.push(item)
            }
        });
    }

    return namesDescriptionFiltered;

  };
}