
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
var hardware_parts_by_printer_by_vendor = require('./routes/hardware-parts-by-printer-by-vendor');
app.get('/hardware/parts-by-printer-by-vendor', hardware_parts_by_printer_by_vendor.index);
var hardware_robo_c2r2_board = require('./routes/hardware-robo-c2r2-board');
app.get('/hardware/robo-c2r2-board', hardware_robo_c2r2_board.index);

var software = require('./routes/software');
app.get('/software', software.index);
var software_software_by_type_by_vendor = require('./routes/software-software-by-type-by-vendor');
app.get('/software/software-by-type-by-vendor', software_software_by_type_by_vendor.index);

// Error handler for 404
app.use(function(req, res, neext) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var protocol = req.protocol;
  var url = req.url;
  var now = new Date();
  var timestamp = (now.getMonth() + 1).toString() + '/' + (now.getDate()).toString() + ' ' + (now.getHours() + 1).toString() + ':' + (now.getMinutes() + 1).toString();
  console.log(' WARNING: suspected hacking attempt [' + timestamp + '][' + protocol + '][' + url + '][' + ip + ']');
  res.status(400);
  res.send('404: File Not Found');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
