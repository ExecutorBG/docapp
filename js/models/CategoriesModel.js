define([
    'underscore',
    'backbone'
], function (_, Backbone) {

    var CategoriesModel = Backbone.Model.extend({

        defaults: {
            name: "unknown"
        },

        initialize: function (options) {
            this.name = options.name;
        }

    });

    return CategoriesModel;

});
