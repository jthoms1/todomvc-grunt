/*global module:false*/
module.exports = function (grunt) {

    var init = {

        /**
         * Lints javascript files using jshint
         * - excluding templates from list because it is compiled src
         * - excluding global from list because it is output from concat
         * - excluding lib from list because I am only linting my own code.
         */
        lint: {
            files: [
                'js/!(templates|global).js',
                'js/!(lib)/*.js'
            ]
        },
        jshint: {
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
                trailing: true
            },
            globals: {
                jQuery: true,
                require: true,
                define: true,
                JST: true
            }
        },

        /*
         * RECESS
         * (grunt-recess)
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
        recess: {
            // Configuration for linting less/css files
            lint: {
                src: 'css/base.less',
                options: {
                    noIDs: false,
                    noOverqualifying: false,
                    strictPropertyOrder: false
                }
            },

            // Only need to compile files when working in development environment
            dev: {
                src: 'css/base.less',
                dest: 'css/base.css',
                options: {
                    compile: true
                }
            },

            // When compiling less files for production also minify them(compress)
            prod: {
                src: 'css/base.less',
                dest: 'publish/css/base.css',
                options: {
                    compile: true,
                    compress: true
                }
            }
        },

        /**
         * Only concatenate js files recess will handle css/less files.
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
                    stripExtension: true,
                    relativePath: "js/templates/"
                },
                files: {
                    'js/templates.js': ['js/templates/**/*.html']
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
        min: {
            prod: {
                src: ['js/global.js'],
                dest: 'publish/js/global.js'
            }
        },

        clean: {
            prod: ['publish/**']
        },

        // Configuration for grunt-reload. Enabling live-reload within browser.
        reload: {
            liveReload: {
                port: 35729, // default port for Live Reload browser plugins
                liveReload: {
                    apply_css_live: true,    // Won't actually work until grunt 0.4 is released
                    apply_images_live: true  // Won't actually work until grunt 0.4 is released
                }
            }  
        },
        server: {
            port: 9999
        },

        // Watch to concat js files and concat/compile less(css) files
        watch: {
            recess : {
                files: 'css/**/*.less',
                tasks: 'recess:dev reload'
            },
            concat : {
                files: ['js/*/**/*.js', 'js/!(global).js'],
                tasks: 'concat:dev reload'
            },
            jst : {
                files: 'js/templates/**/*.html',
                tasks: 'jst:compile concat:dev reload'
            }
        }
    };

    // Project configuration.
    grunt.initConfig(init);

    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-reload');
    grunt.loadNpmTasks('grunt-contrib');

    /** default includes: compiling js templates, 
     *                   concating js files, 
     *                   compiling less files
     *
     * default task is ran like this: $ grunt
     */
    grunt.registerTask('default', 'jst:compile concat:dev recess:dev');

    /**
     * task includes: using jshint to lint js files
     *                using recess to ling less files
     *
     * default task is ran like this: $ grunt lint-project
     */
    grunt.registerTask('lint-project', 'recess:lint lint');

    /**
     * task includes: starting web server instance
     *                starting liveReload
     *                begin watching files and run all watch tasks
     *
     * default task is ran like this: $ grunt liveReload
     */
    grunt.registerTask('liveReload', 'server reload:liveReload watch');

    /**
     * task includes: clean publish directory,
     *                compile and minify less files - place in publish directory
     *                minify js files - place in publish directory
     *                copy assets and html to publish directory
     *
     * default task is ran like this: $ grunt prod-ready
     */
    grunt.registerTask('prod-ready', 'clean:prod recess:prod min:prod copy:prod');
};