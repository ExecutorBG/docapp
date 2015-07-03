define([
    'underscore',
    'backbone',
    'models/CategoriesModel'
], function (_, Backbone, CategoriesModel) {

    var CategoriesCollection = Backbone.Collection.extend({

        model: CategoriesModel,
        initialize: function (models, options) {
            this.loadCategories();
        },

        loadCategories: function () {
            var categories = [
                {name: "Technical"},
                {name: "Programming"},
                {name: "Language"}
            ];
            //#todo load categories from an outside source

            _.forEach(categories, _.bind(function (category) {
                this.add(new this.model(category));
            }, this));
        },

        writeCategories: function () {
            //#todo save categories to an outside source
        },

        getByName: function (name) {
            return this.where({name: name})[0] || null;
        }

    });
    var myCollection = new CategoriesCollection();
    return myCollection;

});