const fs = require("fs");

const path = require('path');

let dirFile = path.join( path.dirname(__dirname), '02-write-file', 'text.txt' );

let recordStream = fs.createWriteStream( dirFile  );

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,

});

rl.write( 'Hi, write some text: ');

rl.on('line', (line) => {
    if ( line == 'exit') {
        console.log( "Goodbye");
        rl.close();
    }
    
    if ( line.indexOf( "Hi, write some text: ") == 0 ) {
        line = line.replace( "Hi, write some text:", '' );
    }
    recordStream.write( line );
  });

rl.on('SIGINT', () => {
    console.log('Goodbye');
    rl.close();
})