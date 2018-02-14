var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check', 'webpack'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});


gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required0. to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task("webpack", function(callback) {
    // run webpack
    webpack(require("./webpack.config.js"), function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task("webpack-dev-server", function(callback) {
    // Start a webpack-dev-server
    var compiler = webpack(require("./webpack.config.js"));

    new WebpackDevServer(compiler, {
        // server and middleware options
    }).listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

        // keep the server alive or continue?
        // callback();
    });
});

gulp.task("android-sign-build", function(callback){
  var prompt = require("prompt");
  var sign = require("android-sign");
  function signApp(signParams){
    var schema = {
      properties: {
        alias: {
          pattern: /^[a-zA-Z\s\-]+$/,
          message: 'Name must be only letters, spaces, or dashes',
          required: true
        },
        password: {
          hidden: true
        }
      }
    };
    prompt.start();
    prompt.get(schema, function(err,result){
      signParams.alias = result.alias; 
      signParams.password = result.password;
      console.log(result.password);
      try{
        var isSigned = sign(signParams);
        if(isSigned == true)console.log("App signed successfully and deployed in "+signParams.output);
        else{
          console.log("Keystore alias or password wrong, try again.");
          signApp(signParams);
        }
      } catch(err){
        console.log(err);
        signApp(signParams);
      }
    })
  }
  var signParams = {
    "apk":"./platforms/android/build/outputs/apk/android-release-unsigned.apk",
    "signkey": "./.keystore",
    "output" : "./platforms/android/android-release-signed.apk"
  };
  console.log("Please enter credentials for keystore "+signParams.signkey);
  signApp(signParams);
});

