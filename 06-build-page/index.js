 
const fs = require("fs");

const path = require('path');

let st = path.join( path.dirname(__dirname), '05-merge-styles', 'index.js' )
 
var buildStyles = require(st);
buildStyles(__dirname); 