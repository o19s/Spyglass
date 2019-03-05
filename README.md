
![Spyglass](branding/spyglass-sm.png)

Spyglass provides a simple search interface for Solr using EmberJS.


_Update: March 2019 - We are no longer maintaining this Gem.  Please contact epugh@opensourceconnections.com if you would like to take over this project._

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


## Installing Spyglass

Running Spyglass locally allows you to easily customize the interface, and sets up a good development environment for your project.

To build Spyglass from source you will need:

1. [NPM](https://npmjs.org/) installed
2. [Bower](http://bower.io/): `npm install -g bower`
3. [Grunt](http://gruntjs.com/): `npm install -g grunt-cli`

Then:

1. Navigate to the `grunt` folder within your cloned Spyglass repository.
2. Run `bower install`
3. Run `npm install`
4. Great, now run `grunt server` to launch Spyglass and automatically start compiling your changes in real-time.

Now that you are set up you can also run `grunt build` to generate a distribution version of your app.
