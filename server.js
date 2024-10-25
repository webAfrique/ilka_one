'use strict'

const { getAll, getOneById, insertOne, getByKeyName, updateOne, deleteOne } = require('./CRUD_services')
const port = 5000
const host = 'localhost'
const http = require('http')
const path = require('path')
const fs = require('fs')


const fileTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
}


const server = http.createServer((req, res) => {
    const reqUrlObj = new URL(`http://${host}:${port}${req.url}`)
    const fullpath = reqUrlObj.href
    console.log(fullpath)
    if(req.method === 'GET'){
        if(req.url === '/'){
            res.writeHead(200, {
                'Content-Type': 'text/html',
                'access-control-allow-origin': '*'
            })
            const fileToServe = fs.readFileSync(path.join(__dirname, 'index.html'))
            res.end(fileToServe)
        }
        else if(req.url.includes('/pages/')){
            const fileToServe = fs.readFileSync(path.join(__dirname, `${req.url}.html`))
            res.writeHead(200, {
                'Content-Type': 'text/html',
                'access-control-allow-origin': '*'
            })
            res.end(fileToServe)
        }
        else if(req.url.includes('/controllers/')){
            const fileToServe = fs.readFileSync(path.join(__dirname, req.url))
            res.writeHead(200, {
                'Content-Type': 'text/javascript',
                'access-control-allow-origin': '*'
            })
            res.end(fileToServe)
        }
        else if(req.url.includes('/data/')){
            const route = new URL(`http://${host}:${port}${req.url}`)
            if(route.pathname.includes('all')){
                const flowers = getAll()
                res.writeHead(200, {
                    'Content-Type': 'application/json',
                    'access-control-allow-origin': '*'
                })
                res.end(JSON.stringify(flowers))
            }
            else if(route.search){
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
                        'Content-Type': 'application/json',
                        'access-control-allow-origin': '*'
                    })
                    res.end(JSON.stringify({message: error}))
                })
            }
        }
        
    }
    else if(req.method === 'PUT'){
        //console.log('request receive by PUT listener')
        const body = [];
        req.on("data", chunk => {
            body.push(chunk);
            });
        req.on("end", () => {
            // converts buffer stream into readable string format
            let parsedBody = new URLSearchParams(Buffer.concat(body).toString()); 
            //convert string to JSON object
            const flower = {}
            for(const [key, value] of parsedBody){
                if(['stock', 'unitPrice', 'flowerId'].includes(key)){
                    flower[key] = parseFloat(value)
                }
                else flower[key] = value
            }
            //insertOne(flower)
            /* updateOne(flower)
            .then(response => {
                res.writeHead(203, {
                    'Content-Type': 'text/plain',
                    'access-control-allow-origin': '*'
                })
                res.end(response);
            }) */console.log(flower)
             res.end('done')
        });
        req.on('error', error => {
            console.error(error.message)
            console.log(error.stack)
        });
    }
    /*else if(req.url.includes('controllers')){
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
    } */
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