const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    // lodash
    const num = _.random(0, 20);

    console.log(num);

    const greet = _.once(() => {
        console.log('hello');
    });

    greet();
    greet();

    // set header contaent type
    // res.getHeader('content-type', 'text/plain');
    // res.write('<head><link rel="styleseet" href"#"></head>');
    // res.write('<p>hello ninjas</p>');
    // res.write('<p>hello ninjas, again</p>');
    // res.end();

    res.getHeader('content-type', 'text/plain');

    let path = '../views/';

    switch(req.url){
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    fs.readFile(path, (err, data) => {
        if(err){
            console.log(err);
            res.end();
        }else{
            // res.write(data); we dont this method actually bcz we can write the data through the end function
            res.end(data);
        }
    });

});

server.listen(9001, 'localhost', () => {
    console.log('listening for requests on port 9001');
});

//to activate the powershell for using the global nodemon
//command
//Set-ExecutionPolicy RemoteSigned -Scope CurrentUser