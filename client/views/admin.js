Template.admin.helpers({
  loggedIn: function() {
    return Meteor.user() && !Meteor.user().loading;
  },
  
  // kind of a hacky way 
  redirectToHome: function(){ 
    Meteor.Router.navigate('', {trigger: true});
  }
})