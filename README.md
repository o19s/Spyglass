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
2. Edit the example `js/app.js` and `index.html` files to point to your Solr instance.
3. Open the page in your browser, or deploy it to your own site.

## Building Spyglass from Source
1. Install NodeJS if you don't have it from nodejs.org/download/
2. Then install Yeoman: `npm install -g yo`
3. Next run `npm install` from the project directory to get any dependencies.
4. Finally, use `grunt server` to view your Spyglass site as you make changes. To build a production version of your app just run `grunt build`.
