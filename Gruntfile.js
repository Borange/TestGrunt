/****
    Main setup for GruntJS
****/

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> --- Added project file! */\n',
                mangle: true,
                beautify: false
            },
            dist: {
                files: {
                    'assets/javascript/dist/project.min.js': 
                    ['assets/javascript/project/**/*.js']
                }
            }
        },
        
        concat: 
        {
            options: {
                // define a string to put between each file in the concatenated output
                separator: ';'
            },
            dist: 
            {
                // the files to concatenate
                src: ['assets/javascript/external/**/*.js'],
                // the location of the resulting JS file
                dest: 'assets/javascript/dist/resources.min.js'
            }
        },
        
        htmlhint: {
            build: {
                options: {
                    'tag-pair': true,
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'attr-value-double-quotes': true,
                    'doctype-first': true,
                    'spec-char-escape': true,
                    'id-unique': true,
                    'head-script-disabled': true,
                    'style-disabled': false
                },
                src: ['index.html']
            }
        },
        less: {
            development: {
                options: {
                    paths: ["stylesheets/less"],
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    'assets/stylesheets/css/main.css': 'assets/stylesheets/less/**/*.less'
                }
            },
            production: {
                options: {
                    paths: ["stylesheets/less"],
                    cleancss: true
                },
                files: {
                    'assets/stylesheets/css/main.css': 'assets/stylesheets/less/**/*.less'
                }
            }
        },
        jshint: {
          src: ['assets/javascript/project/**/*.js', 'assets/javascript/project/**/*.js']
        }
        ,
        clean : ['assets/javascript/project/**/*.js', 'assets/stylesheets/css/**/*.css']
        ,
        watch: {
            options : {spawn : false},
            javascript: {
                files: ['assets/javascript/project/**/*.js'],
                tasks: ['jshint','uglify'],
                options: { livereload: true }
            },
            html :{
                files: ['index.html'],
                tasks: ['htmlhint'],
                options: { livereload: true }
            },
            stylesheets : {
                files: ['assets/stylesheets/less/**/*.less'],
                tasks : ['less'],
                options: { livereload: true }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-htmlhint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // the default task can be run just by typing "grunt" on the command line
    grunt.registerTask('default', []);
    grunt.registerTask('defaultwatch', ['uglify', 'concat', 'watch', 'htmlhint', 'less', 'jshint']);
    //grunt.registerTask('buildjs', ['concat', 'uglify', 'watch']);
};