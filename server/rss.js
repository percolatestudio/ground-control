// serve up RSS at the right url
Meteor.serve('feed.xml', function() {
  var RSS = __meteor_bootstrap__.require("rss")
  
  var feed = new RSS({
    title: Settings.title,
    description: Settings.description
  });
  
  var converter = new Showdown.converter();
  Posts.find().forEach(function(post) {
    feed.item({
     title: post.title,
     description: converter.makeHtml(post.body),
     author: post.author,
     date: post.publishedAt,
     // XXX: work this out properly
     url: '/posts/' + post.slug
    });
  });
  
  return feed.xml();
});