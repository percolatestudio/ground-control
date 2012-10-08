Meteor.publish('posts', function() {
  return Posts.find();
});

Posts.allow({
  insert: function(userId) { 
    return !! userId;
  },
  update: function(userId) { 
    return !! userId;
  },
  remove: function(userId) { 
    return !! userId;
  }

})

// XXX: resolve if this is the right way to do this
Meteor.methods({
  'noUsers': function() {
    return Meteor.users.find().count() === 0;
  }
})

// user account validation. Set this value in server/configuration.js
Accounts.validateNewUser(function(proposedUser) {
  var email = proposedUser.services.google.email;
  
  function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  }
  
  if (_.isRegExp(Accounts.allowedEmails))
    return Accounts.allowedEmails.test(email);
  else
    return endsWith(email, Accounts.allowedEmails);
});