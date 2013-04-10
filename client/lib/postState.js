// OPEN
isOpen = function(post) {
  var opened = Session.equals('post-opened-' + post.slug, true);
  
  return (isSelected(post) || opened) && ! post._isPrev && ! post._isNext;
}

setOpen = function(post, value) {
  Session.set('post-opened-' + post.slug, value);;
}

// SELECTED
isSelected = function(post) {
  return Session.equals('selected-post-slug', post.slug);
}

anySelected = function() {
  return !! Session.get('selected-post-slug') || Session.get('creating-post');
}

setSelected = function(post) {
  Session.set('selected-post-slug', post.slug);
}

getSelected = function(post) {
  return Posts.findOne({slug: Session.get('selected-post-slug')});
}

// EDITING / NEW
inEditMode = function() {
  return Session.get('editing-post') || Session.get('creating-post');
}

isEditing = function(post) {
  return isSelected(post) && inEditMode();
}
