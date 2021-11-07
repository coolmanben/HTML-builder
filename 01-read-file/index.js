const fs = require("fs");

const path = require('path');

let dirFile = path.join( path.dirname(__dirname), '01-read-file', 'text.txt' );

let stream = fs.createReadStream( dirFile )

setTimeout(
  () =>
    stream.on('data', (data) =>
      console.log(data.toString())
    ),
  3000
) ;