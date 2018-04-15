var $ = require('jquery');
var TweenMax = require('gsap').TweenMax;
var TweenLite = require('gsap').TweenLite;
var Linear = require('gsap').Linear;
var Sine = require('gsap').Sine;

/**
 * JQuery Plugin (Leafs).
 *
 * jQuery lightweight plugin boilerplate from: @addyosmani
 */
(function ($, window, document, undefined) {
  'use strict';

  var pluginName = 'leafs';
  var pluginDataKey = 'let.leafs';

  var defaults = {
    leaf: 30
  };

  function Plugin(element, options) {
    this.$element = $(element);

    this.options = $.extend({
      width: this.$element.width(),
      height: this.$element.height()
    }, defaults, options, this.$element.data());

    this.init();
  }

  Plugin.prototype.init = function () {
    TweenLite.set(this.$element, { perspective: 600 });
    TweenLite.set('img', { xPercent: '-50%', yPercent: '-50%' });

    for (var i = 0; i < this.options.leaf; i++) {
      var leaf = document.createElement('div');
      TweenLite.set(leaf, {
        attr: { class: 'leaf' },
        x: this.getRandom(0, this.options.width),
        y: this.getRandom(-200, -150),
        z: this.getRandom(-200, 200)
      });

      this.$element.append(leaf);

      this.animateLeaf(leaf);
    }
  };

  Plugin.prototype.update = function () {
    // not necessary implementation.
  };

  Plugin.prototype.animateLeaf = function (leaf) {
    TweenMax.to(leaf, this.getRandom(6, 15), {
      y: this.options.height + 100,
      ease: Linear.easeNone,
      repeat: -1,
      delay: -15
    });

    TweenMax.to(leaf, this.getRandom(4, 8), {
      x: '+=100',
      rotationZ: this.getRandom(0, 180),
      repeat: -1,
      yoyo: true,
      ease: Sine.easeInOut
    });

    TweenMax.to(leaf, this.getRandom(2, 8), {
      rotationX: this.getRandom(0, 360),
      rotationY: this.getRandom(0, 360),
      repeat: -1,
      yoyo: true,
      ease: Sine.easeInOut,
      delay: -5
    });
  };

  Plugin.prototype.getRandom = function (min, max) {
    return min + Math.random() * (max - min);
  };

  Plugin.prototype.setOptions = function (options) {
    this.options = $.extend(this.options, options, this.$element.data());
    this.update();
  };

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, pluginDataKey)) {
        $.data(this, pluginDataKey, new Plugin(this, options));
      } else {
        $.data(this, pluginDataKey).setOptions(options);
      }
    });
  };

})($, window, document);