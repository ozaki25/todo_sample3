/// <reference path="../../../typings/tsd.d.ts" />

'use strict';

import Backbone = require('backbone');

export class TodoModel extends Backbone.Model {
    defaults() {
        return {
            title: '',
            completed: false
        }
    }
}
