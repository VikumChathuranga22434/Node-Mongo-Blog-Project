// global object
// in browser the window onject is the gobal object

// console.log(global);

global.setTimeout(() => {
    console.log('in the timeout');
    clearInterval(int);
}, 3000);

const int = setInterval(() => {
    console.log('in the interval');
}, 1000);

console.log(__dirname); //this get the absolute path of the current folder without current file name
console.log(__filename); //this get the absolute path of the current file with the file name 

//to get the widow elements
console.log(document.querySelector);