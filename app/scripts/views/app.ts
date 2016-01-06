/// <reference path="../../../typings/tsd.d.ts" />

'use strict';

import _ = require('underscore');
import Backbone = require('backbone');
import TodosCollection = require('../collections/todos');
import TodoModel = require('../models/todo');
import TodoView = require('../views/todo');

export class AppView extends Backbone.View<Backbone.Model> {
    _todosCollection: TodosCollection.TodosCollection<TodoModel.TodoModel>

    $input: any;
    $list: any;

    constructor() {
        super();

        this.setElement($('.todoapp'), true);

        this._todosCollection.fetch({ reset: true });
    }

    initialize() {
        this.$input = $('.new-todo');
        this.$list = $('.todo-list');

        this.listenTo(this._todosCollection, 'add', this.addOne);
        this.listenTo(this._todosCollection, 'reset', this.addAll);
    }

    events(): Backbone.EventsHash {
        console.log("event()");
        return {
            'keypress .new-todo': 'createOnEnter'
        }
    }

    render() {
        console.log("render()");
        this._todosCollection.length ? this.$list.show() : this.$list.hide();
        return this;
    }

    addOne(todo:Backbone.Model) {
        console.log("addOne(todo)");
        var view = new (<any>TodoView.constructor({ model: TodoModel }));
        this.$list.append(view.render().el);
    }

    addAll() {
        console.log("addAll()");
        this.$list.html('');
        this._todosCollection.each(this.addOne, this);
    }

    newAttributes() {
        console.log("newAttributes()");
        return {
            title: this.$input.val().trim(),
            order: this._todosCollection.nextOrder(),
            completed: false
        };
    }

    createOnEnter(e:any) {
        console.log("createOnEnter(e)");
        if(e.which === 13 && this.$input.val().trim()) {
            this._todosCollection.create(this.newAttributes());
            this.$input.val('');
        }
    }
}
