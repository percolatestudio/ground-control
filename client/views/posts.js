Template.allPosts.rendered = function() { 
  if (allPosts().count() > 0) {
    Meteor.setTimeout(function() {
      Session.set('animationBegun', true)
    }, 1000);
  }
}

Template.allPosts.helpers({
  posts: function() { return allPosts(); },
  anySelectedClass: function() { return anySelected() ? 'anySelected' : ''; },
  animatingClass: function() { 
    return Session.get('animationBegun') ? 'animating' : ''; 
  },
  creatingNew: function() { return Session.get('creatingNew'); }
});

var isOpen = function(post) {
  return Session.equals('post-opened-' + post.slug, true);
}

var setOpen = function(post, value) {
  Session.set('post-opened-' + post.slug, value);;
}

var isEditing = function(post) {
  return Session.equals('post-editing-' + post.slug, true);
}

var setEditing = function(post, value) {
  Session.set('post-editing-' + post.slug, value);
}

var anySelected = function() {
  return !! Session.get('selected-post-slug');
}

var isSelected = function(post) {
  return Session.equals('selected-post-slug', post.slug);
}

var setSelected = function(post) {
  Session.set('selected-post-slug', post.slug);
}

Template.post.preserve(['.post', '.post .header', '.post .header .slider', '.post .body']);

Template.post.helpers({
  open: function() { return isOpen(this); },
  openClass: function() { return isOpen(this) ? 'open' : ''; },
  selectedClass: function() { return isSelected(this) ? 'selected' : ''; },
  editing: function() { return isEditing(this); }
});

Template.post.events({
  'click': function(event) {
    event.preventDefault();
    Meteor.Router.navigate(Routes.postUrl(this), {trigger: true});
  },
  
  // 'click .slider': function(event) {
  //   if (isOpen(this)) {
  //     setOpen(this, false);
  //     event.stopImmediatePropagation();
  //   }
  // },
  // 'click': function() {
  //   isOpen(this) || setOpen(this, true);
  // },
  
  'click .edit': function(event) {
    event.preventDefault();
    Meteor.Router.navigate(Routes.editPostUrl(this));
    setEditing(this, true);
  },
  
  'click .delete': function() {
    if (confirm('Are you sure you want to delete "' + this.title + '"?'))
      Posts.remove(this._id)
  }
});

Template.postMeta.helpers({
  editing: function() { return isEditing(this); }
})

/////// edit/new post stuff
// read the three values out of the form
var readPostForm = function(template) {
  var post = {}
  post.title = template.find('[name=title]').value;
  post.author = template.find('[name=author]').value;
  post.body = template.find('[name=body]').value;
    
  return post;
}

Template.editPost.events({
  'click .cancel': function(e) {
    // XXX: check changes
    e.preventDefault();
    Meteor.Router.navigate(Routes.postUrl(this));
    
    // prevent redrawing, XXX: probably a better way to do this
    this._rendered = false;
    setEditing(this, false);
  },
    
  'submit form': function(e, template) {
    e.preventDefault();
      
    var changes = readPostForm(template);
    _.extend(this, changes);
    
    var errors = validatePost(this);
    if (! _.isEmpty(errors))
      return Session.set('postForm.errors', errors);
    
    Posts.update(this._id, {$set: changes});
    Meteor.Router.navigate(Routes.postUrl(this));
    setEditing(this, false);
  }
});

Template.newPost.helpers({
  newPost: function() { 
    return {author: Meteor.user().profile && Meteor.user().profile.name};
  }
});

Template.newPost.events({
  'click .cancel': function(e) {
    e.preventDefault();
    Session.set('creatingNew', false);
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
        Meteor.Router.navigate(Routes.postUrl(self));
        Session.set('creatingNew', false);
        setOpen(self, true);
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