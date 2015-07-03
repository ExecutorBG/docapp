define([
    'underscore',
    'backbone',
    'collections/CategoriesCollection',
    'jqueryui'
], function (_, Backbone, CategoriesCollection, dialog) {
    var categoriesView = Backbone.View.extend({
        el: $("#page"),

        render: function () {
            var template = ''
            var dialog = $("#dialog-form").dialog({
                autoOpen: false,
                height: 300,
                width: 350,
                modal: true,
                buttons: {
                    "Create an account": function(){},
                    Cancel: function () {
                        dialog.dialog("close");
                    }
                },
                close: function () {
                    form[ 0 ].reset();
//                    allFields.removeClass("ui-state-error");
                }
            });

            var form = dialog.find("form").on("submit", function (event) {
                event.preventDefault();
//                addUser();
            });

            $("#create-user").button().on("click", function () {
                dialog.dialog("open");
            });
        }



    });
    return categoriesView;
});
