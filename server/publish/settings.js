Meteor.publish('settings', function() {
  return Settings.find();
});

// for now, any user can modify any setting
Settings.allow({
  insert: function(userId) { return !! userId; },
  update: function(userId) { return !! userId; },
  remove: function(userId) { return !! userId; }
});