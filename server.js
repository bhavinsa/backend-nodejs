process.env.TMPDIR = '.';

var http = require('http');

// global Path
global.basePath = __dirname + '/';

//app configration
var app = require(basePath + 'config/app');

//Environment configration
if(process.env.NODE_ENV ==='development') {
    global.config = require(basePath + 'config/env/development');
}else if(process.env.NODE_ENV ==='staging') {
    global.config = require(basePath + 'config/env/staging');
}else if(process.env.NODE_ENV ==='production') {
    global.config = require(basePath + 'config/env/production');
}
global.config = require(basePath + 'config/env/development');
global.baseURL = "http://localhost:" + app.get('port') + "/";

//database connection
require(basePath + '/config/database');
// global Path
global.utils = require(basePath + 'helper/utils');
global.validate = require(basePath + 'helper/validate');
global.dateUtils = require(basePath + 'helper/dateUtils');
global.Sync = require('sync');
global.fs = require('fs');
global.appMessage = require(basePath + 'helper/appMessage.js');
global.l = require('log_utils');

global.logger = require(basePath + 'logger');

//server setup
http.createServer(app).listen(app.get('port'), function () {
    logger.info('Express server listening on port ' + app.get('port'));
});