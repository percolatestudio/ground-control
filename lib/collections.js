userVerified = function(user) {
  return user && (user.services.google || user.emails[0].verified);
}

userEmail = function(user) {
  if (_.isUndefined(user.services.google)) {
    return email = user.emails[0].address;
  } else {
    return email = user.services.google.email;
  }
}

userState = function(user) {
  if (user.invited)
    return 'invited';
  if (! userVerified(user))
    return 'unverified';
  
  // normal state
  return '';
}

// {name: 'blogName', value: 'Meteor Blog'}
var Settings = new Meteor.Collection('settings');

var getSetting = function(name) {
  var setting = Settings.findOne({name: name});
  return setting && setting.value;
}

var updateSetting = function(name, value) {
  Settings.update({name: name}, {$set: {value: value}});
}

// XXX: fill this out, consolidate author stuff.
// {title: '..', author: 'Tom Coleman', body: markdown, publishedAt: date}
var Posts = new Meteor.Collection('posts');

var titleToSlug = function(title) {
  // XXX: this is a first approximation, needs:
  //   - deal with non-latin chars
  //   - check for overlap? (add a -1 or something?)
  return title.trim().toLowerCase().replace(/\W+/g, '-');
}

var allPosts = function(finder, options) {
  return Posts.find(finder || {}, _.extend(options || {}, {sort: {publishedAt: -1}}));
}

var publishedPosts = function(options) {
  return allPosts({published: true});
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

N_COLORS = 6;
var nextPostColor = function() {
  var latestPost = Posts.findOne({}, {sort: {publishedAt: -1}});
  if (latestPost) {
    return (latestPost.color + 1) % N_COLORS;
  } else {
    return 0;
  }
}

Meteor.methods({
  post: function(post) {
    if (!this.userId)
      throw new Meteor.Error(401, 'You must be logged in to post');
    
    // XXX -- check this is a unique slug; add -2 to it otherwise
    post.slug = titleToSlug(post.title);
    post.publishedAt = new Date();
    post.authorId = this.userId;
    post.authorGravatarHash = Meteor.users.findOne(this.userId).profile.gravatarHash;
    
    // ensure that if two posts are created simulataneously, the colors aren't
    // the same
    post.color = nextPostColor();
    
    Posts.insert(post);
  }
});
