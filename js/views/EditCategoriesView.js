define([
    'underscore',
    'backbone',
    'collections/CategoriesCollection',
    'text!templates/editCategories.html'
], function (_, Backbone, CategoriesCollection, template) {
    var categoriesView = Backbone.View.extend({
        el: $("#page"),
        collection: CategoriesCollection,

        initialize: function (){
            CategoriesCollection.on("update", this.renderCategories, this);
            CategoriesCollection.on("change", this.renderCategories, this);

        },

        renderCategories: function () {
            var el = $('#categories-contain');
            var template = _.template(
                '<h1>Existing Categories:</h1><table id="users" class="ui-widget ui-widget-content"><thead>' +
                    '<tr class="ui-widget-header ">' +
                        '<th>Category</th>' +
                    '</tr>' +
                '</thead>' +
                '<tbody>' +
                '<% _.each(categories, function(category) { %>' +
                    '<tr><td><%= category.name %></td></tr>' +
                    '<% }); %>' +
                    '</tbody>' +
                    '</table>');
            el.html(template({categories: this.collection.toJSON()}));


            el.find("tr").click(function() {
                $(this).closest("tr").siblings().removeClass("highlighted");
                $(this).toggleClass("highlighted");
            })
        },
        addEditButton: function () {
            var editDialog, form,
                name = $("#name"),
                originalName,
                allFields = $( [] ).add( name),
                tips = $( ".validateTips" );

            editDialog = $( "#edit-category-form" ).dialog({
                autoOpen: false,
                height: 300,
                width: 350,
                modal: true,
                buttons: {
                    "Update": editCategory,
                    Cancel: function() {
                        editDialog.dialog( "close" );
                    }
                },
                open: function() {
                    var selectedValue = $('.highlighted td')[0];
                    if (!selectedValue) {
                        editDialog.dialog( "close" );
                        return;
                    }
                    originalName = selectedValue.innerText;
                    name.val(originalName);
                },
                close: function() {
                    form[ 0 ].reset();
                    allFields.removeClass( "ui-state-error" );
                }


            });
            form = editDialog.find( "form" ).on( "submit", function( event ) {
                event.preventDefault();
                editCategory();
            });

            $( "#edit-category" ).button().on( "click", function() {
                editDialog.dialog( "open" );
            });

            function editCategory() {
                var valid = true;
                allFields.removeClass( "ui-state-error" );

//                valid = valid && checkLength( name, "category name", 1, 40 );

                if ( valid ) {
                    CategoriesCollection.getByName(originalName).set('name', name.val());
                    editDialog.dialog( "close" );
                }
                return valid;
            }
        },

        addCreateButton: function(){
            var createDialog, form,
                name = $( "#name" ),
                allFields = $( [] ).add( name),
                tips = $( ".validateTips" );

            function updateTips( t ) {
                tips
                    .text( t )
                    .addClass( "ui-state-highlight" );
                setTimeout(function() {
                    tips.removeClass( "ui-state-highlight", 1500 );
                }, 500 );
            }

            function checkLength( o, n, min, max ) {
                if ( o.val().length > max || o.val().length < min ) {
                    o.addClass( "ui-state-error" );
                    updateTips( "Length of " + n + " must be between " +
                        min + " and " + max + "." );
                    return false;
                } else {
                    return true;
                }
            }

            function addCategory() {
                var valid = true;
                allFields.removeClass( "ui-state-error" );

                valid = valid && checkLength( name, "category name", 1, 40 );

                if ( valid ) {
                    CategoriesCollection.addCategory(name.val());
                    createDialog.dialog( "close" );
                }
                return valid;
            }

            createDialog = $( "#create-category-form" ).dialog({
                autoOpen: false,
                height: 300,
                width: 350,
                modal: true,
                buttons: {
                    "Add category": addCategory,
                    Cancel: function() {
                        createDialog.dialog( "close" );
                    }
                },
                close: function() {
                    form[ 0 ].reset();
                    allFields.removeClass( "ui-state-error" );
                }
            });

            form = createDialog.find( "form" ).on( "submit", function( event ) {
                event.preventDefault();
                addCategory();
            });

            $( "#create-category" ).button().on( "click", function() {
                createDialog.dialog( "open" );
            });
        },

        addRemoveButton: function (){
            $( "#delete-category" ).button().on( "click", _.bind(function() {
                var value = this.getSelectedCategory();
                if (value) {
                    // #todo add check if collection is in use, and warn the user as it breaks functionality.
                    this.collection.getByName(value).destroy();
                }
            }, this));
        },

        getSelectedCategory: function (){
            var selectedValue = $('.highlighted td')[0];
            if (!selectedValue) {
                return null;
            }
            return selectedValue.innerText;
        },

        render: function () {
            this.template = _.template(template);
            this.$el.html(this.template({}));
            this.renderCategories();
            this.addCreateButton();
            this.addEditButton();
            this.addRemoveButton();
        }
    });
    return categoriesView;
});
