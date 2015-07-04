define([
    "collections/CategoriesCollection",
    "text!templates/categorySelect.html"
], function(CategoriesCollection, categorySelectTemplate){
     function createSelectCategoryDropdown (excludeAny){
         var options = {categories: CategoriesCollection.toJSON(), excludeAny: excludeAny};
         return _.template(categorySelectTemplate)(options);
    }

    function updateDialogTips( text, tips ) {
        tips
            .text( text )
            .addClass( "ui-state-highlight" );
        setTimeout(function() {
            tips.removeClass( "ui-state-highlight", 1500 );
        }, 500 );
    }

    function checkLength( field, fieldDescrition, min, max, tips ) {
        if ( field.val().length > max || field.val().length < min ) {
            field.addClass( "ui-state-error" );
            updateDialogTips( "Length of " + fieldDescrition + " must be between " +
                min + " and " + max + ".", tips );
            return false;
        } else {
            return true;
        }
    }

    return {
        createSelectCategoryDropdown: createSelectCategoryDropdown,
        updateDialogTips: updateDialogTips,
        checkLength: checkLength
    };
});