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

// XXX: put this somewhere
Handlebars.registerHelper('appName', function() {
  return 'Houston';
});


Template.body.events({
  'click [href]': function(e) {
    // code stolen from pages branch, not really complete
    if (e.shiftKey || e.ctrlKey || e.metaKey) return true;
    
    var href = $(e.target).attr('href')
    
    // relativize
    var prefix = window.location.protocol + "//" + window.location.hostname;
    if (href && href.indexOf(prefix) === 0)
      href = href.substring(prefix.length);
    
    if (href && ! /^\w+:/.exec(href)) {
      e.preventDefault();
      
      if (href !== document.location.pathname)
        Meteor.Router.navigate(href, {trigger: true});
    }
  }
})

