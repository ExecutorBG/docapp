define([
    'underscore',
    'backbone'
], function (_, Backbone) {

    var DocumentsModel = Backbone.Model.extend({

        defaults: {
            id: "-1",
            category: null,
            name: "",
            description: "",
            creationDate: new Date(),
            lastModifiedDate: new Date()
        },

        initialize: function (options) {
            this.id = options.id;
            this.category = options.category;
            this.name = options.name;
            this.description = options.description;
            this.creationDate = options.creationDate;
            this.lastModifiedDate = options.lastModifiedDate;
        }

    });

    return DocumentsModel;

});
