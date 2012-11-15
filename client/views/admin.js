Template.admin.helpers({
  loggedIn: function() {
    return Meteor.userLoaded() && Meteor.user();
  }
});

Template.adminPostsList.helpers({
  posts: function() {
    return allPosts();
  }
})