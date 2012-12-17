// OPEN
var isOpen = function(post) {
  var opened = Session.equals('post-opened-' + post.slug, true);
  
  return (isSelected(post) || opened) && ! post._isPrev && ! post._isNext;
}

var setOpen = function(post, value) {
  Session.set('post-opened-' + post.slug, value);;
}

// SELECTED
var isSelected = function(post) {
  return Session.equals('selected-post-slug', post.slug);
}

var anySelected = function() {
  return !! Session.get('selected-post-slug');
}

var setSelected = function(post) {
  Session.set('selected-post-slug', post.slug);
}

var getSelected = function(post) {
  return Posts.findOne({slug: Session.get('selected-post-slug')});
}

// EDITING / NEW
var inEditMode = function() {
  return Session.get('editing-post') || Session.get('creating-post');
}

var isEditing = function(post) {
  return isSelected(post) && inEditMode();
}
