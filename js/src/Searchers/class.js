/*
  SEARCHERS
  ==============================
  SG.Searcher is a generic class that sets up some good default items and functions. This class will be extended to create searchers that are specific to a given search type such as Solr or ElasticSearch.
*/

SG.Searcher = Em.ObjectController.extend({
  params: {},
  url: null, // User must specify a url!
  searchResponse: null,
  isSearching: null,
  responseTime: null,
  submitSearch: function (params) {
    if (this.params.q) {
      this.params.start = 0;
      if (params !== 'sort') {this.clearFacets();}
      

      var urlHash = '/search/' + utils.returnSearchHash(this.params.q, this.getSelectedFacets(), this.params.sort);
      window.location.hash = urlHash;      
    } 
  },
  numFound: function() {
    var formatNumber = function (n) {
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");      
    };

    if (this.searchResponse) {
      var numFound = this.searchResponse.response.numFound;
      return numFound.toString().length < 3 ? numFound : formatNumber(numFound);
    } else {
      return false;
    }
  }.property('searchResponse'),
  allResultsLoaded: function(){
    var numFound = parseInt(this.get('numFound').toString().replace(/[^0-9]/g, ''), 10);
    // console.log("allResultsLoaded", this.params.start, numFound);
    
    if (this.params.start < numFound || !numFound) {
      return false;
    } 
    return true;
  }.property('numFound', 'isSearching'),
  noResults: function() {
    var numFound = parseInt(this.get('numFound').toString().replace(/[^0-9]/g, ''), 10);

    if (numFound === 0 && !this.isSearching) {
      return true;
    }
    return false;
  }.property('numFound', 'isSearching'),
  searchedFor: null,
  search: function() {
    var self = this;
    
    self.set("isSearching", true);
    self.set('searchedFor', self.params.q);
    self.set("responseTime", new Date().getTime());

    $.ajax({
      url: this.url,
      data: this.params,
      traditional: true,
      cache: true,
      success: function(data) {
        self.set('isSearching', false);

        var now = new Date().getTime();
        self.set("searchResponse", data);
        self.success();

        // self.set('searchedFor', self.params.q);
        self.set('responseTime', now - self.responseTime);
        // console.log(data);
      },
      statusCode: {
        400: function() {
          self.set('isSearching', false);
          throw "Search Error";
        }
      },
      dataType: 'jsonp',
      jsonp: 'json.wrf',
      beforeSend: function(j, s) {
      console.log('beforeSend', s.url.replace(/\=/g, ": ").split('&'));
      }
    });
  },
  loadNextResults: function() {
    var allResultsLoaded = this.get('allResultsLoaded'),
        noResults = this.get('noResults'),
        isSearching = this.get('isSearching');

    if (!allResultsLoaded && !noResults && !isSearching) {
      this.search();
    }
  },
  setQuery: function () {
    throw "Implement a setQuery method for your searcher";
  },
  addFacet: function (field, value) {
    throw "Implement an addFacet method for your searcher";
  },
  getResults: function () {
    throw "Implement a getResults method on your searcher";
  },
  getFacets: function () {
    throw "Implement a getFacets method on your searcher";
  },
  getHighlights: function () {
    throw "Implement a getFacets method on your searcher";
  },
  success: function () {
    throw "Implement a success method on your searcher";
  }
});