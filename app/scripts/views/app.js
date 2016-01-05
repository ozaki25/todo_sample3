/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var AppView = Backbone.View.extend({
    template: '',

    el: '.todoapp',

    tagName: 'div',

    id: '',

    className: '',

    events: {
      'keypress .new-todo': 'createOnEnter'
    },

    initialize: function () {
      this.$input = $('.new-todo');
      this.$list = $('.todo-list');

      this.listenTo(this.collections, 'add', this.addOne);
      this.listenTo(this.collections, 'reset', this.addAll);

      this.collections.fetch({ reset: true });
    },

    render: function () {
      this.collections.length ? this.$list.show() : this.$list.hide();
    },

    addOne: function(todo) {
      var view = new TodoView({ model: todo });
      this.$list.append(view.render().el);
    },

    addAll: function() {
      this.$list.html('');
      this.collections.each(this.addOne, this);
    },

    newAttributes: function() {
      return {
	       title: this.$input.val().trim(),
	       order: this.collections.nextOrder(),
	       completed: false
      };
    },

    createOnEnter: function(e) {
      if(e.which === ENTER_KEY && this.$input.val().trim()) {
        this.collections.create(this.newAttributes());
        this.$input.val('');
      }
    }
  });

  return AppView;
});
