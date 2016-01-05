/*global define*/

define([
  'underscore',
  'backbone',
  'models/todo'
], function (_, Backbone, TodoModel) {
  'use strict';

  var TodosCollection = Backbone.Collection.extend({
    model: TodoModel,

    localStorage: new Backbone.LocalStorage('todos-backbone'),

    nextOrder: function() {
      return this.length ? this.last().get('order') + 1 : 1;
    },

    comparator: 'order'
  });

  return TodosCollection;
});
