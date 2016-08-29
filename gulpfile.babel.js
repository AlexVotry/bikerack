'use strict';

import gulp from 'gulp';
import mocha from 'gulp-mocha';
import { protractor } from 'gulp-protractor';
import nodemon from 'gulp-nodemon';

gulp.task('default', () => {
  console.log('<gulp>... It works!');
});

gulp.task('test', ['mocha']);

gulp.task('mocha', () => {
  gulp.src('spec/**/*spec.js', { read: false })
    .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('protractor', () => {
  gulp.src(['spec/features/**/*feature'], { read: false })
    .pipe(protractor({
      configFile: './protractor.config.js',
      args: ['--baseUrl', 'http://127.0.0.1:3000']
    }))
    .on('error', (e) => { throw e });
});

gulp.task('start', () => {
  nodemon({
    script: 'bin/www',
    ext: 'js html',
    ignore: ['spec/', 'public/lib/', 'tmp', 'protractor.config.js'],
    env: { 'NODE_ENV': 'development' }
  });
});
