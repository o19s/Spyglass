
SgApp.SearchRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render('search');
  },
  model: function(urlParams) {
    var queryObj = Sg.Utils.parseQueryString(urlParams.query);
    // console.log("queryObj", queryObj, queryObj.q, queryObj.sort);

    SgApp.searcher.params.start = 0;
    SgApp.searcher.setQuery(queryObj.q);
    // Em.set('SgApp.searcher.params.sort', queryObj.sort);

    SgApp.searcher.clearFacets();
    if (queryObj.fq) {
      for (var key in queryObj.fq) {
        var facets = queryObj.fq;
        SgApp.searcher.addFacet(key, facets[key]);
      }
      // console.log("Selected Facets ", SgApp.searcher.selectedFacets);
    }

    SgApp.searcher.search();

    return true;
  },
  afterModel: function() {
    $(document).attr('title', 'Spyglass: ' + SgApp.searcher.searchedFor);
  }
});
