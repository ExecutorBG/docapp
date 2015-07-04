require.config({
    paths: {
        jquery: 'libs/jquery',
        jqueryui: 'libs/jquery-ui',
        underscore: 'libs/underscore',
        backbone: 'libs/backbone',
        text : 'libs/text',
        templates : "./../templates",
        datatables : "libs/jquery.dataTables"
    },
    shim: {

        'underscore':{
            exports: '_'
        },

        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
            jqueryui:
            {
                deps: ["jquery"]
            }
    }
});

require([
    'app',
    'underscore',
    'backbone',
    'jqueryui',
    'datatables'
],
function(App) {
    App.initialize();
});