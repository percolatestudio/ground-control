Template.allPosts.helpers({
  visiblePosts: function() {
    return allPosts().fetch().slice(0,3);
  },
  nextPost: function() {
    return (allPosts().count() > 3) && allPosts().fetch()[3];
  }
});

var isCurrentPost = function(post) {
  // no current post set and we are the first post
  // XXX: better way to figure out if we are the first post?
  if (Session.equals('currentPostSlug', null)) {
    return Posts.findOne()._id === post._id;
  } else {
    return Session.equals('currentPostSlug', post.slug);
  }
}

Template.post.helpers({
  currentPost: function() { return isCurrentPost(this); },
  openClass: function() { return isCurrentPost(this) && 'open'; }
});

Template.post.events({
  'click .delete': function() {
    if (confirm('Are you sure you want to delete "' + this.title + '"?'))
      Posts.remove(this._id)
  }
});








/////// edit/new post stuff
// read the three values out of the form
var readPostForm = function(template) {
  var post = {}
  post.title = template.find('[name=title]').value;
  post.author = template.find('[name=author]').value;
  post.body = template.find('[name=body]').value;
    
  return post;
}

// Template.editPost.events({
//   'click .cancel': function(e) {
//     // XXX: check changes
//     e.preventDefault();
//     Meteor.Router.navigate(Routes.postUrl(this), {trigger: true});
//   },
//     
//   'submit form': function(e, template) {
//     e.preventDefault();
//       
//     var changes = readPostForm(template);
//     _.extend(this, changes);
//     
//     var errors = validatePost(this);
//     if (! _.isEmpty(errors))
//       return Session.set('postForm.errors', errors);
//     
//     Posts.update(this._id, {$set: changes});
//     Meteor.Router.navigate(Routes.postUrl(this), {trigger: true});
//   }
// });

Template.newPost.helpers({
  newPost: function() { 
    return {author: Meteor.user().profile && Meteor.user().profile.name};
  }
});

Template.newPost.events({
  'click .cancel': function(e) {
    e.preventDefault();
    Meteor.Router.navigate('/', {trigger: true});
  },
    
  'submit form': function(e, template) {
    var self = this;
    
    e.preventDefault();
      
    var changes = readPostForm(template);
    _.extend(self, changes);
    
    var errors = validatePost(self);
    if (! _.isEmpty(errors))
      return Session.set('postForm.errors', errors);
    
    // XXX: show a spinner
    Meteor.call('post', self, function(err) {
      if (err) {
        // XXX: what errors are possible here?
        console.log(err.reason);
      } else {
        Meteor.Router.navigate(Routes.postUrl(self), {trigger: true});
      }
    })
  }
});  

Template.postForm.created = function() {
  Session.set('postForm.errors', {});
}
Template.postForm.helpers({
  errors: function() {
    return Session.get('postForm.errors')
  }
})