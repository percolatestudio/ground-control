// you can only see users if you are logged in
Meteor.publish('users', function() {
  if (this.userId)
    return Meteor.users.find();
})

// XXX: resolve if this is the right way to do this
Meteor.methods({
  noUsers: function() {
    return Meteor.users.find().count() === 0;
  },
  inviteUser: function(email) {
    if (!this.userId)
      throw new Meteor.Exception('Must be logged in to create users!');
    
    // go around Meteor.createUser, so that we can hardwire something in to
    // skip the validation.
    // If we didn't do this, then whatever we did here could be replicated
    // by a client calling the createUser method. That would be bad.
    var record = Accounts.insertUserDoc({}, {
      services: {},
      emails: [{address: email, verified: true}],
      invited: true
    });
    
    Accounts.sendEnrollmentEmail(record.id);
  }
});


// New user account validation. We check that one of:
//   A. They are the first user to be created.
//   B. They have been invited.
//   C. Their email address has the correct domain (if the domain setting is used)
//
//   Note that in cases B. & C. the user cannot properly login until they
//   have verified their email address.
Accounts.validateNewUser(function(proposedUser) {
  if (proposedUser.invited)
    return true;
  
  if (Meteor.call('noUsers'))
    return true;
  
  var email = userEmail(proposedUser);
  
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
  
  // don't need to verify the very first user
  if (user.emails[0] && Meteor.call('noUsers')) 
    user.emails[0].verified = true;
  
  return user;
});