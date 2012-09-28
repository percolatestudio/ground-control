Meteor.subscribe('posts');

Meteor.startup(function() {
  Meteor.call('noUsers', function(err, none) {
    if (none) {
      // XXX: how to unset this when they sign in?
      Session.set('noUsers', true);
      
      Meteor.Router.navigate('/admin', {trigger: true});
    } 
  })
});

Handlebars.registerHelper('appName', function() {
  return 'Houston';
});