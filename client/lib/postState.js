var isOpen = function(post) {
  return Session.equals('post-opened-' + post.slug, true);
}

var setOpen = function(post, value) {
  Session.set('post-opened-' + post.slug, value);;
}

var isEditing = function(post) {
  return Session.equals('post-editing-' + post.slug, true);
}

var setEditing = function(post, value) {
  Session.set('post-editing-' + post.slug, value);
}

var anySelected = function() {
  return !! Session.get('selected-post-slug');
}

var isSelected = function(post) {
  return Session.equals('selected-post-slug', post.slug);
}

var setSelected = function(post) {
  Session.set('selected-post-slug', post.slug);
}

var getSelected = function(post) {
  return Posts.findOne({slug: Session.get('selected-post-slug')});
}

