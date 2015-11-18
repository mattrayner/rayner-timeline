module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      compile: {
        files: {
          'app/www/js/app.js': 'coffee/*.coffee'
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'app/www/js/app.js', 'test/**/*.js']
    },
    jade: {
      compile: {
        options: {
          data: function(){
            return require('./jade/data/data.json');
          }
        },
        files: {
          "app/www/index.html": "jade/*.jade"
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'app/www/css/styles.css': 'sass/styles.scss'
        }
      }
    },
    nodeunit: {
      all: ['test/*_test.js'],
      options: {
        reporter: 'junit',
        reporterOptions: {
          output: 'test/result'
        }
      }
    }
  });

  // Load the plugins for our grunt tasks.
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.loadNpmTasks('grunt-contrib-jade');

  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Default task(s).
  grunt.registerTask('default', ['coffee', 'jshint', 'jade', 'sass', 'nodeunit']);
};