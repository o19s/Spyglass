module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        banner: '/*! <%= pkg.name %> - <%= pkg.appVersion %> */\n\n',
        separator: '\n\n'
      },
      dist: {
        src: ['../src/namespace.js', 
        '../src/utils.js', 
        '../src/Searchers/class.js', 
        '../src/Searchers/Solr.js', 
        '../src/Components/observer.js', 
        '../src/Components/result_set.js', 
        '../src/Components/input.js', 
        '../src/Components/pagination.js', 
        '../src/Components/facets.js',
        '../src/init.js'],
        dest: '../spyglass-dev.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - <%= pkg.appVersion %> */\n\n'
      },
      dist: {
        files: {
          '../<%= pkg.name %>.<%= pkg.appVersion %>.min.js': ['../spyglass.js']
        }
      }
    },
    qunit: {
      files: ['../tests/*.html']
    },
    jshint: {
      files: ['gruntfile.js', '../src/spyglass.js'],
      options: {
        multistr: true,
        loopfunc: true,
        browser: true,
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    removelogging: {
      dist: {
        src: "../spyglass-dev.js",
        dest: "../spyglass.js"
      }
    },
    watch: {
      files: ['*.js', '../src/*.js', '../src/Components/*.js', '../src/Searchers/*.js'],
      tasks: ['concat', 'removelogging', 'jshint', 'uglify']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks("grunt-remove-logging");

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};