/// <reference path="../../../typings/tsd.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'backbone'], function (require, exports, Backbone) {
    'use strict';
    var TodosCollection = (function (_super) {
        __extends(TodosCollection, _super);
        function TodosCollection() {
            _super.apply(this, arguments);
            this.localStorage = new Store('todos-backbone');
        }
        TodosCollection.prototype.nextOrder = function () {
            return this.length ? this.last().get('order') + 1 : 1;
        };
        return TodosCollection;
    })(Backbone.Collection);
    exports.TodosCollection = TodosCollection;
});
