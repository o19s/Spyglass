
asyncTest('Primary Query', 5, function() {  
  Solr.set('terms', 'cancer');
  Solr.query();
  
  setTimeout(function() {
    start();
    ok(Solr.results.content.length > 0, 'Solr.results > 0');
    ok(Solr.hasResults, 'hasResults');
    ok(!Solr.isLoadingResults, '!isLoadingResults');
    ok(!Solr.showdropdown, '!showDropdown');
    ok(Solr.searchedTerms === 'cancer', 'Searched terms updated');
  }, 500);
});

asyncTest('Autocomplete', 6, function() {  
  Solr.set('terms', 'canc');
  Solr.autoCompleteQuery();
  
  setTimeout(function() {
    start();
    ok(Solr.autoCompleteSuggestions.content.length > 0, 'Suggestions > 0');
    ok(Solr.autoCompleteFull.content.length > 0, 'Module Suggestions > 0');
    ok(Solr.hasModuleSuggestions, 'hasModuleSuggestions');
    ok(!Solr.isLoadingSuggestions, '!isLoadingSuggestions');
    ok(Solr.showDropdown, 'showDropdown');
    ok(Solr.moduleQuery === 'cancer', 'Module query updated');
  }, 500);
});