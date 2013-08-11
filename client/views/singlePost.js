Template.singlePost.helpers({
  selectedPost: function() {
    return getSelected();
  },
  showNav: function() {
    return ! inEditMode();
  },
  nextPost: function() {
    var current = getSelected(), next, found = false;
    
    publishedPosts().forEach(function(post) {
      if (found && ! next)
        next = post;
        
      if (post._id === current._id)
        found = true;
    });
    
    next && (next._isNext = true);
    return next;
  },
  prevPost: function() {
    var current = getSelected(), prev, found = false;
    
    publishedPosts().forEach(function(post) {
      if (post._id === current._id)
        found = true;
        
      if (!found)
        prev = post;
    });
    
    prev && (prev._isPrev = true);
    return prev;
  }
})

Template.post.preserve(['.post', '.post .header', '.post .header .slider', '.post .body']);

Template.post.helpers({
  open: function() {
    return isOpen(this);
  },
  openClass: function() {
    return isOpen(this) ? 'open' : '';
  },
  selectedClass: function() {
    return isSelected(this) ? 'selected' : '';
  },
  editing: function() {
    return isEditing(this);
  },
  nextPrev: function() {
    if (this._isPrev)
      return 'previous';
    if (this._isNext)
      return 'next';
  }
});

Template.post.events({
  'click .title, click .post:not(.open):not(.selected)': function(event) {
    event.preventDefault();
    Meteor.Router.navigate(Routes.postUrl(this), {trigger: true});
    $.smoothScroll({scrollTarget: 0});
  },
  
  'click .edit': function(event) {
    event.preventDefault();
    Meteor.Router.navigate(Routes.editPostUrl(this), {trigger: true});
    $.smoothScroll({scrollTarget: 0});
    return false;
  },
  
  'click .delete': function() {
    if (confirm('Are you sure you want to delete "' + this.title + '"?'))
      Posts.remove(this._id)
  }
});

Template.postMeta.helpers({
  editing: function() { return isEditing(this); },
  postLink: function() {
    return Routes.postUrl(this);
  }
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
    Meteor.Router.navigate(Routes.postUrl(this), trigger = true);
  },
  
  'click .publish': function(e) {
    this.published = true;
  },
  
  // the un-publish button doesn't save an existing post
  'click .unpublish': function(e) {
    e.preventDefault();
    Posts.update(this._id, {$set: {published: false}});
  },
    
  'submit form': function(e, template) {
    e.preventDefault();
      
    var changes = readPostForm(template);
    // this one is set when you hit the publish button
    changes.published = this.published;
    _.extend(this, changes);
    
    var errors = validatePost(this);
    if (! _.isEmpty(errors))
      return Session.set('postForm.errors', errors);
    
    Posts.update(this._id, {$set: changes});
    Meteor.Router.navigate(Routes.postUrl(this), {trigger: true});
  }
});

Template.newPost.helpers({
  newPost: function() { 
    return {
      author: Meteor.user().profile && Meteor.user().profile.name,
      color: nextPostColor()
    };
  }
});

Template.newPost.events({
  'click .cancel': function(e) {
    e.preventDefault();
    Meteor.Router.navigate('/', {trigger: true});
  },
  
  'click .publish': function(e) {
    this.published = true;
  },
  
  // this isn't possible, but just in case
  'click .unpublish': function(e) {
    this.published = false;
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
        self.publishedAt = new Date();
        self.slug = titleToSlug(self.title);
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
  },
  isPublished: function() {
    if (this._id) {
      return this.published;
    } else {
      return Session.get('newPostPublished');
    }
  }
});
