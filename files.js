const fs = require('fs');

// reading files
// fs.readFile('./docs/blog.txt', (err, data) => {
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data.toString());
//     }
// });

// console.log('last Line');

// writing files
// fs.writeFile('./docs/blog.txt', 'hello world', () => {
//     console.log('file was written');
// });

// fs.writeFile('./docs/blog2.txt', 'hello again when we write to does not excist path it will create it', () => {
//     console.log('file was written');
// });

// directories
//making a directory
// if(!fs.existsSync('./assets')){
//     fs.mkdir('./assets', (err) => {
//         if(err){
//             console.log(err);
//         }else{
//             console.log('folder created');
//         }
//     });
// }else {
//     fs.rmdir('./assets', (err) => {
//         if(err){
//             console.log(err);
//         }else{
//             console.log('folder deleted');
//         }
//     });
// }

// deleting files
if(fs.existsSync('./docs/deleteme.txt')){
    //this use to delete a file 
    fs.unlink('./docs/deleteme.txt', (err) => {
        if(err){
            console.log(err);
        }else{
            console.log('file deleted');
        }
    });
}