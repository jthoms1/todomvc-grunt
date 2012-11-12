## Description

This project is being used to demonstrate how to integrate [grunt][] into
a project. [TodoMVC][] is the original
project that this is based on.  It integrates Backbone.js + RequireJS to 
create a simple todo list within localstorage.

This does require that nodeJS and gruntjs be installed.

## Quick start

```sh
$ git clone git://github.com/jthoms1/todomvc-grunt.git
# install dependent packages
$ npm install
```

## Demonstrates

* Lint JS files with jshint
* Compile / Compress / lint LESS using RECESS
* Concat / Compress JS
* Precompile underscore files to JSTs
* Copy source files into a publish directory
* Run tasks when files being watched are saved
* Uses grunt-reload to do live page reloads


[todoMVC]: http://addyosmani.github.com/todomv
[grunt]: https://github.com/gruntjs/grunt