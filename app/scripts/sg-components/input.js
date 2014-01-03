/*
  SEARCH INPUT
  ==============================
*/

Sg.SearchBox = Ember.TextField.extend({
  placeholder: "Search Keywords",
  name: 'searchInput',
  expanded: false,
  classNames: ['sg-input'],
  didInsertElement: function () {
    if (this.searcher.searchedFor) {
      this.set('value', this.searcher.searchedFor);
      // this.evaluateHeight();
    }
  },
  update: function () {
    this.set('value', this.searcher.searchedFor);
    // this.evaluateHeight();
  }.observes('searcher.searchedFor'),
  search: function() {
    this.searcher.clearFacets();
    this.searcher.submitSearch();
  },
  // evaluateHeight: function() {
  //   // Recalculate textarea height 
  //   if (this.value.length > 45 && !this.expanded) {
  //     $('#' +this.get('elementId')).addClass('expanded');
  //     this.set('expanded', true);
  //   }
  //   else if (this.value.length <= 45 && this.expanded) {
  //     $('#' +this.get('elementId')).removeClass('expanded');
  //     this.set('expanded', false);
  //   }
  // },
  keyUp: function(e) {
    // var characterKey = event.keyCode <= 90 && event.keyCode >= 48;
    var terms = this.value.toString().replace(/\:\s/g, ':');
    this.searcher.setQuery(terms);
    // this.evaluateHeight();
  },
  keyDown: function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      this.search();
    }
  }
});

Sg.SearchSubmit = Ember.TextField.extend({
  classNames: ['sg-submit'],
  type: 'submit',
  value: 'Search',
  click: function() {
    this.searcher.clearFacets();
    this.searcher.submitSearch();
  }
});