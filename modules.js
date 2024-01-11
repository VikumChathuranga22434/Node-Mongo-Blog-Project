const { people, age } = require('./people');

console.log(people, age);

// to get the os details for the code
const os = require('os');

console.log(os.platform(), os.homedir());