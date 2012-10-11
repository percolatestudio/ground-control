// XXX: resolve if this is the right way to do this
Meteor.methods({
  'noUsers': function() {
    return Meteor.users.find().count() === 0;
  }
});

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

// calculate a gravatar hash from the user's email address
Accounts.onCreateUser(function(options, user) {
  user.profile = options.profile || {};
  user.profile.gravatarHash = Gravatar.hashFromEmail(user.services.google.email);

  return user;
});