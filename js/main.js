require.config({
    paths: {
        jquery: 'libs/jquery',
        jqueryui: 'libs/jquery-ui',
        underscore: 'libs/underscore',
        backbone: 'libs/backbone'
    },
    shim: {
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'backbone' as the
            //module value.
            exports: 'backbone'
        },
        'jqueryui': {
            deps: ['jquery']
        }
    }
});

require([
    'app',
    'jquery',
    'underscore',
    'backbone',
    'jqueryui'
],
function(App) {
    App.initialize();
});