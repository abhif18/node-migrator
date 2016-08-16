const express = require('express');
const app = express();
const morgan = require('morgan');
busboy = require('connect-busboy');
const fs = require("fs");
const sutil = require('line-stream-util');
const mysql = require('mysql');
const Sequelize = require('sequelize');
var Zip = require('node-7z'); // Name the class as you want! 
var myTask = new Zip();
var shell = require('shelljs');
const bodyParser = require('body-parser');


var Converter = require("csvtojson").Converter;
var converter = new Converter({workerNum:4});

// Add headers
app.all('*', function(req, res,next) {
    /**
     * Response settings
     * @type {Object}
     */
    var responseSettings = {
        "AccessControlAllowOrigin": req.headers.origin,
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
        "AccessControlAllowCredentials": true
    };

    /**
     * Headers
     */
    res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
    res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }


});

app.use(morgan('dev'));
app.use(busboy());

var sequelize = new Sequelize('results', 'root', '');
sequelize.authenticate().then(function(){
    console.log('COnnection to MySQL Databse Successful !!');
},function(errors) {
 console.log(errors)
  });

app.get('/',(req,res,next)=>{
res.writeHead(200,{'Content-type':'text/plain'});
res.end('Hello');
});

/*var processCSV = () =>{
   converter.fromFile("./uploads/file.csv",function(err,result){
    
});
}*/
app.use(bodyParser.urlencoded({
    extended: false
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

app.post('/saveschema', function(req, res, next) {
console.log(req.body);
res.writeHead(200,'Content-type:text/plain');
res.end(JSON.stringify(req.body));
});

app.post('/upload', function(req, res, next) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename); 
        fstream = fs.createWriteStream('./file.7z');
        file.pipe(fstream);
        fstream.on('close', function () {
        

    var child = shell.exec('7z.exe e "file.7z"', function(code, stdout, stderr) {
  if(stderr){
  console.log('Program stderr:', stderr);
  res.writeHead(200,'Content-type:text/plain');
    res.end('Problem in UnZipping 7z');
}
 else{
     console.log('Program output:', stdout);
     console.log('Extraction Complete');
      console.log('Exit code:', code);
      fs.createReadStream('file.csv')
  .pipe(sutil.head(1)) // get head lines
  .pipe(sutil.split())
  .setEncoding('utf8')
  .on('data', function(data){
    res.writeHead(200,'Content-type:text/plain');
    res.end(data);
  });
 }
  });
          
        });
    });
});


app.listen(4000,(err)=>{
	if(err)
		throw(err);
 console.log('Server up ');
});

