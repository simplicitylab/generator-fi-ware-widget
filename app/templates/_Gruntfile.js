module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // compress files
        compress: {
            main: {
                options: {
                    archive : "build/<%= output_name_compressed %>.zip"
                },
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['**']
                    }
                ]
            }
        },

        // rename files
        rename: {
            moveThis: {
                src: 'build/<%= output_name_compressed %>.zip',
                dest: 'build/<%= output_name_compressed %>.wgt'
            }
        }


    });

    // Load the plugin that provides the compress and rename
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-rename');

    // Default task(s).
    grunt.registerTask('default', ['compress','rename']);

};