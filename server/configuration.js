<<<<<<< HEAD
_.extend(GroundControlConfig, {
  // Set the email domain (or regexp) that signing up users must conform to
  allowedEmails: /(@percolatestudio\.com)$/,
  
  // load up some test data from meteor.com/blog when the page first loads
  // loadFixtures: true
=======
Accounts.config({
  sendVerificationEmail: true
>>>>>>> master
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
