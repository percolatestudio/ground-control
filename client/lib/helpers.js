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
