_.extend(GroundControlConfig, {
  // Set the email domain (or regexp) that signing up users must conform to
  allowedEmails: /(@meteor\.com|@percolatestudio\.com)$/,
  
  // load up some test data from meteor.com/blog when the page first loads
  loadFixtures: true
});
