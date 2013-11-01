# Spyglass

Spyglass provides a simple search interface for Solr using EmberJS.

Spyglass comes with many of the search components you need to create a lightweight search interface right out of the box.

- Searchers that return a result from a given Solr url,
- a Search Box which is a simple input tied to its searcher,
- Result Sets that automatically show the results returned by their searchers, and
- Facets which toggle search parameters. Both result sets and facets are extensions of 
‘SearcherObservers’ which update automatically when their linked ‘searcher’ has new objects.

For a little more background until we get a project page up [go here](http://www.opensourceconnections.com/2013/08/28/investing-in-client-side-search/).

## Trying Spyglass
1. Download the Spyglass binary **from the releases tab**.
3. Edit the example `js/app.js` and `index.html` files to point to your Solr instance.
4. Open the page in your browser, or deploy it to your own site.

## Building Spyglass from Source
1. Install NPM if you don't have it https://npmjs.org/
2. Install the Grunt package manager http://gruntjs.com/getting-started
3. Navigate to the `grunt` folder within the Spyglass project and run `npm install` to get any dependencies.
4. Use `grunt watch` to compile the Spyglass javascript as you make changes.
