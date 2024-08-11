'use strict'

const { getAll, getOneById, insertOne, getByKeyName, deleteOne } = require('./CRUD_services')
const port = 5000
const host = 'localhost'
const http = require('http')
const path = require('path')
const fs = require('fs')

const routeFiles = {
    '/': 'index.html',
    '/pages/all': '/pages/all_flowers.html',
    '/pages/search': '/pages/search_flower.html',
    '/pages/new': '/pages/new_flower.html',
    '/pages/update': '/pages/update_flower.html',
    'pages/delete': '/pages/delete_flower.html'
}
// HANDLE CRUD OPERATIONS AT NEXT SESSION

const server = http.createServer((req, res) => {
    //console.log(req.url.match(/\/\w+/g))
    //console.log(req.url.split('/')[1]) 
    if(req.url in routeFiles){
        const filename = routeFiles[req.url]
        const output = fs.readFileSync(path.join(__dirname, filename))
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'access-control-allow-origin': '*'
        })
        res.end(output)
    }
    else if(req.url === '/data/flowers'){
        const flowers = getAll()
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'access-control-allow-origin': '*'
        })  
        res.end(JSON.stringify(flowers))
    }
    else if(req.url.includes('controllers')){
        const output = fs.readFileSync(path.join(__dirname, req.url))
        res.writeHead(200, {
            'Content-Type': 'text/javascript',
            'access-control-allow-origin': '*'
        })
        res.end(output)
    }
    else if(req.url.includes('styles')){
        const output = fs.readFileSync(path.join(__dirname, req.url))
        res.writeHead(200, {
            'Content-Type': 'text/css',
            'access-control-allow-origin': '*'
        })
        res.end(output)
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.end('Not found')
    } 
    
})

server.listen(port, host, () => {
    console.log(`listening on ${host}:${port}...`)
})


// if(req.method === 'GET' && req.url === '/flowers'){
//     const data = getAll()
//     res.writeHead(200, {
//         'Content-Type': 'application/json',
//         'access-control-allow-origin': '*'
//     })
//     .end(JSON.stringify(data))
// }

/*
else if(req.method==='GET' && req.url.includes('?')){
        const route = new URL(`http://${host}:${port}${req.url}`)
        const search = new URLSearchParams(route.search)
        const params = Object.fromEntries(search)
        getByKeyName(params).then(data => {
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'access-control-allow-origin': '*'
            })
            res.end(JSON.stringify(data))
        })
        .catch(error => {
            res.writeHead(404, {
                'Content-Type': 'text/plain',
                'access-control-allow-origin': '*'
            })
            res.end(JSON.stringify(error))
        })
    }
    else if(req.method === 'POST'){
        const body = [];
        req.on("data", chunk => {
            body.push(chunk);
            });
        req.on("end", () => {
            // converts buffer stream into readable string format
            let parsedBody = Buffer.concat(body).toString(); //
            insertOne(JSON.parse(parsedBody))
            .then(response => {
                res.writeHead(203, {
                    'Content-Type': 'text/plain',
                    'access-control-allow-origin': '*'
                })
                res.end(response);
            })
             });
    }
    else if(req.method === 'DELETE' && req.url.includes('?')){
        const route = new URL(`http://${host}:${port}${req.url}`)
        const params = new URLSearchParams(route.search)
        const id = params.get('id')
        deleteOne(id)
        .then(response => {
            res.writeHead(200, {'Content-Type': 'text/plain'})
            res.end(response)
        })
    }
 */