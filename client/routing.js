// a really basic router, based off backbone

Session.set('currentPage', 'loading');

var Router = Backbone.Router.extend({
  routes: {
    '': 'posts',
    'users': 'users',
    'admin': 'admin',
    'posts/new': 'newPost',
    ':year/:day/:month/:slug/edit': 'editPost',
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
  
  newPost: function() {
    Session.set('currentPage', 'newPost');
  },
  
  editPost: function(year, day, month, slug) {
    Session.set('currentPage', 'editPost');
    Session.set('currentPostSlug', slug);
  },
  
  post: function(year, day, month, slug) {
    Session.set('currentPage', 'showPost');
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
  },
  editPostUrl: function(post) {
    return Routes.postUrl(post) + '/edit';
  }
}

Handlebars.registerHelper('postUrl', function(post) {
  return Routes.postUrl(post);
});
Handlebars.registerHelper('editPostUrl', function(post) {
  return Routes.editPostUrl(post);
});

// a handlebars helper to render the correct page
Handlebars.registerHelper('renderCurrentPage', function() {
  var name = Session.get('currentPage');
  if (Template[name])
    return Template[name]();
});