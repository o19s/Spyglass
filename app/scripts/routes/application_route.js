SgApp.SearchRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render('search');
  },
  model: function(urlParams) {
    var queryObj = Sg.Utils.parseQueryString(urlParams.query);

    console.log('queryObj', queryObj);

    SgApp.searcher.params.start = 0;
    SgApp.searcher.clearFacets();

    for (var key in queryObj) {
      if (key == 'fq') {
        if (typeof queryObj[key] !== 'string') {
          for (var facet in queryObj[key]) {
            var facets = queryObj[key];
            SgApp.searcher.addFacet(facet, facets[facet]);
          }
        }
        else {
          SgApp.searcher.params.fq = queryObj[key];
        }
      }
      else if (key == 'q') {
        SgApp.searcher.setQuery(queryObj[key]);
      }
      else {
        SgApp.searcher.params[key] = queryObj[key]
      }
    }

    SgApp.searcher.search();

    return true;
  },
  afterModel: function() {
    $(document).attr('title', 'Spyglass: ' + SgApp.searcher.searchedFor);
  }
});
