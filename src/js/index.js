var $ = require('jquery');

require('./plugins/jquery.presentation');
require('./plugins/jquery.leafs');

require('../scss/main.scss');

$(function () {

  $('.presentation').presentation({
    layers: [
      '#experience-1',
      '#experience-2',
      '#end'
    ],
    nav: '.link'
  });

  $('.bg-leaf').leafs();

});