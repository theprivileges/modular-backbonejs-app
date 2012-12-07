define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/todos.html'
], function ($, _, Backbone, todosTemplate) {
    'use strict';
    var TodoView = Backbone.View.extend({
        tagName: 'li',
        
        template: _.template(todosTemplate),
        
        events: {
            'click .check':             'toggleDone',
            'dblclick div.todo-content': 'edit',
            'click span.todo-destroy':  'clear',
            'keypress .todo-input':     'updateOnEnter'
        },

        initialize: function () {
            this.model.on('change', this.render, this);
            this.model.view = this;
        },
        
        render: function () {
            $(this.el).html(this.template(this.model.toJSON()));
            this.setContent();
            return this;
        },

        setContent: function () {
            var content = this.model.get('content');
            this.$('.todo-content').text(content);
            this.input = $('.todo-input');
            this.input.on('blur', this.close, this);
            this.input.val(content);
        },

        toggleDone: function () {
            this.model.toggle();
        },

        close: function () {
            this.model.save({content: this.input.val()});
            this.$el.removeClass('editing');
        },

        edit: function () {
            $(this.el).addClass('editing');
            this.input.focus();
        },

        clear: function () {
            this.model.clear();
        },

        updateOnEnter: function (e) {
            if (e.keyCode === 13) {
                this.close();
            }
        },

        remove: function () {
            $(this.el).remove();
        }

    });

    return TodoView;
});
