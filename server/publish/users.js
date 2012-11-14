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

// user account validation. Set this value in server/configuration.js
Accounts.validateNewUser(function(proposedUser) {
  var email = userEmail(proposedUser);
  
  function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  }
  
  if (_.isRegExp(GroundControlConfig.allowedEmails))
    return GroundControlConfig.allowedEmails.test(email);
  else
    return endsWith(email, GroundControlConfig.allowedEmails);
});

// calculate a gravatar hash from the user's email address
Accounts.onCreateUser(function(options, user) {
  user.profile = options.profile || {};
  user.profile.gravatarHash = Gravatar.hashFromEmail(userEmail(user));

  return user;
});