Template.signup.events({
  'click .signup': function() {
    Meteor.loginWithGoogle(function(e) {
      console.log(e);
    });
  }
})