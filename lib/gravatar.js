// Code pulled from gravatar smart package
Gravatar = {
  hashFromEmail: function(email) {
    return CryptoJS.MD5(email.trim().toLowerCase()).toString();
  }, 
  avatarUrl: function(hash, options) {
    var options = options || {};

    var protocol = options.secure ? 'https' : 'http';
    delete options.secure;
    var url = protocol + '://www.gravatar.com/avatar/' + hash;

    var params = _.map(options, function(val, key) { return key + "=" + val}).join('&');
    if (params !== '')
    url += '?' + params;
    
    return url;
  }
}

if (Meteor.isClient) {
  Handlebars.registerHelper('gravatarURL', function(hash, options) {
    return Gravatar.avatarUrl(hash, options.hash);
  });
}