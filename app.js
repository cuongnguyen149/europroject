'use strict';

var SwaggerExpress  = require('swagger-express-mw');
var express         = require('express');
var app             = express();
var appConfig       = require('./config/appConfig');
var mongoose 	      = require('mongoose');
var url_mongo       = "mongodb://127.0.0.1:27017/euro_project";
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};
app.use(express.static(__dirname + '/public'));
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if  (!req.originalUrl) {
  	res.setHeader('Content-Type', 'application/json');
	res.json(myUtils.createErrorStr(constants.BAD_PARAMETERS));
	return;
  }
  next();    
  //console.log(req.originalUrl + "  " + req.headers.token);
 //  if (req.originalUrl.indexOf("/login") >= 0 || req.originalUrl.indexOf("/user") >= 0 || req.originalUrl.indexOf("/doc/api") >= 0) {
	// next();
	// } else if (req.headers.token) {
	// 	myUtils.validateToken(req, res, next);
	// } else {
	// // ignore
	//   // res.json(myUtils.createErrorStr('No token found', constants.NO_TOKEN_CODE));
	// next();
 // }
});

//CONNECT MONGODB

mongoose.connect(url_mongo, function (err, res) {
    if (err) {
      console.log ('ERROR connect to MongoDB : ' + err);
    } else {
      console.log ('CONNECTED to MongoDB');
    }
});

app.get('/doc/api', function(req, res){
	res.sendfile('public/index.html');
});

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = appConfig.app.port;
  var io   = require('socket.io').listen(app.listen(port, function(err){
    if(!err){ 
      	console.log("Server listening on port: " + port)
    }else{
    	console.log(err);
    }
  }));
  // socketLeader = require('./api/controllers/socket/leader')(io);
});