// Karma configuration
// Generated on Fri Sep 02 2016 20:18:53 GMT+0000 (UTC)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon-chai'],


    // list of files / patterns to load in the browser
    // !! CAUTION: file globs are expanded to include matching files in alphabetical order !!
    files: [
      'dist/lib/angular/angular.js',
      'public/lib/angular-mocks/angular-mocks.js',
      'dist/lib/angular-ui-router/release/angular-ui-router.js',
      'dist/app.js',
      'dist/app.constants.js',
      'dist/app.config.js',
      'dist/session/session.module.js',
      'dist/session/auth-interceptor.service.js',
      'dist/session/auth-interceptor.service.spec.js',
      'dist/session/session.service.js',
      'dist/session/session.service.spec.js',
      'dist/core/core.module.js',
      'dist/core/auth-token.constants.js',
      'dist/core/auth-token.service.js',
      'dist/core/auth-token.service.spec.js',
      'dist/signup/signup.module.js',
      'dist/signup/signup.service.js',
      'dist/signup/signup.service.spec.js',
      'dist/signup/signup.controller.js',
      'dist/signup/signup.controller.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}

