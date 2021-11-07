const fs = require("fs");

const path = require('path');

let fileFolderDir = path.join( path.dirname(__dirname), '03-files-in-folder', 'secret-folder' )

fs.readdir(fileFolderDir, {withFileTypes: true} , ( err, data) => {
    if (err) {
        return console.log(err);
    }
    data.forEach(file => {
        if (file.isFile() ) {  
            fs.stat( fileFolderDir + file.name , (err, stats) => {
                console.log( path.parse(fileFolderDir + file.name).name + ' - ' + path.extname(fileFolderDir + file.name).split('.').pop() + ' - '+  Math.trunc(stats.size/1000) + 'kb' )
            })
        }
    })
} )