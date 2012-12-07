define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    'use strict';
    var TodoModel = Backbone.Model.extend({

        dafaults : {
            content: 'something to do.',
            done: false
        },

        initialize: function () {
            if (!this.get('content')) {
                this.set({'content': this.defaults.content});
            }
        },

        toggle: function () {
            this.save({done: !this.get('done')});
        },

        clear: function () {
            this.destroy();
            this.view.remove();
        }

    });
    return TodoModel;
});
