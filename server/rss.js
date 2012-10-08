// serve up RSS at the right url
Meteor.serve('feed.xml', function() {
  var RSS = __meteor_bootstrap__.require("rss")
  
  var feed = new RSS({
    
  });
  
  
  return '' + Posts.find().count();
});