module.exports = function(grunt) {

    grunt.initConfig({
        copy: {
            js: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/requirejs/',
                        src: 'require.js',
                        dest: 'js/libs'
                    },                            {
                        expand: true,
                        cwd: 'node_modules/jquery/dist/',
                        src: 'jquery.js',
                        dest: 'js/libs'
                    },                    {
                        expand: true,
                        cwd: 'node_modules/underscore/',
                        src: 'underscore.js',
                        dest: 'js/libs'
                    },
                    {
                        expand: true,
                        cwd: 'node_modules/backbone/',
                        src: 'backbone.js',
                        dest: 'js/libs'
                    },
                    {
                        expand: true,
                        cwd: 'node_modules/jquery-ui/',
                        src: 'jquery-ui.js',
                        dest: 'js/libs'
                    }
                ]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['copy']);

};