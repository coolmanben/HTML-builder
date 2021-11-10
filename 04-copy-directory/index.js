const fs = require("fs");

const path = require('path');

function copyFolder( dirname, folderNameFrom, folderNameTo ) {

    let fromFolderDir = path.join( dirname, folderNameFrom)
    let toFolderDir = path.join( dirname, folderNameTo)

    fs.mkdir(toFolderDir, { recursive: true }, (err) => {
        if (err) {
            return console.log(err);
        }
        fs.readdir(fromFolderDir , ( err, data) => {
            if (err) {
                return console.log(err);
            }
            data.forEach(file => {
                    fs.copyFile( path.join( dirname, folderNameFrom, file) , path.join( __dirname, folderNameTo, file), (err) => {
                        if (err) {
                            return console.log(err);
                        }
                    } );
            })
            fs.readdir(toFolderDir , ( err, dataUp) => {

                if (err) {
                    return console.log(err);
                }
                dataUp.forEach(fileUp => {
                    console.log( !data.includes( fileUp ))
                    console.log( fileUp )
                    console.log( data )
                    if ( !data.includes( fileUp ) ) {  
                        fs.unlink(  path.join( __dirname, folderNameTo, fileUp), (err) => {
                            if (err) {
                                return console.log(err);
                           }
                        } );
                    }
                })   
            })
        })
    });
}

copyFolder(__dirname, 'files', 'files-copy');

module.exports = exports = function(dirname, folderNameFrom, folderNameTo) {
    copyFolder(dirname, folderNameFrom, folderNameTo);
};