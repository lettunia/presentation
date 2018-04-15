var $ = require('jquery');

/**
 * JQuery Plugin (Presentation).
 *
 * jQuery lightweight plugin boilerplate from: @addyosmani
 */
(function ($, window, document, undefined) {
  'use strict';

  var pluginName = 'presentation';
  var pluginDataKey = 'let.presentation';

  var defaults = {
    index: 0,
    interval: 10000
  };

  function Plugin(element, options) {
    this.$element = $(element);

    this.options = $.extend({}, defaults, options, this.$element.data());

    this.init();
  }

  Plugin.prototype.init = function () {
    this.setupNav();
    this.displayLayer();
  };

  Plugin.prototype.setupNav = function () {
    var that = this;

    this.$element.find(this.options.nav).on('click', function (e) {
      e.preventDefault();

      that.options.index = that.options.layers.indexOf($(this).attr('href'));
      that.displayLayer();
    });
  };

  Plugin.prototype.displayLayer = function () {
    this.$element.find('.layer').removeClass('layer-active');
    var currentLayer = this.options.layers[this.options.index];

    this.$element
      .find(currentLayer)
      .addClass('layer-active');

    if (this.options.index < this.options.layers.length - 1) {
      this.options.index++;
      setTimeout(this.displayLayer.bind(this), this.options.interval)
    }
  };

  Plugin.prototype.update = function () {
    // not necessary implementation.
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
