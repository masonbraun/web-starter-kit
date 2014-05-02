module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        compass: {                  // Task
            dist: {                   // Target
              options: {              // Target options
                sassDir: 'css/sass',
                cssDir: 'css',
                outputStyle: 'compressed',
                cacheDir: 'css/sass/.sass-cache/'
                }
            }
          },

        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['compass:dist']
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');


    // Default task(s).
    grunt.registerTask('default', ['watch']);

};