define([
    'models/CategoriesModel'
], function (CategoriesModel) {

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
            return this.findWhere({name: name}) || null;
        },

        addCategory: function (name){
            this.add(new this.model({name: name}));
        },

        removeCategory: function (name){
            this.remove(this.getByName(name));
        },

        updateCategory: function (name, newName){
            this.getByName(name).set('name', newName);
        }

    });
    var myCollection = new CategoriesCollection();
    return myCollection;

});