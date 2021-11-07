const fs = require("fs");

const path = require('path');

let fromFolderDir = path.join( __dirname, 'files')
let toFolderDir = path.join( __dirname, 'files-copy')

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
            
            fs.copyFile( path.join( __dirname, 'files', file.name) , path.join( __dirname, 'files-copy', file.name), (err) => {
                if (err) {
                    return console.log(err);
                }
            } );
        }
    })
} )


 




