const http = require('http');
const fs = require('fs');
const path = require('path');

const { getAll, getOneById, insertOne, getByKeyName, updateOne, deleteOne  } = require('./CRUD_services')
const fileTypes = {'.css': 'text/css', '.js': 'application/javascript', '.ico': 'image/x-icon' };

const server = http.createServer((req, res) => {
    const method = req.method;
    const url = req.url;
    const fileType = path.extname(url);
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Serve homepage
    if (method === 'GET' && url === '/') {
        const filePath = path.join(__dirname, 'index.html');
        serveFile(res, filePath, 'text/html');
    }
    // Serve other html files
    else if (method === 'GET' && url.includes('.html')) {
        const filePath = path.join(__dirname, `/pages/${url}`);
        serveFile(res, filePath, 'text/html');
    }

    // Serve other static files (css, js, images)
    else if (method === 'GET' && fileType in fileTypes) {
        const filePath = path.join(__dirname,  url);
        serveFile(res, filePath, fileTypes[fileType]);
    } 
    // Show all flowers
    else if (url === '/all-flowers' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const flowers = getAll()
        res.end(JSON.stringify(flowers));
    }
    // Add a new flower
    else if (url === '/add-flower' && method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            const newFlower = JSON.parse(body);
            //newFlower.flowerId = flowers.length + 100;
            //flowers.push(newFlower);
            insertOne(newFlower)
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Flower added' }));
        });
    }
    // Search flower by ID
    else if (url.startsWith('/search-flower') && method === 'GET') {
        const flowerId = new URL(req.url, `http://${req.headers.host}`).searchParams.get('id');
        const flower = getOneById(flowerId)
        flower.then(flower => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(flower));
        })
        .catch(error => {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: error }));
        });
        //const flower = flowers.find(f => f.flowerId === Number(flowerId));
        /* if (flower) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(flower));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Flower not found' }));
        } */
    }
    // Search flower by key-value pair
    /* else if (url.startsWith('/search-flower') && method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            const searchParams = JSON.parse(body);
            getByKeyName(searchParams)
            .then(flower => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(flower));
            })
            .catch(error => {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: error }));
            });
        });
    } */
    // Update flower by ID
    else if (url === '/update-flower' && method === 'PUT') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            const updatedFlower = JSON.parse(body);
            //const flowerIndex = flowers.findIndex(f => f.flowerId === Number(updatedFlower.flowerId));
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
    // Delete flower by ID
    else if (url.startsWith('/delete-flower') && method === 'DELETE') {
        const flowerId = new URL(req.url, `http://${req.headers.host}`).searchParams.get('id');
        const flowerIndex = flowers.findIndex(f => f.flowerId === Number(flowerId));
        if (flowerIndex !== -1) {
            flowers.splice(flowerIndex, 1);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Flower deleted successfully' }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Flower not found' }));
        }
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

function serveFile(res, filePath, contentType) {
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end('Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
}

server.listen(5000, () => {
    console.log('Server running on port 5000');
});
