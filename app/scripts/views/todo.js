/// <reference path="../../../typings/tsd.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'underscore', 'backbone'], function (require, exports, _, Backbone) {
    'use strict';
    var TodoView = (function (_super) {
        __extends(TodoView, _super);
        function TodoView(options) {
            this.tagName = 'li';
            this.className = 'list-group-item';
            _super.call(this, options);
            this.template = _.template($('#item-template').html());
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        }
        TodoView.prototype.events = function () {
            console.log("events()");
            return {
                'click .todo-title': 'edit',
                'click .destroy': 'clear',
                'keypress .edit': 'updateOnEnter',
                'blur .edit': 'close'
            };
        };
        TodoView.prototype.render = function () {
            console.log("render()");
            this.$input = this.$('.edit');
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        };
        TodoView.prototype.edit = function () {
            console.log("edit()");
            this.$('.todo').addClass('hidden');
            this.$input.removeClass('hidden');
            this.$input.focus();
        };
        TodoView.prototype.close = function () {
            console.log("close()");
            var trimmedValue = this.$input.val().trim();
            trimmedValue ? this.model.save({ title: trimmedValue }) : this.clear();
            this.$('.todo').removeClass('hidden');
            this.$input.addClass('hidden');
        };
        TodoView.prototype.updateOnEnter = function (e) {
            console.log("updateOnEnter(e)");
            if (e.which === TodoView.ENTER_KEY)
                this.close();
        };
        TodoView.prototype.clear = function () {
            console.log("clear()");
            this.model.destroy();
        };
        TodoView.ENTER_KEY = 13;
        return TodoView;
    })(Backbone.View);
    exports.TodoView = TodoView;
});
