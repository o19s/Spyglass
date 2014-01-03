/*
  RESULT SETS
  ==============================
*/

Sg.ResultSet = Sg.SearcherObserver.extend({
  templateName: "results",
  results: null,
  highlights: null,
  update: function() {
    var results = this.searcher.getResults();

    console.log("results updating", "start", this.searcher.params.start, results.length);

    if (this.searcher.params.start === 0) {
      this.set('results', []);
    }

    for (var i=0; i < results.length; i++) {
      this.results.addObject(results[i]);  
    }

    this.searcher.params.start += this.searcher.params.rows;
    this.searcher.set('searchedFor', this.searcher.params.q);
  }
});