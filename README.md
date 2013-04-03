## Description

This project is being used to demonstrate how to integrate [grunt][] into
a project. [TodoMVC][] is the original
project that this is based on.  It integrates Backbone.js + RequireJS to 
create a simple todo list within localstorage. The project also is using
[Bower][] for package management of front-end resouces.

This does require that nodeJS, gruntjs, and bower be installed.

## Quick start

```sh
$ git clone git://github.com/jthoms1/todomvc-grunt.git
# install dependent plugins
$ cd todomvc-grunt
$ npm install     # Install grunt dev dependencies into /node_modules
$ bower install   # Install front-end resources from bower into /components
```

## Directory structure
<pre>
|-- components - Project dependencies from Bower
|-- dev - Directory containing development environment of site for testing.
|-- publish - Contains production environment. Files are compressed.
|-- src
|   |-- css - Source less files 
|   |-- img - Source images
|   |-- js - Source js files. Each file is an amd module
|   `-- index.html - Base index page
`-- Gruntfile.js - Gruntfile contains the build process for this setup
`-- component.json - Defines dependencies for Bower
`-- package.json - Describes current project and its dependencies
`-- README.md - This file.
</pre>
## Process
This project is meant to be used as a template. Use what you can, remove what you
don't want.

Development occurs within the `/src` directory. While you are actively developing your project
it is recommended that keep `grunt watch` running in the background.  As grunt sees your
file changes it will build the necessary files into the `/dev` directory.  So point your browser
to the index file within /dev for see the results.

After you have completed your changes and are ready to push to a production environment 
execute the `grunt prod-ready` command.  This will rebuild the file structure and uglify 
the css and js files into the `/publish` directory. The publish directory should be ready to be pushed
or ftped to your production environment.

## Demonstrates

* Lint JS files with jshint
* Compile / Compress LESS files into CSS
* RequireJS / Uglify JS
* Precompile underscore files to JSTs
* Copy source files into a publish directory
* Run tasks when files being watched are saved
* Uses grunt devtools to interact with chrome

## Release History

* 2013-03-02    v0.2.1   Added Bower and using requirejs for builds instead of concating files.
* 2013-03-02    v0.2.0   Changed project to use Grunt 0.4.0.
* 2012-11-11    v0.1.0   Initial project release used to demonstrate Grunt usage for MadJS November.

[todoMVC]: http://addyosmani.github.com/todomvc
[grunt]: https://github.com/gruntjs/grunt
[bower]: https://github.com/twitter/bower
