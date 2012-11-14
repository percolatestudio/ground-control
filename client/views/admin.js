Template.admin.helpers({
  loggedIn: function() {
    return Meteor.user() && !Meteor.user().loading;
  }
});

Template.adminPostsList.helpers({
  posts: function() {
    return allPosts();
  }
})