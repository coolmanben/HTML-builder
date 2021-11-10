const fs = require("fs");

const path = require('path');

function copyFolder( dirname, folderNameFrom, folderNameTo ) {

    let fromFolderDir = path.join( dirname, folderNameFrom)
    let toFolderDir = path.join( dirname, folderNameTo)

    fs.mkdir(toFolderDir, { recursive: true }, (err) => {
        if (err) {
            return console.log(err);
        }
        fs.readdir(fromFolderDir, {withFileTypes: true} , ( err, data) => {

            if (err) {
                return console.log(err);
            }
            data.forEach(file => {
                if (file.isFile() ) {  
                    fs.copyFile( path.join( dirname, folderNameFrom, file.name) , path.join( __dirname, folderNameTo, file.name), (err) => {
                        if (err) {
                            return console.log(err);
                        }
                    } );
                }
            })
        })
    });
}

copyFolder(__dirname, 'files', 'files-copy');

module.exports = exports = function(dirname, folderNameFrom, folderNameTo) {
    copyFolder(dirname, folderNameFrom, folderNameTo);
};
