'use strict';

import gulp from 'gulp';
import mocha from 'gulp-mocha';

gulp.task('default', () => {
  console.log('<gulp>... It works!');
});

gulp.task('test', ['mocha']);

gulp.task('mocha', () => {
  gulp.src('spec/**/*spec.js', { read: false })
    .pipe(mocha({ reporter: 'spec' }));
});

