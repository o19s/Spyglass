/*
  SEARCHER OBSERVERS
  ==============================
*/

Sg.SearcherObserver = Em.View.extend({
  searcher: null, // Must be set by user
  doUpdate: function() {
    this.update();
  }.observes('searcher.searchResponse'),
  update: function() {
    throw "Classes that extend Sg.SearcherObserver must implement the update method.";
  }
});