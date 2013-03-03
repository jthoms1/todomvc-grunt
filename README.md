## Description

This project is being used to demonstrate how to integrate [grunt][] into
a project. [TodoMVC][] is the original
project that this is based on.  It integrates Backbone.js + RequireJS to 
create a simple todo list within localstorage.

This does require that nodeJS and gruntjs be installed.

## Quick start

```sh
$ git clone git://github.com/jthoms1/todomvc-grunt.git
# install dependent plugins
$ cd todomvc-grunt
$ npm install
```

## Demonstrates

* Lint JS files with jshint
* Compile / Compress LESS files into CSS
* Concat / Compress JS
* Precompile underscore files to JSTs
* Copy source files into a publish directory
* Run tasks when files being watched are saved
* Uses grunt devtools to interact with chrome

## Release History

* 2013-03-02    v0.2.0   Changed project to use Grunt 0.4.0.
* 2012-11-11    v0.1.0   Initial project release used to demonstrate Grunt usage for MadJS November.

[todoMVC]: http://addyosmani.github.com/todomvc
[grunt]: https://github.com/gruntjs/grunt