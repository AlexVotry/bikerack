'use strict';

import gulp from 'gulp';
import mocha from 'gulp-mocha';
import { protractor } from 'gulp-protractor';

gulp.task('default', () => {
  console.log('<gulp>... It works!');
});

gulp.task('test', ['mocha']);

gulp.task('mocha', () => {
  gulp.src('spec/**/*spec.js', { read: false })
    .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('protractor', () => {
  gulp.src(['spec/features/**/*feature'])
    .pipe(protractor({
      configFile: './protractor.config.js',
      args: ['--baseUrl', 'http://127.0.0.1:3000']
    }))
    .on('error', (e) => { throw e });
});

