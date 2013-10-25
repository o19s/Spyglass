/* 
  FACETS
  ==============================
*/

SG.FacetGroup = SG.SearcherObserver.extend({
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
    template: Em.Handlebars.compile('<li><a href="">{{value}}</a> <span>({{count}})</span></li>'),
    click: function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.selectFacet();
    }
  })
});

Ember.TEMPLATES['facet-group'] = Em.Handlebars.compile('\
  {{#if view.facets}}<h3>{{{view.displayName}}}</h3>\
  <ul class="facets-list">\
    {{#each view.facets }}\
      {{view this}}\
    {{/each}}\
  </ul>{{/if}}\
');