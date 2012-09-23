Template.posts.helpers({
  posts: function() { return Posts.find(); }
});

Template.post.helpers({
  // XXX: this should probably be global
  formatDate: function(date) {
    // XXX: format... use moment.js?
    return new Date(date);
  }
})