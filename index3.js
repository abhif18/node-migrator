/*var Zip = require('node-7z'); // Name the class as you want! 
var myTask = new Zip();
myTask.extractFull('file.7z', './uploads')
 
// Equivalent to `on('data', function (files) { // ... });` 
.progress(function (files) {
  console.log('Some files are extracted: %s', files);
}) 
// When all is done 
.then(function () {
  console.log('Extracting done!');
}) 
// On error 
.catch(function (err) {
  console.error('Some Error Occured '+err);
});*/


'use strict';
 var shell = require('shelljs');

var child = shell.exec('7z.exe e "file.7z"', {async:true});
child.stdout.on('data', function(data) {
  /* ... do something with data ... */
  console.log(data);
});