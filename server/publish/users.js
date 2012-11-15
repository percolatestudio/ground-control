// you can only see users if you are logged in
Meteor.publish('users', function() {
  if (this.userId)
    return Meteor.users.find();
})

// XXX: resolve if this is the right way to do this
Meteor.methods({
  'noUsers': function() {
    return Meteor.users.find().count() === 0;
  }
});

userEmail = function(user) {
  if (_.isUndefined(user.services.google)) {
    return email = user.emails[0].address;
  } else {
    return email = user.services.google.email;
  }
}

// New user account validation. We check that one of:
//   A. They are the first user to be created.
//   B. They have been invited.
//   C. Their email address has the correct domain (if the domain setting is used)
//
//   Note that in cases B. & C. the user cannot properly login until they
//   have verified their email address.
Accounts.validateNewUser(function(proposedUser) {
  if (Meteor.call('noUsers'))
    return true;
    
  var email = userEmail(proposedUser);
  
  var invited = Users.findOne({email: email, invited: true});
  if (invited) {
    // delete the invited user. XXX: is this the right point to do this?
    Users.remove({email: email, invited: true});
    return true;
  }
  
  function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  }
  
  var emailDomain = getSetting('emailDomain');
  return emailDomain && 
    (endsWith(email, '.' + emailDomain) || endsWith(email, '@' + emailDomain));
});

// When a user is being created, we save down their gravatar hash from their email.
Accounts.onCreateUser(function(options, user) {
  user.profile = options.profile || {};
  user.profile.gravatarHash = Gravatar.hashFromEmail(userEmail(user));

  return user;
});