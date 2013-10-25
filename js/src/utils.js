var utils = {};

// Query Parsing

utils.parseQueryString = function(queryString) {
  var queryArray = queryString.split('&');
  var obj = {}

  for (var i = 0; i < queryArray.length; i++) {
    var valuePairs = queryArray[i].split('='),
        key = decodeURI(valuePairs[0]),
        value;

    if (key === 'fq') {
      value = this.parseFqString(valuePairs[1]);
    } 
    else {
      value = decodeURI(valuePairs[1]);
    }

    obj[key] = value;
  }

  return obj;
};

utils.returnSearchHash = function(q, facets, sort) {
  var urlArray = [];
  
  if (q && q !== '') {
    urlArray.push('q=' + q.toString());
  }
  
  if (facets && facets !== '') {
    urlArray.push('fq=' + facets.replace(/\//g, '::'));
  } 

  if (sort && sort !== '') {
    urlArray.push('sort=' + sort);
  } 

  return encodeURI(urlArray.join('&'));
};

utils.parseFqString = function(fqString) {
  console.log('fqString', fqString);

  var fqArray = decodeURIComponent(fqString.toString()).replace(/\::/g, '/').split(','),
      obj = {},
      r = new RegExp("[:]+(?![^[]*])");

  console.log('fqArray', fqArray);

  for (var i = 0; i < fqArray.length; i++) {
    var s = fqArray[i].split(r),
        key = s[0],
        value = s[1] ? s[1] : false;
    
    if (!value) {
      return;
    }

    if (obj[key]) {
      var currentValue = obj[key];

      if (!Array.isArray(currentValue)) {
        obj[key] = [currentValue, value];
      }
      else {
        obj[key].push(value);
      }
    }
    else {
      obj[key] = value;
    }
  }

  console.log("fqString obj", obj);
  return obj;
};


// Dates

utils.formatISODate = function (timestamp, format) {
  
  // TODO: Make sure parsed time = original
  var t = timestamp.toString();

  var dd     =  t.slice(8, 10),
      mm     =  t.slice(5, 7),
      yyyy   =  t.slice(0, 4),
      h      =  t.slice(11, 13),
      m      =  t.slice(14, 16),
      s      =  t.slice(17, 19),
      months =  ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  ;

  if (format === 'date') {
    return months[Number(mm) - 1] + ' ' + Number(dd) + ', ' + yyyy;
  }
  else if (format === 'year') {
    return yyyy;
  }
};

$(document).ready(function() {
  // Detect when close to the bottom of the page and load more results 
  $(window).scroll(function(){
    var distanceToBottom = $(document).height() - $(window).scrollTop(),
        windowHeight = $(window).height(),
        allResultsLoaded = App.searcher.get('allResultsLoaded');

    if (!allResultsLoaded && !App.searcher.isSearching && window.location.hash.indexOf("search") > -1 && distanceToBottom < windowHeight + 360 ) {
      App.searcher.loadNextResults();
    }
  });
});