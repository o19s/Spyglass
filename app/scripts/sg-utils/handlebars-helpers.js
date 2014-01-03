Handlebars.registerHelper('unescapeString', function(param) {
  var unescapedString = decodeURI(Em.get(this, param));
  return new Handlebars.SafeString(unescapedString);
});