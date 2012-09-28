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

// user account validation. Set this value in server/configuration.js
Meteor.accounts.validateNewUser(function(proposedUser) {
  var email = proposedUser.services.google.email;
  
  function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  }
  
  if (_.isRegExp(Meteor.accounts.allowedEmails))
    return Meteor.accounts.allowedEmails.test(email);
  else
    return endsWith(email, Meteor.accounts.allowedEmails);
});