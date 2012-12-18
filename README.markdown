## Ground Control

Ground control is an experimental blogging platform, built in [Meteor](http://meteor.com). See an example of it in action at http://groundcontrol.meteor.com.

### Install

Ground Control is a vanilla meteor app. To install it, simply [download meteor](http://docs.meteor.com/#quickstart), then download Ground Control.

### Customization

Customization is fairly limited at this point. Edit `lib/configuration.js` and `server/configuration.js` and set the configuration variables there.

### Running

Simply run `meteor`.

### Creating Posts

You can login to Ground Control at `/admin` using a Google Account. Currently, access is limited to a set of allowed emails defined in `server/configuration.js`.

### Further customization

To do any meaningful customization, fork this repository and have fun! For example, take a look at the `percolate` branch for an example of the changes made for the Percolate Studio Blog.

Pull Requests will be appreciated! 

### TODO

Ground Control is very much a work in progress. In the near future, expect to see:

1. More configuration options.
2. Theming / pages support