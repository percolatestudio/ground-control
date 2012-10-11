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

// is this post saveable? returns an errors object, 
//   which is empty if the post is valid
var validatePost = function(post) {
  var errors = {}
  
  if (!post.title || post.title === '')
    errors.title = 'is required'
  
  if (!post.author || post.author === '')
    errors.author = 'is required'
  
  if (!post.body || post.body === '')
    errors.body = 'is required'
  
  return errors;
}

Meteor.methods({
  post: function(post) {
    if (!this.userId)
      throw new Meteor.Error(401, 'You must be logged in to post');
    
    // XXX -- check this is a unique slug; add -2 to it otherwise
    post.slug = titleToSlug(post.title);
    post.publishedAt = new Date();
    post.authorId = this.userId;
    post.authorGravatarHash = Meteor.users.find(this.userId).profile.gravatarHash;
    
    Posts.insert(post);
  }
})