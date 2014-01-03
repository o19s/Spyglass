/*!
  SPYGLASS – App
  ==============================
  Simple Search Results with EmberJS
*/

// Define Ember Application
var SgApp = window.SgApp = Ember.Application.create();

// App Scripts
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/views/*');
require('scripts/router');


/*  
## POINTING TO SOLR 
*/

SgApp.searcher = Sg.SolrSearcher.create({

  // Point this value to your Solr instance
  url: "http://localhost:8983/solr/collection1/select",
  
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

SgApp.facetGroup1 = Sg.FacetGroup.extend({
searcher: SgApp.searcher,
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
SgApp.Router.map(function() {
  this.resource('search', { path: '/search/:query'});
});


SgApp.SearchRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render('index');
  },
  model: function(urlParams) {
    console.log("Faceted Search Route");
    var queryObj = Sg.Utils.parseQueryString(urlParams.query);
    console.log("queryObj", queryObj);

    SgApp.searcher.params.start = 0;
    SgApp.searcher.setQuery(queryObj.q);
    Em.set('SgApp.searcher.params.sort', queryObj.sort);

    SgApp.searcher.clearFacets();
    if (queryObj.fq) {
      for (var key in queryObj.fq) {
        var facets = queryObj.fq;
        SgApp.searcher.addFacet(key, facets[key]);
      }
      console.log("Selected Facets ", SgApp.searcher.selectedFacets);
    }

    SgApp.searcher.search();
    $(document).attr('title', 'Spyglass: ' + queryObj.q);
  },
  activate: function() {
    console.log("search activated");
    $(document).attr('title', 'Spyglass: ' + SgApp.searcher.searchedFor);
  }
});


/*  SEARCH BOX
==============================*/

SgApp.searchInput = Sg.SearchBox.extend({
  searcher: SgApp.searcher
});

SgApp.searchSubmit = Sg.SearchSubmit.extend({
  searcher: SgApp.searcher
});


/*  RESULTS
==============================*/

SgApp.results = Sg.ResultSet.extend({
  // templateName: 'results',
  searcher: SgApp.searcher
});



/*  FILTERS
==============================*/
// SgApp.searcher.selectedFacets = Sg.SelectedFilters;