// Filename: router.js
define([
    'views/HomeView',
    'views/EditCategoriesView',
    'collections/CategoriesCollection',
    'collections/DocumentsCollection'
], function (HomeView, EditCategoriesView, CategoriesCollection, DocumentsCollection) {

    var AppRouter = Backbone.Router.extend({
        routes: {
            // Define some URL routes
            'upload': 'uploadDocument',
            'categories': 'editCategories',

            // Default
            '*actions': 'defaultAction'
        }
    });

    var initialize = function () {

        var app_router = new AppRouter;

        app_router.on('route:uploadDocument', function () {


        });

        app_router.on('route:editCategories', function () {
            var editView = new EditCategoriesView();
            editView.render();
        });

        app_router.on('route:defaultAction', function (actions) {

            // We have no matching route, lets display the home page
            var homeView = new HomeView();
            homeView.render();
        });

        // Unlike the above, we don't call render on this view as it will handle
        // the render call internally after it loads data. Further more we load it
        // outside of an on-route function to have it loaded no matter which page is
        // loaded initially.
//    var footerView = new FooterView();

        Backbone.history.start();
    };
    return {
        initialize: initialize
    };
});
