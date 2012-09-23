// load fixture data if the db is empty
// XXX: is there some way to tell if you are in development?
//  - ideally we'd have some kind of script runner to load this
Meteor.startup(function() {
  if (Posts.find().count() === 0) {
    var title;
    
    Posts.insert({
      title: title = 'Introducing Spark: a new live page update engine',
      author: 'David Greenspan',
      // XXX: what's the accepted way to store dates?
      published: new Date(2012, 09, 1).valueOf(),
      slug: titleToSlug(title),
      story: ["We've just pushed Meteor 0.4.0. In this release, we're proud to introduce a major new technology: Spark, a live page update engine by David Greenspan and Geoff Schmidt. Spark replaces the old liveui package and works under the hood to enable several powerful new template features.",
       "You can think of Spark as a declarative version of jQuery. jQuery is imperative. To get work done in jQuery, you tell it to carry out a series of actions: 'Find these nodes. Add this class to them. Replace this thing with that.' Spark is declarative. You tell it how you want the page to look, and not only does it make the page look that way, it keeps the page updated as data changes. Spark weighs in at 8k gzipped and minified, including all of its dependencies, and it's easily separable from the rest of Meteor.",
       "Spark is intended to be a low-level building block. It's the basis for Meteor's templating support, and Meteor developers may never need to know about it. You'd use Spark from a Meteor project if you're writing your own templating system (eg, packaging a Handlebars alternative), or if you're doing something fancy and low-level.",
       "Spark enables several highly requested features in Meteor templates:",
       " - Embeds: You can now embed external widgets like Google Maps or D3 directly into a Meteor app. Reactive updates to the page will take into account regions that are managed by third-party libraries, refreshing their surrondings but leaving the region untouched. Just wrap your embedded widget with the {{#constant}}...{{/constant}} block helper to indicate that it shouldn't be altered by page updates. See Constant regions in the docs for more.",
       " - Template lifecycle callbacks: You can get a callback when the template has been rendered and placed on the screen (meaning it can be manipulated by other libraries like jQuery) and also when the template has been taken off the screen (so you can tear down any resources associated with it, like timers.) See the Template.myTemplate.rendered docs for more.",
       " - DOM preservation: Meteor has the ability to preserve DOM nodes in place while updating the surrounding HTML. This means, for example, that text input fields won't be disturbed and CSS animations will run without interruption. You now have explicit control over which nodes are preserved using the preserve directive on templates.",
       " - Find-by-selector: It's now easy to find DOM nodes by selector within a template. Event handlers take a second argument, 'template', which provides template.find(selector) and template.findAll(selector). In template callbacks, they are available as this.find and this.findAll."].join('\n')
    })
  }
});