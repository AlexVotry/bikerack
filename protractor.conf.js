exports.config = {
  framework: 'custom',
  rootElement: '[ng-app]',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  capabilities: {
    browserName: 'phantomjs',
    'phantomjs.cli.args': ['--webdriver-loglevel=ERROR'],
    'phantomjs.ghostdriver.cli.args': ['--loglevel=ERROR']
  },
  cucumberOpts: {
    require: [
      'spec/features/steps/steps.js',
      'spec/features/support/world.js'
    ]
  }
};

