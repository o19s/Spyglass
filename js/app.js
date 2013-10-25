App = Em.Application.create();


/*  
## POINTING TO SOLR 
*/

App.searcher = SG.SolrSearcher.create({

  // Point this value to your Solr instance
  url: "http://your-solr-url.com/solr/collection/select",
  
  params: {

    // Edit this value to include the fields that you want to return
    "fl": "field1, field2, field3", 

    // Optionally uncomment the next three lines to include facets, and change the `facet.field` value to match your fields
    // "facet": true,
    // "facet.field": ["field1", "field2"],
    // "facet.limit": 5,

    "q": {},
    "fq": [],
    "start": 0,
    "rows": 10,
    "wt": "json"
  },
  success: function (data) {},
  selectedFacets: Em.ArrayController.create({
    content: []
  })
});


/* 
## FACET GROUPS

Optionally, create a unique FacetGroup for each facet list 
that you will include in your application.

For example: 

````js

App.facetGroup1 = SG.FacetGroup.extend({
searcher: App.searcher,
  fieldName: 'abstract_en',
  displayName: 'Abstract'
});

````
*/

/*  
## YOU'RE DONE HERE.

Great, you've set up your application, now it is time to define how your results are output in the `index.html` file. 

==== MOST IMPLEMENTATIONS SHOULD'T NEED TO CHANGE ANYTHING BELOW THIS LINE ================
*/


/*  SEARCH BOX
==============================*/
App.Router.map(function() {
  this.resource('search', { path: '/search/:query'});
});


App.SearchRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render('index');
  },
  model: function(urlParams) {
    console.log("Faceted Search Route");
    var queryObj = utils.parseQueryString(urlParams.query);
    console.log("queryObj", queryObj);

    App.searcher.params.start = 0;
    App.searcher.setQuery(queryObj.q);
    Em.set('App.searcher.params.sort', queryObj.sort);

    App.searcher.clearFacets();
    if (queryObj.fq) {
      for (var key in queryObj.fq) {
        var facets = queryObj.fq;
        App.searcher.addFacet(key, facets[key]);
      }
      console.log("Selected Facets ", App.searcher.selectedFacets);
    }

    App.searcher.search();
    $(document).attr('title', 'Spyglass: ' + queryObj.q);
  },
  activate: function() {
    console.log("search activated");
    $(document).attr('title', 'Spyglass: ' + App.searcher.searchedFor);
  }
});


/*  SEARCH BOX
==============================*/

App.searchInput = SG.SearchBox.extend({
  searcher: App.searcher
});

App.searchSubmit = SG.SearchSubmit.extend({
  searcher: App.searcher
});


/*  RESULTS
==============================*/

App.results = SG.ResultSet.extend({
  // templateName: 'results',
  searcher: App.searcher
});



/*  FILTERS
==============================*/
// App.searcher.selectedFacets = SG.SelectedFilters;