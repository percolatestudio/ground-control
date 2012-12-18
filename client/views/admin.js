Template.admin.helpers({
  loggedIn: function() {
    return ! Meteor.loggingIn() && Meteor.user();
  }
});

Template.adminPostsList.helpers({
  posts: function() {
    return allPosts();
  }
})