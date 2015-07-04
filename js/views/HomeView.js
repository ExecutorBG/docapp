define([
    'collections/DocumentsCollection',
    'collections/CategoriesCollection',
    'text!templates/documentsGrid.html',
    'text!templates/modifyDocumentControls.html',
    "utils/utils"
], function (DocumentsCollection, CategoriesCollection, gridTemplate, controlsTemplate, utils) {

    var HomeView = Backbone.View.extend({
        el: $("#page"),
        collection: DocumentsCollection,

        initialize: function (){
            this.collection.on("change", _.bind(this.renderDocuments, this, this.collection));
        },

        render: function () {
            var headerTemplate = '<div class="gridControls">' + utils.createSelectCategoryDropdown();
            this.$el.html(headerTemplate + '<div id="documentsGrid" class="documentsGrid"></div>' +
                _.template(controlsTemplate)({categorySelector: utils.createSelectCategoryDropdown(true)}));

            // add handler to filter results by category
            $('#categorySelect').on('change', _.bind(this.filterResults, this));

            // render the full documents collection
            this.renderDocuments(this.collection);

            // add buttons to edit/remove document
            this.addButtons();
        },

        renderDocuments: function (collection) {
            // renders the supplied documents collection (filtered collections have json like format)
            if (collection == this.collection){
                collection = collection.toJSON();
            } else {
                collection = JSON.parse(JSON.stringify(collection));
            }


            var el = $('#documentsGrid');
            el.html(_.template(gridTemplate)({documents: collection}));

            this.dataTable = $('#documents').DataTable();
            var table = this.dataTable;

            $('#documents tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                    $(this).removeClass('selected');
                }
                else {
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            } );
        },

        filterResults: function (event) {
            var categoryFilter = $('#categorySelect').find(':selected').text();
            var category = CategoriesCollection.getByName(categoryFilter);
            var collection = this.collection;
            if (category) {
                collection = collection.filter(function (document) {
                    return document.get('category') == category;
                });
            }
            this.renderDocuments(collection);
        },

        addButtons: function (){
            this.addEditButton();
            this.addRemoveButton();
        },

        addRemoveButton: function (){
            $( "#delete-document" ).button().on( "click", _.bind(function() {
                var value = this.dataTable.row('.selected').data();
                if (value) {
                    this.collection.removeById(value[0]);
                    this.dataTable.row('.selected').remove().draw( false );
                }
            }, this));
        },

        addEditButton: function () {
            var form,
                name = $("#edit-document-form #name"),
                category = $("#edit-document-form #categorySelect"),
                description = $("#edit-document-form #description"),
                originalId,
                originalName,
                originalCategory,
                originalDescription,
                allFields = $( [] ).add( name),
                tips = $( "#edit-document-form .validateTips" );

            this.editDialog = $( "#edit-document-form" ).dialog({
                autoOpen: false,
                height: 300,
                width: 350,
                modal: true,
                buttons: {
                    "Update": _.bind(editDocument, this),
                    Cancel: _.bind(function() {
                        this.editDialog.dialog( "close" );
                    }, this)
                },
                open: _.bind(function() {
                    var selectedValue = this.dataTable.row('.selected').data();
                    if (!selectedValue) {
                        this.editDialog.dialog( "close" );
                        return;
                    }
                    originalId = selectedValue[0];
                    originalName = this.collection.get(originalId).get('name');
                    originalCategory = this.collection.get(originalId).get('category');
                    originalDescription = this.collection.get(originalId).get('description');
                    name.val(originalName);
                    category.val(originalCategory.get('name'));
                    description.val(originalDescription);
                }, this),
                close: _.bind(function() {
                    form[ 0 ].reset();
                    allFields.removeClass( "ui-state-error" );
                }, this)


            });

            function editDocument () {
                // helper function used by the edit document dialog
                var valid = true;
                allFields.removeClass( "ui-state-error" );

                valid = valid && utils.checkLength( name, "document name", 1, 128, tips );
                valid = valid && utils.checkLength( description, "description", 1, 255, tips );

                if ( valid ) {
                    this.collection.updateDocumentInformation(originalId, {name: name.val(), categoryName: category.val(), description: description.val()});
                    this.editDialog.dialog( "close" );
                }
                return valid;
            };

            form = this.editDialog.find( "form" ).on( "submit", _.bind(function( event ) {
                event.preventDefault();
                editDocument.call(this);
            }, this));

            $( "#edit-document" ).button().on( "click", _.bind(function() {
                this.editDialog.dialog( "open" );
            }, this));

        }



    });

    return HomeView;

});
