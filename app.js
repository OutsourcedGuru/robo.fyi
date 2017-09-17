
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var favicon = require('serve-favicon');

var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

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

var consumables = require('./routes/consumables');
app.get('/consumables', consumables.index);
var consumables_filament_by_type_by_vendor = require('./routes/consumables-filament-by-type-by-vendor');
app.get('/consumables/filament-by-type-by-vendor', consumables_filament_by_type_by_vendor.index);

var videos = require('./routes/videos');
app.get('/videos', videos.index);

// Deal with requests for robots.txt from web crawlers
app.use(function(req, res, next) {
  if ('/robots.txt' == req.url) {
    res.type('text/plain')
    res.send("User-agent: *\nDisallow: /");
  } else {
    next();
  }
});

// Redirect hacking attempts to the FBI Internet Crime Compliant Center (IE3)
var hacking = require('./routes/hacking');
app.get('/admin',                      hacking.index);
app.get('/administrator',              hacking.index);
app.get('/command.php',                hacking.index);
app.get('/database',                   hacking.index);
app.get('/db',                         hacking.index);
app.get('/dbadmin',                    hacking.index);
app.get('/hedwig.cgi',                 hacking.index);
app.get('/mysql',                      hacking.index);
app.get('/mysql/admin',                hacking.index);
app.get('/mysql/dbadmin',              hacking.index);
app.get('/mysql/sqlmanager',           hacking.index);
app.get('/phpmanager',                 hacking.index);
app.get('/phpmyadmin',                 hacking.index);
app.get('/setup',                      hacking.index);
app.get('/sql',                        hacking.index);
app.get('/webadmin',                   hacking.index);
app.get('/webdb',                      hacking.index);
app.get('/websql',                     hacking.index);

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
