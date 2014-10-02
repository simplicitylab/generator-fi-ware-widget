# Grunt-Supercharged

A GruntJS generator for Yeoman that creates an optimized GruntJS project inspired by the HTML5rocks article '[Supercharging your Gruntfile](http://www.html5rocks.com/en/tutorials/tooling/supercharging-your-gruntfile/)'

<br/>

### Usage

	$ yo grunt-supercharged


<br/>

### Optimization 1 : autoloading grunt plugins

By using the gruntjs module '[load-grunt-tasks](https://www.npmjs.org/package/load-grunt-tasks)' you don't need to manually load each task which can be cumbersome. This module will read the dependencies in your package.json  and load grunt tasks that match the provided patterns.

#### before

	grunt.loadNpmTasks('grunt-recess');
	grunt.loadNpmTasks('grunt-sizediff');
	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-styl');
	grunt.loadNpmTasks('grunt-php');
	...
	
#### after
	require('load-grunt-tasks')(grunt);

<br /> 


### Optimization 2 : Splitting configuration in individual files

The module [load-grunt-config](https://www.npmjs.org/package/load-grunt-config) lets you break up your Gruntfile config by task. Every task has its own javascript file defined in the folder grunt.

#### folder structure

	- myproject/
	-- Gruntfile.js
	-- grunt/
	--- aliases.yaml
	--- concat.js
	--- uglify.js


#### grunt/uglify.js

	module.exports = {
		dist: {
    		files: {
      			'dist/js/build.min.js': ['dist/js/build.js']
    		}
  		}
	};
	
The module requires an aliasas file (aliases.yaml) where you can register your task

### grunt/aliases.yaml

	default:
		- 'concat'
		- 'uglify'

<br />

### Optimization 3 : only process modified files

The module [grunt-newer](https://www.npmjs.org/package/grunt-newer) builds a local cache and only execute tasks on files that changed since the last task has runned. This can speedup the build process enormously !

Simply prepend “newer:” to any of your tasks pipes 

### grunt/aliases.yaml

	default:
		- 'newer:concat'
		- 'newer:uglify'
  		
<br/>  		

## Optional modules

You can enable following handy modules through the interactive terminal. 

* [grunt-contrib-watch](https://www.npmjs.org/package/grunt-contrib-watch)
* [grunt-contrib-clean](https://www.npmjs.org/package/grunt-contrib-clean)

<br/>

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)  		

 

