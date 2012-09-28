// XXX: make this work
Template.getStarted.preserve({
  'input[name]': function(node) { return node.name; }
});

Template.getStarted.helpers({
  // XXX: use Meteor.accounts.loginServicesConfigured to check if it's loaded yet.
  configured: function() {
    return !!Meteor.accounts.configuration.findOne({service: 'google'});
  }
})

Template.getStarted.events({
  'submit .configureGoogle': function(e, template) {
    e.preventDefault();
    
    var configuration = {
      service: 'google',
      clientId: template.find('[name=clientId]').value,
      clientSecret: template.find('[name=clientSecret]').value
    };
    
    // XXX: validation...
    console.log(configuration);
    
    Meteor.call('configureLoginService', configuration, function(err) {
      // XXX: show the user the error
      err && console.log(err);
    });
  },
  
  'click .signup': function() {
    Meteor.loginWithGoogle(function(e) {
      console.log(e);
    });
  }
})