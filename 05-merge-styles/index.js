
function buildStyles( dirname, styleFileName ) {

    const fs = require("fs");
    const path = require('path');
    let fromFolderDir = path.join( dirname, 'styles')
    let toFolderDir = path.join( dirname, 'project-dist')
    let toFile = path.join( dirname, 'project-dist', styleFileName )

    fs.mkdir(toFolderDir, { recursive: true }, (err) => {
        if (err) {
            return console.log(err);
        }
    });

    const recordStream = fs.createWriteStream( toFile ); 

    fs.open( toFile , 'w', (err) => {
        if(err) throw err;
    })

    fs.readdir(fromFolderDir, {withFileTypes: true} , ( err, data) => {
        if (err) {
            return console.log(err);
        }
        data.forEach(file => {
            if ( file.isFile() && ( path.extname(file.name).split('.').pop() == 'css' ) ) {  
                const inputStream = fs.createReadStream( path.join( fromFolderDir, file.name), 'utf-8' );
                inputStream.on('data', (data) => {
                    recordStream.write( data.toString()  );
                })
            }
        })
    } )
} 

buildStyles(__dirname, 'bundle.css')

module.exports = exports = function(dirname, styleFileName) {
    buildStyles(dirname, styleFileName)
};