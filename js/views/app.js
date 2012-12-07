define([
    'jquery',
    'underscore',
    'backbone',
    'collections/todos',
    'views/todo',
    'text!templates/stats.html'
], function ($, _, Backbone, Todos, TodoView, statsTemplate) {
    'use strict';
    var AppView = Backbone.View.extend({
        el: $('#todoapp'),

        template: _.template(statsTemplate),

        events: {
            'keypress #new-todo': 'createOnEnter',
            'keyup #new-todo':      'showTooltip',
            'click .todo-clear a':  'clearCompleted'
        },

        initialize: function () {
            this.input = $('#new-todo');
            this.todos = new Todos();
            this.todos.bind('add', this.addOne, this);
            this.todos.bind('reset', this.addAll, this);
            this.todos.bind('all', this.render, this);

            this.todos.fetch();
        },

        render: function () {
            $('#todo-stats').html(this.template({
                total:      this.todos.length,
                done:       this.todos.done().length,
                remaining:  this.todos.remaining().length
            }));
        },

        addOne: function (todo) {
            var view = new TodoView({model: todo });
            $('#todo-list').append(view.render().el);
        },

        addAll: function () {
            this.todos.each(this.addOne);
        },

        newAttributes: function () {
            return {
                content:    this.input.val(),
                order:      this.todos.nextOrder(),
                done:       false
            };
        },

        createOnEnter: function (e) {
            if (e.keyCode !== 13) {
                return;
            }
            this.todos.create(this.newAttributes());
            this.input.val('');
        },

        clearCompleted: function () {
            _.each(this.todos.done(), function (todo) {
                todo.clear();
            });
            return false;
        },

        showTooltip: function () {
            var tooltip = $('.ui-tooltip-top');
            var val = this.input.val();
            tooltip.fadeOut('slow');
            if (this.tooltipTimeout) {
                clearTimeout(this.tooltipTimeout);
            }
            if (val === '' || val === this.input.attr('placeholder')) {
                return;
            }
            var show = function () {
                tooltip.fadeIn('fast');
            };
            this.tooltipTimeout = _.delay(show, 300);
        }

    });
    return AppView;
});
