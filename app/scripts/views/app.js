/// <reference path="../../../typings/tsd.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'backbone', '../models/todo', '../views/todo'], function (require, exports, Backbone, TodoModel, TodoView) {
    'use strict';
    var AppView = (function (_super) {
        __extends(AppView, _super);
        function AppView() {
            _super.call(this);
            this.setElement($('.todoapp'), true);
            this._todosCollection.fetch({ reset: true });
        }
        AppView.prototype.initialize = function () {
            this.$input = $('.new-todo');
            this.$list = $('.todo-list');
            this.listenTo(this._todosCollection, 'add', this.addOne);
            this.listenTo(this._todosCollection, 'reset', this.addAll);
        };
        AppView.prototype.events = function () {
            console.log("event()");
            return {
                'keypress .new-todo': 'createOnEnter'
            };
        };
        AppView.prototype.render = function () {
            console.log("render()");
            this._todosCollection.length ? this.$list.show() : this.$list.hide();
            return this;
        };
        AppView.prototype.addOne = function (todo) {
            console.log("addOne(todo)");
            var view = new (TodoView.constructor({ model: TodoModel }));
            this.$list.append(view.render().el);
        };
        AppView.prototype.addAll = function () {
            console.log("addAll()");
            this.$list.html('');
            this._todosCollection.each(this.addOne, this);
        };
        AppView.prototype.newAttributes = function () {
            console.log("newAttributes()");
            return {
                title: this.$input.val().trim(),
                order: this._todosCollection.nextOrder(),
                completed: false
            };
        };
        AppView.prototype.createOnEnter = function (e) {
            console.log("createOnEnter(e)");
            if (e.which === 13 && this.$input.val().trim()) {
                this._todosCollection.create(this.newAttributes());
                this.$input.val('');
            }
        };
        return AppView;
    })(Backbone.View);
    exports.AppView = AppView;
});
