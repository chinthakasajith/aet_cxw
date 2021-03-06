module.exports = function(grunt) {

  var configFile = './config/config-local.json';
  var environment = 'local';
  if (grunt.option('env')) {
    // grunt.log.writeln('config: '+grunt.option('config'));
    environment = grunt.option('env');
    configFile = './config/config-' + environment + '.json';
  }
  var configJson = require(configFile);

  if (!configJson.connect) {
    configJson.connect = {
      hostname: '',
      port: '',
      basePath: ''
    }
  }

  var buildTasks = [
    'clean',
    'angular-builder:dev',
    'ngtemplates',
    'less',
    'preprocess',
    'copy:dev',
    'concat:dist'
  ];

  var debugBuildTasks = [
    'clean',
    'angular-builder:dev:debug',
    'ngtemplates',
    'less',
    'preprocess',
    'copy:debug',
    'concat:dist'
  ];
  var testTasks = debugBuildTasks.concat(['concat:test']);

  // These are app dependencies that are not compatible with the angular-builder
  // plugin, or are not angular plugins. We will manually concat these with the
  // result of the angular-builder task
  var appDependencies = [
    'app/bower_components/angular/angular.js',
    'app/bower_components/lodash/lodash.js',
    'app/bower_components/angular-ui-router/release/angular-ui-router.js',
    'app/bower_components/angular-ui-utils/ui-utils.js',
    'app/bower_components/angular-bootstrap/ui-bootstrap.js',
    'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
    'app/bower_components/**/angular-cookies.js',
    'app/bower_components/**/angular-local-storage.js',
    'app/bower_components/**/angular-animate.js',
    'app/bower_components/**/angularjs-color-picker.js',
    'app/bower_components/**/tinycolor.js',
    'app/bower_components/textAngular/dist/textAngular-rangy.min.js',
    'app/bower_components/textAngular/dist/textAngular-sanitize.min.js',
    'app/bower_components/textAngular/dist/textAngular.min.js',
    'app/bower_components/**/dist/select.min.js',
    'app/bower_components/checklist-model/checklist-model.js',
    'app/bower_components/**/sortable.js',
    'app/bower_components/angular-awesome-slider/dist/angular-awesome-slider.min.js',
    'app/assets/js/Chart.js',
    'app/assets/js/FileSaver.js',
    'app/assets/js/jspdf.js',
    'app/assets/js/jspdf.plugin.addimage.js',
    'app/assets/js/jspdf.plugin.from_html.js',
    'app/assets/js/jspdf.plugin.ie_below_9_shim.js',
    'app/bower_components/**/angular-chart.js',
    'app/bower_components/**/html2canvas.js',
    'app/bower_components/**/canvas-to-blob.js',
    'app/bower_components/**/jquery.webui-popover.js',
    'app/bower_components/**/d3.js',
    'app/bower_components/**/nv.d3.js',
    'app/bower_components/**/angular-nvd3.js'
  ];

  var testDependencies = [
    'node_modules/angular-mocks/angular-mocks.js'
  ];

  grunt.initConfig({
    clean: {
      dev: ['build', 'tmp']
    },

    copy: {
      debug: {
        files: [
          // js
          {
            expand: true,
            src: ['app/src/**/*.js', 'app/assets/js/*.js'],
            dest: 'build/'
          },
          // html
          {
            expand: true,
            cwd: 'app/',
            src: ['index.html', 'src/**/*.html'],
            dest: 'build/'
          },
          // css
          {
            expand: true,
            cwd: 'app/assets/css/',
            src: '**',
            dest: 'tmp/css/'
          },
          // fonts
          {
            expand: true,
            cwd: 'app/assets/fonts/',
            src: '**',
            dest: 'build/assets/fonts/'
          },
          // images
          {
            expand: true,
            cwd: 'app/assets/images/',
            src: '**',
            dest: 'build/assets/images/'
          },
          // files
          {
            expand: true,
            cwd: 'app/assets/files/',
            src: '**',
            dest: 'build/assets/files/'
          },
          {
            expand: true,
            cwd: 'app/',
            src: ['favicon.png', 'favicon.png'],
            dest: 'build/'
          }
        ]

      },
      dev: {
        files: [
          // html
          {
            expand: 'true',
            cwd: 'app/',
            src: 'index.html',
            dest: 'build/'
          },
          // js
          {
            expand: true,
            cwd: 'app/assets/js/',
            src: '*.js',
            dest: 'tmp/js/'
          },
          // css
          {
            expand: true,
            cwd: 'app/assets/css/',
            src: '**',
            dest: 'tmp/css/'
          },
          // fonts
          {
            expand: true,
            cwd: 'app/assets/fonts/',
            src: '**',
            dest: 'build/assets/fonts/'
          },
          // images
          {
            expand: true,
            cwd: 'app/assets/images/',
            src: '**',
            dest: 'build/assets/images/'
          },
          // files
          {
            expand: true,
            cwd: 'app/assets/files/',
            src: '**',
            dest: 'build/assets/files/'
          },
          {
            expand: true,
            cwd: 'app/',
            src: ['favicon.png', 'favicon.png'],
            dest: 'build/'
          }
        ]

      }

    },

    'angular-builder': {
      options: {
        mainModule: 'aet.bootstrap',
        releaseBuild: {
          moduleVar: 'module'
        },
        debugBuild: {
          rebaseDebugUrls: [{
            match: /^src\//,
            replaceWith: 'app/src/'
          }]
        },
        renameModuleRefs: true,
        externalModules: [
          'ui.router',
          'ui.scrollfix',
          'ui.mask',
          'ngCookies',
          'LocalStorageModule',
          'ui.bootstrap',
          'ngAnimate',
          'color.picker',
          'textAngular',
          'ui.select',
          'checklist-model',
          'ui.sortable',
          'angularAwesomeSlider',
          'chart.js',
          'nvd3',
        ],
      },
      dev: {
        src: ['app/src/**/*.js'],
        dest: 'tmp/js/aet.js'
      },
    },

    ngtemplates: {
      options: {
        module: 'aet.bootstrap',
        htmlmin: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true, // <input disabled="disabled"> => <input disabled>
          removeAttributeQuotes: true, // Remove attribute quotes when it's safe to do so.
          removeRedundantAttributes: false, // Remove redundant attributes like type="text/javascript".
          removeEmptyAttributes: false, // Remove empty (or blank) attributes.
          removeOptionalTags: false, // Some elements are allowed to have their tags omitted, like </td>.
          removeEmptyElements: false // Experimental
        }
      },
      dev: {
        cwd: 'app/',
        src: 'src/**/*.html',
        dest: 'tmp/js/templates.js'
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        files: {
          'tmp/js/deps.js': appDependencies,
          'build/assets/js/aet.js': [
            'tmp/js/deps.js',
            'tmp/js/aet.processed.js',
            'tmp/js/templates.js'
          ],
          'build/assets/css/aet.css': ['tmp/css/*.css']
        }
      },
      test: {
        files: {
          'tmp/js/testdeps.js': testDependencies,
          'test/build/aet.js': [
            'build/assets/js/aet.js',
            'tmp/js/testdeps.js'
          ]
        }
      }
    },

    watch: {
      dev: {
        files: [
          'Gruntfile.js', 'app/src/**/*.js', 'app/src/**/*.html', 'app/src/**/*.css', 'app/src/**/*.less', 'app/index.html'
        ],
        tasks: buildTasks,
        options: {
          atBegin: true
        }
      },
      debug: {
        files: [
          'Gruntfile.js', 'app/src/**/*.js', 'app/src/**/*.html', 'app/src/**/*.css', 'app/src/**/*.less', 'app/index.html'
        ],
        tasks: debugBuildTasks,
        options: {
          atBegin: true
        }
      }
    },

    connect: {
      server: {
        options: {
          hostname: configJson.connect.hostname,
          port: configJson.connect.port,
          base: configJson.connect.basePath,
          middleware: function(connect, options) {
            var optBase = (typeof options.base === 'string') ? [options.base] : options.base;
            return [require('connect-modrewrite')(['!(\\..+)$ / [L]'])].concat(optBase.map(function(path) {
              return connect.static(path);
            }));
          }
        }
      }
    },

    less: {
      dev: {
        files: {
          'tmp/css/aet-less.css': 'app/src/styles/main.less'
        },
        options: {
          plugins: [require('less-plugin-glob')]
        }
      }
    },

    ngdocs: {
      options: {
        dest: 'docs',
        html5Mode: false,
        styles: ['docs_src/css/custom-docs.css'],
        navTemplate: 'docs_src/templates/custom-nav.html'
      },
      api: {
        src: ['app/src/**/*.js'],
        title: 'Docs'
      }
    },

    preprocess: {
      options: {
        context: {
          NODE_ENV: environment,
          apiBaseUrl: configJson.apiBaseUrl,
          s3Bucket: configJson.s3bucket
        }
      },
      html: {
        src: 'app/index.tmpl',
        dest: 'build/index.html'
      },
      js: {
        src: 'tmp/js/aet.js',
        dest: 'tmp/js/aet.processed.js'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-angular-builder');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-ngdocs');
  grunt.loadNpmTasks('grunt-preprocess');

  grunt.registerTask('debug', ['connect:server', 'watch:debug']);
  grunt.registerTask('dev', ['connect:server', 'watch:dev']);
  grunt.registerTask('test', testTasks);
  grunt.registerTask('build', buildTasks);
  grunt.registerTask('docs', buildTasks.concat(['ngdocs']));

};
