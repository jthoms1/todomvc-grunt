/*global module:false*/
'use strict';
var path = require("path");

module.exports = function (grunt) {

    var init = {
        pkg: grunt.file.readJSON('package.json'),
        /**
         * Lints javascript files using jshint
         * - excluding templates from list because it is compiled src
         * - excluding global from list because it is output from concat
         * - excluding lib from list because I am only linting my own code.
         */
        jshint: {
            files: [
                'js/!(templates|global).js',
                'js/!(lib)/*.js'
            ],
            options: {
                browser: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                indent: 4,
                plusplus: true,
                latedef: true,
                undef: true,
                newcap: true,
                noarg: true,
                sub: true,
                eqnull: true,
                strict: true,
                trailing: true,
                globals: {
                    jQuery: true,
                    require: true,
                    define: true,
                    JST: true
                }
            }
        },

        /*
         * RECESS
         * (grunt-less)
         * Default options
         * ----------------------
         *     compile: false             // Compiles CSS or LESS. Fixes white space and sort order.
         *     compress: false            // Compress your compiled code
         *     noIDs: true                // Doesn't complain about using IDs in your stylesheets
         *     noJSPrefix: true           // Doesn't complain about styling .js- prefixed classnames
         *     noOverqualifying: true     // Doesn't complain about overqualified selectors (ie: div#foo.bar)
         *     noUnderscores: true        // Doesn't complain about using underscores in your class names
         *     noUniversalSelectors: true // Doesn't complain about using the universal * selector
         *     prefixWhitespace: true     // Adds whitespace prefix to line up vender prefixed properties
         *     strictPropertyOrder: true  // Complains if not strict property order
         *     stripColors: false         // Strip colors from the Terminal output
         *     zeroUnits: true            // Doesn't complain if you add units to values of 0
         */
        less: {
            // Only need to compile files when working in development environment
            dev: {
                files: {
                    'css/base.css': 'css/base.less'
                }
            },

            // When compiling less files for production also minify them(compress)
            prod: {
                files: {
                    'publish/css/base.css': 'css/base.less'
                },
                options: {
                    compress: true
                }
            }
        },

        /**
         * Only concatenate js files less will handle css/less files.
         * - excluding global from list because it is output from this task
         */
        concat: {
            dev: {
                src: ['js/*/**/*.js', 'js/!(global).js'],
                dest: 'js/global.js'
            }
        },

        /*
         * Precompile underscore javascript templates
         * Task takes a regex for file list and creates a give JS file.
         */
        jst: {
            compile: {
                options: {
                    relativePath: "js/templates/",
                    processName: function (src) {
                        var relativePath = "js/templates/";
                        relativePath = path.normalize(relativePath);
                        return src.replace(/(\.[^.]+)$/, "").replace(relativePath, ""); // Remove file extensions and relativePath
                    }
                },
                files: {
                    'js/templates.js': ['<%= jst.compile.options.relativePath %>/**/*.html']
                }
            }
        },

        /**
         * Copy files into the production directory for use when published
         * - Will not copy css, js, templates because they are handled in other tasks
         */
        copy: {
            prod: {
                options: {
                    basePath: "."
                },
                files: {
                    "publish/": ["img/*", "assets/**", "index.html"]
                }
            }
        },

        // Minify is only setup for prod not really needed for development
        uglify: {
            prod: {
                files: {
                    'publish/js/global.js': ['js/global.js']
                }
            }
        },

        clean: {
            prod: {
                src: ['publish/**']
            }
        },

        // Watch to concat js files and concat/compile less(css) files
        watch: {
            less : {
                files: 'css/**/*.less',
                tasks: ['less:dev']
            },
            concat : {
                files: ['js/*/**/*.js', 'js/!(global).js'],
                tasks: ['concat:dev']
            },
            jst : {
                files: 'js/templates/**/*.html',
                tasks: ['jst', 'concat:dev']
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
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-devtools');

    /** default includes: compiling js templates, 
     *                   concating js files, 
     *                   compiling less files
     *
     * default task is ran like this: $ grunt
     */
    grunt.registerTask('default', ['jst', 'concat:dev', 'less:dev']);

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
     *                minify js files - place in publish directory
     *                copy assets and html to publish directory
     *
     * default task is ran like this: $ grunt prod-ready
     */
    grunt.registerTask('prod-ready', ['clean:prod', 'less:prod', 'uglify:prod', 'copy:prod']);
};