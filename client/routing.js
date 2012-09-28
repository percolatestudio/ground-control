// a really basic router, based off backbone

Session.set('currentPage', 'loading');

var Router = Backbone.Router.extend({
  routes: {
    '': 'posts',
    'users': 'users',
    'admin': 'admin',
    ':year/:day/:month/:slug': 'post'
  },
  
  users: function() {
    Session.set('currentPage', 'allUsers');
  },

  admin: function() {
    Session.set('currentPage', 'admin')
  },
  
  posts: function() {
    Session.set('currentPage', 'allPosts')
  },
  
  post: function(year, day, month, slug) {
    Session.set('currentPage', 'singlePost');
    Session.set('currentPostSlug', slug);
  }
});

Meteor.startup(function() {
  Meteor.Router = new Router();
  Backbone.history.start({pushState: true});
});

// some helpers to get URLs
Routes = {
  postUrl: function(post) {
    // probably we should use moment for this
    var date = new Date(post.publishedAt);
    date = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
    return '/' + date + '/' + post.slug;
  }
}

// a handlebars helper to render the correct page
Handlebars.registerHelper('renderCurrentPage', function() {
  var name = Session.get('currentPage');
  if (Template[name])
    return Template[name]();
});