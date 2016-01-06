/// <reference path="../../typings/tsd.d.ts" />

'use strict';

require.config({
  shim: {
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    },
    jquery: {
      exports: '$'
    },
    underscore: {
      exports: '_'
    }
  },
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    backbone: '../bower_components/backbone/backbone',
    underscore: '../bower_components/lodash/dist/lodash',
    bootstrap: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap'
  }
});

require([
  'jquery',
  'backbone'
], function ($, Backbone) {
  Backbone.history.start();
});
