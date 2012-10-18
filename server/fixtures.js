// load fixture data if the db is empty
// XXX: is there some way to tell if you are in development?
//  - ideally we'd have some kind of script runner to load this
Meteor.startup(function() {
  if (Posts.find().count() === 0) {
    var title;
    
    Posts.insert({
      title: title = 'Meteor 0.4.1: Sending email and Node 0.8',
      slug: titleToSlug(title),
      // XXX: we'll need to figure out authorId when we actually use it
      author: 'Matt DeBergalis',
      authorGravatarHash: '182ca8f6769f9e589ccfe4c15b9a130a',
      publishedAt: new Date(2012, 8, 25),
      body: [
        "We are hard at work polishing up Meteor Accounts, our full-featured auth system that supports login with Facebook and Google, or with secure passwords. Many Meteor developers are already using it on our pre-release [`auth`](https://github.com/meteor/meteor/tree/auth) branch and contributing code: we've merged pull requests for Twitter and Weibo login services, with more on the way. See the [Getting Started with Auth](https://github.com/meteor/meteor/wiki/Getting-Started-with-Auth) page on our wiki and the email traffic on [the meteor-core list](https://groups.google.com/forum/?fromgroups#!forum/meteor-core) if you want to get an early look.",
        "One result of that effort is Meteor 0.4.1's new [`email` smart package](http://docs.meteor.com/#email) for sending email messages, which Meteor Accounts uses to send password recovery and welcome emails. When running locally, emails prints to the console for ease of debugging. In production, `Email.send()` will work with any standard SMTP server.",
        "But there's more than just an API. We've partnered with [Rackspace's Mailgun team](http://mailgun.com) so that every app deployed with `$ meteor deploy` can send email right away, without any annoying configuration process. These automatic accounts are capped at 200 messages a day, but of course you're not tied to them. You can use any SMTP server (your own box, a paid Mailgun account, or anything else) just by setting the `$MAIL_URL` environment variables, whether you're using our deploy servers or running your own bundles.",
        "To update your installation, just run `$ meteor update`. If you haven't tried Meteor yet and you're on Linux or a Mac, you can get started with `$ curl https://install.meteor.com | sh` inside a terminal window.",
        "Meteor 0.4.1 includes some additional changes. We've upgraded [Node.js](http://nodejs.org) from [0.6 to 0.8](https://github.com/joyent/node/wiki/API-changes-between-v0.6-and-v0.8), the latest stable release line of the JavaScript engine that Meteor's server-side components run on. We've made our API more consistent with JavaScript standards by converting the last few old APIs from inch_worm spellings to camelCase (though the old names continue to work for now). And we incorporated a slew of other improvements and bug fixes from the Meteor community; see [History.md](https://github.com/meteor/meteor/blob/master/History.md) for full details."
      ].join('\n\n')      
    });
    
    Posts.insert({
      title: title = 'Introducing Spark: a new live page update engine',
      slug: titleToSlug(title),
      author: 'David Greenspan',
      authorGravatarHash: '696549174910acff6ad306a38ed8c1fc',
      publishedAt: new Date(2012, 8, 1),
      body: [
        "We've just pushed Meteor 0.4.0. In this release, we're proud to introduce a major new technology: Spark, a live page update engine by David Greenspan and Geoff Schmidt. Spark replaces the old `liveui` package and works under the hood to enable several powerful new template features.",
        "You can think of Spark as a declarative version of jQuery. jQuery is imperative. To get work done in jQuery, you tell it to carry out a series of actions: 'Find these nodes. Add this class to them. Replace this thing with that.' Spark is declarative. You tell it how you want the page to look, and not only does it make the page look that way, it keeps the page updated as data changes. Spark weighs in at 8k gzipped and minified, including all of its dependencies, and it's easily separable from the rest of Meteor.",
        "Spark is intended to be a low-level building block. It's the basis for Meteor's templating support, and Meteor developers may never need to know about it. You'd use Spark from a Meteor project if you're writing your own templating system (eg, packaging a Handlebars alternative), or if you're doing something fancy and low-level.",
        "Spark enables several highly requested features in Meteor templates:",
        " - Embeds: You can now embed external widgets like Google Maps or D3 directly into a Meteor app. Reactive updates to the page will take into account regions that are managed by third-party libraries, refreshing their surrondings but leaving the region untouched. Just wrap your embedded widget with the `{{#constant}}...{{/constant}}` block helper to indicate that it shouldn't be altered by page updates. See Constant regions in the docs for more.",
        " - Template lifecycle callbacks: You can get a callback when the template has been rendered and placed on the screen (meaning it can be manipulated by other libraries like jQuery) and also when the template has been taken off the screen (so you can tear down any resources associated with it, like timers.) See the `Template.myTemplate.rendered` docs for more.",
        " - DOM preservation: Meteor has the ability to preserve DOM nodes in place while updating the surrounding HTML. This means, for example, that text input fields won't be disturbed and CSS animations will run without interruption. You now have explicit control over which nodes are preserved using the `preserve` directive on templates.",
        " - Find-by-selector: It's now easy to find DOM nodes by selector within a template. Event handlers take a second argument, 'template', which provides `template.find(selector)` and `template.findAll(selector)`. In template callbacks, they are available as `this.find` and `this.findAll`."
      ].join('\n\n')
    });
    for (var i = 0; i < 10; i++) {
      Posts.insert({
        title: title = 'Another Post #' + i,
        slug: titleToSlug(title),
        author: 'Matt DeBergalis',
        authorGravatarHash: '182ca8f6769f9e589ccfe4c15b9a130a',
        publishedAt: new Date(2012, 7, i),
        body: [
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
          "",
          "     for (i = 0; i < 1000; i++) {",
          "       console.log('foo');",
          "     }"
          ].join('\n\n')
      }); 
    }
  }
});