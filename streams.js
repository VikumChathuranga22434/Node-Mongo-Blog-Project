const fs = require('fs');

// to read stream
const readStream = fs.createReadStream('./docs/blog3.txt', { encoding: 'utf8' }); // when we using the encoding property we dont need to use the toString function to conver the all data to readable format

// to write stream
const writeStream = fs.createWriteStream('./docs/blog4.txt');

// readStream.on('data', (chunk) => {
//     console.log('------ NEW CHUNK ------');
//     console.log(chunk);
//     writeStream.write('\nNEW CHUNK\n');
//     writeStream.write(chunk);
// });

//piping
readStream.pipe(writeStream); // this will piping the blog3 file to a writable file