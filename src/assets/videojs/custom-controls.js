// Get the Component base class from Video.js
var Component = videojs.getComponent('Component');

// The videojs.extend function is used to assist with inheritance. In
// an ES6 environment, `class TitleBar extends Component` would work
// identically.
var CustomGradient = videojs.extend(Component, {

  // The `createEl` function of a component creates its DOM element.
  createEl: function() {
    return videojs.createEl('div', {

      // Prefixing classes of elements within a player with "vjs-"
      // is a convention used in Video.js.
      className: 'vjs-custom-gradient'
    });
  }
});

// Register the component with Video.js, so it can be used in players.
videojs.registerComponent('CustomGradient', CustomGradient);
