/// <reference path="../../../typings/tsd.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'backbone'], function (require, exports, Backbone) {
    'use strict';
    var TodoModel = (function (_super) {
        __extends(TodoModel, _super);
        function TodoModel() {
            _super.apply(this, arguments);
        }
        TodoModel.prototype.defaults = function () {
            return {
                title: '',
                completed: false
            };
        };
        return TodoModel;
    })(Backbone.Model);
    exports.TodoModel = TodoModel;
});
