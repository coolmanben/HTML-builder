const fs = require("fs");

const path = require('path');

let fileFolderDir = path.join( path.dirname(__dirname), '03-files-in-folder', 'secret-folder' )

fs.readdir(fileFolderDir, {withFileTypes: true} , ( err, data) => {
    if (err) {
        return console.log(err);
    }
    data.forEach(file => {
        if (file.isFile() ) {  
            fs.stat( path.join(fileFolderDir, file.name) , (err, stats) => {
                if (err) {
                    return console.log(err);
                }

                console.log( path.parse( file.name).name + ' - ' + path.extname( file.name).split('.').pop() + ' - ' +  Math.trunc(stats.size/1000) + 'kb' )
            })
        }
    })
} )