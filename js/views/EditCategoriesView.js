define([
    'collections/CategoriesCollection',
    'text!templates/editCategories.html',
    'text!templates/categoriesGrid.html',
    'utils/utils'
], function (CategoriesCollection, viewTemplate, gridTemplate, utils) {
    var categoriesView = Backbone.View.extend({
        el: $("#page"),
        collection: CategoriesCollection,

        initialize: function (){
            this.collection.on("add", this.renderCategories, this);
            this.collection.on("change", this.renderCategories, this);
        },

        renderCategories: function () {
            var el = $('#categories-contain');
            el.html(_.template(gridTemplate)({categories: this.collection.toJSON()}));

            this.dataTable = $('#categories').DataTable();
            var table = this.dataTable;

            $('#categories tbody').on( 'click', 'tr', function () {
                if ( $(this).hasClass('selected') ) {
                    $(this).removeClass('selected');
                }
                else {
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            } );
        },

        addEditButton: function () {
            var form,
                name = $("#edit-category-form #name"),
                originalName,
                allFields = $( [] ).add( name),
                tips = $( "#edit-category-form .validateTips" );

            this.editDialog = $( "#edit-category-form" ).dialog({
                autoOpen: false,
                height: 300,
                width: 350,
                modal: true,
                buttons: {
                    "Update": _.bind(editCategory, this),
                    Cancel: _.bind(function() {
                        this.editDialog.dialog( "close" );
                    }, this)
                },
                open: _.bind(function() {
                    var selectedValue = $('.selected td')[0];
                    if (!selectedValue) {
                        this.editDialog.dialog( "close" );
                        return;
                    }
                    originalName = selectedValue.innerText;
                    name.val(originalName);
                }, this),
                close: _.bind(function() {
                    form[ 0 ].reset();
                    allFields.removeClass( "ui-state-error" );
                }, this)


            });

            function editCategory () {
                // helper function used by the edit category dialog
                var valid = true;
                allFields.removeClass( "ui-state-error" );

                valid = valid && utils.checkLength( name, "category name", 1, 40, tips );

                if ( valid ) {
                    this.collection.updateCategory(originalName, name.val());
                    this.editDialog.dialog( "close" );
                }
                return valid;
            };

            form = this.editDialog.find( "form" ).on( "submit", _.bind(function( event ) {
                event.preventDefault();
                editCategory.call(this);
            }, this));

            $( "#edit-category" ).button().on( "click", _.bind(function() {
                this.editDialog.dialog( "open" );
            }, this));

        },

        addCreateButton: function(){
            var form,
                name = $( "#create-category-form #name" ),
                allFields = $( [] ).add( name);

            this.createDialog = $( "#create-category-form" ).dialog({
                autoOpen: false,
                height: 300,
                width: 350,
                modal: true,
                buttons: {
                    "Add category": _.bind(addCategory, this),
                    Cancel: _.bind(function() {
                        this.createDialog.dialog( "close" );
                    },this)
                },
                close: _.bind(function() {
                    form[ 0 ].reset();
                    allFields.removeClass( "ui-state-error" );
                }, this)
            });

            // form event added to support confirm category from enter key;
            form = this.createDialog.find( "form" ).on( "submit", _.bind(function( event ) {
                event.preventDefault();
                addCategory.call(this);
            }, this));

            function addCategory (){
                // helper function used by the create category dialog
                var name = $( "#create-category-form #name" ),
                    allFields = $( [] ).add( name),
                    tips = $( "#create-category-form .validateTips" );

                var valid = true;
                allFields.removeClass( "ui-state-error" );

                valid = valid && utils.checkLength( name, "category name", 1, 40, tips );

                if ( valid ) {
                    this.collection.addCategory(name.val());
                    this.createDialog.dialog( "close" );
                }
                return valid;
            }

            // attatch button create to open the dialog
            $( "#create-category" ).button().on( "click", _.bind(function() {
                this.createDialog.dialog( "open" );
            }, this));
        },

        addRemoveButton: function (){
            $( "#delete-category" ).button().on( "click", _.bind(function() {
                var value = this.dataTable.row('.selected').data();
                if (value) {
                    // #todo add check if collection is in use, and warn the user as it breaks functionality.
                    this.collection.removeCategory(value[0]);
                    this.dataTable.row('.selected').remove().draw( false );
                }
            }, this));
        },

        addButtons: function () {
            this.addCreateButton();
            this.addEditButton();
            this.addRemoveButton();
        },

        render: function () {
            this.template = _.template(viewTemplate);
            this.$el.html(this.template({}));
            this.renderCategories();
            this.addButtons();
        }

    });
    return categoriesView;
});
