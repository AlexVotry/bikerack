'use strict';

import babel from 'gulp-babel';
import cache from 'gulp-cached';
import del from 'del';
import gulp from 'gulp';
import mocha from 'gulp-mocha';
import nodemon from 'gulp-nodemon';
import path from 'path';
import { protractor } from 'gulp-protractor';
import remember from 'gulp-remember';

const opts = {
  spec: {
    tests: 'spec/**/*spec.js',
    features: 'spec/features/**/*.feature'
  },
  server: {
    sources: 'app/**/*.js',
    sourcedir: 'app/',
    builddir: 'api/',
    runner: 'bin/www',
    url: 'http://127.0.0.1',
    port: process.env.PORT || 3000
  },
  client: {
    sources: ['public/**/*.js', '!public/lib/**/*.js'],
    builddir: 'dist/',
    assets: [
      'public/**/*.html',
      'public/**/angular.js'
    ]
  }
};

gulp.task('default', () => {
  console.log('<gulp>... It works!');
});

gulp.task('test', ['mocha', 'protractor']);

gulp.task('mocha', () => {
  gulp.src(opts.spec.tests, { read: false })
    .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('protractor', () => {

  const configFile = path.join(__dirname, 'protractor.conf.js');
  const baseUrl = opts.server.url + ':' + opts.server.port;

  gulp.src(opts.spec.features, { read: false })
    .pipe(protractor({
      configFile: configFile,
      args: ['--baseUrl', baseUrl]
    }))
    .on('error', (e) => { throw e });
});

function transpile(source, destination, cacheName) {
  let stream = gulp.src(source)
                 .pipe(cache(cacheName))
                 .pipe(babel())
                 .pipe(remember(cacheName))
                 .pipe(gulp.dest(destination));
  return stream;
}

gulp.task('babel-server', () => {
  return transpile(opts.server.sources, opts.server.builddir, 'server');
});

gulp.task('babel-client', () => {
  return transpile(opts.client.sources, opts.client.builddir, 'client');
});

gulp.task('clean', () => {
  return del([opts.server.builddir, opts.client.builddir]);
});

gulp.task('clear', () => {
  return (cache.caches = {});
});

gulp.task('build-assets', () => {
  return gulp.src(opts.client.assets)
    .pipe(gulp.dest(opts.client.builddir));
});

gulp.task('build-client', ['babel-client', 'build-assets']);

gulp.task('watch', ['build-client'], () => {
  gulp.watch(opts.client.sources, ['babel-client']);
  gulp.watch(opts.client.assets, ['build-assets']);
});

gulp.task('start', ['watch', 'babel-server'], () => {
  let stream = nodemon({
                 script: opts.server.runner,
                 watch: opts.server.sourcedir,
                 tasks: ['babel-server']
               });
  return stream;
});

