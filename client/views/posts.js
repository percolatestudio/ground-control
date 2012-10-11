Template.allPosts.helpers({
  visiblePosts: function() {
    return allPosts().fetch().slice(0,3);
  },
  nextPost: function() {
    return (allPosts().count() > 3) && allPosts().fetch()[3];
  }
});
  
  
Template.showPost.helpers({
  currentPost: function() {
    return Posts.findOne({slug: Session.get('currentPostSlug')});
  },
    
  nextPost: function() {
    var currentPost = Posts.findOne({slug: Session.get('currentPostSlug')});
    return Posts.findOne(
      {publishedAt: {$lt: currentPost.publishedAt}},
      {sort: {publishedAt: -1}}
    );
  },
    
  previousPost: function() {
    var currentPost = Posts.findOne({slug: Session.get('currentPostSlug')});
    return Posts.findOne(
      {publishedAt: {$gt: currentPost.publishedAt}},
      {sort: {publishedAt: 1}}
    );
  }
})

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

Template.editPost.helpers({
  currentPost: function() { 
    return Posts.findOne({slug: Session.get('currentPostSlug')});
  }
});

Template.editPost.events({
  'click .cancel': function(e) {
    // XXX: check changes
    e.preventDefault();
    Meteor.Router.navigate(Routes.postUrl(this), {trigger: true});
  },
    
  'submit form': function(e, template) {
    e.preventDefault();
      
    var changes = readPostForm(template);
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
      
    var changes = readPostForm(template);
    _.extend(this, changes);

    var errors = validatePost(this);
    if (! _.isEmpty(errors))
      return Session.set('postForm.errors', errors);
    
    this.publishedAt = new Date();
    // XXX: should the slug be created server side? 
    // (would stop slugs from clobbering each other)
    // if so we need to spin until we route. That's ok though
    this.slug = titleToSlug(this.title);
    Posts.insert(this);
      
    Meteor.Router.navigate(Routes.postUrl(this), {trigger: true});
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