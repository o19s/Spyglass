/* 
  FACETS
  ==============================
*/

Sg.FacetGroup = Sg.SearcherObserver.extend({
  update: function() {
    var rawFacetGroups = this.searcher.getFacets();
    var self = this;

    rawFacetGroups.forEach ( function(rawFacetGroup) {
      if(rawFacetGroup.facetField === self.fieldName) {
        self.set("facets", rawFacetGroup.facets);

        var tempFacets = [];
        rawFacetGroup.facets.forEach(function (facet) {
          var newFacet = self.facetClass.create(facet);
          newFacet.set("searcher", self.searcher);
          tempFacets.push(newFacet);
        });
        
        self.set('facets', tempFacets);
      }
    });
  },
  templateName: "facet-group",
  searcher: null,
  fieldName: null,
  displayName: null,
  facets: [],
  facetClass: Em.View.extend({
    template: 'facet',
    click: function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.selectFacet();
    }
  })
});