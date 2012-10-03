Handlebars.registerHelper('formatDate', function(date) {
  return new moment(date).calendar();
});

Handlebars.registerHelper('formatDateShort', function(date) {
  return new moment(date).format('DD.MM.YYYY');
});