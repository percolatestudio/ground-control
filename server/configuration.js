Accounts.config({
  sendVerificationEmail: true
});

DefaultSettings = {
  // Set the email domain (or regexp) that signing up users must conform to
  emailDomain: 'percolatestudio.com'
}

// load all the default settings into the database
Meteor.startup(function() {
  _.each(_.keys(DefaultSettings), function(name) {
    if (! Settings.findOne({name: name}))
      Settings.insert({name: name, value: DefaultSettings[name]});
  });
})
