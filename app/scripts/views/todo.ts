/// <reference path="../../../typings/tsd.d.ts" />

'use strict';

import _ = require('underscore');
import Backbone = require('backbone');
import TodoModel = require('../models/todo');

export class TodoView extends Backbone.View<TodoModel.TodoModel> {
    template: (data: any) => string;
    $input: any;

    static ENTER_KEY:number = 13;

    constructor(options?:any) {
        this.tagName = 'li';
        this.className = 'list-group-item'

        super(options);

        this.template = _.template($('#item-template').html());

        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
    }

    events(): Backbone.EventsHash {
        console.log("events()");
        return {
            'click .todo-title': 'edit',
            'click .destroy': 'clear',
            'keypress .edit': 'updateOnEnter',
            'blur .edit': 'close'
        }
    }

    render() {
        console.log("render()");
        this.$input = this.$('.edit');
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

    edit() {
        console.log("edit()");
        this.$('.todo').addClass('hidden');
        this.$input.removeClass('hidden');
        this.$input.focus();
    }

    close() {
        console.log("close()");
        var trimmedValue = this.$input.val().trim();
        trimmedValue ? this.model.save({ title: trimmedValue }) : this.clear();

        this.$('.todo').removeClass('hidden');
        this.$input.addClass('hidden');
    }

    updateOnEnter(e:any) {
        console.log("updateOnEnter(e)");
        if(e.which === TodoView.ENTER_KEY) this.close();
    }

    clear() {
        console.log("clear()");
        this.model.destroy();
    }
}

