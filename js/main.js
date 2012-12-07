require.config({
    paths: {
        jquery:       '//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.2/jquery.min',
        underscore:   '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.2/underscore-min',
        backbone:     '//cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.2/backbone-min',
        localstorage: 'libs/backbone/backbone-localstorage',
        text:         'libs/require/text'
    },
    shim: {
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
        localstorage: {
            deps: ['underscore', 'backbone'],
            exports: 'Store'
        }
    }
});

require(['views/app'], function (AppView) {
    'use strict';
    var app_view = new AppView();
});
