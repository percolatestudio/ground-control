Handlebars.registerHelper('sessionEquals', function(key, value) {
  return Session.equals(key, value);
});

Handlebars.registerHelper('sessionGet', function(key) {
  return Session.get(key);
});

Handlebars.registerHelper('currentUserVerified', function() {
  return !Meteor.loggingIn() && Meteor.user() && userVerified(Meteor.user());
})

Handlebars.registerHelper('formatDate', function(date) {
  return new moment(date).calendar();
});

Handlebars.registerHelper('formatDateShort', function(date) {
  return new moment(date).format('DD.MM.YYYY');
});

Handlebars.registerHelper('blogName', function() {
  return GroundControlConfig.blogName;
});



// XXX: put this somewhere
Handlebars.registerHelper('appName', function() {
  return 'Ground Control';
});
