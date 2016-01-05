/*global define*/

define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var TodoModel = Backbone.Model.extend({
    url: '',

    initialize: function() {
    },

    defaults: {
      title: '',
      completed: false
    },

    validate: function(attrs, options) {
    },

    parse: function(response, options)  {
      return response;
    }
  });

  return TodoModel;
});
