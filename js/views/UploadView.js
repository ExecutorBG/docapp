define([
    'collections/DocumentsCollection',
    'collections/CategoriesCollection',
    'models/DocumentsModel',
    'text!templates/addDocument.html',
    "utils/utils"
], function (DocumentsCollection, CategoriesCollection, DocumentsModel, addDocumentsTemplate, utils) {

    var UploadView = Backbone.View.extend({
        el: $("#page"),
        model: DocumentsModel,
        collection: DocumentsCollection,

        initialize: function () {
        },

        render: function () {
            this.$el.html(_.template(addDocumentsTemplate)({categorySelector: utils.createSelectCategoryDropdown(true)}));
            $( "#add-document" ).button().on( "click", _.bind(function() {
                this.addDocument();
            }, this));
        },

        addDocument: function (){
            var form = $('#add-document-form'),
                name = $('#add-document-form #name'),
                category = $("#add-document-form #categorySelect"),
                description = $("#add-document-form #description"),
                tips = $( "#add-document-form .validateTips" );

            var valid = true;
            valid = valid && utils.checkLength( name, "document name", 1, 128, tips );
            valid = valid && utils.checkLength( description, "description", 1, 255, tips );
            if ( valid ) {
                this.collection.addDocument({name: name.val(), category: CategoriesCollection.getByName(category.val()), description: description.val()});
                Backbone.history.navigate('', {trigger:true});
            }
        }

    });
    return UploadView;

});
