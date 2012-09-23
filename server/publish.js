Meteor.publish('posts', function() {
  return Posts.find();
});

// XXX: do auth properly
Posts.allow({
  'update': function() { 
    return true;
  }
})