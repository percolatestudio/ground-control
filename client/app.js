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

Template.body.events({
  'click .newPost': function() {
    Session.set('creatingNew', true);
  },
  
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

Template.header.preserve(['#header']);
var checkBanner = function() {
  // if the banner is no longer visible, we have scrolled enough
  var bannerBottom = $('#banner').offset().top + $('#banner').height();
  Session.set('scrolledEnough', $(window).scrollTop() > bannerBottom);
};
Template.header.created = function() {
  $(window).scroll(_.throttle(checkBanner, 100));
}
Template.header.rendered = function() {
  checkBanner();
}

Template.header.helpers({
  scrolledEnoughClass: function() { 
    return Session.get('scrolledEnough') ? 'scrolledEnough' : '';
  },
  anySelected: function() {
    return anySelected();
  }
});

Template.header.events({
  'click .top': function(event) {
    event.preventDefault();
    
    $.smoothScroll({scrollTarget: 0});
  },
  
  'click .back': function(event) {
    event.preventDefault();
    Meteor.Router.navigate('/', {trigger: true});
  }
})
