Accounts.config({
  sendVerificationEmail: true
});


DefaultSettings = {
  // the name of the blog
  blogName: 'Meteor Blog',
  
  // Set the email domain (or regexp) that signing up users must conform to
  allowedEmails: /(@meteor\.com|@percolatestudio\.com)$/,
  
  // load up some test data from meteor.com/blog when the page first loads
  loadFixtures: true
}

// load all the default settings into the database
Meteor.startup(function() {
  _.each(_.keys(DefaultSettings), function(name) {
    if (! Settings.findOne({name: name}))
      Settings.insert({name: name, value: DefaultSettings[name]});
  });
})