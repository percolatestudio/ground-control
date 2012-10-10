// serve up RSS at the right url
Meteor.serve('feed.xml', function() {
  return XML([ { url: 'http://www.google.com/search?aq=f&sourceid=chrome&ie=UTF-8&q=opower' } ]);
});