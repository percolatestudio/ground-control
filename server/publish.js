Meteor.publish('posts', function() {
  return Posts.find();
});

// XXX: do auth properly
Posts.allow({
  'update': function() { 
    return true;
  }
})

// XXX: resolve if this is the right way to do this
Meteor.methods({
  'noUsers': function() {
    return Meteor.users.find().count() === 0;
  }
})