Template.admin.helpers({
  loggedIn: function() {
    return ! Meteor.loggingIn() && Meteor.user();
  }
});

Template.adminSettings.helpers({
  emailDomain: function() { return getSetting('emailDomain'); }
})

Template.adminSettings.events({
  'submit form': function(e, template) {
    e.preventDefault();
    
    var domain = template.find('[name=emailDomain]').value;
    // XXX: validation?
    updateSetting('emailDomain', domain);
  }
})

Template.adminUsersList.helpers({
  admins: function() {
    return Meteor.users.find();
  },
  email: function() {
    return userEmail(this);
  },
  state: function() {
    return userState(this);
  },
  isCurrentUser: function() {
    return Meteor.user()._id === this._id;
  }
});

Template.adminUsersList.events({
  'submit form': function(e, template) {
    e.preventDefault();
    
    var email = template.find('[name=email]').value;
    // XXX: validation?
    Meteor.call('inviteUser', email);
  },
  
  'click .delete': function(e) {
    e.preventDefault();
    
    if (confirm("Are you sure you want to delete the user with email <" + userEmail(this) + "> ?"))
      Meteor.users.remove(this._id);
  }
})

Template.adminPostsList.helpers({
  posts: function() {
    return allPosts();
  }
});

Template.adminPostsList.events({
  'click .publish': function(e) {
    e.preventDefault();
    Posts.update(this._id, {$set: {published: true}});
  },
  
  'click .unpublish': function(e) {
    e.preventDefault();
    Posts.update(this._id, {$set: {published: false}});
  }
})