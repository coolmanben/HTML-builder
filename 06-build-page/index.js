 const fs = require("fs");

const path = require('path');

let buildStylesFile = path.join( path.dirname(__dirname), '05-merge-styles', 'index.js' );
let fileFolderDir = path.join( __dirname, 'components' );
let dirFile = path.join( __dirname, 'template.html' );
let toFile = path.join( __dirname, 'project-dist', 'index.html');

let sample = '';

var buildStyles = require(buildStylesFile);

buildStyles(__dirname, 'style.css');

let stream = fs.createReadStream( dirFile );

const recordStream = fs.createWriteStream( toFile ); 

stream.on('data', (data) => {
    sample += data.toString();
    
    fs.readdir(fileFolderDir, {withFileTypes: true} , ( err, data) => {
        if (err) {
            return console.log(err);
        }
        data.forEach(file => {
            if (file.isFile() ) {  
                fs.stat( fileFolderDir + file.name , (err, stats) => {
                    let formatFile = path.extname(fileFolderDir + file.name).split('.').pop();
                    let nameFile = path.parse(file.name).name;
                    let fileContentStream = fs.createReadStream(  path.join( __dirname, 'components',  file.name),'utf-8' ); 
                    fileContentStream.on('data', (data) => {
                        if (formatFile == 'html') { 
                            if ( sample.indexOf( nameFile ) > -1 ) {
                                sample = sample.replace( '{{' + nameFile + '}}', data);
                                fs.writeFile( toFile, sample, function(){console.log('done' )});
                            }
                        }
                    }); 
                }) 
            }
        })
    })
})