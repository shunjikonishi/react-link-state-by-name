module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    watch: {
      js: {
        files: ['index.js', 'test/{,**/}*.jsx'],
        tasks: ['eslint']
      }
    },
    eslint: {
      mixin: {
        options: {
          envs: ["commonjs"]
        },
        files: {
          src: ['index.js']
        }
      },
      test: {
        options: {
          envs: ["node", "es6", "mocha"],
        },
        files: {
          src: ['test/{,**/}*.js']
        }
      }
    },
    mochaTest: {
      test: {
        src: ['test/.setup.js', 'test/test.js']
      },
    }
  });

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('default', [
    'test'
  ]);

};
