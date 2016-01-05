/*global define*/

define([
  'jquery',
  'underscore',
  'backbone',
  'templates'
], function ($, _, Backbone, JST) {
  'use strict';

  var TodoView = Backbone.View.extend({
    template: JST['app/scripts/templates/todo.ejs'],

    tagName: 'li',

    id: '',

    className: 'list-group-item',

    events: {
      'click .todo-title': 'edit',
      'click .destroy': 'clear',
      'keypress .edit': 'updateOnEnter',
      'blur .edit': 'close'
    },

    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function () {
      this.$input = this.$('.edit');
      this.$el.html(this.template(this.model.toJSON()));
    },

    edit: function() {
      this.$('.todo').addClass('hidden');
      this.$input.removeClass('hidden');
      this.$input.focus();
    },

    close: function() {
      var trimmedValue = this.$input.val().trim();
      trimmedValue ? this.model.save({ title: trimmedValue }) : this.clear();
      this.$('.todo').removeClass('hidden');
      this.$input.addClass('hidden');
    },

    updateOnEnter: function(e) {
      if(e.which === ENTER_KEY) this.close();
    },

    clear: function () {
      this.model.destroy();
    }
  });

  return TodoView;
});
