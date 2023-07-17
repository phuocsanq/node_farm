const fs = require('fs');
const http = require('http');
const { dirname } = require('path');
const url = require('url');

///////////////////////////
/// FILE
// blocking, synchronous way
/* const textIn = fs.readFileSync('txt/input.txt', 'utf-8');

const textOut = `This is what we know about avocado: ${textIn}.\nCreated on ${Date.now()}`

fs.writeFileSync('txt/output.txt', textOut)

console.log('File written!!!')  */

// non-blocking, asynchronous way
/*
fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
    console.log(data);
})


setTimeout(() => {
    console.log('waiting!!')
}, 1000);   */

///////////////////////////
/// SERVER
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');    // __dirname: F:\NODEJS_UDEMY\complete-node-bootcamp-master\1-node-farm\final

const server = http.createServer((req, res) => {
    const pathName = req.url;
    if(pathName === '/') {
        res.end('This is home page')
    }
    else if(pathName === '/product') {
        res.end('This is product page')
    }
    else if(pathName === '/api') {
        res.writeHead(200, {'Content-type' : 'application/json'})
        res.end(data)
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});
