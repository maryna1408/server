const http = require("http");

const users = [{ name: 'Ivan', age: 25 }, { name: 'Oleg', age: 15 }, { name: 'Olga', age: 29 }]
const comments = []
const posts = []

const server = http.createServer((req, res) => {

    switch (req.url) {
        case '/': {
            res.setHeader('Content-type', 'application/json; charset=utf-8')
            res.end(JSON.stringify({users,comments,posts}))
            break;
        }
        case '/users': {
            switch (req.method) {
                case 'GET': {
                    getJSONData(req, res, users)
                    break;
                }
                case 'POST': {
                    postJSONData(req, res, users)
                    break;
                }
                default:
                    res.statusCode = 405
                    res.end(`Available methods: ['GET','POST']`)
                    break;
            }
            break;
        }
        case '/posts': {
            switch (req.method) {
                case 'GET': {
                    getJSONData(req, res, posts)
                    break;
                }
                case 'POST': {
                    postJSONData(req, res, posts)
                    break;
                }
                default:
                    res.statusCode = 405
                    res.end(`Available methods: ['GET','POST']`)
                    break;
            }
            break;
        }
        case '/comments': {
            switch (req.method) {
                case 'GET': {
                    getJSONData(req, res, comments)
                    break;
                }
                case 'POST': {
                    postJSONData(req, res, comments)
                    break;
                }
                default:
                    res.statusCode = 405
                    res.end(`Available methods: ['GET','POST']`)
                    break;
            }
            break;
        }
        default:
            res.statusCode = 404
            res.end('Sorry... Route not found!')
            break;
    }

})

server.listen(3300)

function getJSONData(req, res, data) {
    res.setHeader('Content-type', 'application/json; charset=utf-8')
    res.end(JSON.stringify(data))
}
function postJSONData(req, res, data) {
    let chunks = '';
    req.on('data', chunk => {
        chunks += chunk;
    })
    req.on('end', () => {
        data.push(JSON.parse(chunks))
        res.end('OK');
    })
}

