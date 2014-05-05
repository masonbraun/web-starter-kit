module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        compass: {
            dist: {
                options: {
                    sassDir: 'css/sass',
                    cssDir: 'css',
                    imagesDir: 'img',
                    outputStyle: 'nested',
                    cacheDir: 'css/sass/.sass-cache/'
                }
            }
        },

        watch: {
            css: {
                files: 'css/sass/*.scss',
                tasks: ['compass:dist']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);

};