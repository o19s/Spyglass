// Query Parsing
Sg.Utils.parseQueryString = function(queryString) {
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

Sg.Utils.returnSearchHash = function(q, facets, sort) {
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

Sg.Utils.parseFqString = function(fqString) {
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
