define([
    'jquery',
    'underscore',
    'backbone',
    'collections/DocumentsCollection',
    'collections/CategoriesCollection'
], function ($, _, Backbone, DocumentsCollection, CategoriesCollection) {

    var HomeView = Backbone.View.extend({
        el: $("#page"),


        render: function () {
            var headerTemplate = '<div class="gridControls"><input type="button" value="Add Document"><input type="text" id="filter"></div>' + this.createSelectElement();
            this.$el.html(headerTemplate + '<div id="documentsGrid" class="documentsGrid"></div>');
            this.$el.find('#filter').on('keyup', _.bind(this.filterResults, this));
            this.$el.find('#filter').on('paste', _.bind(function () {
                setTimeout(_.bind(this.filterResults, this), 0)
            }, this));
            $('#categorySelect').on('change', _.bind(this.filterResults, this));


            this.renderDocuments(DocumentsCollection);
        },

        createSelectElement: function () {
            var select = '<select id="categorySelect">';
            select += '<option>' + 'Any' + '</option>';
            CategoriesCollection.each(function (category) {
                select += '<option>' + category.get('name') + '</option>';
            });
            select += '</select>';
            return select;

        },

        renderDocuments: function (collection) {
            var thTemplate = '<div class="tableHeader"><div class="id">ID</div><div class="category">Category</div><div class="name">Name</div><div class="description">Description</div><div class="created">Creation Date</div><div class="modified">Last Modification</div></div>';
            var tdTemplate = '<div class="tableRow"><div class="id"><%= id %></div><div class="category"><%= category %></div><div class="name"><%= name %></div><div class="description"><%= description %></div><div class="created"><%= creationDate %></div><div class="modified"><%= lastModifiedDate %></div></div>';

            var html = thTemplate;
            collection.forEach(function (document) {
                var options = {
                    name: document.name,
                    id: document.id,
                    category: document.category.get('name'),
                    description: document.description,
                    creationDate: document.creationDate, // #todo format date
                    lastModifiedDate: document.lastModifiedDate // #todo format date
                };
                html += _.template(tdTemplate)(options);
            });


            this.$('#documentsGrid').html(html);
        },

        filterResults: function (event) {
            var searchString = $('#filter')[0].value.toLowerCase();
            var categoryFilter = $('#categorySelect').find(':selected').text();
            var category = CategoriesCollection.getByName(categoryFilter);
            var collection = DocumentsCollection;
            if (category) {
                collection = collection.filter(function (document) {
                    return document.get('category') == category;
                });
            }
            if (searchString != '') {
                collection = collection.filter(function (document) {
                    return document.get('name').toLowerCase().search(searchString) >= 0;
                });
            }
            this.renderDocuments(collection);
        }

    });

    return HomeView;

});
