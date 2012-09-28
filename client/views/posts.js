(function() {

  Template.singlePost.helpers({
    currentPost: function() {
      return Posts.findOne({slug: Session.get('currentPostSlug')});
    }
  })

  Template.allPosts.helpers({
    posts: function() { return Posts.find({}, {sort: {publishedAt: -11}}); }
  });

  Template.post.helpers({
    'editing': function() { 
      // XXX: how can we avoid using a session var for this kind of thing?
      // can we some how use the template instance reactively?
      return Session.equals('editingPostId', this._id);
    }
  })

  Template.post.events({
    'click .edit': function() { 
      Session.set('editingPostId', this._id);
    },
    
    'click .delete': function() {
      if (confirm('Are you sure you want to delete "' + this.title + '"?'))
        Posts.remove(this._id)
    }
  });

  Template.showPost.helpers({
    url: function() {
      return Routes.postUrl(this);
    },
  
    // XXX: this should probably be global
    formatDate: function(date) {
      return new moment(date).calendar();
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
  
  Template.editPost.events({
    'click .cancel': function(e) {
      e.preventDefault();
      Session.set('editingPostId', null);
    },
    
    'submit form': function(e, template) {
      e.preventDefault();
      
      var change = readPostForm(template);
      Posts.update(this._id, {$set: change});
      
      // perhaps we should be routing around here as well..
      Session.set('editingPostId', null);
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
      Meteor.Router.navigate('/', {trigger: true});
    },
    
    'submit form': function(e, template) {
      e.preventDefault();
      
      var post = readPostForm(template);
      post.publishedAt = new Date();
      // XXX: should the slug be created server side? 
      // (would stop slugs from clobbering each other)
      // if so we need to wait until we route. That's ok though
      post.slug = titleToSlug(post.title);
      Posts.insert(post);
      
      Meteor.Router.navigate(Routes.postUrl(post), {trigger: true});
    }
  });
}());
