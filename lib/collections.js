var Posts = new Meteor.Collection('posts');

var titleToSlug = function(title) {
  // XXX: this is a first approximation, needs:
  //   - deal with non-latin chars
  //   - check for overlap? (add a -1 or something?)
  return title.trim().toLowerCase().replace(/\W+/g, '-');
}

var allPosts = function(options) {
  return Posts.find({}, _.extend(options || {}, {sort: {publishedAt: -1}}));
}