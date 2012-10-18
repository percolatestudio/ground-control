Template.allPosts.helpers({
  posts: function() {
    return allPosts();
  }
});

var isOpen = function(post) {
  return Session.equals('post-opened-' + post.slug, true);
}

Template.post.preserve(['.post', '.post .header', '.post .body']);

Template.post.rendered = function() {
  this.data._rendered = true;
}

Template.post.helpers({
  open: function() { return isOpen(this); },
  openClass: function() { return isOpen(this) ? 'open' : ''; },
  animatingClass: function() { return this._rendered ? 'animating' : '';}
});

Template.post.events({
  'click .permalink': function(event) {
    event.preventDefault();
    Meteor.Router.navigate(Routes.postUrl(this));
  },
  
  'click .slider': function(event, template) {
    if (isOpen(this)) {
      Session.set('post-opened-' + this.slug, false)
      event.stopImmediatePropagation();
    }
  },
  
  'click': function() {
    if (! isOpen(this)) {
      Session.set('post-opened-' + this.slug, true);
    }
  },
  
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