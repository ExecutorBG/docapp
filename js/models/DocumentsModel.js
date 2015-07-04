define([
    'underscore',
    'backbone'
], function (_, Backbone) {

    var DocumentsModel = Backbone.Model.extend({
//
//        defaults: {
//            id: "-1",
//            category: null,
//            name: "",
//            description: "",
//            creationDate: new Date(),
//            lastModifiedDate: new Date()
//        },

        initialize: function (options) {
            this.updateAttributes(options);
        },

        updateAttributes: function (options){
            this.set({
                id: options.id,
                category: options.category,
                name: options.name,
                description: options.description,
                creationDate: options.creationDate,
                lastModifiedDate: options.lastModifiedDate
            });
        }

    });

    return DocumentsModel;

});
