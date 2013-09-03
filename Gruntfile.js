/*global module:false*/
var path = require("path");

module.exports = function (grunt) {
    var init = {
        dir: {
            bower_components:  grunt.file.readJSON('.bowerrc').directory + "/",
            dev:               'dev/',
            prod:              'publish/',
            source:            'src/',
            js_code:           'src/js/',
            css_code:          'src/css/',
            tpls:              'src/js/templates'
        },
        pkg: grunt.file.readJSON('package.json'),
        /**
         * Lints javascript files using jshint
         * - excluding templates from list because it is compiled src
         * - excluding global from list because it is output from concat
         * - excluding lib from list because I am only linting my own code.
         */
        jshint: {
            files: [
                '<%= dir.js_code %>!(templates).js'
            ],
            jshintrc: ".jshintrc"
        },

        /*
         * LESS
         * (grunt-less)
         */
        less: {
            // Only need to compile files when working in development environment
            dev: {
                files: {
                    '<%= dir.dev %>css/base.css': '<%= dir.css_code %>base.less'
                }
            },

            // When compiling less files for production also minify them(compress)
            prod: {
                files: {
                    '<%= dir.prod %>css/base.css': '<%= dir.css_code %>base.less'
                },
                options: {
                    compress: true
                }
            }
        },

        /*
         * RequireJS: Concat and compile if prod
         */
        requirejs: {
            options: {
                name: '../../<%= dir.bower_components %>/almond/almond',
                include: "main",
                baseUrl: "<%= dir.js_code %>",
                paths: {
                    "jquery"                    : "../../<%= dir.bower_components %>/jquery/jquery",
                    "backbone"                  : "../../<%= dir.bower_components %>/backbone/backbone",
                    "underscore"                : "../../<%= dir.bower_components %>/underscore/underscore",
                    "lib/backbone/localstorage" : "../../<%= dir.bower_components %>/backbone.localStorage/backbone.localStorage"
                },
                shim: {
                    "underscore" : {
                        exports: "_"
                    },
                    "backone": {
                        exports: "Backbone"
                    },
                    "lib/backbone/localstorage": {
                        exports: "Backbone"
                    }
                },
                mainConfigFile: "<%= dir.js_code %>main.js"
            },
            dev: {
                options: {
                    out: "<%= dir.dev %>js/main.js",
                    optimize: "none"
                }
            },
            prod: {
                options: {
                    out: "<%= dir.prod %>js/main.js",
                    uglify: {
                        toplevel: true,
                        ascii_only: true,
                        max_line_length: 1000,
                        defines: {
                            DEBUG: ['name', 'false']
                        },
                        no_mangle: true
                    }
                }
            }
        },

        /*
         * Precompile underscore javascript templates
         * Task takes a regex for file list and creates a give JS file.
         */
        jst: {
            compile: {
                options: {
                    amd: true,
                    relativePath: "<%= dir.tpls %>",
                    processName: function (src) {
                        var relativePath = "<%= dir.js_code %>templates/";
                        return src.replace(/(\.[^.]+)$/, "").replace(relativePath, ""); // Remove file extensions and relativePath
                    }
                },
                files: {
                    '<%= dir.js_code %>templates.js': ['<%= dir.tpls %>**/*.html']
                }
            }
        },

        /**
         * Copy files into the production directory for use when published
         * - Will not copy css, js, templates because they are handled in other tasks
         */
        copy: {
            dev: {
                options: {
                    basePath: "."
                },
                files: [
                    {expand: true, cwd: '<%= dir.src %>', src: 'img/*', dest: '<%= dir.dev %>'},
                    {expand: true, cwd: '<%= dir.src %>', src: 'index.html', dest: '<%= dir.dev %>'},
                    {expand: true, cwd: '<%= dir.bower_components %>html5shiv/src/', src: 'html5shiv.js', dest: '<%= dir.dev %>assets/'},
                    {expand: true, cwd: '<%= dir.bower_components %>requirejs/', src: 'require.js', dest: '<%= dir.dev %>assets/'}
                ]
            },
            prod: {
                options: {
                    basePath: "."
                },
                files: [
                    {expand: true, cwd: '<%= dir.src %>', src: 'img/*', dest: '<%= dir.prod %>'},
                    {expand: true, cwd: '<%= dir.src %>', src: 'index.html', dest: '<%= dir.prod %>'},
                    {expand: true, cwd: '<%= dir.bower_components %>html5shiv/src/', src: 'html5shiv.js', dest: '<%= dir.prod %>assets/'},
                    {expand: true, cwd: '<%= dir.bower_components %>requirejs/', src: 'require.js', dest: '<%= dir.dev %>assets/'}
                ]
            }
        },

        // Minify is only setup for prod not really needed for development
        uglify: {
            prod: {
                files: {
                    '<%= dir.prod %>js/global.js': ['<%= dir.dev %>js/global.js']
                }
            }
        },

        clean: {
            prod: {
                src: ['<%= dir.prod %>']
            }
        },

        // Watch to concat js files and concat/compile less(css) files
        watch: {
            less : {
                files: '<%= dir.css_code %>**/*.less',
                tasks: ['less:dev']
            },
            requirejs : {
                files: ['<%= dir.js_code %>**/*.js'],
                tasks: ['requirejs']
            },
            jst : {
                files: '<%= dir.tpls %>/**/*.html',
                tasks: ['jst', 'requirejs']
            }
        }
    };

    // Project configuration.
    grunt.initConfig(init);

    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    /** default includes: compiling js templates, 
     *                    compiling/concating js files with requirejs
     *                    compiling less files
     *
     * default task is ran like this: $ grunt
     */
    grunt.registerTask('default', ['jst', 'requirejs', 'less:dev', "copy:dev"]);

    /**
     * task includes: using jshint to lint js files
     *                using less to lint less files
     *
     * default task is ran like this: $ grunt lint-project
     */
    grunt.registerTask('lint-project', ['jshint']);

    /**
     * task includes: clean publish directory,
     *                compile and minify less files - place in publish directory
     *                compiling/concating/minify js files with requirejs - place in publish directory
     *                copy assets and html to publish directory
     *
     * default task is ran like this: $ grunt prod-ready
     */
    grunt.registerTask('prod-ready', ['clean:prod', 'less:prod', 'requirejs', 'uglify:prod', 'copy:prod']);
};
