exports.config = {
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  capabilities: {
    browserName: 'phantomjs',
    'phantomjs.cli.args': ['--webdriver-loglevel=ERROR'],
    'phantomjs.ghostdriver.cli.args': ['--loglevel=ERROR']
  }
};

