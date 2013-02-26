Template.postList.helpers({
  posts: function() {
    return publishedPosts();
  },
  anySelected: function() {
    return anySelected();
  },
  anySelectedClass: function() {
    return anySelected() || Session.get('creating-post') ? 'anySelected' : '';
  },
  animatingClass: function() { 
    return Session.get('animationBegun') ? 'animating' : ''; 
  },
  creatingNew: function() {
    return Session.get('creating-post');
  }
});

