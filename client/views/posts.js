Template.singlePost.helpers({
  currentPost: function() {
    return Posts.findOne({slug: Session.get('currentPostSlug')});
  }
})

Template.allPosts.helpers({
  posts: function() { return Posts.find(); }
});

Template.post.helpers({
  'editing': function() { 
    // XXX: how can we avoid using a session var for this kind of thing?
    // can we some how use the template instance reactively?
    return Session.equals('editingPostId', this._id);
  }
})

Template.post.events({
  'click .edit': function(e, instance) { 
    Session.set('editingPostId', this._id);
  }
});

Template.showPost.helpers({
  url: function() {
    return Routes.postUrl(this);
  },
  
  // XXX: this should probably be global
  formatDate: function(date) {
    // XXX: format... use moment.js?
    return new Date(date);
  }
});

Template.editPost.events({
  'click .cancel': function() {
    Session.set('editingPostId', null);
  },
  
  'submit form': function(e, template) {
    e.preventDefault();
    
    var change = {}
    change.title = template.find('[name=title]').value;
    change.author = template.find('[name=author]').value;
    change.story = template.find('[name=story]').value;
    
    Posts.update(this._id, {$set: change});
    Session.set('editingPostId', null);
  }
})