
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
//var user = require('./routes/user');

var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
//app.get('/users', user.list);

var about = require('./routes/about');
app.get('/about', about.about);
var robo_c2 = require('./routes/robo-c2');
app.get('/robo-c2', robo_c2.index);
var robo_r2 = require('./routes/robo-r2');
app.get('/robo-r2', robo_r2.index);
var robo_r1plus = require('./routes/robo-r1plus');
app.get('/robo-r1plus', robo_r1plus.index);

var troubleshooting = require('./routes/troubleshooting');
app.get('/troubleshooting', troubleshooting.index);

var hardware = require('./routes/hardware');
app.get('/hardware', hardware.index);

var software = require('./routes/software');
app.get('/software', software.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
