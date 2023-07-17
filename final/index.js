const fs = require('fs');
const http = require('http');
// const { dirname } = require('path');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');

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
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');    
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');    
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');    


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');    // __dirname: F:\NODEJS_UDEMY\complete-node-bootcamp-master\1-node-farm\final
const dataObj = JSON.parse(data);


const server = http.createServer((req, res) => {
    // console.log(req.url);
    const {query, pathname} = url.parse(req.url, true);
    // console.log(query.id)
        
    if(pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {'Content-type' : 'text/html'})
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');

        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

        res.end(output)
    }
    else if(pathname === '/product') {
        res.writeHead(200, {'Content-type' : 'text/html'})

        const proObj = dataObj[query.id]
        const output = replaceTemplate(tempProduct, proObj)

        res.end(output)
    }
    else if(pathname === '/api') {
        res.writeHead(200, {'Content-type' : 'application/json'})
        res.end(data)
    }
    else {
        res.writeHead(404, {'Content-type' : 'text/html'})
        res.end('<h1>Page not found</h1>')
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});
