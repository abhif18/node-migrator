// const csv2json = require('csvtojson');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require("fs");

app.use(bodyParser.json({uploadDir:'./uploads'}));
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(6000,function(err){
 if(err){
  console.log(err);
 }
 else{
  console.log('Server Running on Port 6000');
 }
});

app.get('/',function(req,res,next){
   res.writeHead(200,{'Content-Type': 'text/json'});
   res.end({
    yes:'yes'
   });
});
app.post('/upload', function(req, res, next) {
    console.log(req.body);
    console.log(req.files);
    var tmp_path = req.files.thumbnail.path; 
    var dest = path.join(__dirname,'uploads');
    fs.rename(tmp_path, dest, function(err) {
        if (err) throw err;
        // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
        fs.unlink(tmp_path, function() {
            if (err) throw err;
            res.writeHead(200,{"Content-Type": "text/plain"});
            res.end('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
        });
    });
});


const Sequelize = require('sequelize');
var sequelize = new Sequelize('cities', 'root', '');

var Converter=require("csvtojson").Converter;
var csvConverter=new Converter({headers:["CountryName","StateName","CityName","DistrictName","CountryName2","StateName2","CityName2","DistrictName2","CityName2"],workerNum:4}); // The parameter false will turn off final result construction. It can avoid huge memory consumption while parsing. The trade off is final result will not be populated to end_parsed event. 

//Take Attribute Name from the User as Input
//Loop through All the Attributes and form an array 
//Eg: Field1: Sequelize.STRING , Field2: Sequelize.STRING  .... 

/*var User = sequelize.define('District', {
  CountryName: Sequelize.STRING,
  StateName: Sequelize.STRING,
  CityName: Sequelize.STRING,
  DistrictName: Sequelize.STRING,
  CountryName2: Sequelize.STRING,
  StateName2: Sequelize.STRING,
  CityName2: Sequelize.STRING,
  DistrictName2:Sequelize.STRING,
  ExtraField1: Sequelize.STRING,
  ExtraField2: Sequelize.STRING,
  ExtraField3: Sequelize.STRING,
  ExtraField4: Sequelize.STRING
});

User.sync();*/

/*var readStream=fs.createReadStream("file.csv");
 
var writeStream=fs.createWriteStream("cities.json");
 
readStream.pipe(csvConverter).pipe(writeStream);

readStream.on('finish',function(){
   fs.createReadStream('cities.json').on('finish',function(){

   });
});

//Commented


/*
csvConverter.fromFile("./file.csv",function(err,result){
 if(err){
  console.log('Some Error Occured');
 }
 else{
  //console.log(result);
  var res = JSON.stringify(result);
  fs.writeFile('cities.json',res,function(err,data){
    if(err){
      console.log('Some Error Occured in Wrtiting File');
    }
    else{
      console.log('Success! Created cities.json');
      res[0].forEach(function(entry){
        User.create({

        });
      });
      console.log('Inserted in the Database');
    }
  });
/*  var file = fs.createWriteStream('cities2.json');
file.on('error', function(err) {  error handling  });
result.forEach(function(v) { file.write(v.join(', ') + '\n'); });
file.end();
 }
});
*/