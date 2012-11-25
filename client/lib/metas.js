setMetaTags = function(options) {
  var $head = $('head');
  
  if (options.title) {
    $head.find('title').text(options.title);
    $head.append('<meta name="og:title" content="' + options.title + '"/>');
  }
  
  if (options.description) {
    var shortDesc = shorten(options.description, 160);
    $head.append('<meta name="description" content="' + shortDesc + '"/>');
    $head.append('<meta name="og:description" content="' + shortDesc + '"/>');
  }
}

// bring text down to X characters, one word at a time.
shorten = function(text, maxChars) {
  var words = text.split(/\W+/);
  
  if (words.length === 0)
    return '';
  
  var ret = words[0], currLen = words[0].length;
  for (var i = 1; i < words.length; i++) {
    currLen += words[i].length + 1;
    if (currLen > maxChars)
      return ret;
    
    ret += ' ' + words[i];
  }
  
  return ret;
}