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

Template.adminPostsList.helpers({
  posts: function() {
    return allPosts();
  }
})