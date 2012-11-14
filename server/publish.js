Meteor.publish('posts', function() {
  return Posts.find();
});

// anyone can edit any post, but you do need to be logged in
Posts.allow({
  insert: function(userId, post) { 
    return !!userId && _.isEmpty(validatePost(post));
  },
  update: function(userId) { 
    // XXX: it'd be nice to check that the posts are valid here, but it's THB
    return !! userId;
  },
  remove: function(userId) { 
    return !! userId;
  },
  fetch: []
});

// can't change slug
Posts.deny({
  insert: function(userId, docs, fields) {
    return _.contain(fields, 'slug');
  }
})

// you can only see users if you are logged in
Meteor.publish('users', function() {
  if (this.userId)
    return Users.find();
})