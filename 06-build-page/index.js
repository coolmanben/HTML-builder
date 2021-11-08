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
                                fs.writeFile( toFile, sample, function(){ console.log('done' )});
                            }
                        }
                    }); 
                }) 
            }
        })
    })
})

function copyAllfiles( dirname, folderNameFrom, folderNameTo ) {
    const fs = require("fs");

    const path = require('path');

    let fromFolderDir = path.join( dirname, folderNameFrom)
    let toFolderDir = path.join( dirname, folderNameTo)

    fs.mkdir(toFolderDir, { recursive: true }, (err) => {
        if (err) {
            return console.log(err);
        }
    });

    fs.readdir(fromFolderDir, {withFileTypes: true} , ( err, data) => {
        if (err) {
            return console.log(err);
        }
        data.forEach(file => {
            if (file.isFile() ) {  
          
                fs.copyFile( path.join( dirname, folderNameFrom, file.name) , path.join( dirname, folderNameTo, file.name), (err) => {
                    if (err) {
                        return console.log(err);
                    }
                } );
            }
            else {
               
                copyAllfiles( dirname, folderNameFrom + '//' + file.name, folderNameTo + '//' + file.name  );
            }
        })
    } )
}

copyAllfiles( __dirname, 'assets', 'project-dist//assets' );
