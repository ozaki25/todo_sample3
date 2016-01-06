/// <reference path="../../../typings/tsd.d.ts" />

'use strict';

import _ = require('underscore');
import Backbone = require('backbone');
import TodoModel = require('../models/todo');

declare var Store: any;

export class TodosCollection<TModel extends TodoModel.TodoModel> extends Backbone.Collection<Backbone.Model> {
    localStorage = new Store('todos-backbone');

    nextOrder() {
        return this.length ? this.last().get('order') + 1 : 1;
    }
}
