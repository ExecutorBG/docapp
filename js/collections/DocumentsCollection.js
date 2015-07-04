define([
    'models/DocumentsModel',
    'collections/CategoriesCollection'
], function (DocumentsModel, CategoriesCollection) {

    var DocumentsCollection = Backbone.Collection.extend({

        model: DocumentsModel,
        lastId: 0,
        initialize: function (models, options) {
            this.loadDocuments();
        },

        loadDocuments: function () {
            var documents = [
                {id: 1, name: 'System Architecture', description: "some description", category: {name: "Technical"}, creationDate: new Date(), lastModifiedDate: new Date()},
                {id: 2, name: 'JS For DUmmies', description: "some description", category: {name: "Programming"}, creationDate: new Date(), lastModifiedDate: new Date()}
            ];
            //#todo load documents from an outside source
            _.forEach(documents, _.bind(function (document) {
                document.category = CategoriesCollection.getByName(document.category.name);
                this.add(new this.model(document));
                if (this.lastId < document.id) {
                    this.lastId = document.id;
                }
            }, this));
        },

        updateDocumentInformation: function(id, options){
            this.get(id).set({
                name: options.name,
                description: options.description,
                category: CategoriesCollection.getByName(options.categoryName)
            });
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

        removeById: function (id){
            this.remove(this.get(id));
        },

        writeDocuments: function () {
            //#todo save documents to an outside source
        }

    });

    var myCollecition = new DocumentsCollection();

    return myCollecition;
});
