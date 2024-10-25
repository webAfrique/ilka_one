const http = require('http');
const fs = require('fs');
const path = require('path');

// Load flowers data
let flowers = JSON.parse(fs.readFileSync('./data/flowers.json', 'utf8'));

const server = http.createServer((req, res) => {
    const { url, method } = req;

    if (url === '/' && method === 'GET') {
        serveFile(res, './pages/homepage.html', 'text/html');
    } else if (url === '/show-flowers' && method === 'GET') {
        serveFile(res, './pages/show-flowers.html', 'text/html');
    } else if (url === '/add-flower' && method === 'GET') {
        serveFile(res, './pages/add-flower.html', 'text/html');
    } else if (url === '/update-flower' && method === 'GET') {
        serveFile(res, './pages/update-flower.html', 'text/html');
    } else if (url === '/search-flower' && method === 'GET') {
        serveFile(res, './pages/search-flower.html', 'text/html');
    } else if (url === '/delete-flower' && method === 'GET') {
        serveFile(res, './pages/delete-flower.html', 'text/html');
    } else if (url === '/data' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(flowers));
    } else if (url.startsWith('/add-flower') && method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            const newFlower = JSON.parse(body);
            newFlower.flowerId = flowers.length + 1;
            flowers.push(newFlower);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Flower added' }));
        });
    } 
    else if (url === '/update-flower' && method === 'PUT') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            const updatedFlower = JSON.parse(body);
            const flowerIndex = flowers.findIndex(f => f.flowerId === Number(updatedFlower.flowerId));
    
            if (flowerIndex !== -1) {
                // Update the flower details
                flowers[flowerIndex] = { ...flowers[flowerIndex], ...updatedFlower };
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Flower updated successfully' }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Flower not found' }));
            }
        });
    }
    else if (url.startsWith('/search-flower') && method === 'GET') {
        const flowerId = new URL(req.url, `http://${req.headers.host}`).searchParams.get('id');
        const flower = flowers.find(f => f.flowerId === Number(flowerId));
        if (flower) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(flower));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Flower not found' }));
        }
    } 
    
    else if (url.startsWith('/delete-flower') && method === 'DELETE') {
        const flowerId = new URL(req.url, `http://${req.headers.host}`).searchParams.get('id');
        const flowerIndex = flowers.findIndex(f => f.flowerId === Number(flowerId));

        if (flowerIndex !== -1) {
            flowers.splice(flowerIndex, 1);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Flower deleted' }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Flower not found' }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>Page not found</h1>');
    }
});

function serveFile(res, filePath, contentType) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('<h1>Server Error</h1>');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


 
