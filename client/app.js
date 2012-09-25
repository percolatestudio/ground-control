Meteor.subscribe('posts');


Meteor.startup(function() {
  Meteor.call('noUsers', function(err, none) {
    Session.set('noUsers', none);
  })
});

Template.body.helpers({
  'noUsers': function() {
    return Session.get('noUsers');
  }
})