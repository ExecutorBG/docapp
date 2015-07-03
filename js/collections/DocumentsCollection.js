define([
    'underscore',
    'backbone',
    'models/DocumentsModel',
    'collections/CategoriesCollection'
], function (_, Backbone, DocumentsModel, CategoriesCollection) {

    var DocumentsCollection = Backbone.Collection.extend({

        model: DocumentsModel,
        lastId: 0,
        initialize: function (models, options) {
            this.loadDocuments();
        },

        loadDocuments: function () {
            var documents = [
                {id: 1, name: 'System Architecture', description: "some description", categoryName: "Technical", creationDate: new Date(), lastModifiedDate: new Date()}
            ];
            //#todo load documents from an outside source
            _.forEach(documents, _.bind(function (document) {
                document.category = CategoriesCollection.getByName(document.categoryName);
                this.add(new this.model(document));
                if (this.lastId < document.id) {
                    this.lastId = document.id;
                }
                delete document.categoryName;
            }, this));
        },

        addDocument: function (options) {
            options.id = this.getUniqueId();
            this.add(new this.model(options));
            this.lastId = options.id;
        },

        getUniqueId: function () {
            var id = this.lastId + 1;
            while (this.where({id: id}).length != 0) {
                id++;
            } // this while should normally never be true;
            return id;
        },

        writeDocuments: function () {
            //#todo save documents to an outside source
        }

    });

    var myCollecition = new DocumentsCollection();

    return myCollecition;
});
