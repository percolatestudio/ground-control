// a really basic router, based off backbone

Session.set('currentPage', 'loading');
N_VISIBLE_POSTS = 3;

Router = Backbone.Router.extend({
  routes: {
    '': 'home',
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
  
  home: function() {
    setMetaTags({title: GroundControlConfig.blogName});

    Session.set('currentPage', 'postList')
    Session.set('selected-post-slug', null);
    Session.set('creating-post', false);
    // wait for the posts to load, then open up the first three
    Meteor.autorun(function() {
      var posts = publishedPosts().fetch();
      
      _.each(posts, function(post, i) {
        setOpen(posts[i], i < N_VISIBLE_POSTS);
      });
    });
  },
  
  newPost: function() {
    Session.set('currentPage', 'newPost')
    Session.set('selected-post-slug', null);
    Session.set('creating-post', true);
    Session.set('newPostPublished', false);
  },
  
  post: function(year, day, month, slug) {
    Session.set('currentPage', 'singlePost')
    Session.set('selected-post-slug', slug);
    Session.set('editing-post', false);
    Session.set('creating-post', false);
    
    // ensure the post is loaded
    var handle = Meteor.autorun(function() {
      var post = getSelected();
      if (post) {
        setMetaTags({title: post.title, description: post.body});
        handle && handle.stop();
      }
    })
  },
  
  editPost: function(year, day, month, slug) {
    Session.set('currentPage', 'singlePost')
    Session.set('selected-post-slug', slug);
    Session.set('editing-post', true);
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